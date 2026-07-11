import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/tickets.entity';
import { CreateTicketsController } from './controllers/create-tickets.controller';
import { FindTicketsController } from './controllers/find-tickets.controller';
import { UpdateTicketsController } from './controllers/update-tickets.controller';
import { DeleteTicketsController } from './controllers/delete-tickets.controller';
import { CreateTicketsService } from './services/create-tickets.service';
import { FindTicketsService } from './services/find-tickets.service';
import { UpdateTicketsService } from './services/update-tickets.service';
import { DeleteTicketsService } from './services/delete-tickets.service';
import { TicketsRepository } from './tickets.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  controllers: [CreateTicketsController, FindTicketsController, UpdateTicketsController, DeleteTicketsController],
  providers: [CreateTicketsService, FindTicketsService, UpdateTicketsService, DeleteTicketsService, TicketsRepository],
})
export class TicketsModule {}
