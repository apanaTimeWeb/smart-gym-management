import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import { EventEmitterModule } from '@nestjs/event-emitter';

// Config Loaders
import { AdminCoreDatabaseConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-database.config';
import { AdminCoreRuntimeConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-runtime.config';
import { AdminCoreAppConfig } from '@/backend_admin/admin_core/admin_core_config/admin-core-app.config';
import { AdminCoreMasterEntities } from '@/backend_admin/admin_core/admin_core_config/admin-core-master-entities';
import { CoreEnvironmentConfig } from '@/backend_auth/auth_core/config/core-environment.config';
import { buildValidatedConfig } from '@/backend_landing/landing_core/config/app.config';
import superadminConfig from '@/backend_superadmin/superadmin_core/superadmin_core_config/superadmin-core-configuration';
// Import Domain Modules (These will be refactored to not have .forRoot calls)
import { BackendAdminModule as AdminDomainModule } from '@/backend_admin/backend-admin.module';
import { AuthModule } from '@/backend_auth/auth_modules/auth/auth.module';
import { BackendSuperadminModule as SuperadminDomainModule } from '@/backend_superadmin/backend-superadmin.module';
import { LandingModule } from '@/backend_landing/landing_modules/landing/landing.module';
import { ManagerDomainModule } from '@/backend_manager/modules/backend_manager/manager-domain.module';
import { TrainerDomainModule } from '@/backend_trainer/core/trainer-domain.module';

// Import Global Guards & Interceptors from Admin (chosen as Master)
import { AdminCoreJwtAuthGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-jwt-auth.guard';
import { AdminCoreRateLimitGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-rate-limit.guard';
import { AdminCoreTenantContextInterceptor } from '@/backend_admin/admin_core/admin_core_context/admin-core-tenant-context.interceptor';
import { AdminCoreResponseInterceptor } from '@/backend_admin/admin_core/admin_core_response/admin-core-response.interceptor';
import { AdminCoreValidationExceptionFilter } from '@/backend_admin/admin_core/admin_core_response/admin-core-validation-exception.filter';
import { AdminCoreRolesGuard } from '@/backend_admin/admin_core/admin_core_auth/admin-core-roles.guard';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    // 1. Unified Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AdminCoreDatabaseConfig, AdminCoreRuntimeConfig, AdminCoreAppConfig, CoreEnvironmentConfig, buildValidatedConfig, superadminConfig],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'test', 'staging', 'production').default('development'),
        PORT: Joi.number().port().default(5000),
        MASTER_DB_HOST: Joi.string().required(),
        MASTER_DB_PORT: Joi.number().port().default(5432),
        MASTER_DB_NAME: Joi.string().required(),
        MASTER_DB_USER: Joi.string().required(),
        MASTER_DB_PASSWORD: Joi.string().allow('').required(),
        TENANT_DB_HOST: Joi.string().required(),
        TENANT_DB_PORT: Joi.number().port().default(5432),
        TENANT_DB_USER: Joi.string().required(),
        TENANT_DB_PASSWORD: Joi.string().allow('').required(),
        REDIS_URL: Joi.string().uri().required(),
        JWT_ACCESS_SECRET: Joi.string().min(32).required(),
        JWT_REFRESH_SECRET: Joi.string().min(32).required(),
        DATA_ENCRYPTION_KEY: Joi.string().min(16).required(),
        CORS_ALLOWED_ORIGINS: Joi.string().required(),
        TENANT_DB_POOL_MAX: Joi.number().integer().min(1).max(20).default(5),
      }),
    }),
    
    // Logger
    LoggerModule.forRoot({ pinoHttp: { autoLogging: true, redact: ['req.headers.authorization', 'req.headers.cookie'] } }),
    
    // 2. Unified Master DB
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('MASTER_DB_HOST'),
        port: config.get<number>('MASTER_DB_PORT', 5432),
        username: config.getOrThrow<string>('MASTER_DB_USER'),
        password: config.getOrThrow<string>('MASTER_DB_PASSWORD'),
        database: config.getOrThrow<string>('MASTER_DB_NAME'),
        autoLoadEntities: true, // MAGIC: Automatically registers any entity provided by feature modules!
        entities: AdminCoreMasterEntities, // Add master entities
        synchronize: false, // Schema managed via migrations to avoid multi-entity sync conflicts on shared tables (e.g. tenants)
        extra: {
          max: 20,
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 10000,
          statement_timeout: 3000,
        },
      }),
    }),

    // 3. Domain Modules
    AdminDomainModule,
    AuthModule,
    SuperadminDomainModule,
    LandingModule,
    ManagerDomainModule,
    TrainerDomainModule,
  ],
  providers: [
    // 4. Unified Global Guards and Interceptors
    { provide: APP_GUARD, useClass: AdminCoreJwtAuthGuard },
    { provide: APP_GUARD, useClass: AdminCoreRolesGuard },
    { provide: APP_GUARD, useClass: AdminCoreRateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreTenantContextInterceptor },
    { provide: APP_INTERCEPTOR, useClass: AdminCoreResponseInterceptor },
    { provide: APP_FILTER, useClass: AdminCoreValidationExceptionFilter },
    { provide: 'CONFIG_PORT', useFactory: (config: ConfigService) => config.get<number>('PORT', 3000), inject: [ConfigService] },
    { provide: 'CONFIG_CORS_ALLOWED_ORIGINS', useFactory: (config: ConfigService) => config.get<string>('CORS_ALLOWED_ORIGINS', '').split(',').map((v: string) => v.trim()).filter(Boolean), inject: [ConfigService] },
  ],
})
export class AppModule {}
