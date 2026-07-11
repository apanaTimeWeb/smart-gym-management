import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '../invoices.repository';

@Injectable()
export class FindInvoicesService {
  constructor(private readonly repository: InvoicesRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
