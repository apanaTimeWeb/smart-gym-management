import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class UpdateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(id: string, dto: UpdateBroadcastsDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
