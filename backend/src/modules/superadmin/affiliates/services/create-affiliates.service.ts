import { CreateAffiliateDto } from '../dto/create-affiliates.dto';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';
import { AffiliateResponse } from '../affiliates.interfaces';
import { AFFILIATES_MESSAGES } from '../affiliates.constants';

@Injectable()
export class CreateAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute(dto: CreateAffiliateDto): Promise<AffiliateResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: AFFILIATES_MESSAGES.CREATED,
      data
    };
  }
}
