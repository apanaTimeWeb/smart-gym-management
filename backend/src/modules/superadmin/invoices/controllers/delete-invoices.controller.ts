import { Controller, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DeleteInvoicesService } from '../services/delete-invoices.service';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class DeleteInvoicesController {
  constructor(private readonly invoicesService: DeleteInvoicesService) {}
  
  @Delete()
  async execute() {
    return this.invoicesService.execute();
  }
}
