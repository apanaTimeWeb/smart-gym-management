import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from './entities/plans.entity';
import { CreatePlansController } from './controllers/create-plans.controller';
import { FindPlansController } from './controllers/find-plans.controller';
import { UpdatePlansController } from './controllers/update-plans.controller';
import { DeletePlansController } from './controllers/delete-plans.controller';
import { CreatePlansService } from './services/create-plans.service';
import { FindPlansService } from './services/find-plans.service';
import { UpdatePlansService } from './services/update-plans.service';
import { DeletePlansService } from './services/delete-plans.service';
import { PlansRepository } from './plans.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [CreatePlansController, FindPlansController, UpdatePlansController, DeletePlansController],
  providers: [CreatePlansService, FindPlansService, UpdatePlansService, DeletePlansService, PlansRepository],
})
export class PlansModule {}
