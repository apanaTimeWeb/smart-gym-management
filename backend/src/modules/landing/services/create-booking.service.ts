import { Injectable } from '@nestjs/common';
import { LandingRepository } from '../landing.repository';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { LandingResponse, ILandingInquiry } from '../landing.interfaces';
import { LANDING_MESSAGES } from '../landing.constants';

@Injectable()
export class CreateBookingService {
  constructor(private readonly repository: LandingRepository) {}

  async execute(dto: CreateBookingDto): Promise<LandingResponse<ILandingInquiry>> {
    const inquiry = await this.repository.createInquiry({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      message: dto.message,
      bookingDate: new Date(dto.date),
      bookingType: dto.type,
      type: 'BOOKING',
    });
    return { success: true, data: inquiry, message: LANDING_MESSAGES.BOOKING_SUCCESS };
  }
}
