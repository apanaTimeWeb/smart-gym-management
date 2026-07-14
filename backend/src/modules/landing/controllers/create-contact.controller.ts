import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateContactService } from '../services/create-contact.service';
import { CreateContactDto } from '../dto/create-contact.dto';
import { LandingResponse, ILandingInquiry } from '../landing.interfaces';

@ApiTags('Landing')
@Controller('landing')
export class CreateContactController {
  constructor(private readonly createContactService: CreateContactService) {}

  @Post('contact')
  @ApiOperation({ summary: 'Submit a contact form from the public landing page' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Contact submitted successfully' })
  async execute(@Body() dto: CreateContactDto): Promise<LandingResponse<ILandingInquiry>> {
    return this.createContactService.execute(dto);
  }
}
