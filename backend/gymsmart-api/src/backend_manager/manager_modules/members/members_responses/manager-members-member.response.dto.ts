// RESPONSIBILITY: Defines the complete frozen Manager member response consumed by list/detail/edit workflows.
// FLOW: Member domain projection -> explicit response fields -> canonical API envelope.
import { ApiProperty } from '@nestjs/swagger';
import { MembersPlanSnapshotResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-plan-snapshot.response.dto';
import { ManagerMembersPaymentSnapshotResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-payment-snapshot.response.dto';
import { MembersEmergencyContactResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-emergency-contact.response.dto';
import { MembersDietPlanSnapshotResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-diet-plan-snapshot.response.dto';
import { MembersWorkoutPlanSnapshotResponseDto } from '@/backend_manager/manager_modules/members/members_responses/manager-members-workout-plan-snapshot.response.dto';

export class ManagerMembersMemberResponseDto {
  @ApiProperty() id!: string; @ApiProperty() name!: string; @ApiProperty() email!: string; @ApiProperty() phone!: string; @ApiProperty() gender!: string;
  @ApiProperty({ required: false }) address?: string; @ApiProperty({ required: false }) aadhaar?: string; @ApiProperty() branch!: string; @ApiProperty() planId!: string;
  @ApiProperty({ required: false, type: MembersPlanSnapshotResponseDto }) plan?: MembersPlanSnapshotResponseDto; @ApiProperty() billingCycle!: string; @ApiProperty() status!: string;
  @ApiProperty() joinDate!: string; @ApiProperty() expiryDate!: string; @ApiProperty() paidAmount!: number; @ApiProperty() pendingAmount!: number; @ApiProperty({ required: false }) advanceAmount?: number;
  @ApiProperty({ required: false }) photo?: string; @ApiProperty() createdAt!: string; @ApiProperty({ required: false }) dateOfBirth?: string; @ApiProperty({ required: false }) acquisitionSource?: string;
  @ApiProperty({ required: false }) assignedDietId?: string; @ApiProperty({ required: false, type: MembersDietPlanSnapshotResponseDto }) assignedDiet?: MembersDietPlanSnapshotResponseDto; @ApiProperty({ required: false }) assignedWorkoutId?: string;
  @ApiProperty({ required: false, type: MembersWorkoutPlanSnapshotResponseDto }) assignedWorkout?: MembersWorkoutPlanSnapshotResponseDto; @ApiProperty({ required: false, type: MembersDietPlanSnapshotResponseDto }) dietPlan?: MembersDietPlanSnapshotResponseDto; @ApiProperty({ required: false, type: MembersWorkoutPlanSnapshotResponseDto }) workoutPlan?: MembersWorkoutPlanSnapshotResponseDto; @ApiProperty({ required: false }) medicalHistory?: string; @ApiProperty({ required: false }) assignedTrainerId?: string; @ApiProperty({ required: false }) assignedTrainerName?: string;
  @ApiProperty({ required: false }) isPT?: boolean; @ApiProperty({ required: false }) freezeUntil?: string; @ApiProperty({ required: false, type: MembersEmergencyContactResponseDto }) emergencyContact?: MembersEmergencyContactResponseDto;
  @ApiProperty({ required: false }) referralCode?: string; @ApiProperty({ required: false }) bloodGroup?: string; @ApiProperty({ required: false }) membershipNumber?: string; @ApiProperty({ required: false, type: [ManagerMembersPaymentSnapshotResponseDto] }) recentPayments?: ManagerMembersPaymentSnapshotResponseDto[];
  @ApiProperty({ example: 'INR' }) currency!: string;
}

export { ManagerMembersMemberResponseDto as MembersMemberResponseDto };
