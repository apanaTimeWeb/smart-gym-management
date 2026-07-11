import { Injectable } from '@nestjs/common';
import { SettingsRepository } from '../settings.repository';

@Injectable()
export class CreateSettingsService {
  constructor(private readonly repository: SettingsRepository) {}
  
  async execute(dto: CreateSettingsDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
