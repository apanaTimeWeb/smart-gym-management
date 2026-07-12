import { CreateSaaSInvoiceDto } from '../dto/create-invoices.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceStatus } from '../invoices.interfaces';
import { PlansRepository } from '../../plans/plans.repository';

@Injectable()
export class CreateInvoicesService {
  constructor(
    private readonly repository: InvoicesRepository,
    private readonly plansRepository: PlansRepository
  ) {}
  
  async execute(dto: CreateSaaSInvoiceDto): Promise<any> {
    if (!dto.tenantName) throw new BadRequestException('Tenant name is required');
    
    // Auto-calculate amount if not provided based on plan
    if (!dto.amount) {
      if (dto.planName) {
        const plans = await this.plansRepository.findAll();
        const plan = plans.find(p => p.name.toUpperCase() === dto.planName?.toUpperCase());
        dto.amount = plan ? Number(plan.priceMonthly) : 0;
      } else {
        dto.amount = 0;
      }
    }

    if (!dto.currency) dto.currency = 'USD';
    
    // Default to pending
    if (!dto.status) dto.status = InvoiceStatus.PENDING;
    if (!dto.date) dto.date = new Date();

    return await this.repository.create(dto);
  }
}
