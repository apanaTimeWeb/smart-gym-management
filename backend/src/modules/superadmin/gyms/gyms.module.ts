import { TenantsModule } from '../tenants/tenants.module';
import { StatusGymsService } from './services/status-gyms.service';
import { StatsGymsService } from './services/stats-gyms.service';
import { StatusGymsController } from './controllers/status-gyms.controller';
import { StatsGymsController } from './controllers/stats-gyms.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/gyms.entity';
import { CreateGymsController } from './controllers/create-gyms.controller';
import { FindGymsController } from './controllers/find-gyms.controller';
import { UpdateGymsController } from './controllers/update-gyms.controller';
import { DeleteGymsController } from './controllers/delete-gyms.controller';
import { CreateGymsService } from './services/create-gyms.service';
import { FindGymsService } from './services/find-gyms.service';
import { UpdateGymsService } from './services/update-gyms.service';
import { DeleteGymsService } from './services/delete-gyms.service';
import { GymsRepository } from './gyms.repository';

@Module({
  imports: [TenantsModule, TypeOrmModule.forFeature([Tenant])],
  controllers: [StatusGymsController, StatsGymsController, CreateGymsController, FindGymsController, UpdateGymsController, DeleteGymsController],
  providers: [StatusGymsService, StatsGymsService, CreateGymsService, FindGymsService, UpdateGymsService, DeleteGymsService, GymsRepository],
})
export class GymsModule {}
