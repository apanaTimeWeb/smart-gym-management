import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class FindTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
