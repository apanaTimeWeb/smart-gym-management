import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';

// Config Loaders
import { CoreDatabaseConfig } from '@/backend_admin/core/config/core-database.config';
import { CoreRuntimeConfig } from '@/backend_admin/core/config/core-runtime.config';
import { CoreAppConfig } from '@/backend_admin/core/config/core-app.config';
import { CoreEnvironmentConfig } from '@/backend_auth/core/config/core-environment.config';
import { buildValidatedConfig } from '@/backend_landing/core/config/app.config';

// Import Domain Modules (These will be refactored to not have .forRoot calls)
import { AppModule as AdminAppModule } from '@/backend_admin/app.module';
import { CoreAppModule as AuthAppModule } from '@/backend_auth/core/app.module';
import { AppModule as SuperadminAppModule } from '@/backend_superadmin/app.module';
import { AppModule as LandingAppModule } from '@/backend_landing/app.module';

// Import Global Guards & Interceptors from Admin (chosen as Master)
import { CoreRateLimitGuard } from '@/backend_admin/core/auth/core-rate-limit.guard';
import { CoreTenantContextInterceptor } from '@/backend_admin/core/response/core-tenant-context.interceptor';
import { CoreResponseInterceptor } from '@/backend_admin/core/response/core-response.interceptor';
import { CoreValidationExceptionFilter } from '@/backend_admin/core/response/core-validation-exception.filter';
import { CoreRolesGuard } from '@/backend_admin/core/auth/core-roles.guard';

@Module({
  imports: [
    // 1. Unified Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [CoreDatabaseConfig, CoreRuntimeConfig, CoreAppConfig, CoreEnvironmentConfig, buildValidatedConfig],
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
        synchronize: false,
        extra: {
          max: 20,
          connectionTimeoutMillis: 30000,
          idleTimeoutMillis: 10000,
          statement_timeout: 3000,
        },
      }),
    }),

    // 3. Domain Modules
    AuthAppModule,
    AdminAppModule,
    SuperadminAppModule,
    LandingAppModule,
  ],
  providers: [
    // 4. Unified Global Guards and Interceptors
    { provide: APP_GUARD, useClass: CoreRolesGuard },
    { provide: APP_GUARD, useClass: CoreRateLimitGuard },
    { provide: APP_INTERCEPTOR, useClass: CoreTenantContextInterceptor },
    { provide: APP_INTERCEPTOR, useClass: CoreResponseInterceptor },
    { provide: APP_FILTER, useClass: CoreValidationExceptionFilter },
    { provide: 'CONFIG_PORT', useFactory: (config: ConfigService) => config.get<number>('PORT', 3000), inject: [ConfigService] },
    { provide: 'CONFIG_CORS_ALLOWED_ORIGINS', useFactory: (config: ConfigService) => config.get<string>('CORS_ALLOWED_ORIGINS', '').split(',').map((v: string) => v.trim()).filter(Boolean), inject: [ConfigService] },
  ],
})
export class AppModule {}
