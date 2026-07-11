import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';

@Injectable()
export class UpdateInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
