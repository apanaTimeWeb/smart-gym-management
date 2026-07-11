import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class FindSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
