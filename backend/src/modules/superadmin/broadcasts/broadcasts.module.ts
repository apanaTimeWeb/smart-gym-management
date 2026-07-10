import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BroadcastsService } from './services/broadcasts.service';
import { BroadcastsController } from './controllers/broadcasts.controller';
import { Broadcast } from './entities/broadcasts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Broadcast])],
  controllers: [BroadcastsController],
  providers: [BroadcastsService],
})
export class BroadcastsModule {}
