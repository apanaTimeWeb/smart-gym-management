import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class DeleteSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
