import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { CreateInquiryService } from '../services/create-inquiry.service';
import { CreateInquiryDto } from '../dto/create-inquiry.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Inquiries')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('inquiries')
export class CreateInquiryController {
  constructor(private readonly createInquiryService: CreateInquiryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new inquiry' })
  @ApiResponse({ status: 201, description: 'Inquiry created successfully' })
  execute(@Body() dto: CreateInquiryDto) {
    return this.createInquiryService.execute(dto);
  }
}
