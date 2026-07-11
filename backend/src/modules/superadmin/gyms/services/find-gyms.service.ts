import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class FindGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
