import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gym } from './entities/gyms.entity';
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
  imports: [TypeOrmModule.forFeature([Gym])],
  controllers: [CreateGymsController, FindGymsController, UpdateGymsController, DeleteGymsController],
  providers: [CreateGymsService, FindGymsService, UpdateGymsService, DeleteGymsService, GymsRepository],
})
export class GymsModule {}
