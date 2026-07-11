import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class FindSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
