// RESPONSIBILITY: Builds the complete Gyms V1 business-controls response from the tenant repository.
// FLOW: Controller -> SuperadminGymsBusinessControlsService -> SuperadminGymsRepository -> contract data -> SuperadminCoreResponseInterceptor.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsListQuery } from '@/backend_superadmin/superadmin_modules/gyms/gyms_types/superadmin-gyms.interfaces';
import { SuperadminGymsBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-business-controls-response.dto';

/**
 * Primary Intent: Defines SuperadminGymsBusinessControlsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsBusinessControlsService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly config: ConfigService) {}
/**
 * Primary Intent: Executes the findGymsBusinessControls use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findGymsBusinessControls use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findGymsBusinessControls(input: Record<string, unknown> = {}): Promise<SuperadminGymsBusinessControlsResponseDto> {
    const query = this.toQuery(input.query as Record<string, string> | undefined);
    const page = await this.repository.findPage(query);
    const rawRows = page.items.map((item) => ({ id: item.id, name: item.name, status: item.status, region: item.city || item.state || item.country, plan: item.plan, income: item.monthlyRevenue, health: this.healthScore(item), usage: this.usageScore(item), trialDays: this.trialDays(item.trialEndsAt), paymentRecoveryOpen: Boolean((item.usageStats as Record<string, unknown> | null)?.paymentRecoveryOpen), lastAction: this.lastAction(item) }));
    const rows = this.applyFilter(rawRows, (input.query as Record<string, string> | undefined)?.filter) as unknown as SuperadminGymsBusinessControlsResponseDto['rows'];
    return { currency: this.config.get<string>('app.defaultCurrency') ?? 'INR', segments: this.segments(rows), filters: this.filters(), bulk: ['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'], saved: this.savedViews(), rows };
  }

  /**
 * Primary Intent: Executes the `toQuery` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the toQuery use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private toQuery(raw: Record<string, string> | undefined): SuperadminGymsListQuery {
    return { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, status: raw?.status as never, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
  }

  /**
 * Primary Intent: Executes the `applyFilter` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the applyFilter use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private applyFilter(rows: Array<Record<string, unknown>>, filter: string | undefined): Array<Record<string, unknown>> {
    if (!filter || filter === 'all') return rows;
    if (filter === 'active' || filter === 'trial' || filter === 'suspended') return rows.filter((row) => String(row.status).toLowerCase() === filter);
    if (filter === 'high-income') return rows.filter((row) => Number(row.income) > 5000000);
    if (filter === 'high-usage') return rows.filter((row) => Number(row.usage) >= 80);
    if (filter === 'health-risk') return rows.filter((row) => Number(row.health) < 70);
    if (filter === 'payment-recovery') return rows.filter((row) => Boolean(row.paymentRecoveryOpen));
    return rows;
  }

  /**
 * Primary Intent: Executes the `healthScore` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  private healthScore(item: { memberCount: number; lastActiveAt: Date | null }): number {
    const activity = item.lastActiveAt && Date.now() - item.lastActiveAt.getTime() < 7 * 86_400_000 ? 50 : 20;
    return Math.min(100, Math.max(0, activity + Math.min(50, item.memberCount / 10)));
  }

  /**
 * Primary Intent: Executes the `usageScore` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the usageScore use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private usageScore(item: { usageStats: unknown }): number {
    const data = item.usageStats as Record<string, unknown> | null;
    const value = Number(data?.usagePercent ?? data?.storagePercent ?? 0);
    return Math.min(100, Math.max(0, value));
  }

  /**
 * Primary Intent: Executes the `trialDays` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the trialDays use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private trialDays(date: Date | null): number {
    if (!date) return 0;
    return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86_400_000));
  }

  /**
 * Primary Intent: Executes the `lastAction` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the lastAction use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private lastAction(item: { subscriptionHistory: unknown }): string | null {
    const history = Array.isArray(item.subscriptionHistory) ? item.subscriptionHistory : [];
    const latest = history.length ? history[history.length - 1] : null;
    return latest && typeof latest === 'object' && typeof (latest as { action?: unknown }).action === 'string' ? (latest as { action: string }).action : null;
  }

  /**
 * Primary Intent: Executes the `filters` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the filters use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private filters(): Array<{ key: string; label: string }> { return [{ key: 'all', label: 'All tenants' }, { key: 'active', label: 'Active tenants' }, { key: 'trial', label: 'Trial tenants' }, { key: 'suspended', label: 'Suspended tenants' }, { key: 'high-income', label: 'High income' }, { key: 'high-usage', label: 'High usage' }, { key: 'health-risk', label: 'Health risk' }, { key: 'payment-recovery', label: 'Payment recovery' }]; }

  /**
 * Primary Intent: Executes the `savedViews` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the savedViews use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private savedViews(): Array<{ key: string; label: string }> { return [{ key: 'health-risk', label: 'High income + at risk' }, { key: 'trial', label: 'Trials ending soon' }, { key: 'payment-recovery', label: 'Payment recovery queue' }]; }

  /**
 * Primary Intent: Executes the `segments` responsibility owned by this superadmin-gyms-business-controls.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the segments use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private segments(rows: Array<Record<string, unknown>>): Array<{ name: string; count: number; rule: string }> { return [{ name: 'High income + at risk', count: rows.filter((row) => Number(row.income) > 5_000_000 && Number(row.health) < 70).length, rule: 'Monthly income above the configured high-income threshold and health below 70.' }, { name: 'Trial ending soon', count: rows.filter((row) => Number(row.trialDays) > 0 && Number(row.trialDays) <= 5).length, rule: 'Trial ends within 5 days.' }, { name: 'Usage almost full', count: rows.filter((row) => Number(row.usage) >= 90).length, rule: 'Any major limit above 90%.' }, { name: 'Payment recovery', count: rows.filter((row) => Boolean(row.paymentRecoveryOpen)).length, rule: 'Payment failed and recovery is still open.' }]; }
}
