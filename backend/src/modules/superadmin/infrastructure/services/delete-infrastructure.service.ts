import { Injectable, NotFoundException } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';
import { INFRASTRUCTURE_ERRORS, INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';
import { InfrastructureResponse } from '../infrastructure.interfaces';

@Injectable()
export class DeleteInfrastructureService {
  constructor(private readonly repository: InfrastructureRepository) {}

  async execute(id: string): Promise<InfrastructureResponse> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new NotFoundException(INFRASTRUCTURE_ERRORS.NOT_FOUND);
    await this.repository.remove(id);
    return { success: true, message: INFRASTRUCTURE_MESSAGES.DELETED_SUCCESS, data: null };
  }
}
