import { Injectable } from '@nestjs/common';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import { AdminCoreTenantDataSourceManager as CoreTenantDataSourceManager } from '@/backend_admin/admin_core/admin_core_database/admin-core-tenant-data-source.manager';

@Injectable()
export class CoreTenantDatasourceService {
  constructor(private readonly manager: CoreTenantDataSourceManager) {}

  async getDataSource(): Promise<DataSource> {
    return this.manager.getCurrent();
  }

  async getRepository<T extends import("typeorm").ObjectLiteral>(entity: EntityTarget<T>): Promise<Repository<T>> {
    const ds = await this.manager.getCurrent();
    return ds.getRepository(entity);
  }
}
