import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';

@Injectable()
export class UpdateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(id: string, dto: UpdateBroadcastDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
