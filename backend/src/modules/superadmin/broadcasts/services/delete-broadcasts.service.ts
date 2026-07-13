import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';
import { BroadcastResponse } from '../broadcasts.interfaces';
import { BROADCASTS_MESSAGES } from '../broadcasts.constants';

@Injectable()
export class DeleteBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(id: string): Promise<BroadcastResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: BROADCASTS_MESSAGES.DELETED,
      data: null
    };
  }
}
