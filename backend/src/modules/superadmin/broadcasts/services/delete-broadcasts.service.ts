import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class DeleteBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
