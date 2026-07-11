import { SendBroadcastsService } from './services/send-broadcasts.service';
import { SendBroadcastsController } from './controllers/send-broadcasts.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Broadcast } from './entities/broadcasts.entity';
import { CreateBroadcastsController } from './controllers/create-broadcasts.controller';
import { FindBroadcastsController } from './controllers/find-broadcasts.controller';
import { UpdateBroadcastsController } from './controllers/update-broadcasts.controller';
import { DeleteBroadcastsController } from './controllers/delete-broadcasts.controller';
import { CreateBroadcastsService } from './services/create-broadcasts.service';
import { FindBroadcastsService } from './services/find-broadcasts.service';
import { UpdateBroadcastsService } from './services/update-broadcasts.service';
import { DeleteBroadcastsService } from './services/delete-broadcasts.service';
import { BroadcastsRepository } from './broadcasts.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Broadcast])],
  controllers: [SendBroadcastsController, CreateBroadcastsController, FindBroadcastsController, UpdateBroadcastsController, DeleteBroadcastsController],
  providers: [SendBroadcastsService, CreateBroadcastsService, FindBroadcastsService, UpdateBroadcastsService, DeleteBroadcastsService, BroadcastsRepository],
})
export class BroadcastsModule {}
