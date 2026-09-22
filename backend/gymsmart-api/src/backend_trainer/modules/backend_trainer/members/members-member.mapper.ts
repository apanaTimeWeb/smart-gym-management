// RESPONSIBILITY: Maps member ORM state into the explicit Trainer member domain contract.
// FLOW: MembersMemberEntity → MembersMemberMapper → MembersMemberDomain.

import type { MembersMemberEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member.entity';
import type { MembersMemberDomain } from '@/backend_trainer/modules/backend_trainer/members/members-member.domain';

export function MembersMemberMapper(entity: MembersMemberEntity): MembersMemberDomain {
  return {
    id: entity.id,
    name: entity.name,
    email: entity.email,
    phone: entity.phone,
    gender: entity.gender,
    address: entity.address,
    branch: entity.branch,
    planId: entity.planId,
    plan: entity.planName ? { id: entity.planId, name: entity.planName, tier: entity.planTier ?? '' } : null,
    billingCycle: entity.billingCycle,
    status: entity.status,
    joinDate: entity.joinDate.toISOString(),
    expiryDate: entity.expiryDate.toISOString(),
    photo: entity.photo,
    createdAt: entity.createdAt.toISOString(),
    age: entity.age,
    heightCm: entity.heightCm,
    weightKg: entity.weightKg,
    lastWorkout: entity.lastWorkout?.toISOString() ?? null,
    progressStatus: entity.progressStatus,
    assignedTrainerId: entity.assignedTrainerId,
    assignedTrainerName: entity.assignedTrainerName,
    isPT: entity.isPT,
    assignedDietId: entity.assignedDietId,
    assignedWorkoutId: entity.assignedWorkoutId,
    assignedDiet: entity.assignedDietSnapshot,
    assignedWorkout: entity.assignedWorkoutSnapshot,
    fitnessLevel: entity.fitnessLevel,
    targetWeightKg: entity.targetWeightKg,
    bmi: entity.bmi,
    medicalRestrictions: entity.medicalRestrictions,
    fitnessGoal: entity.fitnessGoal,
    daysSinceLastCheckIn: entity.daysSinceLastCheckIn,
    membershipNumber: entity.membershipNumber,
    assessment: entity.assessment,
  };
}
