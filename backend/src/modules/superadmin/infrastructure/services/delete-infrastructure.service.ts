import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';

@Injectable()
export class DeleteInfrastructureService {
  constructor(private readonly repository: InfrastructureRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
