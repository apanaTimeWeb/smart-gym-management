import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';
import { InfrastructureNode } from '../entities/infrastructure.entity';

@Injectable()
export class CreateInfrastructureService {
  constructor(private readonly repo: InfrastructureRepository) {}
  
  async execute(dto: Partial<InfrastructureNode>) { 
    const node = await this.repo.create(dto);
    return { success: true, data: node }; 
  }
}
