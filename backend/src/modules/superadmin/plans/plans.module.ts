import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlansService } from './services/plans.service';
import { PlansController } from './controllers/plans.controller';
import { Plan } from './entities/plans.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlansController],
  providers: [PlansService],
})
export class PlansModule {}
