import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';
import { TenantNotFoundException } from '../gyms.exceptions';
import { GYMS_ERRORS } from '../gyms.constants';

@Injectable()
export class FindGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new TenantNotFoundException(GYMS_ERRORS.NOT_FOUND);
    return entity;
  }
}
