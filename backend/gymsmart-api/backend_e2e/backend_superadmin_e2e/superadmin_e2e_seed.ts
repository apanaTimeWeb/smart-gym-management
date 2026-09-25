import { DataSource } from 'typeorm';
import { randomUUID } from 'crypto';

const targetDbName = 'test_gymsmart';

// 1. Establish connection to the target database
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.MASTER_DB_HOST || '127.0.0.1',
  port: parseInt(process.env.MASTER_DB_PORT || '5432'),
  username: process.env.MASTER_DB_USER || 'postgres',
  password: process.env.MASTER_DB_PASSWORD || 'postgres',
  database: targetDbName,
});

const E2E_DUMMY_ID = '00000000-0000-4000-8000-000000000001';

async function ensureDatabaseExists() {
  const defaultDataSource = new DataSource({
    type: 'postgres',
    host: process.env.MASTER_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.MASTER_DB_PORT || '5432'),
    username: process.env.MASTER_DB_USER || 'postgres',
    password: process.env.MASTER_DB_PASSWORD || 'postgres',
    database: 'postgres', // connect to default
  });

  await defaultDataSource.initialize();
  try {
    const result = await defaultDataSource.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [targetDbName]
    );
    if (result.length === 0) {
      console.log(`Database "${targetDbName}" does not exist. Creating it...`);
      await defaultDataSource.query(`CREATE DATABASE "${targetDbName}"`);
      console.log(`Database "${targetDbName}" created successfully.`);
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
  } finally {
    await defaultDataSource.destroy();
  }
}

async function seed() {
  await ensureDatabaseExists();
  await dataSource.initialize();

  try {
    // Insert Tenant (Gyms)
    await dataSource.query(`
      INSERT INTO tenants (id, database_name, name, owner_name, admin_email, phone, status, plan, database_version, city, state, country, gstin, slug, display_name) 
      VALUES ($1, 'dummy_db', 'Dummy Tenant', 'Dummy Owner', 'admin@example.com', '1234567890', 'ACTIVE', 'BASIC', '1.0', 'DummyCity', 'DummyState', 'DummyCountry', 'DummyGST', 'dummy-tenant', 'Dummy Tenant')
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);
    console.log('Seeded tenants');

    // Insert Tenant Admin Account
    await dataSource.query(`
      CREATE TABLE IF NOT EXISTS tenant_admin_accounts (
        id uuid PRIMARY KEY,
        tenant_id uuid NOT NULL,
        email varchar(255) NOT NULL,
        password_hash varchar(255) NOT NULL,
        role varchar(50) NOT NULL,
        created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
        updated_at timestamptz DEFAULT CURRENT_TIMESTAMP,
        deleted_at timestamptz
      );
    `);
    await dataSource.query(`
      INSERT INTO tenant_admin_accounts (id, tenant_id, email, password_hash, role)
      VALUES ($1, $2, 'admin@example.com', 'hash', 'ADMIN')
      ON CONFLICT (id) DO NOTHING;
    `, [randomUUID(), E2E_DUMMY_ID]);
    console.log('Seeded tenant_admin_accounts');

    // Insert SaaS Invoice
    await dataSource.query(`
      INSERT INTO superadmin_saas_invoices (id, tenant_id, tenant_name, amount, currency, status, issued_at, due_date, payment_method, invoice_type, plan_name, tax_id)
      VALUES ($1, $1, 'Dummy Tenant', 100, 'USD', 'PAID', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'Credit Card', 'RECURRING', 'BASIC', 'TAX123')
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);
    console.log('Seeded superadmin_saas_invoices');

    // Insert System Ops Backup
    await dataSource.query(`
      INSERT INTO superadmin_backup_records (id, tenant_id, tenant_name, database_name, size_m_b, status, timestamp, artifact_path, job_id)
      VALUES ($1, $1, 'Dummy Tenant', 'dummy_db', 10, 'SUCCESS', CURRENT_TIMESTAMP, 'dummy.bak', 'job-123')
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]).catch(e => console.log('Backups insert failed', e.message));
    console.log('Seeded superadmin_backup_records');

    // Insert White Labeling
    await dataSource.query(`
      INSERT INTO superadmin_white_label_domains (id, gym_id, gym_name, domain, status, config)
      VALUES ($1, $1, 'Dummy Tenant', 'dummy.com', 'ACTIVE', '{}'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]).catch(e => console.log('White Labeling insert failed', e.message));
    console.log('Seeded superadmin_white_labeling_domains');

    // Insert Tickets
    await dataSource.query(`
      INSERT INTO superadmin_support_tickets (id, tenant_id, tenant_name, subject, status, priority, description, created_by_user_id)
      VALUES ($1, $1, 'Dummy Tenant', 'Dummy Ticket', 'OPEN', 'HIGH', 'Dummy desc', $1)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]).catch(e => console.log('Tickets insert failed', e.message));
    console.log('Seeded superadmin_tickets');

    // Insert Jobs
    await dataSource.query(`
      INSERT INTO superadmin_backup_jobs (id, tenant_id, type, status, requested_by_user_id)
      VALUES ($1, $1, 'RESTORE', 'COMPLETED', $1)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]).catch(e => console.log('Jobs insert failed', e.message));
    console.log('Seeded superadmin_system_ops_jobs');

    // Insert Coupons
    await dataSource.query(`
      INSERT INTO superadmin_coupons (id, code, discount_type, discount_value, max_uses, current_uses, status, expiry_date, redemptions)
      VALUES ($1, 'DUMMY10', 'PERCENTAGE', 10, 100, 0, 'ACTIVE', CURRENT_TIMESTAMP, '[]'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]).catch(e => console.log('Coupons insert failed', e.message));
    console.log('Seeded superadmin_coupons');

    console.log('E2E DB Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await dataSource.destroy();
  }
}

seed();
