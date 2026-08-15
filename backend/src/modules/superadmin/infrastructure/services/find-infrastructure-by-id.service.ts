import { Injectable, NotFoundException } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';
import { INFRASTRUCTURE_ERRORS, INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';
import { InfrastructureResponse } from '../infrastructure.interfaces';
import { InfrastructureNode } from '../entities/infrastructure.entity';

@Injectable()
export class FindInfrastructureByIdService {
  constructor(private readonly repository: InfrastructureRepository) {}

  async execute(id: string): Promise<InfrastructureResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(INFRASTRUCTURE_ERRORS.NOT_FOUND);
    return { success: true, message: INFRASTRUCTURE_MESSAGES.FETCHED_SUCCESS, data };
  }
}
