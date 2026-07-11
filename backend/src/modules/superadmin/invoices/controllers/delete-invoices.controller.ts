import { Controller, Delete, Get, Post, Patch, Param, Body, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteInvoicesService } from '../services/delete-invoices.service';


@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteInvoicesController {
  constructor(private readonly service: DeleteInvoicesService) {}
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete SaaSInvoice' })
  @ApiResponse({ status: HttpStatus.OK })
  async execute(@Param('id') id: string) {
    return this.service.execute(id);
  }
}
