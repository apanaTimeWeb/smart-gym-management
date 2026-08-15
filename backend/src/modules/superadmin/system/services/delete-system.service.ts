import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';
import { SystemResponse } from '../system.interfaces';
import { SYSTEM_MESSAGES } from '../system.constants';

@Injectable()
export class DeleteSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(id: string): Promise<SystemResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: SYSTEM_MESSAGES.DELETED,
      data: null
    };
  }
}
