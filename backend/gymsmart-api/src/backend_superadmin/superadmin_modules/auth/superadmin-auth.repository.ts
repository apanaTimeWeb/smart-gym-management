// RESPONSIBILITY: Owns persistence for the Superadmin authentication profile.
// FLOW: SuperadminAuthService -> SuperadminAuthRepository -> superadmin_profiles table.
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
/**
 * Primary Intent: Defines SuperadminAuthRepository as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminAuthRepository {
  constructor(private readonly dataSource: DataSource) {}
  /**
 * Primary Intent: Executes the findByEmail use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findByEmail(email: string): Promise<{ id: string; email: string; passwordHash: string; role: string; tokenVersion: number } | null> { const rows = await this.dataSource.query('SELECT id, email, password_hash AS "passwordHash", role, token_version AS "tokenVersion" FROM superadmin_profiles WHERE lower(email) = lower($1) AND deleted_at IS NULL LIMIT 1', [email]) as Array<{ id: string; email: string; passwordHash: string; role: string; tokenVersion: number }>; return rows[0] ?? null; }
  /**
 * Primary Intent: Executes the findById use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findById(id: string): Promise<{ id: string; email: string; role: string; tokenVersion: number } | null> { const rows = await this.dataSource.query('SELECT id, email, role, token_version AS "tokenVersion" FROM superadmin_profiles WHERE id = $1 AND deleted_at IS NULL', [id]) as Array<{ id: string; email: string; role: string; tokenVersion: number }>; return rows[0] ?? null; }
}
