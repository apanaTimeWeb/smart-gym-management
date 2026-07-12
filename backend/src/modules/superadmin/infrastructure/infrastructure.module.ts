import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfrastructureNode } from './entities/infrastructure.entity';
import { CreateInfrastructureController } from './controllers/create-infrastructure.controller';
import { FindInfrastructureController } from './controllers/find-infrastructure.controller';
import { UpdateInfrastructureController } from './controllers/update-infrastructure.controller';
import { DeleteInfrastructureController } from './controllers/delete-infrastructure.controller';
import { CreateInfrastructureService } from './services/create-infrastructure.service';
import { FindInfrastructureService } from './services/find-infrastructure.service';
import { UpdateInfrastructureService } from './services/update-infrastructure.service';
import { DeleteInfrastructureService } from './services/delete-infrastructure.service';
import { InfrastructureRepository } from './infrastructure.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InfrastructureNode])],
  controllers: [CreateInfrastructureController, FindInfrastructureController, UpdateInfrastructureController, DeleteInfrastructureController],
  providers: [CreateInfrastructureService, FindInfrastructureService, UpdateInfrastructureService, DeleteInfrastructureService, InfrastructureRepository],
  exports: [CreateInfrastructureService, FindInfrastructureService, UpdateInfrastructureService, DeleteInfrastructureService],
})
export class InfrastructureModule {}
