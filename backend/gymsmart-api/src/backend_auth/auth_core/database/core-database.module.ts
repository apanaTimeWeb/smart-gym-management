// RESPONSIBILITY: Registers PostgreSQL TypeORM persistence with explicit pool, query-timeout and migration-only schema settings.
// FLOW: AppModule -> CoreDatabaseModule -> TypeORM DataSource -> PostgreSQL.

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DATABASE_CONFIG } from '@/backend_auth/auth_core/config/database.config';
import { TIMEOUT_CONFIG } from '@/backend_auth/auth_core/config/timeout.config';
import { CoreTransactionService } from '@/backend_auth/auth_core/database/core-transaction.service';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        url: config.getOrThrow<string>('environment.DATABASE_URL'),
        synchronize: false,
        logging: false,
        autoLoadEntities: true,
        extra: {
          max: config.getOrThrow<number>('environment.DATABASE_POOL_MAX') || DATABASE_CONFIG.POOL_MAX,
          connectionTimeoutMillis: config.getOrThrow<number>('environment.DATABASE_ACQUIRE_TIMEOUT_MS') || DATABASE_CONFIG.ACQUIRE_TIMEOUT_MS,
          idleTimeoutMillis: config.getOrThrow<number>('environment.DATABASE_IDLE_TIMEOUT_MS') || DATABASE_CONFIG.IDLE_TIMEOUT_MS,
          statement_timeout: TIMEOUT_CONFIG.DB_QUERY_DEFAULT_MS,
        },
      }),
    }),
  ],
  providers: [CoreTransactionService],
  exports: [TypeOrmModule, CoreTransactionService],
})
export class CoreDatabaseModule {}
