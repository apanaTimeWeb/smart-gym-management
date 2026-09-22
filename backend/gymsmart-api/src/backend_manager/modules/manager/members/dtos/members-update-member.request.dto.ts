// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/members/:id.
// FLOW: HTTP payload -> MembersUpdateMemberRequestDto -> MembersUpdateMemberService -> orchestrator.
import { IsArray, IsObject, IsOptional } from 'class-validator';
import type { MembersDietPlanSnapshot, MembersPaymentSnapshot, MembersPlanSnapshot, MembersWorkoutSnapshot } from '@/backend_manager/modules/manager/members/members.interfaces';

export class MembersUpdateMemberRequestDto extends CoreRequestDto {
  @IsOptional() @IsObject() plan!: MembersPlanSnapshot;
  @IsOptional() @IsArray() recentPayments!: MembersPaymentSnapshot[];
  @IsOptional() @IsObject() dietPlan!: MembersDietPlanSnapshot;
  @IsOptional() @IsObject() workoutPlan!: MembersWorkoutSnapshot;
  @IsOptional() @IsObject() assignedDiet!: MembersDietPlanSnapshot;
  @IsOptional() @IsObject() assignedWorkout!: MembersWorkoutSnapshot;
}
