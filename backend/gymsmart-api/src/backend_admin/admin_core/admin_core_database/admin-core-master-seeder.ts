// RESPONSIBILITY: Seeds the deterministic master tenant and Admin credential for local development.
// FLOW: CLI -> master DataSource -> tenant row + admin row.
import argon2 from 'argon2';
import 'dotenv/config';
import 'reflect-metadata';

import { AdminCoreMasterAdminEntity } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin.entity.js';
import { readAdminCoreEnvironment } from '@/backend_admin/admin_core/admin_core_config/admin-core-environment.js';
import masterDataSource from '@/backend_admin/admin_core/admin_core_database/admin-core-master-data-source.js';
import { AdminCoreMasterInvoiceEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-invoice.entity.js';
import { AdminCoreMasterPaymentMethodEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-payment-method.entity.js';
import { AdminCoreMasterPlanEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-plan.entity.js';
import { AdminCoreMasterSubscriptionEntity } from '@/backend_admin/admin_core/admin_core_subscription/admin-core-master-subscription.entity.js';
import { AdminCoreMasterTenantMembershipEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant-membership.entity.js';
import { AdminCoreMasterTenantEntity } from '@/backend_admin/admin_core/admin_core_tenant/admin-core-master-tenant.entity.js';

const env = readAdminCoreEnvironment();
const TENANT_ID = env.SEED_TENANT_ID ?? '00000000-0000-0000-0000-000000000001';
const ADMIN_ID = '00000000-0000-0000-0000-000000000901';

async function seedMaster(): Promise<void> {
  await masterDataSource.initialize();
  const tenantRepo = masterDataSource.getRepository(AdminCoreMasterTenantEntity);
  const adminRepo = masterDataSource.getRepository(AdminCoreMasterAdminEntity);
  const membershipRepo = masterDataSource.getRepository(AdminCoreMasterTenantMembershipEntity);

  let tenant = await tenantRepo.findOne({ where: { id: TENANT_ID } });
  if (!tenant) {
    tenant = tenantRepo.create({
      id: TENANT_ID,
      name: env.SEED_TENANT_NAME ?? 'Demo Gym',
      slug: env.SEED_TENANT_SLUG ?? 'demo-gym',
      databaseName: env.SEED_TENANT_DATABASE ?? 'buildronix_tenant_default',
      isActive: true,
    });
    await tenantRepo.save(tenant);
  }

  const email = (env.SEED_ADMIN_EMAIL ?? 'admin@example.com').trim().toLowerCase();
  let admin = await adminRepo.findOne({ where: { id: ADMIN_ID } });
  if (!admin) {
    admin = adminRepo.create({
      id: ADMIN_ID,
      tenantId: tenant.id,
      email,
      passwordHash: await argon2.hash(env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'),
      name: 'Buildronix Admin',
      phone: '9999999999',
      role: 'ADMIN' as any,
      failedLoginCount: 0,
      isActive: true,
    });
    await adminRepo.save(admin);
  }

  const membership = await membershipRepo.findOne({ where: { actorId: ADMIN_ID, tenantId: tenant.id } });
  if (!membership) {
    await membershipRepo.save(membershipRepo.create({ actorId: ADMIN_ID, tenantId: tenant.id, role: 'ADMIN', isActive: true } as any));
  }

  const planRepo = masterDataSource.getRepository(AdminCoreMasterPlanEntity);
  const planSeeds = [
    { id: '00000000-0000-0000-0000-000000002001', name: 'Starter', tier: 'starter', monthlyPriceMinor: '199900', annualPriceMinor: '1999000', payload: { gymLimit: 1, memberLimit: 100, staffLimit: 5, storageGb: 10, features: ['Core'], isPopular: false } },
    { id: '00000000-0000-0000-0000-000000002002', name: 'Growth', tier: 'growth', monthlyPriceMinor: '499900', annualPriceMinor: '4999000', payload: { gymLimit: 5, memberLimit: 500, staffLimit: 25, storageGb: 50, features: ['Analytics', 'Reports', 'Bulk Communications', 'Coupons & Discounts'], isPopular: true } },
    { id: '00000000-0000-0000-0000-000000002003', name: 'Pro', tier: 'pro', monthlyPriceMinor: '999900', annualPriceMinor: '9999000', payload: { gymLimit: 15, memberLimit: 2000, staffLimit: 100, storageGb: 200, features: ['Full Analytics Suite', 'Data Export', 'Gym Health Alerts'], isPopular: false } },
    { id: '00000000-0000-0000-0000-000000002004', name: 'Enterprise', tier: 'enterprise', monthlyPriceMinor: '0', annualPriceMinor: '0', payload: { gymLimit: 999, memberLimit: 999999, staffLimit: 9999, storageGb: 1000, features: ['Unlimited'], isPopular: false } },
  ];
  for (const seed of planSeeds) {
    const existing = await planRepo.findOne({ where: { id: seed.id } });
    if (!existing) await planRepo.save(planRepo.create({ ...seed, isActive: true }));
  }

  const subscriptionRepo = masterDataSource.getRepository(AdminCoreMasterSubscriptionEntity);
  const subscription = await subscriptionRepo.findOne({ where: { tenantId: tenant.id } });
  if (!subscription) {
    await subscriptionRepo.save(subscriptionRepo.create({
      id: '00000000-0000-0000-0000-000000002101',
      tenantId: tenant.id,
      planId: '00000000-0000-0000-0000-000000002002',
      status: 'ACTIVE',
      autoRenew: true,
      payload: { billingCycle: 'monthly', currentPeriodStart: '2026-09-01T00:00:00Z', currentPeriodEnd: '2026-09-30T23:59:59Z', nextBillingDate: '2026-10-01T00:00:00Z', gymCount: 3, memberLimit: 500, staffLimit: 25, storageGb: 50, monthlySpend: 4999, nextBillingAmount: 4999 },
    } as any));
  }

  const invoiceRepo = masterDataSource.getRepository(AdminCoreMasterInvoiceEntity);
  const invoiceSeed = { tenantId: tenant.id, invoiceNo: 'SUB-2026-09', amountMinor: '499900', status: 'PAID', issuedAt: new Date('2026-09-01T00:00:00Z'), payload: { date: '2026-09-01', dueDate: '2026-09-07', planName: 'Growth', billingCycle: 'monthly', pdfUrl: '/admin/subscriptions/invoices/SUB-2026-09.pdf', taxAmountMinor: 76256, currency: 'INR', gstNumber: '10ABCDE1234F1Z5' } };
  if (!(await invoiceRepo.findOne({ where: { invoiceNo: invoiceSeed.invoiceNo } }))) await invoiceRepo.save(invoiceRepo.create({ id: '00000000-0000-0000-0000-000000002201', ...invoiceSeed } as any));

  const paymentRepo = masterDataSource.getRepository(AdminCoreMasterPaymentMethodEntity);
  const paymentSeed = { tenantId: tenant.id, provider: 'razorpay', externalReference: 'pm_demo_001', isDefault: true, isActive: true, payload: { type: 'upi', upiId: 'gymsmart@okaxis' } };
  if (!(await paymentRepo.findOne({ where: { externalReference: paymentSeed.externalReference } }))) await paymentRepo.save(paymentRepo.create({ id: '00000000-0000-0000-0000-000000002301', ...paymentSeed }));

  await masterDataSource.destroy();
}

void seedMaster().catch(async () => {
  if (masterDataSource.isInitialized) await masterDataSource.destroy();
  process.exitCode = 1;
});
