import { UpdateAffiliateDto } from '../dto/update-affiliates.dto';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';
import { AffiliateResponse } from '../affiliates.interfaces';
import { AFFILIATES_MESSAGES } from '../affiliates.constants';

@Injectable()
export class UpdateAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute(id: string, dto: UpdateAffiliateDto): Promise<AffiliateResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: AFFILIATES_MESSAGES.UPDATED,
      data
    };
  }
}
