// RESPONSIBILITY: Builds live plan business controls from authoritative subscription plan records.
// FLOW: Controller -> PlansBusinessControlsService -> PlansRepository -> PostgreSQL subscription_plans.
import { Injectable } from '@nestjs/common';
import { PlansBusinessControlsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans-business-controls-response.dto';
import { PlansRepository } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/plans/plans.repository';

@Injectable()
export class PlansBusinessControlsService {
  constructor(private readonly repository: PlansRepository) {}

  /** Builds plan controls from the authoritative subscription_plans table. */
  async findPlansBusinessControls(_input: unknown = {}): Promise<PlansBusinessControlsResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'name', sortOrder: 'ASC' });
    const currency = page.items[0]?.currency ?? 'INR';
    const plans = page.items.map((plan) => ({ name: plan.name, monthly: plan.priceMonthly, currency: plan.currency, members: plan.maxMembers, storage: plan.dbLimitGb, branches: 0 }));
    return { currency, plans, versions: [], addons: [], migration: { from: '', to: '', tenants: 0, monthlyChange: 0, currency, limitConflicts: 0 } };
  }
}
