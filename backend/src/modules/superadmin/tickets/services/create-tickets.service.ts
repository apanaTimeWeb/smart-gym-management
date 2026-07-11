import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class CreateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
