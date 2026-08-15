import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvisionTenantService } from './services/provision-tenant.service';
import { TenantsController } from './controllers/provision-tenant.controller';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([]),
  ],
  controllers: [TenantsController],
  providers: [ProvisionTenantService],
  exports: [ProvisionTenantService],
})
export class TenantsModule {}
