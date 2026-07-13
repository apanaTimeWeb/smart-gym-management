import { Injectable } from '@nestjs/common';
import { BroadcastsRepository } from '../broadcasts.repository';
import { BroadcastResponse } from '../broadcasts.interfaces';
import { BROADCASTS_MESSAGES, BROADCASTS_ERRORS } from '../broadcasts.constants';

@Injectable()
export class FindBroadcastsService {
  constructor(private readonly repository: BroadcastsRepository) {}
  
  async execute(): Promise<BroadcastResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: BROADCASTS_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<BroadcastResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new Error(BROADCASTS_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: BROADCASTS_MESSAGES.FETCHED,
      data
    };
  }
}
