// RESPONSIBILITY: Builds the gym detail business overview from the authoritative tenant record.
// FLOW: Controller -> SuperadminGymsDetailBusinessOverviewService -> SuperadminGymsRepository -> domain projection.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsDetailBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-business-overview-response.dto';

/**
 * Primary Intent: Defines the GymDomainRecord type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface GymDomainRecord {
  id: string; name: string; ownerName: string; adminEmail: string; phone: string; status: string; createdAt: Date;
  city: string; state: string; memberCount: number; monthlyRevenue: number; databaseVersion: string; plan: string; usageStats: unknown;
}

/**
 * Primary Intent: Defines the GymDetailState type contract for this Superadmin backend feature and its frozen API/data boundary.
 * Edge Cases: Preserve exact property names, nullability, enums, and optional-field semantics when modifying this contract.
 * Side-Effects: None directly; changes can alter request/response compatibility and downstream consumers.
 * AI-Note: Treat this declaration as an explicit blueprint. Do not widen, narrow, rename, or reinterpret fields without coordinated contract review.
 */
interface GymDetailState {
  currency?: string;
  health?: { score?: number; loginTrend?: number; memberTrend?: number; paymentFailures?: number; openTickets?: number };
  usage?: Array<{ label: string; used: number; limit: number; percent: number }>;
  billing?: { monthlyIncome?: number; nextPayment?: string; failedPayments?: number; discount?: string };
  support?: { openTickets?: number; averageResponseHours?: number; satisfaction?: number };
  activity?: Array<{ date: string; event: string }>;
  subscription?: { plan?: string; started?: string; renewal?: string; monthlyIncome?: number };
}

/**
 * Primary Intent: Defines SuperadminGymsDetailBusinessOverviewService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsDetailBusinessOverviewService {
  constructor(private readonly repository: SuperadminGymsRepository) {}
/**
 * Primary Intent: Executes the findGymsDetailBusinessOverview use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the findGymsDetailBusinessOverview use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findGymsDetailBusinessOverview(input: { query?: { gymId?: string } } = {}): Promise<SuperadminGymsDetailBusinessOverviewResponseDto> {
    const gymId = input.query?.gymId?.trim();
    if (!gymId) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.DETAIL.INVALID_ID', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    const gym = await this.repository.findByIdOrThrow(gymId);
    return this.buildResponse(gym, this.readState(gym.usageStats));
  }

  /**
 * Primary Intent: Executes the `readState` responsibility owned by this superadmin-gyms-detail-business-overview.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the readState use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private readState(value: unknown): GymDetailState {
    return value && typeof value === 'object' ? value as GymDetailState : {};
  }

  /**
 * Primary Intent: Executes the `buildResponse` responsibility owned by this superadmin-gyms-detail-business-overview.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  /**
   * Primary Intent: Executes the buildResponse use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  private buildResponse(gym: GymDomainRecord, state: GymDetailState): SuperadminGymsDetailBusinessOverviewResponseDto {
    const currency = state.currency ?? 'INR';
    const health = state.health ?? {}; const billing = state.billing ?? {}; const support = state.support ?? {};
    const subscription = state.subscription ?? {};
    return {
      gymId: gym.id, gymName: gym.name, status: gym.status, ownerName: gym.ownerName, adminEmail: gym.adminEmail, phone: gym.phone,
      createdAt: gym.createdAt.toISOString(), city: gym.city, state: gym.state, memberCount: gym.memberCount, monthlyRevenue: gym.monthlyRevenue,
      currency, plan: gym.plan, databaseVersion: gym.databaseVersion, tabs: ['Overview', 'Subscription', 'Billing', 'Usage', 'Health', 'Activity', 'Support'],
      health: { score: health.score ?? 0, loginTrend: health.loginTrend ?? 0, memberTrend: health.memberTrend ?? 0, paymentFailures: health.paymentFailures ?? 0, openTickets: health.openTickets ?? 0 },
      usage: Array.isArray(state.usage) ? state.usage : [],
      billing: { monthlyIncome: billing.monthlyIncome ?? gym.monthlyRevenue, nextPayment: billing.nextPayment ?? '', failedPayments: billing.failedPayments ?? 0, discount: billing.discount ?? '0%', currency },
      support: { openTickets: support.openTickets ?? 0, averageResponseHours: support.averageResponseHours ?? 0, satisfaction: support.satisfaction ?? 0 },
      activity: Array.isArray(state.activity) ? state.activity : [],
      subscription: { plan: subscription.plan ?? gym.plan, started: subscription.started ?? gym.createdAt.toISOString(), renewal: subscription.renewal ?? '', monthlyIncome: subscription.monthlyIncome ?? gym.monthlyRevenue, currency },
    };
  }
}
