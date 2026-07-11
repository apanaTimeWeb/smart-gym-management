import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class CreateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(dto: any): Promise<any> {
    return await this.repository.create(dto);
  }
}
