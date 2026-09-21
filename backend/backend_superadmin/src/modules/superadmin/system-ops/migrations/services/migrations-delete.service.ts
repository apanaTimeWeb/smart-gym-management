// RESPONSIBILITY: Executes the soft-delete flow for the migrations feature.
// FLOW: CommandController -> MigrationsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '@/modules/superadmin/system-ops/migrations/migrations.repository';
@Injectable()
export class MigrationsDeleteService {
  constructor(private readonly repository: MigrationsRepository) {}
  /** Soft-deletes one migrations record. */
  async deleteMigrations(id: string): Promise<null> { await this.repository.deleteMigrationsById(id); return null; }
}
