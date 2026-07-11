import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class DeleteGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
