import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { GlobalAuditLogResponse } from '../audit-logs.interfaces';
import { AUDIT_LOGS_MESSAGES } from '../audit-logs.constants';

@Injectable()
export class TenantAuditLogsService {
  private readonly logger = new Logger(TenantAuditLogsService.name);

  constructor(private readonly configService: ConfigService) {}

  async execute(tenantId: string): Promise<GlobalAuditLogResponse> {
    this.logger.log(`Fetching audit logs for tenant: ${tenantId}`);
    const dbName = `tenant_db_${tenantId}`;
    const masterUrl = this.configService.get<string>('DATABASE_URL');
    if (!masterUrl) {
      throw new Error('DATABASE_URL is missing');
    }

    const parsedUrl = new URL(masterUrl);
    parsedUrl.pathname = `/${dbName}`;
    
    const tenantDataSource = new DataSource({
      type: 'postgres',
      url: parsedUrl.toString(),
      synchronize: false,
    });

    try {
      await tenantDataSource.initialize();
      // Query raw table to avoid needing the full entity setup for this simple log retrieval
      const data = await tenantDataSource.query('SELECT * FROM "audit_logs" ORDER BY timestamp DESC LIMIT 100');
      return { 
        success: true, 
        message: AUDIT_LOGS_MESSAGES.FETCHED,
        data 
      };
    } catch (error: any) {
      this.logger.error(`Failed to fetch tenant logs for ${dbName}:`, error.message);
      // Return empty if DB doesn't exist or table missing (e.g. invalid tenant)
      return { 
        success: true, 
        message: AUDIT_LOGS_MESSAGES.FETCHED,
        data: [] 
      };
    } finally {
      if (tenantDataSource.isInitialized) {
        await tenantDataSource.destroy();
      }
    }
  }
}
