import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class DeleteSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
