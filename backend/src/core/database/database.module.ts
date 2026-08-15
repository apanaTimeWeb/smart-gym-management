import { Module, Scope, Global } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TenantConnectionService } from './tenant-connection.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    TenantConnectionService,
    {
      provide: 'TENANT_CONNECTION',
      scope: Scope.REQUEST,
      inject: [REQUEST, TenantConnectionService],
      useFactory: async (request: Request, connectionService: TenantConnectionService) => {
        const tenantId = request?.headers?.['x-tenant-id'] as string;
        
        if (!tenantId) {
          throw new UnauthorizedException('x-tenant-id header is required for tenant-specific routes');
        }
        
        return connectionService.getTenantConnection(tenantId);
      },
    },
  ],
  exports: ['TENANT_CONNECTION', TenantConnectionService],
})
export class DatabaseModule {}
