import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class CreateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
