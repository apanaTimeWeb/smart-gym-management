// RESPONSIBILITY: Registers and exports audit persistence infrastructure.
// FLOW: AppModule -> CoreAuditModule -> CoreAuditService/Repository -> feature mutation flows.

import { Module } from '@nestjs/common';

import { CoreAuditLogRepository } from '@/core/audit/core-audit-log.repository';
import { CoreAuditService } from '@/core/audit/core-audit.service';
@Module({ providers: [CoreAuditLogRepository, CoreAuditService], exports: [CoreAuditService] })
export class CoreAuditModule {}
