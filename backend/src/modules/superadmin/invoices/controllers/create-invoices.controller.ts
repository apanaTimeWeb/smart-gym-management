import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { CreateInvoicesService } from '../services/create-invoices.service';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CreateInvoicesController {
  constructor(private readonly invoicesService: CreateInvoicesService) {}
  
  @Post()
  async execute() {
    return this.invoicesService.execute();
  }
}
