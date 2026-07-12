import { UpdateSaaSInvoiceDto } from '../dto/update-invoices.dto';
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';

@Injectable()
export class UpdateInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(id: string, dto: UpdateSaaSInvoiceDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
