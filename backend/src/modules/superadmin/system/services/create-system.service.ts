import { Injectable } from '@nestjs/common';
import { SystemRepository } from '../system.repository';

@Injectable()
export class CreateSystemService {
  constructor(private readonly repository: SystemRepository) {}
  
  async execute(dto: CreateSystemDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
