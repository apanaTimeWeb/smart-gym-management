// RESPONSIBILITY: Builds live support-service insights from repository-provided active ticket data; no direct DB access.
// FLOW: SuperadminTicketsInsightsQueryController -> SuperadminTicketsInsightsService -> SuperadminTicketsRepository -> support tickets.
import { Injectable } from '@nestjs/common';
import { SuperadminTicketsServiceInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets-service-insights-response.dto';
import { SuperadminTicketsRepository } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.repository';
import type { SuperadminTicketsServiceInsightsRow } from '@/backend_superadmin/superadmin_modules/tickets/tickets_types/superadmin-tickets.interfaces';
import { SupportTicketPriority, SupportTicketStatus } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.constants';

/**
 * Primary Intent: Defines SuperadminTicketsInsightsService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminTicketsInsightsService {
  constructor(private readonly repository: SuperadminTicketsRepository) {}
/**
 * Primary Intent: Executes the findTicketsServiceInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
   * @description Returns live service-insight metrics derived from active support tickets.
   * @returns The frontend-facing service-insights response DTO.
   */
  /**
   * Primary Intent: Executes the findTicketsServiceInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findTicketsServiceInsights(): Promise<SuperadminTicketsServiceInsightsResponseDto> {
    const rows = await this.repository.findAllForServiceInsights();
    return this.buildInsights(rows);
  }

  /**
   * Primary Intent: Builds deterministic support metrics from repository projections.
   * Edge Cases: Satisfaction is averaged only from persisted survey scores and returns zero when no scored tickets exist.
   * Side-Effects: None; all calculations are read-only.
   * AI-Note: Never substitute hard-coded demo satisfaction values for persisted ticket scores.
   */
  /**
   * Primary Intent: Executes the buildInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildInsights(rows: SuperadminTicketsServiceInsightsRow[]): SuperadminTicketsServiceInsightsResponseDto {
    const now = Date.now();
    const openRows = rows.filter((row) => [SupportTicketStatus.OPEN, SupportTicketStatus.INPROGRESS, SupportTicketStatus.WAITING].includes(row.status));
    const urgentRows = rows.filter((row) => [SupportTicketPriority.URGENT, SupportTicketPriority.CRITICAL].includes(row.priority));
    const responseDurations = rows.filter((row) => row.firstResponseAt).map((row) => Math.max(0, (row.firstResponseAt!.getTime() - row.createdAt.getTime()) / 60000));
    const resolutionHours = rows.filter((row) => row.resolutionTime > 0).map((row) => row.resolutionTime / 3600000);
    const agentMap = this.buildAgents(rows, openRows, now);
    return { summary: { open: openRows.length, urgent: urgentRows.length, nearTarget: this.countNearTarget(openRows, now), overTarget: this.countOverTarget(openRows, now), averageFirstResponseMinutes: this.average(responseDurations), averageResolutionHours: this.average(resolutionHours), satisfaction: this.average(rows.filter((row) => row.satisfactionScore !== null).map((row) => Number(row.satisfactionScore))) }, agents: agentMap, aging: this.buildAging(openRows, now), categories: this.buildCategories(rows) };
  }

  /**
 * Primary Intent: Executes the `average` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the average use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private average(values: number[]): number { return values.length ? Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)) : 0; }

  /**
 * Primary Intent: Executes the `countNearTarget` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the countNearTarget use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private countNearTarget(rows: SuperadminTicketsServiceInsightsRow[], now: number): number { return rows.filter((row) => row.slaDeadline && row.slaDeadline.getTime() >= now && row.slaDeadline.getTime() - now <= 3600000).length; }

  /**
 * Primary Intent: Executes the `countOverTarget` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the countOverTarget use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private countOverTarget(rows: SuperadminTicketsServiceInsightsRow[], now: number): number { return rows.filter((row) => row.slaDeadline && row.slaDeadline.getTime() < now).length; }

  /**
 * Primary Intent: Executes the `buildAgents` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildAgents use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildAgents(rows: SuperadminTicketsServiceInsightsRow[], openRows: SuperadminTicketsServiceInsightsRow[], now: number): SuperadminTicketsServiceInsightsResponseDto['agents'] {
    const map = new Map<string, { open: number; urgent: number; overTarget: number; hours: number[] }>();
    for (const row of rows) {
      const name = row.assignedTo ?? 'Unassigned';
      const current = map.get(name) ?? { open: 0, urgent: 0, overTarget: 0, hours: [] };
      if (openRows.includes(row)) current.open += 1;
      if ([SupportTicketPriority.URGENT, SupportTicketPriority.CRITICAL].includes(row.priority)) current.urgent += 1;
      if (row.slaDeadline && row.slaDeadline.getTime() < now && openRows.includes(row)) current.overTarget += 1;
      if (row.resolutionTime > 0) current.hours.push(row.resolutionTime / 3600000);
      map.set(name, current);
    }
    return [...map.entries()].map(([name, value]) => ({ name, open: value.open, urgent: value.urgent, overTarget: value.overTarget, averageHours: this.average(value.hours) }));
  }

  /**
 * Primary Intent: Executes the `buildAging` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildAging use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildAging(rows: SuperadminTicketsServiceInsightsRow[], now: number): SuperadminTicketsServiceInsightsResponseDto['aging'] {
    return [
      { bucket: '0-1 day', count: rows.filter((row) => now - row.createdAt.getTime() < 86400000).length },
      { bucket: '2-3 days', count: rows.filter((row) => now - row.createdAt.getTime() >= 86400000 && now - row.createdAt.getTime() < 259200000).length },
      { bucket: '4-7 days', count: rows.filter((row) => now - row.createdAt.getTime() >= 259200000 && now - row.createdAt.getTime() < 604800000).length },
      { bucket: '8+ days', count: rows.filter((row) => now - row.createdAt.getTime() >= 604800000).length },
    ];
  }

  /**
 * Primary Intent: Executes the `buildCategories` responsibility owned by this superadmin-tickets-insights.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildCategories use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildCategories(rows: SuperadminTicketsServiceInsightsRow[]): SuperadminTicketsServiceInsightsResponseDto['categories'] {
    return [
      { name: 'Billing', count: rows.filter((row) => /bill|invoice|payment/i.test(`${row.subject} ${row.description}`)).length },
      { name: 'Technical', count: rows.filter((row) => /bug|error|login|api|technical/i.test(`${row.subject} ${row.description}`)).length },
      { name: 'Feature request', count: rows.filter((row) => /feature|request/i.test(`${row.subject} ${row.description}`)).length },
      { name: 'Account', count: rows.filter((row) => /account|access|profile/i.test(`${row.subject} ${row.description}`)).length },
    ];
  }
}
