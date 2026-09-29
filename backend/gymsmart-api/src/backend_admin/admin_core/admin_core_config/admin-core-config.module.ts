// RESPONSIBILITY: Configures validated global runtime, logging, and master-database infrastructure.
// FLOW: Environment -> ConfigModule -> LoggerModule/TypeORM master connection -> application infrastructure.
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import Joi from 'joi';
import { AcceptLanguageResolver, I18nModule, I18nJsonLoader } from 'nestjs-i18n';
import { LoggerModule } from 'nestjs-pino';

import { AdminCoreAppConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-app.config'
import { AdminCoreDatabaseConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-database.config'
import { AdminCoreMasterEntities } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-entities'
import { AdminCoreRuntimeConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-runtime.config'

const coreDir = __dirname;

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loader: I18nJsonLoader,
      loaderOptions: { path: join(coreDir, '../../admin_modules'), watch: false, includeSubfolders: true },
      resolvers: [AcceptLanguageResolver],
    }),

  ],
  exports: [],
})
/**
 * @description Defines the AdminCoreConfigModule boundary for the admin_core_config backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreConfigModule {}
