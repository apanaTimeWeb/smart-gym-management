import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';

@Injectable()
export class FindInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('SaaSInvoice not found');
    return entity;
  }
}
