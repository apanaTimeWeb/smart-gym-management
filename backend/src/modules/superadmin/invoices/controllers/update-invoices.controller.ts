import { Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UpdateInvoicesService } from '../services/update-invoices.service';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class UpdateInvoicesController {
  constructor(private readonly invoicesService: UpdateInvoicesService) {}
  
  @Patch()
  async execute() {
    return this.invoicesService.execute();
  }
}
