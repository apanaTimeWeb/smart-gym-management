import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { FindInvoicesService } from '../services/find-invoices.service';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class FindInvoicesController {
  constructor(private readonly invoicesService: FindInvoicesService) {}
  
  @Get()
  async execute() {
    return this.invoicesService.execute();
  }
}
