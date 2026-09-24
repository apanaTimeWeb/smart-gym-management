// RESPONSIBILITY: Provides test-only tenant provisioning and cleanup endpoints; never enabled for non-test environments.
// FLOW: Pytest fixture â†’ test tenant controller â†’ TenantDatabaseProvisionerService â†’ isolated PostgreSQL database.
import { Controller, Delete, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TenantDataSourceManagerService } from '@/backend_landing/landing_core/landing_tenant/tenant-data-source-manager.service';

import { TenantDatabaseProvisionerService } from '@/backend_landing/landing_core/landing_tenant/tenant-database-provisioner.service';


@ApiTags('test-infrastructure')
@Controller('test/tenants')
export class TestTenantController {
  constructor(
    private readonly config: ConfigService,
    private readonly provisioner: TenantDatabaseProvisionerService,
    private readonly dataSourceManager: TenantDataSourceManagerService,
  ) {}

  // SLA: STANDARD
  @Post()
  @ApiOperation({ summary: 'Provision a disposable isolated E2E tenant.' })
  @ApiResponse({ status: 201, description: 'Disposable test tenant provisioned.' })
  async provision(@Headers('x-test-bootstrap-token') token?: string): Promise<{ tenantId: string }> {
    this.assertTestAccess(token);
    const tenant = await this.provisioner.provisionTestTenant();
    return { tenantId: tenant.id };
  }

  // SLA: STANDARD
  @Delete(':tenantId')
  @ApiOperation({ summary: 'Destroy a disposable isolated E2E tenant.' })
  @ApiResponse({ status: 200, description: 'Disposable test tenant destroyed.' })
  async destroy(
    @Param('tenantId') tenantId: string,
    @Headers('x-test-bootstrap-token') token?: string,
  ): Promise<{ destroyed: true }> {
    this.assertTestAccess(token);
    await this.dataSourceManager.destroy(tenantId);
    await this.provisioner.destroyTestTenant(tenantId);
    return { destroyed: true };
  }

  private assertTestAccess(token?: string): void {
    const nodeEnv = this.config.get<string>('app.nodeEnv');
    const expected = this.config.get<string>('app.e2eBootstrapToken');
    if (nodeEnv !== 'test' || !expected || token !== expected) {
      throw new UnauthorizedException('Test tenant infrastructure is disabled.');
    }
  }
}
