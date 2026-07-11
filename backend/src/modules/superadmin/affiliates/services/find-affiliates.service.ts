import { Injectable } from '@nestjs/common';
import { AffiliatesRepository } from '../affiliates.repository';

@Injectable()
export class FindAffiliatesService {
  constructor(private readonly repository: AffiliatesRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
