import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class CreateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(dto: CreateTicketsDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
