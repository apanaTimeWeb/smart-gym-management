import { Injectable } from '@nestjs/common';
import { InfrastructureResponse } from '../infrastructure.interfaces';
import { INFRASTRUCTURE_MESSAGES } from '../infrastructure.constants';

@Injectable()
export class DeleteInfrastructureService {
  async execute(): Promise<InfrastructureResponse> { return { success: true, message: INFRASTRUCTURE_MESSAGES.DELETED_SUCCESS, data: { module: 'infrastructure' } }; }
}
