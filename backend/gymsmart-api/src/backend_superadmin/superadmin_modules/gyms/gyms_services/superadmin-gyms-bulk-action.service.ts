// RESPONSIBILITY: Applies the exact Superadmin tenant bulk actions and returns the complete business-controls contract.
// FLOW: Controller -> SuperadminGymsBulkActionService -> SuperadminGymsRepository -> persisted tenant state -> contract projection.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminGymsRepository } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.repository';
import { SuperadminGymsBusinessControlsService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-business-controls.service';
import { TenantStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';
import { SuperadminCoreUnitOfWorkService } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-unit-of-work.service';

/**
 * Primary Intent: Defines SuperadminGymsBulkActionService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminGymsBulkActionService {
  constructor(private readonly repository: SuperadminGymsRepository, private readonly businessControlsService: SuperadminGymsBusinessControlsService, private readonly unitOfWork: SuperadminCoreUnitOfWorkService) {}
/**
 * Primary Intent: Executes the applyGymsBulkAction use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Applies one exact frontend action to all selected tenant IDs and returns the refreshed UI contract. */
  async applyGymsBulkAction(body: { action: 'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected'; gymIds: string[]; targetPlan?: string }): Promise<Awaited<ReturnType<SuperadminGymsBusinessControlsService['findGymsBusinessControls']>>> {
    const action = typeof body.action === 'string' ? body.action : '';
    const gymIds = Array.isArray(body.gymIds) ? body.gymIds.filter((value): value is string => typeof value === 'string') : [];
    if (!gymIds.length) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.BULK.IDS_REQUIRED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    if (!['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'].includes(action)) throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.BULK.ACTION_UNSUPPORTED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    if (action === 'Move plan' && typeof body.targetPlan !== 'string') throw new BadRequestException({ error: 'BAD_REQUEST', errorCode: 'GYMS.BULK.TARGET_PLAN_REQUIRED', message: { key: 'gyms.ERRORS.BAD_REQUEST' } });
    await this.unitOfWork.run(async () => { for (const id of gymIds) await this.applyOne(id, action, body); });
    return this.businessControlsService.findGymsBusinessControls({ filter: 'all' });
  }

  /**
 * Primary Intent: Executes the `applyOne` responsibility owned by this superadmin-gyms-bulk-action.service construct.
   * Edge Cases: Invalid or unavailable dependencies must fail fast according to the owning module contract.
   * Side-Effects: Any writes, events, external calls, cache changes, or queue operations are limited to the documented method responsibility.
   * AI-Note: Keep this method single-purpose, preserve explicit return types, and do not move logic across feature boundaries.
   */
  private async applyOne(id: string, action: string, body: { action: string; gymIds: string[]; targetPlan?: string }): Promise<void> {
    const tenant = await this.repository.findByIdOrThrow(id);
    if (action === 'Suspend selected') { await this.repository.updateGymsById(id, { status: TenantStatus.SUSPENDED }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Move plan') { await this.repository.updateGymsById(id, { plan: String(body.targetPlan) }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Extend trial') { await this.repository.updateGymsById(id, { trialEndsAt: new Date(Date.now() + 7 * 86400000), status: TenantStatus.TRIAL }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Send message' || action === 'Export selected') { await this.repository.recordAdministrativeAction(id, action); return; }
    void tenant;
  }
}
