import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceResponse } from '../invoices.interfaces';
import { INVOICES_MESSAGES } from '../invoices.constants';

@Injectable()
export class DeleteInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(id: string): Promise<InvoiceResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: INVOICES_MESSAGES.DELETED,
      data: null
    };
  }
}
