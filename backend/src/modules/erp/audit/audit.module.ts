import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditService } from './services/create-audit.service';
import { FindAuditService } from './services/find-audit.service';
import { AuditRepository } from './audit.repository';
import { AuditLogRetrievalController } from './controllers/audit-log-retrieval.controller';
import { CreateAuditLogController } from './controllers/create-audit-log.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogRetrievalController, CreateAuditLogController],
  providers: [CreateAuditService, FindAuditService, AuditRepository],
  exports: [CreateAuditService, FindAuditService],
})
export class AuditModule {}
