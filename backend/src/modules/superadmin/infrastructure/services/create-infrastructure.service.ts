import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';

@Injectable()
export class CreateInfrastructureService {
  constructor(private readonly repository: InfrastructureRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
