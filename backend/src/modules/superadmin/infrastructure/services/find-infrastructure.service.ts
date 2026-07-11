import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';

@Injectable()
export class FindInfrastructureService {
  constructor(private readonly repository: InfrastructureRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
