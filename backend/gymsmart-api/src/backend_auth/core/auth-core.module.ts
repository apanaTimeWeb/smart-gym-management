import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreTransactionService } from '@/backend_auth/core/database/core-transaction.service';
import { CoreRequestContextService } from '@/backend_auth/core/context/core-request-context';
import { CoreAuditService } from '@/backend_auth/core/audit/core-audit.service';
import { CoreAuditLogRepository } from '@/backend_auth/core/audit/core-audit-log.repository';
import { CoreRedisService } from '@/backend_auth/core/cache/core-redis.service';
import { CoreAuditLogEntity } from '@/backend_auth/core/audit/core-audit-log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CoreAuditLogEntity])],
  providers: [
    CoreTransactionService,
    CoreRequestContextService,
    CoreAuditService,
    CoreAuditLogRepository,
    CoreRedisService
  ],
  exports: [
    CoreTransactionService,
    CoreRequestContextService,
    CoreAuditService,
    CoreAuditLogRepository,
    CoreRedisService
  ]
})
export class AuthCoreModule {}
