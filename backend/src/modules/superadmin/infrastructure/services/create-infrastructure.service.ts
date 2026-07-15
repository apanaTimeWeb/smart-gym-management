import { Injectable } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';
import { InfrastructureNode } from '../entities/infrastructure.entity';
import { InfrastructureResponse } from '../infrastructure.interfaces';
import { INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';

@Injectable()
export class CreateInfrastructureService {
  constructor(private readonly repo: InfrastructureRepository) {}
  
  async execute(dto: Partial<InfrastructureNode>): Promise<InfrastructureResponse> { 
    const data = await this.repo.create(dto);
    return { success: true, message: INFRASTRUCTURE_MESSAGES.CREATED_SUCCESS, data }; 
  }
}
