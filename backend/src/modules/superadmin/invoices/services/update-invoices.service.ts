import { UpdateSaaSInvoiceDto } from '../dto/update-invoices.dto';
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceResponse } from '../invoices.interfaces';
import { INVOICES_MESSAGES } from '../invoices.constants';

@Injectable()
export class UpdateInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(id: string, dto: UpdateSaaSInvoiceDto): Promise<InvoiceResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: INVOICES_MESSAGES.UPDATED,
      data
    };
  }
}
