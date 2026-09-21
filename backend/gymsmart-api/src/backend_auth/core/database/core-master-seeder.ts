// RESPONSIBILITY: Orchestrates deterministic module seeders in dependency order for local environments.
// FLOW: CLI -> CoreMasterSeeder -> AuthSeeder -> PostgreSQL master database.

import { NestFactory } from '@nestjs/core';

import { CoreAppModule } from '@/backend_auth/core/app.module';
import { AuthSeeder } from '@/backend_auth/modules/auth/auth.seeder';
async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CoreAppModule);
  await app.get(AuthSeeder).seedAuthUsers();
  await app.close();
}

void seed();
