import { UpdateBroadcastDto } from '../dto/update-broadcasts.dto';
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';
import { BroadcastResponse } from '../broadcasts.interfaces';
import { BROADCASTS_MESSAGES } from '../broadcasts.constants';

@Injectable()
export class UpdateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(id: string, dto: UpdateBroadcastDto): Promise<BroadcastResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: BROADCASTS_MESSAGES.UPDATED,
      data
    };
  }
}
