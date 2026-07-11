import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  DUMMY_AUDIT_LOGS,
  DUMMY_GLOBAL_AUDIT_LOGS,
} from '../../superadmin.constants';
import { CreateAuditLogDto } from '../dto/create-audit-logs.dto';
import { CreateGlobalAuditLogDto } from '../dto/create-global-audit-log.dto';

@Injectable()
export class AuditLogsService {
  private readonly logger = new Logger(AuditLogsService.name);

  /**
   * Returns both per-tenant audit logs and global (superadmin-level) audit logs.
   * The frontend /superadmin/audit-logs page tabs between the two datasets.
   */
  findAll() {
    this.logger.log('Fetching all audit logs');
    return {
      success: true,
      message: 'Audit logs fetched successfully',
      data: {
        tenantLogs: DUMMY_AUDIT_LOGS,
        globalLogs: DUMMY_GLOBAL_AUDIT_LOGS,
      },
      meta: {
        totalTenantLogs: DUMMY_AUDIT_LOGS.length,
        totalGlobalLogs: DUMMY_GLOBAL_AUDIT_LOGS.length,
      },
    };
  }

  /** Fetch only per-tenant audit logs */
  findAllTenantLogs(tenantId?: string) {
    this.logger.log(`Fetching tenant audit logs${tenantId ? ` for tenant: ${tenantId}` : ''}`);
    const logs = tenantId
      ? DUMMY_AUDIT_LOGS.filter((l) => l.tenantId === tenantId)
      : DUMMY_AUDIT_LOGS;
    return {
      success: true,
      message: 'Tenant audit logs fetched successfully',
      data: logs,
      meta: { total: logs.length },
    };
  }

  /** Fetch only global superadmin audit logs */
  findAllGlobalLogs() {
    this.logger.log('Fetching global superadmin audit logs');
    return {
      success: true,
      message: 'Global audit logs fetched successfully',
      data: DUMMY_GLOBAL_AUDIT_LOGS,
      meta: { total: DUMMY_GLOBAL_AUDIT_LOGS.length },
    };
  }

  findOne(id: string) {
    const log =
      DUMMY_AUDIT_LOGS.find((l) => l.id === id) ||
      DUMMY_GLOBAL_AUDIT_LOGS.find((l) => l.id === id);
    if (!log) {
      throw new NotFoundException(`Audit log entry with ID "${id}" not found`);
    }
    return { success: true, message: 'Audit log entry fetched successfully', data: log };
  }

  createTenantLog(createDto: CreateAuditLogDto) {
    this.logger.log(`Recording tenant audit log: ${createDto.action} by ${createDto.actorEmail}`);
    return {
      success: true,
      message: 'Tenant audit log recorded successfully',
      data: {
        id: `log-${Date.now()}`,
        ...createDto,
        createdAt: new Date().toISOString(),
      },
    };
  }

  createGlobalLog(createDto: CreateGlobalAuditLogDto) {
    this.logger.log(`Recording global audit log: ${createDto.action} by ${createDto.actorName}`);
    return {
      success: true,
      message: 'Global audit log recorded successfully',
      data: {
        id: `gal-${Date.now()}`,
        ...createDto,
        createdAt: new Date().toISOString(),
      },
    };
  }
}
