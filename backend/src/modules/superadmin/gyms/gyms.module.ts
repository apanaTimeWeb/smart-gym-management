import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GymsService } from './services/gyms.service';
import { GymsController } from './controllers/gyms.controller';
import { Gym } from './entities/gyms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gym])],
  controllers: [GymsController],
  providers: [GymsService],
})
export class GymsModule {}
