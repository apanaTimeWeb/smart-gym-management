// RESPONSIBILITY: Executes the soft-delete flow for the migrations feature.
// FLOW: CommandController -> SuperadminMigrationsDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminMigrationsRepository } from '@/backend_superadmin/superadmin_modules/system-ops/migrations/superadmin-system-ops-migrations.repository';
@Injectable()
export class SuperadminMigrationsDeleteService {
  constructor(private readonly repository: SuperadminMigrationsRepository) {}
  /** Soft-deletes one migrations record. */
  async deleteMigrations(id: string): Promise<null> { await this.repository.deleteMigrationsById(id); return null; }
}