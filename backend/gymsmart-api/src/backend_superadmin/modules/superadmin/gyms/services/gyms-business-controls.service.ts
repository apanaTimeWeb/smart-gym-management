// RESPONSIBILITY: Builds the complete Gyms V1 business-controls response from the tenant repository.
// FLOW: Controller -> GymsBusinessControlsService -> GymsRepository -> contract data -> ResponseInterceptor.
import { Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsListQuery } from '@/backend_superadmin/modules/superadmin/gyms/types/gyms.interfaces';
import { GymsBusinessControlsResponseDto } from '@/backend_superadmin/modules/superadmin/gyms/gyms-business-controls-response.dto';

@Injectable()
export class GymsBusinessControlsService {
  constructor(private readonly repository: GymsRepository) {}

  /** Returns business-control rows and deterministic filter/segment metadata from live tenant records. */
  async findGymsBusinessControls(input: Record<string, unknown> = {}): Promise<GymsBusinessControlsResponseDto> {
    const query = this.toQuery(input.query as Record<string, string> | undefined);
    const page = await this.repository.findPage(query);
    const rawRows = page.items.map((item) => ({ id: item.id, name: item.name, status: item.status, region: item.city || item.state || item.country, plan: item.plan, income: item.monthlyRevenue, health: this.healthScore(item), usage: this.usageScore(item), trialDays: this.trialDays(item.trialEndsAt), paymentRecoveryOpen: Boolean((item.usageStats as Record<string, unknown> | null)?.paymentRecoveryOpen), lastAction: this.lastAction(item) }));
    const rows = this.applyFilter(rawRows, (input.query as Record<string, string> | undefined)?.filter) as unknown as GymsBusinessControlsResponseDto['rows'];
    return { segments: this.segments(rows), filters: this.filters(), bulk: ['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'], saved: this.savedViews(), rows };
  }

  /** Converts HTTP query strings into the shared pagination/filter contract. */
  private toQuery(raw: Record<string, string> | undefined): GymsListQuery {
    return { page: Number(raw?.page ?? 1), limit: Math.min(Number(raw?.limit ?? 50), 100), search: raw?.search, status: raw?.status as never, sortBy: (raw?.sortBy ?? 'createdAt') as never, sortOrder: raw?.sortOrder === 'ASC' ? 'ASC' : 'DESC' };
  }

  /** Applies the frontend V1 filter vocabulary to the projected server rows. */
  private applyFilter(rows: Array<Record<string, unknown>>, filter: string | undefined): Array<Record<string, unknown>> {
    if (!filter || filter === 'all') return rows;
    if (filter === 'active' || filter === 'trial' || filter === 'suspended') return rows.filter((row) => String(row.status).toLowerCase() === filter);
    if (filter === 'high-income') return rows.filter((row) => Number(row.income) > 5000000);
    if (filter === 'high-usage') return rows.filter((row) => Number(row.usage) >= 80);
    if (filter === 'health-risk') return rows.filter((row) => Number(row.health) < 70);
    if (filter === 'payment-recovery') return rows.filter((row) => Boolean(row.paymentRecoveryOpen));
    return rows;
  }

  /** Calculates a bounded health score from active-member and recent-activity signals. */
  private healthScore(item: { memberCount: number; lastActiveAt: Date | null }): number {
    const activity = item.lastActiveAt && Date.now() - item.lastActiveAt.getTime() < 7 * 86_400_000 ? 50 : 20;
    return Math.min(100, Math.max(0, activity + Math.min(50, item.memberCount / 10)));
  }

  /** Calculates a deterministic usage score from stored tenant usage state. */
  private usageScore(item: { usageStats: unknown }): number {
    const data = item.usageStats as Record<string, unknown> | null;
    const value = Number(data?.usagePercent ?? data?.storagePercent ?? 0);
    return Math.min(100, Math.max(0, value));
  }

  /** Returns the remaining trial days based on the tenant trial end date. */
  private trialDays(date: Date | null): number {
    if (!date) return 0;
    return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86_400_000));
  }

  /** Reads the most recent administrative action persisted by the bulk-action repository mutation. */
  private lastAction(item: { subscriptionHistory: unknown }): string | null {
    const history = Array.isArray(item.subscriptionHistory) ? item.subscriptionHistory : [];
    const latest = history.length ? history[history.length - 1] : null;
    return latest && typeof latest === 'object' && typeof (latest as { action?: unknown }).action === 'string' ? (latest as { action: string }).action : null;
  }

  /** Returns the authoritative static filter vocabulary defined by the frontend contract. */
  private filters(): Array<{ key: string; label: string }> { return [{ key: 'all', label: 'All tenants' }, { key: 'active', label: 'Active tenants' }, { key: 'trial', label: 'Trial tenants' }, { key: 'suspended', label: 'Suspended tenants' }, { key: 'high-income', label: 'High income' }, { key: 'high-usage', label: 'High usage' }, { key: 'health-risk', label: 'Health risk' }, { key: 'payment-recovery', label: 'Payment recovery' }]; }

  /** Returns the saved-view definitions required by the Superadmin UI. */
  private savedViews(): Array<{ key: string; label: string }> { return [{ key: 'health-risk', label: 'High income + at risk' }, { key: 'trial', label: 'Trials ending soon' }, { key: 'payment-recovery', label: 'Payment recovery queue' }]; }

  /** Derives live segment counts from the current row set. */
  private segments(rows: Array<Record<string, unknown>>): Array<{ name: string; count: number; rule: string }> { return [{ name: 'High income + at risk', count: rows.filter((row) => Number(row.income) > 5_000_000 && Number(row.health) < 70).length, rule: 'Monthly income above â‚¹50,000 and health below 70.' }, { name: 'Trial ending soon', count: rows.filter((row) => Number(row.trialDays) > 0 && Number(row.trialDays) <= 5).length, rule: 'Trial ends within 5 days.' }, { name: 'Usage almost full', count: rows.filter((row) => Number(row.usage) >= 90).length, rule: 'Any major limit above 90%.' }, { name: 'Payment recovery', count: rows.filter((row) => Boolean(row.paymentRecoveryOpen)).length, rule: 'Payment failed and recovery is still open.' }]; }
}
