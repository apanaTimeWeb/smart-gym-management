// RESPONSIBILITY: Maps member ORM state into the explicit Trainer member response contract without nullable/optional mismatches.
// FLOW: TrainerMembersMemberEntity → enum/snapshot normalization → optional-field omission → MembersMemberDomain.

import type { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';
import { TrainerMembersEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enum.mapper';
import type { MembersMemberDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.domain';

/**
 * Maps a member persistence row into the current Trainer frontend contract.
 * @param entity Member row plus optional workout history.
 * @returns Frontend-compatible member data with null optional persistence fields omitted.
 * @remarks Required fields remain present; optional UI fields are omitted rather than emitted as null.
 */
/**
 * @description Executes MembersMemberMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for MembersMemberMapper.
 * @returns {MembersMemberDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function MembersMemberMapper(entity: TrainerMembersMemberEntity & { workoutHistory?: MembersMemberDomain['workoutHistory'] }): MembersMemberDomain {
  const plan = entity.planName ? { id: entity.planId, name: entity.planName, tier: entity.planTier ?? '' } : undefined;
  const assignedDiet = TrainerMembersEnumMapper.toApiDietSnapshot(entity.assignedDietSnapshot);
  const assignedWorkout = TrainerMembersEnumMapper.toApiWorkoutSnapshot(entity.assignedWorkoutSnapshot);
  const lastWorkout = entity.lastWorkout?.toISOString();
  const progressStatus = entity.progressStatus ? TrainerMembersEnumMapper.toApiProgress(entity.progressStatus) as MembersMemberDomain['progressStatus'] : undefined;

  return {
    id: entity.id, name: entity.name, email: entity.email, phone: entity.phone, gender: entity.gender, branch: entity.branch, planId: entity.planId,
    billingCycle: TrainerMembersEnumMapper.toApiBilling(entity.billingCycle) as MembersMemberDomain['billingCycle'], status: entity.status, joinDate: entity.joinDate.toISOString(), expiryDate: entity.expiryDate.toISOString(), createdAt: entity.createdAt.toISOString(),
    ...(entity.address !== null ? { address: entity.address } : {}),
    ...(plan ? { plan } : {}),
    ...(entity.photo !== null ? { photo: entity.photo } : {}),
    ...(entity.age !== null ? { age: entity.age } : {}),
    ...(entity.heightCm !== null ? { heightCm: Number(entity.heightCm) } : {}),
    ...(entity.weightKg !== null ? { weightKg: Number(entity.weightKg) } : {}),
    ...(lastWorkout ? { lastWorkout } : {}),
    ...(progressStatus ? { progressStatus } : {}),
    ...(entity.assignedTrainerId !== null ? { assignedTrainerId: entity.assignedTrainerId } : {}),
    ...(entity.assignedTrainerName !== null ? { assignedTrainerName: entity.assignedTrainerName } : {}),
    ...(entity.isPT !== null ? { isPT: entity.isPT } : {}),
    ...(entity.assignedDietId !== null ? { assignedDietId: entity.assignedDietId } : {}),
    ...(assignedDiet ? { assignedDiet } : {}),
    ...(entity.assignedWorkoutId !== null ? { assignedWorkoutId: entity.assignedWorkoutId } : {}),
    ...(assignedWorkout ? { assignedWorkout } : {}),
    ...(entity.fitnessLevel !== null ? { fitnessLevel: entity.fitnessLevel } : {}),
    ...(entity.targetWeightKg !== null ? { targetWeightKg: Number(entity.targetWeightKg) } : {}),
    ...(entity.bmi !== null ? { bmi: Number(entity.bmi) } : {}),
    ...(entity.medicalRestrictions !== null ? { medicalRestrictions: entity.medicalRestrictions } : {}),
    ...(entity.emergencyContact !== null ? { emergencyContact: entity.emergencyContact } : {}),
    ...(entity.bloodGroup !== null ? { bloodGroup: entity.bloodGroup } : {}),
    ...(entity.medicalHistory !== null ? { medicalHistory: entity.medicalHistory } : {}),
    ...(entity.fitnessGoal !== null ? { fitnessGoal: entity.fitnessGoal } : {}),
    ...(entity.daysSinceLastCheckIn !== null ? { daysSinceLastCheckIn: entity.daysSinceLastCheckIn } : {}),
    ...(entity.membershipNumber !== null ? { membershipNumber: entity.membershipNumber } : {}),
    ...(entity.assessment ? { assessment: entity.assessment } : {}),
    workoutHistory: entity.workoutHistory ? TrainerMembersEnumMapper.toApiWorkoutHistory(entity.workoutHistory) : [],
  };
}
