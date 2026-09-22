import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/members.
// FLOW: HTTP payload -> MembersCreateMemberRequestDto -> MembersCreateMemberService -> orchestrator.
import { IsArray, IsObject, IsOptional } from 'class-validator';
import type { MembersDietPlanSnapshot, MembersPaymentSnapshot, MembersPlanSnapshot, MembersWorkoutSnapshot } from '@/modules/manager/members/members.interfaces';

export class MembersCreateMemberRequestDto extends CoreRequestDto {
  @IsOptional() @IsObject() plan?: MembersPlanSnapshot;
  @IsOptional() @IsArray() recentPayments?: MembersPaymentSnapshot[];
  @IsOptional() @IsObject() dietPlan?: MembersDietPlanSnapshot;
  @IsOptional() @IsObject() workoutPlan?: MembersWorkoutSnapshot;
  @IsOptional() @IsObject() assignedDiet?: MembersDietPlanSnapshot;
  @IsOptional() @IsObject() assignedWorkout?: MembersWorkoutSnapshot;
}
