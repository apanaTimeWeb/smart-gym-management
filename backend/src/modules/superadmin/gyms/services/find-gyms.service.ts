import { Injectable , NotFoundException} from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantNotFoundException } from '../gyms.exceptions';
import { GYMS_MESSAGES, GYMS_ERRORS } from '../gyms.constants';
import { TenantResponse } from '../gyms.interfaces';

@Injectable()
export class FindGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(): Promise<TenantResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: GYMS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<TenantResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new TenantNotFoundException(GYMS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: GYMS_MESSAGES.FETCHED,
      data
    };
  }
}
