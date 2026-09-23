// RESPONSIBILITY: Builds the gym detail business overview from the authoritative tenant record.
// FLOW: Controller -> SuperadminGymsDetailBusinessOverviewService -> SuperadminGymsRepository -> domain projection.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import type { SuperadminGymsEntity } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.entity';
import { SuperadminGymsDetailBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-business-overview-response.dto';

interface GymDetailState {
  currency?: string;
  health?: { score?: number; loginTrend?: number; memberTrend?: number; paymentFailures?: number; openTickets?: number };
  usage?: Array<{ label: string; used: number; limit: number; percent: number }>;
  billing?: { monthlyIncome?: number; nextPayment?: string; failedPayments?: number; discount?: string };
  support?: { openTickets?: number; averageResponseHours?: number; satisfaction?: number };
  activity?: Array<{ date: string; event: string }>;
  subscription?: { plan?: string; started?: string; renewal?: string; monthlyIncome?: number };
}

@Injectable()
export class SuperadminGymsDetailBusinessOverviewService {
  constructor(private readonly repository: SuperadminGymsRepository) {}

  /** Returns the complete frontend detail contract from persisted tenant state. */
  async findGymsDetailBusinessOverview(input: { query?: { gymId?: string } } = {}): Promise<SuperadminGymsDetailBusinessOverviewResponseDto> {
    const gymId = input.query?.gymId?.trim();
    if (!gymId) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.DETAIL.INVALID_ID', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    const gym = await this.repository.findByIdOrThrow(gymId);
    return this.buildResponse(gym, this.readState(gym.usageStats));
  }

  /** Normalizes persisted usage data into a safe projection. */
  private readState(value: unknown): GymDetailState {
    return value && typeof value === 'object' ? value as GymDetailState : {};
  }

  /** Maps tenant state to the frozen detail response. */
  private buildResponse(gym: SuperadminGymsEntity, state: GymDetailState): SuperadminGymsDetailBusinessOverviewResponseDto {
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
