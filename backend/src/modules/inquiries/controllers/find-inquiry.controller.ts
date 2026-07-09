import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { FindInquiryService } from '../services/find-inquiry.service';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';

@ApiTags('Inquiries')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('inquiries')
export class FindInquiryController {
  constructor(private readonly findInquiryService: FindInquiryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all inquiries' })
  @ApiResponse({ status: 200, description: 'Return all inquiries' })
  execute(@Query() query: PaginationQueryDto) {
    return this.findInquiryService.execute(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inquiry by ID' })
  @ApiResponse({ status: 200, description: 'Return single inquiry' })
  findOne(@Param('id') id: string) {
    return this.findInquiryService.findOne(+id);
  }
}
