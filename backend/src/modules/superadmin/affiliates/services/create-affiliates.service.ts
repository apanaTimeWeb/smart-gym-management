import { CreateAffiliateDto } from '../dto/create-affiliates.dto';
import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';

@Injectable()
export class CreateAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute(dto: CreateAffiliateDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
