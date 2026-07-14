import { UpdateTenantDto } from '../dto/update-gyms.dto';
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantResponse } from '../gyms.interfaces';
import { GYMS_MESSAGES } from '../gyms.constants';

@Injectable()
export class UpdateGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(id: string, dto: UpdateTenantDto): Promise<TenantResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: GYMS_MESSAGES.UPDATED,
      data
    };
  }
}
