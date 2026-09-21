// RESPONSIBILITY: Provisions the deterministic local demo tenant and its tenant database.
// FLOW: CLI → Nest application context → TenantDatabaseProvisioner → tenant migrations.
import { NestFactory } from '@nestjs/core';

import 'reflect-metadata';

import 'dotenv/config';

import { AppModule } from '@/app.module';

import { TenantDatabaseProvisionerService } from '@/core/tenant/tenant-database-provisioner.service';

import { LandingSeeder } from '@/modules/landing/landing.seeder';


async function seedLocalTenant(): Promise<void> {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  const provisioner = app.get(TenantDatabaseProvisionerService);
  await provisioner.provisionConfiguredTenant();
  await app.get(LandingSeeder).seed();
  await app.close();
}

seedLocalTenant().catch((error: unknown) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}
`);
  process.exitCode = 1;
});
