import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GlobalSetting } from './entities/settings.entity';

@Injectable()
export class SettingsRepository {
  constructor(
    @InjectRepository(GlobalSetting)
    private readonly repo: Repository<GlobalSetting>,
  ) {}

  async create(data: Partial<GlobalSetting>): Promise<GlobalSetting> {
    const entity = this.repo.create(data);
    return await this.repo.save(entity);
  }

  async findAll(): Promise<GlobalSetting[]> {
    return await this.repo.find({ where: { isDeleted: false } });
  }

  async findById(id: string): Promise<GlobalSetting | null> {
    return await this.repo.findOne({ where: { id, isDeleted: false } });
  }

  async update(id: string, data: Partial<GlobalSetting>): Promise<GlobalSetting | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async softDelete(id: string): Promise<void> {
    await this.repo.update(id, { isDeleted: true });
  }
}
