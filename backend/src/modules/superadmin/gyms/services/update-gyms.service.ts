import { UpdateTenantDto } from '../dto/update-gyms.dto';
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '../gyms.repository';

@Injectable()
export class UpdateGymsService {
  constructor(private readonly repository: GymsRepository) {}
  
  async execute(id: string, dto: UpdateTenantDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
