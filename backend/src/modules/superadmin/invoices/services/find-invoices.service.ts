import { Injectable , NotFoundException} from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';
import { InvoiceResponse } from '../invoices.interfaces';
import { INVOICES_MESSAGES, INVOICES_ERRORS } from '../invoices.constants';

@Injectable()
export class FindInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(): Promise<InvoiceResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: INVOICES_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<InvoiceResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(INVOICES_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: INVOICES_MESSAGES.FETCHED,
      data
    };
  }
}
