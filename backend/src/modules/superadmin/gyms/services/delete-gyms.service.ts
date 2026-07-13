import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES } from '../gyms.constants';

@Injectable()
export class DeleteGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(id: string): Promise<TenantResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: GYMS_MESSAGES.DELETED,
      data: null
    };
  }
}
