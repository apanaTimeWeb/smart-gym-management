// RESPONSIBILITY: Seeds the deterministic master tenant and Admin credential for local development.
// FLOW: CLI -> master DataSource -> tenant row + admin row.

import 'reflect-metadata';
import 'dotenv/config';
import argon2 from 'argon2';
import masterDataSource from '@/core/database/core-master-data-source';
import { CoreMasterTenantEntity } from '@/core/tenant/core-master-tenant.entity';
import { CoreMasterAdminEntity } from '@/core/auth/core-master-admin.entity';
import { CoreMasterTenantMembershipEntity } from '@/core/tenant/core-master-tenant-membership.entity';

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

  await masterDataSource.destroy();
}

void seedMaster().catch(async () => {
  if (masterDataSource.isInitialized) await masterDataSource.destroy();
  process.exitCode = 1;
});
