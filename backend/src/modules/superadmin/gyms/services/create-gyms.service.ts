import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class CreateGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
