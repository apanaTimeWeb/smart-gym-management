import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class UpdateGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(id: string, dto: any): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
