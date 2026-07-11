import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateContactService } from '../services/create-contact.service';
import { CreateBookingService } from '../services/create-booking.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { CreateBookingDto } from '../dto/create-booking.dto';

@ApiTags('Public Landing')
@Controller('public/landing')
export class LandingController {
  constructor(
    private readonly createContactService: CreateContactService,
    private readonly createBookingService: CreateBookingService,
  ) {}

  @Post('contact')
  @ApiOperation({ summary: 'Submit a contact form from the public landing page' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Contact submitted successfully' })
  async contact(@Body() dto: CreateContactDto) {
    return this.createContactService.execute(dto);
  }

  @Post('booking')
  @ApiOperation({ summary: 'Submit a booking/demo form from the public landing page' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Booking submitted successfully' })
  async booking(@Body() dto: CreateBookingDto) {
    return this.createBookingService.execute(dto);
  }
}
