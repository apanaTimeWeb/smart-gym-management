import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBookingService } from '../services/create-booking.service';
import { CreateBookingDto } from '../dto/create-booking.dto';
import { LandingResponse, ILandingInquiry } from '../landing.interfaces';

@ApiTags('Landing')
@Controller('landing')
export class CreateBookingController {
  constructor(private readonly createBookingService: CreateBookingService) {}

  @Post('booking')
  @ApiOperation({ summary: 'Submit a booking/demo form from the public landing page' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking submitted successfully' })
  async execute(@Body() dto: CreateBookingDto): Promise<LandingResponse<ILandingInquiry>> {
    return this.createBookingService.execute(dto);
  }
}
