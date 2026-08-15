import { Injectable, NotFoundException } from '@nestjs/common';
import { InfrastructureRepository } from '../infrastructure.repository';
import { UpdateInfrastructureDto } from '../dto/update-infrastructure.dto';
import { INFRASTRUCTURE_ERRORS, INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';
import { InfrastructureResponse } from '../infrastructure.interfaces';
import { InfrastructureNode } from '../entities/infrastructure.entity';

@Injectable()
export class UpdateInfrastructureService {
  constructor(private readonly repository: InfrastructureRepository) {}

  async execute(id: string, dto: UpdateInfrastructureDto): Promise<InfrastructureResponse> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new NotFoundException(INFRASTRUCTURE_ERRORS.NOT_FOUND);
    const updated = await this.repository.update(id, dto);
    return { success: true, message: INFRASTRUCTURE_MESSAGES.UPDATED_SUCCESS, data: updated };
  }
}
