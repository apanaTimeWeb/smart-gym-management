// RESPONSIBILITY: Seeds the deterministic master tenant and Admin credential for local development.
// FLOW: CLI -> master DataSource -> tenant row + admin row.

import 'reflect-metadata';
import 'dotenv/config';
import argon2 from 'argon2';
import masterDataSource from '@/backend_admin/core/database/core-master-data-source';
import { CoreMasterTenantEntity } from '@/backend_admin/core/tenant/core-master-tenant.entity';
import { CoreMasterAdminEntity } from '@/backend_admin/core/auth/core-master-admin.entity';
import { CoreMasterTenantMembershipEntity } from '@/backend_admin/core/tenant/core-master-tenant-membership.entity';
import { CoreMasterPlanEntity } from '@/backend_admin/core/subscription/core-master-plan.entity';
import { CoreMasterSubscriptionEntity } from '@/backend_admin/core/subscription/core-master-subscription.entity';
import { CoreMasterInvoiceEntity } from '@/backend_admin/core/subscription/core-master-invoice.entity';
import { CoreMasterPaymentMethodEntity } from '@/backend_admin/core/subscription/core-master-payment-method.entity';

const TENANT_ID = process.env.SEED_TENANT_ID ?? '00000000-0000-0000-0000-000000000001';
const ADMIN_ID = '00000000-0000-0000-0000-000000000901';

async function seedMaster(): Promise<void> {
  await masterDataSource.initialize();
  const tenantRepo = masterDataSource.getRepository(CoreMasterTenantEntity);
  const adminRepo = masterDataSource.getRepository(CoreMasterAdminEntity);
  const membershipRepo = masterDataSource.getRepository(CoreMasterTenantMembershipEntity);

  let tenant = await tenantRepo.findOne({ where: { id: TENANT_ID } });
  if (!tenant) {
    tenant = tenantRepo.create({
      id: TENANT_ID,
      name: process.env.SEED_TENANT_NAME ?? 'Demo Gym',
      slug: process.env.SEED_TENANT_SLUG ?? 'demo-gym',
      databaseName: process.env.SEED_TENANT_DATABASE ?? 'buildronix_tenant_default',
      isActive: true,
    });
    await tenantRepo.save(tenant);
  }

  const email = (process.env.SEED_ADMIN_EMAIL ?? 'admin@example.com').trim().toLowerCase();
  let admin = await adminRepo.findOne({ where: { id: ADMIN_ID } });
  if (!admin) {
    admin = adminRepo.create({
      id: ADMIN_ID,
      tenantId: tenant.id,
      email,
      passwordHash: await argon2.hash(process.env.SEED_ADMIN_PASSWORD ?? 'ChangeMe123!'),
      name: 'Buildronix Admin',
      phone: '9999999999',
      role: 'ADMIN',
      failedLoginCount: 0,
      isActive: true,
    });
    await adminRepo.save(admin);
  }

  const membership = await membershipRepo.findOne({ where: { actorId: ADMIN_ID, tenantId: tenant.id } });
  if (!membership) {
    await membershipRepo.save(membershipRepo.create({ actorId: ADMIN_ID, tenantId: tenant.id, role: 'ADMIN', isActive: true }));
  }

  const planRepo = masterDataSource.getRepository(CoreMasterPlanEntity);
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

  const subscriptionRepo = masterDataSource.getRepository(CoreMasterSubscriptionEntity);
  const subscription = await subscriptionRepo.findOne({ where: { tenantId: tenant.id } });
  if (!subscription) {
    await subscriptionRepo.save(subscriptionRepo.create({
      id: '00000000-0000-0000-0000-000000002101',
      tenantId: tenant.id,
      planId: '00000000-0000-0000-0000-000000002002',
      status: 'active',
      autoRenew: true,
      payload: { billingCycle: 'monthly', currentPeriodStart: '2026-09-01T00:00:00Z', currentPeriodEnd: '2026-09-30T23:59:59Z', nextBillingDate: '2026-10-01T00:00:00Z', gymCount: 3, memberLimit: 500, staffLimit: 25, storageGb: 50, monthlySpend: 4999, nextBillingAmount: 4999 },
    }));
  }

  const invoiceRepo = masterDataSource.getRepository(CoreMasterInvoiceEntity);
  const invoiceSeed = { tenantId: tenant.id, invoiceNo: 'SUB-2026-09', amountMinor: '499900', status: 'PAID', issuedAt: new Date('2026-09-01T00:00:00Z'), payload: { date: '2026-09-01', dueDate: '2026-09-07', planName: 'Growth', billingCycle: 'monthly', pdfUrl: '/admin/subscriptions/invoices/SUB-2026-09.pdf', taxAmount: 762.56, gstNumber: '10ABCDE1234F1Z5' } };
  if (!(await invoiceRepo.findOne({ where: { invoiceNo: invoiceSeed.invoiceNo } }))) await invoiceRepo.save(invoiceRepo.create({ id: '00000000-0000-0000-0000-000000002201', ...invoiceSeed }));

  const paymentRepo = masterDataSource.getRepository(CoreMasterPaymentMethodEntity);
  const paymentSeed = { tenantId: tenant.id, provider: 'razorpay', externalReference: 'pm_demo_001', isDefault: true, isActive: true, payload: { type: 'upi', upiId: 'gymsmart@okaxis' } };
  if (!(await paymentRepo.findOne({ where: { externalReference: paymentSeed.externalReference } }))) await paymentRepo.save(paymentRepo.create({ id: '00000000-0000-0000-0000-000000002301', ...paymentSeed }));

  await masterDataSource.destroy();
}

void seedMaster().catch(async () => {
  if (masterDataSource.isInitialized) await masterDataSource.destroy();
  process.exitCode = 1;
});
