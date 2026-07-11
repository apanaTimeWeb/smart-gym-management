import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../tickets.repository';

@Injectable()
export class UpdateTicketsService {
  constructor(private readonly repository: TicketsRepository) {}
  
  async execute(id: string, dto: any): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
