import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { AuditService } from './audit.service';
import { AuditLogRetrievalController } from './controllers/audit-log-retrieval.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuditLog])],
  controllers: [AuditLogRetrievalController],
  providers: [AuditService],
  exports: [AuditService],
})
export class AuditModule {}
