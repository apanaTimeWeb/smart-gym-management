import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class FindBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
