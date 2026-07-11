import { Injectable } from '@nestjs/common';
import { LandingRepository } from '../landing.repository';
import { CreateBookingDto } from '../dto/create-booking.dto';

@Injectable()
export class CreateBookingService {
  constructor(private readonly repository: LandingRepository) {}

  async execute(dto: CreateBookingDto) {
    const inquiry = await this.repository.createInquiry({
      ...dto,
      type: 'BOOKING',
    });
    return { success: true, data: inquiry, message: 'Booking inquiry received successfully.' };
  }
}
