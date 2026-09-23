// RESPONSIBILITY: Owns persistence for the Superadmin authentication profile.
// FLOW: SuperadminAuthService -> SuperadminAuthRepository -> superadmin_profiles table.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Injectable()
export class SuperadminAuthRepository {
  constructor(private readonly dataSource: DataSource) {}
  /** Finds the authentication profile by normalized email. */
  async findByEmail(email: string): Promise<{ id: string; email: string; passwordHash: string; role: string; tokenVersion: number } | null> { const rows = await this.dataSource.query('SELECT id, email, password_hash AS "passwordHash", role, 0 AS "tokenVersion" FROM superadmin_profiles WHERE lower(email) = lower($1) AND deleted_at IS NULL LIMIT 1', [email]) as Array<{ id: string; email: string; passwordHash: string; role: string; tokenVersion: number }>; return rows[0] ?? null; }
  /** Returns a profile by id for refresh-token validation. */
  async findById(id: string): Promise<{ id: string; email: string; role: string } | null> { const rows = await this.dataSource.query('SELECT id, email, role FROM superadmin_profiles WHERE id = $1 AND deleted_at IS NULL', [id]) as Array<{ id: string; email: string; role: string }>; return rows[0] ?? null; }
}