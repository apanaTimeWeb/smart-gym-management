import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class CreateSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
