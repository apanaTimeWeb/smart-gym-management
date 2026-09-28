// RESPONSIBILITY: Proves member nullable persistence fields are omitted to match the frontend optional-field schema.
// FLOW: Jest → MembersMemberMapper → null persistence values → frontend-compatible member response.

import type { TrainerMembersMemberEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.entity';
import { MembersMemberMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member.mapper';
import { MemberBillingCycle, MemberGender, MemberStatus } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enums';

describe('MembersMemberMapper', () => {
  it('omits nullable optional fields instead of emitting null', () => {
    const entity = {
      id: 'member-1', name: 'Rahul', email: 'rahul@example.com', phone: '9999999999', gender: MemberGender.MALE, address: null, branch: 'Main', planId: 'plan-1', planName: null, planTier: null,
      billingCycle: MemberBillingCycle.MONTHLY, status: MemberStatus.ACTIVE, joinDate: new Date('2026-01-01T00:00:00.000Z'), expiryDate: new Date('2026-12-31T00:00:00.000Z'), photo: null, createdAt: new Date('2026-01-01T00:00:00.000Z'),
      age: null, heightCm: null, weightKg: null, lastWorkout: null, progressStatus: null, assignedTrainerId: null, assignedTrainerName: null, isPT: null, assignedDietId: null, assignedWorkoutId: null, assignedDietSnapshot: null, assignedWorkoutSnapshot: null, fitnessLevel: null, targetWeightKg: null, bmi: null, medicalRestrictions: null, fitnessGoal: null, daysSinceLastCheckIn: null, emergencyContact: null, bloodGroup: null, medicalHistory: null, membershipNumber: null, assessment: null, workoutHistory: [],
    } as TrainerMembersMemberEntity & { workoutHistory: never[] };

    expect(MembersMemberMapper(entity)).toEqual({
      id: 'member-1', name: 'Rahul', email: 'rahul@example.com', phone: '9999999999', gender: MemberGender.MALE, branch: 'Main', planId: 'plan-1', billingCycle: 'Monthly', status: MemberStatus.ACTIVE, joinDate: '2026-01-01T00:00:00.000Z', expiryDate: '2026-12-31T00:00:00.000Z', createdAt: '2026-01-01T00:00:00.000Z', workoutHistory: [],
    });
  });

  it('normalizes numeric values inside persisted diet and workout snapshots', () => {
    const entity = {
      id: 'member-2', name: 'Asha', email: 'asha@example.com', phone: '8888888888', gender: MemberGender.FEMALE, address: null, branch: 'Main', planId: 'plan-2', planName: 'Gold', planTier: 'Gold',
      billingCycle: MemberBillingCycle.MONTHLY, status: MemberStatus.ACTIVE, joinDate: new Date('2026-01-01T00:00:00.000Z'), expiryDate: new Date('2026-12-31T00:00:00.000Z'), photo: null, createdAt: new Date('2026-01-01T00:00:00.000Z'),
      age: 28, heightCm: '165.5', weightKg: '62.2', lastWorkout: null, progressStatus: null, assignedTrainerId: null, assignedTrainerName: null, isPT: null, assignedDietId: 'diet-1',
      assignedWorkoutId: 'workout-1', assignedDietSnapshot: { id: 'diet-1', name: 'Cut', goal: 'WEIGHT_LOSS', calories: '1800', protein: '140', carbs: '160', fats: '50', complianceScore: '88' },
      assignedWorkoutSnapshot: { id: 'workout-1', name: 'Plan', level: 'INTERMEDIATE', days: '5', workoutExercises: [{ name: 'Squat', sets: '3', reps: '10' }] }, fitnessLevel: null, targetWeightKg: null, bmi: null, medicalRestrictions: null, fitnessGoal: null, daysSinceLastCheckIn: null, emergencyContact: null, bloodGroup: null, medicalHistory: null, membershipNumber: null, assessment: null, workoutHistory: [],
    } as unknown as TrainerMembersMemberEntity & { workoutHistory: never[] };

    const mapped = MembersMemberMapper(entity);
    expect(mapped.assignedDiet).toMatchObject({ calories: 1800, protein: 140, carbs: 160, fats: 50, complianceScore: 88 });
    expect(mapped.assignedWorkout).toMatchObject({ days: 5, workoutExercises: [{ sets: 3, reps: '10' }] });
  });

});
