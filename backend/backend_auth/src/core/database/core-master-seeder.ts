// RESPONSIBILITY: Orchestrates deterministic module seeders in dependency order for local environments.
// FLOW: CLI -> CoreMasterSeeder -> AuthSeeder -> PostgreSQL master database.

import { NestFactory } from '@nestjs/core';

import { CoreAppModule } from '@/core/app.module';
import { AuthSeeder } from '@/modules/auth/auth.seeder';
async function seed(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CoreAppModule);
  await app.get(AuthSeeder).seedAuthUsers();
  await app.close();
}

void seed();
