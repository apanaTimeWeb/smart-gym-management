import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TenantConnectionService {
  private readonly logger = new Logger(TenantConnectionService.name);
  private connectionMap: Map<string, DataSource> = new Map();

  constructor(private readonly configService: ConfigService) {}

  async getTenantConnection(tenantId: string): Promise<DataSource> {
    const connectionKey = `tenant_db_${tenantId}`;

    if (this.connectionMap.has(connectionKey)) {
      const dataSource = this.connectionMap.get(connectionKey)!;
      if (dataSource.isInitialized) {
        return dataSource;
      }
    }

    this.logger.log(`Creating new database connection for tenant: ${tenantId}`);
    const masterUrl = this.configService.get<string>('DATABASE_URL');
    
    if (!masterUrl) {
      throw new Error('DATABASE_URL is missing from configuration');
    }

    // Parse the URL to replace the master database name with the tenant database name
    const parsedUrl = new URL(masterUrl);
    parsedUrl.pathname = `/${connectionKey}`;
    const tenantUrl = parsedUrl.toString();

    const dataSource = new DataSource({
      type: 'postgres',
      url: tenantUrl,
      entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
      synchronize: false, // Strict rule: migrations only
      logging: ['error', 'warn'],
    });

    await dataSource.initialize();
    this.connectionMap.set(connectionKey, dataSource);
    this.logger.log(`Connection established for ${connectionKey}`);

    return dataSource;
  }
}
