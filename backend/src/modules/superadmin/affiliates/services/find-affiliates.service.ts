import { Injectable , NotFoundException} from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';
import { AffiliateResponse } from '../affiliates.interfaces';
import { AFFILIATES_MESSAGES, AFFILIATES_ERRORS } from '../affiliates.constants';

@Injectable()
export class FindAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute(): Promise<AffiliateResponse> {
    const data = await this.repository.findAll();
    return {
      success: true,
      message: AFFILIATES_MESSAGES.FETCHED,
      data
    };
  }
  async findOne(id: string): Promise<AffiliateResponse> {
    const data = await this.repository.findById(id);
    if (!data) throw new NotFoundException(AFFILIATES_ERRORS.NOT_FOUND);
    return {
      success: true,
      message: AFFILIATES_MESSAGES.FETCHED,
      data
    };
  }
}
