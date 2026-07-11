import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LandingController } from './controllers/landing.controller';
import { CreateContactService } from './services/create-contact.service';
import { CreateBookingService } from './services/create-booking.service';
import { LandingRepository } from './landing.repository';
import { LandingInquiry } from './entities/landing-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LandingInquiry])],
  controllers: [LandingController],
  providers: [
    CreateContactService,
    CreateBookingService,
    LandingRepository,
  ],
  exports: [LandingRepository],
})
export class LandingModule {}
