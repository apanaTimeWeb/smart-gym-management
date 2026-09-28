// RESPONSIBILITY: Translates member enum values between canonical persistence values and frozen frontend labels.
// FLOW: HTTP payload/ORM enum → TrainerMembersEnumMapper → frontend/API contract.
import { CoreDomainBadRequestException } from '@/backend_trainer/backend_core/core_errors/core-domain-bad-request.exception';
import { MemberBillingCycle, MemberGender, MemberProgressStatus, MemberStatus } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enums';

/**
 * Intent: Defines the TrainerMembersEnumMapper boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersEnumMapper {
  /** Normalizes member status. */ static toStatus(v:unknown):MemberStatus{const m:Record<string,MemberStatus>={ACTIVE:MemberStatus.ACTIVE,INACTIVE:MemberStatus.INACTIVE,EXPIRED:MemberStatus.EXPIRED,PENDING:MemberStatus.PENDING};const r=typeof v==='string'?m[v]:undefined;if(!r)throw new CoreDomainBadRequestException('MEMBERS.ENUM.STATUS_INVALID');return r;}
  /** Normalizes progress status. */ static toProgress(v:unknown):MemberProgressStatus{const m:Record<string,MemberProgressStatus>={Good:MemberProgressStatus.GOOD,GOOD:MemberProgressStatus.GOOD,Average:MemberProgressStatus.AVERAGE,AVERAGE:MemberProgressStatus.AVERAGE,'Needs Attention':MemberProgressStatus.NEEDS_ATTENTION,NEEDS_ATTENTION:MemberProgressStatus.NEEDS_ATTENTION};const r=typeof v==='string'?m[v]:undefined;if(!r)throw new CoreDomainBadRequestException('MEMBERS.ENUM.PROGRESS_INVALID');return r;}
  /** Normalizes billing cycle. */ static toBilling(v:unknown):MemberBillingCycle{const m:Record<string,MemberBillingCycle>={Monthly:MemberBillingCycle.MONTHLY,MONTHLY:MemberBillingCycle.MONTHLY,Quarterly:MemberBillingCycle.QUARTERLY,QUARTERLY:MemberBillingCycle.QUARTERLY,Yearly:MemberBillingCycle.YEARLY,YEARLY:MemberBillingCycle.YEARLY};const r=typeof v==='string'?m[v]:undefined;if(!r)throw new CoreDomainBadRequestException('MEMBERS.ENUM.BILLING_INVALID');return r;}
  /** Converts canonical progress to frontend label. */ static toApiProgress(v:MemberProgressStatus):string{return v===MemberProgressStatus.GOOD?'Good':v===MemberProgressStatus.AVERAGE?'Average':'Needs Attention';}
  /** Converts canonical billing to frontend label. */ static toApiBilling(v:MemberBillingCycle):string{return v===MemberBillingCycle.MONTHLY?'Monthly':v===MemberBillingCycle.QUARTERLY?'Quarterly':'Yearly';}

  /** Converts a persisted workout snapshot into the frozen frontend label contract. */
  static toApiWorkoutSnapshot(value: Record<string, unknown> | null | undefined): Record<string, unknown> | null | undefined {
    if (!value) return value;
    const next = { ...value };
    if (typeof next.level === 'string') next.level = ({ BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced', Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' } as Record<string, string>)[next.level] ?? next.level;
    if (next.days !== null && next.days !== undefined) next.days = Number(next.days);
    if (Array.isArray(next.workoutExercises)) next.workoutExercises = next.workoutExercises.map((exercise) => {
      if (!exercise || typeof exercise !== 'object') return exercise;
      const item = { ...(exercise as Record<string, unknown>) };
      if (item.sets !== null && item.sets !== undefined) item.sets = Number(item.sets);
      return item;
    });
    return next;
  }
  /** Converts a persisted diet snapshot into the frozen frontend label contract. */
  static toApiDietSnapshot(value: Record<string, unknown> | null | undefined): Record<string, unknown> | null | undefined {
    if (!value) return value;
    const next = { ...value };
    if (typeof next.goal === 'string') next.goal = ({ WEIGHT_LOSS: 'Weight Loss', MAINTENANCE: 'Maintenance', MUSCLE_GAIN: 'Muscle Gain', 'Weight Loss': 'Weight Loss', Maintenance: 'Maintenance', 'Muscle Gain': 'Muscle Gain' } as Record<string, string>)[next.goal] ?? next.goal;
    for (const key of ['calories', 'protein', 'carbs', 'fats', 'complianceScore']) {
      if (next[key] !== null && next[key] !== undefined) next[key] = Number(next[key]);
    }
    return next;
  }
  /** Converts persisted workout-history enum fields into the frozen frontend labels. */
  static toApiWorkoutHistory(rows: Array<{ id: string; name: string; date: string; level: string; status: string }>): Array<{ id: string; name: string; date: string; level: string; status: string }> {
    const labels: Record<string, string> = { BEGINNER: 'Beginner', INTERMEDIATE: 'Intermediate', ADVANCED: 'Advanced', Beginner: 'Beginner', Intermediate: 'Intermediate', Advanced: 'Advanced' };
    return rows.map((row) => ({ ...row, level: labels[row.level] ?? row.level }));
  }
}

