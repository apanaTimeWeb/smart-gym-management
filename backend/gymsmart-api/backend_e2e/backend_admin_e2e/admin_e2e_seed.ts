import { DataSource } from 'typeorm';

// 1. Establish connection to the target database
const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.MASTER_DB_HOST || '127.0.0.1',
  port: parseInt(process.env.MASTER_DB_PORT || '5432'),
  username: process.env.MASTER_DB_USER || 'postgres',
  password: process.env.MASTER_DB_PASSWORD || 'postgres',
  database: 'gymsmart', // Connect to gymsmart monolith DB
});

const E2E_DUMMY_ID = '00000000-0000-4000-8000-000000000001';

async function seed() {
  await dataSource.initialize();
  console.log('Connected to gymsmart database for Admin E2E Seeding');

  const tablesToSeed = [
    'admin_dashboard_snapshots',
    'admin_branches',
    'admin_members',
    'admin_campaigns',
    'admin_staff',
    'admin_plans',
    'admin_subscriptions',
    'admin_coupons',
    'admin_report_snapshots',
    'admin_sales_snapshots',
    'admin_settings',
    'admin_profiles',
    'admin_audit_log_views',
    'admin_blacklisted_members',
    'admin_gym_health_alerts',
    'admin_gym_payouts',
    'admin_notifications',
    'admin_payment_transactions',
    'admin_permission_overrides',
    'admin_realtime_events',
    'admin_usage_snapshots',
    'admin_announcements',
    'admin_attendance_records',
    'admin_data_export_jobs'
  ];

  try {
    for (const table of tablesToSeed) {
      await dataSource.query(`
        INSERT INTO ${table} (id, name, status, payload, created_at, updated_at, read_model_updated_at)
        VALUES ($1, 'Dummy Name', 'ACTIVE', '{"report": {}, "summary": {}, "storeSummary": {}, "kpis": {"totalExports": 0, "activeJobs": 0, "completedExports": 0}, "trend": {}, "logs": [], "notifications": {}}'::jsonb, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET payload = EXCLUDED.payload, read_model_updated_at = EXCLUDED.read_model_updated_at;
      `, [E2E_DUMMY_ID]).catch(e => console.log(`[Warning] ${table} insert failed:`, e.message));
      console.log(`Seeded ${table}`);
    }

    // Seed master tables for subscriptions
    await dataSource.query(`
      INSERT INTO plans_master (id, name, tier, monthly_price_minor, annual_price_minor, is_active, payload)
      VALUES ($1, 'Dummy Plan', 'PRO', 10000, 120000, true, '{}'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);

    await dataSource.query(`
      INSERT INTO subscriptions_master (id, tenant_id, plan_id, status, auto_renew, payload)
      VALUES ($1, $1, $1, 'ACTIVE', true, '{}'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);

    await dataSource.query(`
      INSERT INTO invoices_master (id, tenant_id, invoice_no, amount_minor, status, issued_at, payload)
      VALUES ($1, $1, 'INV-1234', 10000, 'PAID', CURRENT_TIMESTAMP, '{}'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);

    await dataSource.query(`
      INSERT INTO payment_methods_master (id, tenant_id, provider, external_reference, is_default, is_active, payload)
      VALUES ($1, $1, 'Stripe', 'cus_123', true, true, '{}'::jsonb)
      ON CONFLICT (id) DO NOTHING;
    `, [E2E_DUMMY_ID]);

    // Seed audit_logs table
    await dataSource.query(`
      INSERT INTO audit_logs (id, tenant_id, action, entity_type, entity_id, actor_id, actor_role, ip_address, module, severity, timestamp)
      VALUES ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'CREATE', 'dummy', '00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000001', 'admin', '127.0.0.1', 'test', 'HIGH', CURRENT_TIMESTAMP)
      ON CONFLICT (id) DO NOTHING;
    `);

    console.log('Admin E2E DB Seeding complete.');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await dataSource.destroy();
  }
}

seed();
