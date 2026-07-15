import { CreateBroadcastDto } from '../dto/create-broadcasts.dto';
import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';
import { BroadcastResponse } from '../broadcasts.interfaces';
import { BROADCASTS_MESSAGES } from '../broadcasts.constants';

@Injectable()
export class CreateBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(dto: CreateBroadcastDto): Promise<BroadcastResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: BROADCASTS_MESSAGES.CREATED,
      data
    };
  }
}
