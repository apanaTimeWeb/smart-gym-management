import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class ProvisionTenantService {
  private readonly logger = new Logger(ProvisionTenantService.name);

  constructor(
    private readonly configService: ConfigService,
    @InjectDataSource() private readonly masterDataSource: DataSource, // Injects the default master connection
  ) {}

  async provisionNewTenant(tenantId: string): Promise<void> {
    const dbName = `tenant_db_${tenantId}`;
    this.logger.log(`Starting provisioning for new tenant database: ${dbName}`);

    // 1. Create the database using the master connection
    try {
      await this.masterDataSource.query(`CREATE DATABASE "${dbName}"`);
      this.logger.log(`Successfully created database ${dbName}`);
    } catch (error: any) {
      // Ignore if database already exists (Postgres code 42P04), otherwise throw
      if (error.code !== '42P04') { 
        this.logger.error(`Failed to create database ${dbName}`, error.stack);
        throw error;
      }
      this.logger.warn(`Database ${dbName} already exists. Proceeding to migrations.`);
    }

    // 2. Run migrations on the new database
    const masterUrl = this.configService.get<string>('DATABASE_URL');
    if (!masterUrl) {
      throw new Error('DATABASE_URL is missing');
    }

    const parsedUrl = new URL(masterUrl);
    parsedUrl.pathname = `/${dbName}`;
    
    const tenantDataSource = new DataSource({
      type: 'postgres',
      url: parsedUrl.toString(),
      entities: [__dirname + '/../../../../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../../../database/migrations/*{.ts,.js}'],
      synchronize: false,
    });

    try {
      await tenantDataSource.initialize();
      this.logger.log(`Running migrations for ${dbName}...`);
      await tenantDataSource.runMigrations();
      this.logger.log(`Migrations completed successfully for ${dbName}`);
    } catch (error: any) {
      this.logger.error(`Migration failed for ${dbName}`, error.stack);
      throw error;
    } finally {
      if (tenantDataSource.isInitialized) {
        await tenantDataSource.destroy();
      }
    }
  }
}
