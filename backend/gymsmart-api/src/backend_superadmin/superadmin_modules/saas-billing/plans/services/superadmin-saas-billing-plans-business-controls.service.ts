// RESPONSIBILITY: Builds live plan business controls from authoritative subscription plan records.
// FLOW: Controller -> SuperadminPlansBusinessControlsService -> SuperadminPlansRepository -> PostgreSQL subscription_plans.
import { Injectable } from '@nestjs/common';
import { SuperadminPlansBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans-business-controls-response.dto';
import { SuperadminPlansRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/superadmin-saas-billing-plans.repository';

@Injectable()
export class SuperadminPlansBusinessControlsService {
  constructor(private readonly repository: SuperadminPlansRepository) {}

  /** Builds plan controls from the authoritative subscription_plans table. */
  async findPlansBusinessControls(_input: unknown = {}): Promise<SuperadminPlansBusinessControlsResponseDto> {
    const page = await this.repository.findPage({ page: 1, limit: 100, sortBy: 'name', sortOrder: 'ASC' });
    const currency = page.items[0]?.currency ?? 'INR';
    const plans = page.items.map((plan) => ({ name: plan.name, monthly: plan.priceMonthly, currency: plan.currency, members: plan.maxMembers, storage: plan.dbLimitGb, branches: 0 }));
    return { currency, plans, versions: [], addons: [], migration: { from: '', to: '', tenants: 0, monthlyChange: 0, currency, limitConflicts: 0 } };
  }
}
