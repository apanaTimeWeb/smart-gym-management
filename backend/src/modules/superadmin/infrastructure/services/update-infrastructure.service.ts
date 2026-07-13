import { Injectable } from '@nestjs/common';
import { InfrastructureResponse } from '../infrastructure.interfaces';
import { INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';

@Injectable()
export class UpdateInfrastructureService {
  async execute(): Promise<InfrastructureResponse> { return { success: true, message: INFRASTRUCTURE_MESSAGES.UPDATED_SUCCESS, data: { module: 'infrastructure' } }; }
}
