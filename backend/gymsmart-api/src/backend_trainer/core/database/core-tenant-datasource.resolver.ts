import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, Repository, ObjectLiteral } from 'typeorm';
import { CoreTenantDataSourceManager } from '@/backend_admin/core/database/core-tenant-data-source.manager';

@Injectable()
export class CoreTenantDataSourceResolver {
  constructor(private readonly manager: CoreTenantDataSourceManager) {}

  async getDataSource(): Promise<DataSource> {
    return this.manager.getCurrent();
  }

  async getRepository<T extends ObjectLiteral>(target: EntityTarget<T>): Promise<Repository<T>> {
    const ds = await this.manager.getCurrent();
    return ds.getRepository(target);
  }

  async closeAll(): Promise<void> {
    // Handled globally by CoreTenantDataSourceManager
  }
}
