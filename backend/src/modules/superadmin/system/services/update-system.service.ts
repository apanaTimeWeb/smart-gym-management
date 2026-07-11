import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class UpdateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
