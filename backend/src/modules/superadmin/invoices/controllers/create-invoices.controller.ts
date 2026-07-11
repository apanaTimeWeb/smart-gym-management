import { Controller, Post, Get, Patch, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateInvoicesService } from '../services/create-invoices.service';
import { CreateSaaSInvoiceDto } from '../dto/create-invoices.dto';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateInvoicesController {
  constructor(private readonly service: CreateInvoicesService) {}
  
  @Post()
  @ApiOperation({ summary: 'Create SaaSInvoice' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Body() dto: CreateSaaSInvoiceDto) {
    return this.service.execute(dto);
  }
}
