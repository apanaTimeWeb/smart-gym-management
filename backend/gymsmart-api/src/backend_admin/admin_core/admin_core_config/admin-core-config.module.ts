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

import { AdminCoreAppConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-app.config.js';
import { AdminCoreDatabaseConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-database.config.js';
import { AdminCoreMasterEntities } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-entities.js';
import { AdminCoreRuntimeConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-runtime.config.js';

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
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [AdminCoreAppConfig, AdminCoreDatabaseConfig, AdminCoreRuntimeConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'staging', 'production').default('development'),
        PORT: Joi.number().port().default(3000),
        CORS_ALLOWED_ORIGINS: Joi.string().allow('').default(''),
        JWT_ACCESS_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        DATA_ENCRYPTION_KEY: Joi.string().min(32).required(),
        REDIS_URL: Joi.string().uri().default('redis://localhost:6379'),
        MASTER_DB_HOST: Joi.string().hostname().default('localhost'),
        MASTER_DB_PORT: Joi.number().port().default(5432),
        MASTER_DB_USER: Joi.string().required(),
        MASTER_DB_PASSWORD: Joi.string().allow('').when('NODE_ENV', { is: 'production', then: Joi.string().min(1).required() }),
        MASTER_DB_NAME: Joi.string().required(),
        TENANT_DB_HOST: Joi.string().hostname().when('NODE_ENV', { is: 'production', then: Joi.required() }),
        TENANT_DB_PORT: Joi.number().port().when('NODE_ENV', { is: 'production', then: Joi.required() }),
        TENANT_DB_USER: Joi.string().when('NODE_ENV', { is: 'production', then: Joi.required() }),
        TENANT_DB_PASSWORD: Joi.string().allow('').when('NODE_ENV', { is: 'production', then: Joi.string().min(1).required() }),
        TENANT_DB_POOL_MAX: Joi.number().integer().min(1).max(20).default(5),
        TENANT_DB_POOL_BUDGET: Joi.number().integer().min(1).max(100).default(20),
        STORAGE_ROOT: Joi.string().default('storage/objects'),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'info',
        autoLogging: false,
        redact: ['req.headers.authorization', 'req.headers.cookie', 'req.headers["x-api-key"]'],
      },
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.getOrThrow<string>('database.host'),
        port: config.get<number>('database.port', 5432),
        username: config.getOrThrow<string>('database.user'),
        password: config.getOrThrow<string>('database.masterPassword'),
        database: config.getOrThrow<string>('database.masterDatabase'),
        entities: AdminCoreMasterEntities,
        migrations: [join(coreDir, '../admin_core_database/admin_core_migrations/admin_core_master/*.{js,ts}')],
        synchronize: false,
        migrationsRun: false,
        extra: {
          max: config.get<number>('database.poolMax', 20),
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 10000,
          statement_timeout: 3000,
        },
      }),
    }),
  ],
  exports: [ConfigModule],
})
/**
 * @description Defines the AdminCoreConfigModule boundary for the admin_core_config backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreConfigModule {}
