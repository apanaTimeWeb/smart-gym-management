import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class DeleteTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
