// RESPONSIBILITY: Builds the gym detail business overview from the authoritative tenant record.
// FLOW: Controller -> GymsDetailBusinessOverviewService -> GymsRepository -> domain projection.
import { Injectable, BadRequestException } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';

@Injectable()
export class GymsDetailBusinessOverviewService {
  constructor(private readonly repository: GymsRepository) {}

  /** Returns the complete business overview for a single tenant. */
  async findGymsDetailBusinessOverview(input: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
    const query = input.query as Record<string, string> | undefined;
    const gymId = query?.gymId;
    if (!gymId) throw new BadRequestException('gymId is required');
    const gym = await this.repository.findByIdOrThrow(gymId);
    return { gym: { id: gym.id, name: gym.name, ownerName: gym.ownerName, adminEmail: gym.adminEmail, phone: gym.phone, status: gym.status, plan: gym.plan, city: gym.city, state: gym.state, country: gym.country, gstin: gym.gstin }, subscriptionHistory: gym.subscriptionHistory ?? [], usageStats: gym.usageStats ?? {}, tabs: ['overview', 'health', 'usage', 'billing', 'support', 'activity'], health: { status: gym.status, lastActiveAt: gym.lastActiveAt?.toISOString() ?? null }, billing: { monthlyRevenue: gym.monthlyRevenue }, support: { ticketCount: 0 }, activity: { lastLoginAt: gym.lastLoginAt?.toISOString() ?? null } };
  }
}
