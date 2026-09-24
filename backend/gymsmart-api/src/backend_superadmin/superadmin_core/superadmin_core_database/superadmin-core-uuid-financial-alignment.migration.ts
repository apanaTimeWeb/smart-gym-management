// RESPONSIBILITY: Provides the version-controlled PostgreSQL migration for UUID identity adoption and financial/support hardening.
// FLOW: TypeORM migration -> FK-safe UUID remapping -> encrypted sensitive-data preservation -> immutable ledger tables -> support metric constraints.
import { createCipheriv, randomBytes } from 'node:crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Primary Intent: Converts legacy string identifiers to UUIDs without silently breaking foreign-key relationships and adds the schema required by the repaired Superadmin financial/support flows.
 * Edge Cases: Composite foreign keys abort the migration; legacy non-UUID IDs receive deterministic UUIDs; missing encryption configuration aborts before sensitive migration work can proceed; repeated constraint creation is guarded.
 * Side-Effects: Alters primary/FK column types, preserves legacy bank metadata as AES-256-GCM ciphertext, adds immutable financial ledger tables and satisfaction-score constraints, and removes the retired mutable affiliate payout balance only after backfill.
 * AI-Note: This migration is production-sensitive. Validate it against the complete cross-role schema before execution; never replace it with ORM auto-sync.
 */
/**
 * Primary Intent: Defines SuperadminCoreUuidFinancialAlignment20260924 as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
export class SuperadminCoreUuidFinancialAlignment20260924 implements MigrationInterface {
  name = 'SuperadminCoreUuidFinancialAlignment20260924';

  /**
 * Primary Intent: Executes the up use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
    await queryRunner.query(`CREATE TEMP TABLE superadmin_uuid_migration_map (table_name text NOT NULL, old_id text NOT NULL, new_id uuid NOT NULL, PRIMARY KEY(table_name, old_id)) ON COMMIT DROP`);

    const primaryTables: Array<{ tableName: string }> = await queryRunner.query(`
      SELECT DISTINCT c.table_name AS "tableName"
      FROM information_schema.columns c
      JOIN information_schema.table_constraints tc
        ON tc.table_schema=c.table_schema AND tc.table_name=c.table_name AND tc.constraint_type='PRIMARY KEY'
      JOIN information_schema.key_column_usage ku
        ON ku.constraint_name=tc.constraint_name AND ku.constraint_schema=tc.constraint_schema AND ku.table_name=tc.table_name
      WHERE c.table_schema='public' AND c.column_name='id' AND ku.column_name='id'
        AND c.data_type IN ('character varying','text','character')
      ORDER BY c.table_name
    `);

    for (const row of primaryTables) {
      const table = row.tableName;
      await queryRunner.query(`
        INSERT INTO superadmin_uuid_migration_map(table_name,old_id,new_id)
        SELECT $1,id,
          CASE
            WHEN id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN id::uuid
            ELSE (
              substr(md5($1 || ':' || id),1,8)||'-'||
              substr(md5($1 || ':' || id),9,4)||'-4'||
              substr(md5($1 || ':' || id),14,3)||'-8'||
              substr(md5($1 || ':' || id),18,3)||'-'||
              substr(md5($1 || ':' || id),21,12)
            )::uuid
          END
        FROM ${quote(table)} WHERE id IS NOT NULL
      `, [table]);
    }

    const foreignKeys: Array<{ constraintName: string; tableName: string; columnName: string; foreignTableName: string; foreignColumnName: string }> = await queryRunner.query(`
      SELECT tc.constraint_name AS "constraintName", tc.table_name AS "tableName", kcu.column_name AS "columnName",
             ccu.table_name AS "foreignTableName", ccu.column_name AS "foreignColumnName"
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON kcu.constraint_name=tc.constraint_name AND kcu.constraint_schema=tc.constraint_schema
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name=tc.constraint_name AND ccu.constraint_schema=tc.constraint_schema
      WHERE tc.table_schema='public' AND tc.constraint_type='FOREIGN KEY'
      ORDER BY tc.table_name, tc.constraint_name, kcu.ordinal_position
    `);

    const fkGroups = groupForeignKeys(foreignKeys);
    for (const fk of fkGroups) if (fk.columns.length !== 1) throw new Error(`Composite foreign-key migration is not supported: ${fk.constraintName}`);

    const remappableParents = new Set(primaryTables.map((row) => row.tableName));
    const relevantFks = fkGroups.filter((fk) => remappableParents.has(fk.foreignTableName));

    for (const fk of fkGroups) {
      await queryRunner.query(`ALTER TABLE ${quote(fk.tableName)} DROP CONSTRAINT IF EXISTS ${quote(fk.constraintName)}`);
    }

    for (const fk of relevantFks) {
      const relation = fk.columns[0].columnName;
      await queryRunner.query(`
        UPDATE ${quote(fk.tableName)} child
        SET ${quote(relation)} = mapping.new_id::text
        FROM superadmin_uuid_migration_map mapping
        WHERE mapping.table_name=$1 AND child.${quote(relation)}=mapping.old_id
      `, [fk.foreignTableName]);
    }

    for (const row of primaryTables) {
      const table = row.tableName;
      await queryRunner.query(`UPDATE ${quote(table)} target SET id=mapping.new_id::text FROM superadmin_uuid_migration_map mapping WHERE mapping.table_name=$1 AND mapping.old_id=target.id`, [table]);
      await queryRunner.query(`ALTER TABLE ${quote(table)} ALTER COLUMN id TYPE uuid USING id::uuid`);
    }

    for (const fk of relevantFks) {
      const relation = fk.columns[0].columnName;
      await queryRunner.query(`ALTER TABLE ${quote(fk.tableName)} ALTER COLUMN ${quote(relation)} TYPE uuid USING ${quote(relation)}::uuid`);
    }

    for (const fk of fkGroups) {
      const relation = fk.columns[0].columnName;
      await queryRunner.query(`ALTER TABLE ${quote(fk.tableName)} ADD CONSTRAINT ${quote(fk.constraintName)} FOREIGN KEY (${quote(relation)}) REFERENCES ${quote(fk.foreignTableName)}(${quote(fk.foreignColumnName)})`);
    }

    await queryRunner.query(`ALTER TABLE superadmin_affiliates ADD COLUMN IF NOT EXISTS currency char(3) NOT NULL DEFAULT 'INR'`);

    const bankColumn = await queryRunner.query<Array<{ dataType: string }>>(`SELECT data_type AS "dataType" FROM information_schema.columns WHERE table_schema='public' AND table_name='superadmin_affiliates' AND column_name='bank_details'`);
    if (!bankColumn.length) {
      await queryRunner.query(`ALTER TABLE superadmin_affiliates ADD COLUMN bank_details text NULL`);
    } else if (bankColumn[0].dataType !== 'text') {
      const key = resolveMigrationEncryptionKey();
      const rows = await queryRunner.query<Array<{ id: string; bankDetails: string }>>(`SELECT id::text AS id, bank_details::text AS "bankDetails" FROM superadmin_affiliates WHERE bank_details IS NOT NULL AND bank_details::text <> 'null'`);
      await queryRunner.query(`ALTER TABLE superadmin_affiliates ALTER COLUMN bank_details TYPE text USING bank_details::text`);
      for (const row of rows) {
        await queryRunner.query(`UPDATE superadmin_affiliates SET bank_details=$1 WHERE id=$2::uuid`, [encryptLegacyBankDetails(row.bankDetails, key), row.id]);
      }
    }

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS superadmin_affiliate_ledger_entries (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(), transaction_id uuid NOT NULL, affiliate_id uuid NOT NULL,
        account_key varchar(100) NOT NULL, direction varchar(6) NOT NULL, amount_minor bigint NOT NULL,
        currency char(3) NOT NULL, reason varchar(200) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(), deleted_at timestamptz NULL,
        CONSTRAINT CHK_superadmin_affiliate_ledger_direction CHECK (direction IN ('DEBIT','CREDIT')),
        CONSTRAINT CHK_superadmin_affiliate_ledger_amount CHECK (amount_minor > 0),
        CONSTRAINT FK_superadmin_affiliate_ledger_affiliate FOREIGN KEY (affiliate_id) REFERENCES superadmin_affiliates(id)
      )
    `);
    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS UQ_superadmin_affiliate_ledger_transaction_direction ON superadmin_affiliate_ledger_entries(transaction_id,direction)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_affiliate_ledger_transaction ON superadmin_affiliate_ledger_entries(transaction_id)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_affiliate_ledger_affiliate_created_at ON superadmin_affiliate_ledger_entries(affiliate_id,created_at)`);

    const pendingColumn = await queryRunner.query<Array<{ dataType: string }>>(`SELECT data_type AS "dataType" FROM information_schema.columns WHERE table_schema='public' AND table_name='superadmin_affiliates' AND column_name='pending_payout'`);
    if (pendingColumn.length) {
      await queryRunner.query(`
        WITH legacy AS (
          SELECT id AS affiliate_id, currency, pending_payout, gen_random_uuid() AS transaction_id
          FROM superadmin_affiliates WHERE pending_payout > 0
        )
        INSERT INTO superadmin_affiliate_ledger_entries(transaction_id,affiliate_id,account_key,direction,amount_minor,currency,reason)
        SELECT transaction_id,affiliate_id,'COMMISSION_EXPENSE','DEBIT',pending_payout,currency,'LEGACY_PENDING_PAYOUT_BACKFILL' FROM legacy
        UNION ALL
        SELECT transaction_id,affiliate_id,'AFFILIATE_PAYABLE','CREDIT',pending_payout,currency,'LEGACY_PENDING_PAYOUT_BACKFILL' FROM legacy
      `);
      await queryRunner.query(`ALTER TABLE superadmin_affiliates DROP COLUMN pending_payout`);
    }

    await queryRunner.query(`CREATE TABLE IF NOT EXISTS superadmin_saas_billing_invoice_ledger_entries (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(), transaction_id uuid NOT NULL, invoice_id uuid NOT NULL,
      account_key varchar(100) NOT NULL, direction varchar(6) NOT NULL, amount_minor bigint NOT NULL,
      currency char(3) NOT NULL, reason varchar(200) NOT NULL, created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(), deleted_at timestamptz NULL,
      CONSTRAINT CHK_superadmin_saas_billing_invoice_ledger_direction CHECK (direction IN ('DEBIT','CREDIT')),
      CONSTRAINT CHK_superadmin_saas_billing_invoice_ledger_amount CHECK (amount_minor > 0),
      CONSTRAINT FK_superadmin_saas_billing_invoice_ledger_invoice FOREIGN KEY (invoice_id) REFERENCES superadmin_saas_invoices(id)
    )`);
    await queryRunner.query(`CREATE UNIQUE INDEX IF NOT EXISTS UQ_superadmin_saas_billing_invoice_ledger_tx_direction ON superadmin_saas_billing_invoice_ledger_entries(transaction_id,direction)`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS IDX_superadmin_saas_billing_invoice_ledger_invoice ON superadmin_saas_billing_invoice_ledger_entries(invoice_id,created_at)`);

    await queryRunner.query(`ALTER TABLE superadmin_support_tickets ADD COLUMN IF NOT EXISTS satisfaction_score numeric(3,2) NULL`);
    await queryRunner.query(`DO $$ BEGIN IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname='CHK_superadmin_support_tickets_satisfaction_score') THEN ALTER TABLE superadmin_support_tickets ADD CONSTRAINT CHK_superadmin_support_tickets_satisfaction_score CHECK (satisfaction_score IS NULL OR (satisfaction_score >= 0 AND satisfaction_score <= 5)); END IF; END $$`);
  }

  /**
 * Primary Intent: Executes the down use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX IF EXISTS IDX_superadmin_saas_billing_invoice_ledger_invoice`);
    await queryRunner.query(`DROP INDEX IF EXISTS UQ_superadmin_saas_billing_invoice_ledger_tx_direction`);
    await queryRunner.query(`DROP TABLE IF EXISTS superadmin_saas_billing_invoice_ledger_entries`);
    await queryRunner.query(`DROP INDEX IF EXISTS IDX_superadmin_affiliate_ledger_affiliate_created_at`);
    await queryRunner.query(`DROP INDEX IF EXISTS IDX_superadmin_affiliate_ledger_transaction`);
    await queryRunner.query(`DROP INDEX IF EXISTS UQ_superadmin_affiliate_ledger_transaction_direction`);
    await queryRunner.query(`DROP TABLE IF EXISTS superadmin_affiliate_ledger_entries`);
    await queryRunner.query(`ALTER TABLE superadmin_support_tickets DROP CONSTRAINT IF EXISTS CHK_superadmin_support_tickets_satisfaction_score`);
    await queryRunner.query(`ALTER TABLE superadmin_support_tickets DROP COLUMN IF EXISTS satisfaction_score`);
    await queryRunner.query(`DROP TABLE IF EXISTS superadmin_core_uuid_migration_map`);
  }
}

/**
 * Primary Intent: Defines the ForeignKeyColumn type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ForeignKeyColumn { columnName: string; }
/**
 * Primary Intent: Defines the ForeignKeyDefinition type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface ForeignKeyDefinition { constraintName: string; tableName: string; foreignTableName: string; foreignColumnName: string; columns: ForeignKeyColumn[]; }

function groupForeignKeys(rows: Array<{ constraintName: string; tableName: string; columnName: string; foreignTableName: string; foreignColumnName: string }>): ForeignKeyDefinition[] {
  const groups = new Map<string, ForeignKeyDefinition>();
  for (const row of rows) {
    const key = `${row.tableName}:${row.constraintName}`;
    const current = groups.get(key);
    if (current) current.columns.push({ columnName: row.columnName });
    else groups.set(key, { constraintName: row.constraintName, tableName: row.tableName, foreignTableName: row.foreignTableName, foreignColumnName: row.foreignColumnName, columns: [{ columnName: row.columnName }] });
  }
  return [...groups.values()];
}

function resolveMigrationEncryptionKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY_BASE64 ?? '';
  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) throw new Error('ENCRYPTION_KEY_BASE64 must decode to exactly 32 bytes before this migration runs');
  return key;
}

function encryptLegacyBankDetails(value: string, key: Buffer): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return `${iv.toString('base64')}.${cipher.getAuthTag().toString('base64')}.${ciphertext.toString('base64')}`;
}

function quote(identifier: string): string { return `"${identifier.replaceAll('"', '""')}"`; }
