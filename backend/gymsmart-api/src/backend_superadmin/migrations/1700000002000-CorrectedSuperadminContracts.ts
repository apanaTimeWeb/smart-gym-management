import { MigrationInterface, QueryRunner } from 'typeorm';

// RESPONSIBILITY: Create persistence tables required by the corrected Superadmin feature contracts.
// FLOW: TypeORM migration runner -> create feature release notes + notifications tables and indexes.
export class CorrectedSuperadminContracts1700000002000 implements MigrationInterface {
  /** Migration identifier used by TypeORM's migration history table. */
  public readonly name = 'CorrectedSuperadminContracts1700000002000';

  /** Creates the missing Superadmin persistence structures. */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS feature_release_notes (
        id varchar(64) NOT NULL,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL,
        deleted_at timestamp with time zone NULL,
        version varchar(100) NOT NULL,
        title varchar(200) NOT NULL,
        content text NOT NULL,
        date timestamp with time zone NOT NULL,
        is_published boolean NOT NULL DEFAULT false,
        CONSTRAINT PK_feature_release_notes PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS IDX_feature_release_notes_date
      ON feature_release_notes (date)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS IDX_feature_release_notes_is_published
      ON feature_release_notes (is_published)
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE superadmin_notification_type_enum AS ENUM ('INFO', 'WARNING', 'CRITICAL');
      EXCEPTION
        WHEN duplicate_object THEN NULL;
      END $$
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS superadmin_notifications (
        id varchar(64) NOT NULL,
        created_at timestamp with time zone NOT NULL,
        updated_at timestamp with time zone NOT NULL,
        deleted_at timestamp with time zone NULL,
        title varchar(200) NOT NULL,
        body text NOT NULL,
        type superadmin_notification_type_enum NOT NULL,
        read boolean NOT NULL DEFAULT false,
        CONSTRAINT PK_superadmin_notifications PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS IDX_superadmin_notifications_created_at
      ON superadmin_notifications (created_at)
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS IDX_superadmin_notifications_read
      ON superadmin_notifications (read)
    `);
  }

  /** Removes the corrected Superadmin persistence structures. */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX IF EXISTS IDX_superadmin_notifications_read',
    );
    await queryRunner.query(
      'DROP INDEX IF EXISTS IDX_superadmin_notifications_created_at',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS superadmin_notifications',
    );
    await queryRunner.query(
      'DROP TYPE IF EXISTS superadmin_notification_type_enum',
    );
    await queryRunner.query(
      'DROP INDEX IF EXISTS IDX_feature_release_notes_is_published',
    );
    await queryRunner.query(
      'DROP INDEX IF EXISTS IDX_feature_release_notes_date',
    );
    await queryRunner.query(
      'DROP TABLE IF EXISTS feature_release_notes',
    );
  }
}
