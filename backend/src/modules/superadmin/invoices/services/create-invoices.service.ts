import { CreateSaaSInvoiceDto } from '../dto/create-invoices.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceStatus } from '../invoices.interfaces';

@Injectable()
export class CreateInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(dto: CreateSaaSInvoiceDto): Promise<any> {
    if (!dto.tenantName) throw new BadRequestException('Tenant name is required');
    
    // Auto-calculate amount if not provided based on plan
    if (!dto.amount) {
      switch (dto.planName?.toUpperCase()) {
        case 'STARTER': dto.amount = 49; break;
        case 'PRO': dto.amount = 99; break;
        case 'ENTERPRISE': dto.amount = 199; break;
        default: dto.amount = 0;
      }
    }

    if (!dto.currency) dto.currency = 'USD';
    
    // Default to pending
    if (!dto.status) dto.status = InvoiceStatus.PENDING;
    if (!dto.date) dto.date = new Date();

    return await this.repository.create(dto);
  }
}
