// RESPONSIBILITY: Translates diet-goal values between canonical persistence values and frozen frontend labels.
// FLOW: HTTP payload/ORM enum → TrainerLibraryEnumMapper → frontend/API contract.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';

/**
 * Intent: Defines the TrainerLibraryEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerLibraryEnumMapper {
  /** Normalizes frontend diet-goal labels to canonical values. */
  static toGoal(value: unknown): DietGoal { const map: Record<string,DietGoal>={ 'Weight Loss':DietGoal.WEIGHT_LOSS,WEIGHT_LOSS:DietGoal.WEIGHT_LOSS,Maintenance:DietGoal.MAINTENANCE,MAINTENANCE:DietGoal.MAINTENANCE,'Muscle Gain':DietGoal.MUSCLE_GAIN,MUSCLE_GAIN:DietGoal.MUSCLE_GAIN }; const result=typeof value==='string'?map[value]:undefined; if(!result)throw new CoreDomainBadRequestException('LIBRARY.ENUM.GOAL_INVALID'); return result; }
  /** Converts canonical diet-goal values to frozen frontend labels. */
  static toApiGoal(value:DietGoal):string{return value===DietGoal.WEIGHT_LOSS?'Weight Loss':value===DietGoal.MAINTENANCE?'Maintenance':'Muscle Gain';}
}
