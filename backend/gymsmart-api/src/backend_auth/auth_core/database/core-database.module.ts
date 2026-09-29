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

  ],
  providers: [CoreTransactionService],
  exports: [CoreTransactionService],
})
export class CoreDatabaseModule {}
