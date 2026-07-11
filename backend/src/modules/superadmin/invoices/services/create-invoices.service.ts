import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';

@Injectable()
export class CreateInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(dto: any): Promise<any> {
    return await this.repository.create(dto);
  }
}
