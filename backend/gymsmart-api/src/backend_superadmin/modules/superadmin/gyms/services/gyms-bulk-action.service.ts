// RESPONSIBILITY: Applies the exact Superadmin tenant bulk actions and returns the complete business-controls contract.
// FLOW: Controller -> GymsBulkActionService -> GymsRepository -> persisted tenant state -> contract projection.
import { BadRequestException, Injectable } from '@nestjs/common';
import { GymsRepository } from '@/backend_superadmin/modules/superadmin/gyms/gyms.repository';
import { GymsBusinessControlsService } from '@/backend_superadmin/modules/superadmin/gyms/services/gyms-business-controls.service';
import { TenantStatus } from '@/backend_superadmin/modules/superadmin/gyms/gyms.entity';
import { UnitOfWorkService } from '@/backend_superadmin/core/database/unit-of-work.service';

@Injectable()
export class GymsBulkActionService {
  constructor(private readonly repository: GymsRepository, private readonly businessControlsService: GymsBusinessControlsService, private readonly unitOfWork: UnitOfWorkService) {}

  /** Applies one exact frontend action to all selected tenant IDs and returns the refreshed UI contract. */
  async applyGymsBulkAction(body: { action: 'Send message' | 'Extend trial' | 'Export selected' | 'Move plan' | 'Suspend selected'; gymIds: string[]; targetPlan?: string }): Promise<unknown> {
    const action = typeof body.action === 'string' ? body.action : '';
    const gymIds = Array.isArray(body.gymIds) ? body.gymIds.filter((value): value is string => typeof value === 'string') : [];
    if (!gymIds.length) throw new BadRequestException('gymIds must contain at least one tenant ID');
    if (!['Send message', 'Extend trial', 'Export selected', 'Move plan', 'Suspend selected'].includes(action)) throw new BadRequestException('Unsupported gyms bulk action');
    if (action === 'Move plan' && typeof body.targetPlan !== 'string') throw new BadRequestException('targetPlan is required for Move plan');
    await this.unitOfWork.run(async () => { for (const id of gymIds) await this.applyOne(id, action, body); });
    return this.businessControlsService.findGymsBusinessControls({ filter: 'all' });
  }

  /** Applies one action to one tenant and delegates persistence to named repository mutations. */
  private async applyOne(id: string, action: string, body: { action: string; gymIds: string[]; targetPlan?: string }): Promise<void> {
    const tenant = await this.repository.findByIdOrThrow(id);
    if (action === 'Suspend selected') { await this.repository.updateGymsById(id, { status: TenantStatus.SUSPENDED }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Move plan') { await this.repository.updateGymsById(id, { plan: String(body.targetPlan) }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Extend trial') { await this.repository.updateGymsById(id, { trialEndsAt: new Date(Date.now() + 7 * 86400000), status: TenantStatus.TRIAL }); await this.repository.recordAdministrativeAction(id, action); return; }
    if (action === 'Send message' || action === 'Export selected') { await this.repository.recordAdministrativeAction(id, action); return; }
    void tenant;
  }
}
