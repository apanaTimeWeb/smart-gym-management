import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';
import { AffiliateResponse } from '../affiliates.interfaces';
import { AFFILIATES_MESSAGES } from '../affiliates.constants';

@Injectable()
export class DeleteAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute(id: string): Promise<AffiliateResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: AFFILIATES_MESSAGES.DELETED,
      data: null
    };
  }
}
