import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateContactController } from './controllers/create-contact.controller';
import { CreateBookingController } from './controllers/create-booking.controller';
import { CreateContactService } from './services/create-contact.service';
import { CreateBookingService } from './services/create-booking.service';
import { LandingRepository } from './landing.repository';
import { LandingInquiry } from './entities/landing-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LandingInquiry])],
  controllers: [CreateContactController, CreateBookingController],
  providers: [
    CreateContactService,
    CreateBookingService,
    LandingRepository,
  ],
  exports: [LandingRepository],
})
export class LandingModule {}
