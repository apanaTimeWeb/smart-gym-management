import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';

@Injectable()
export class UpdateAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
