import { Controller, Patch, Get, Post, Delete, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateInvoicesService } from '../services/update-invoices.service';
import { UpdateSaaSInvoiceDto } from '../dto/update-invoices.dto';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateInvoicesController {
  constructor(private readonly service: UpdateInvoicesService) {}
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update SaaSInvoice' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string, @Body() dto: UpdateSaaSInvoiceDto) {
    return this.service.execute(id, dto);
  }
}
