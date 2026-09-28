// RESPONSIBILITY: Executes isolated Trainer workout/exercise mutations with ownership, persistence, and atomic audit rules.
// FLOW: Workout command controller → command service → UnitOfWork → repository + audit → mapper.
import { Injectable } from '@nestjs/common';
import type { TrainerWorkoutCreatePersistenceInput, TrainerWorkoutExerciseUpdatePersistenceInput, TrainerWorkoutUpdatePersistenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout.types';
import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service';
import { TrainerWorkoutRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-repository';
import { TrainerWorkoutExercisesRepository } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_repositories/trainer-workout-exercises.repository';
import { TrainerWorkoutCreateWorkoutDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-workout.dto';
import { TrainerWorkoutUpdateWorkoutDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-update-workout.dto';
import { TrainerWorkoutCreateExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-create-exercise.dto';
import { TrainerWorkoutUpdateExerciseDto } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_dtos/trainer-workout-update-exercise.dto';
import type { WorkoutDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.domain';
import type { WorkoutExerciseDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.domain';
/**
 * Intent: Defines the TrainerWorkoutCommandService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerWorkoutCommandService {
  constructor(private readonly workouts: TrainerWorkoutRepository, private readonly exercises: TrainerWorkoutExercisesRepository, private readonly audit: CoreAuditService, private readonly uow: CoreUnitOfWorkService) {}
  /**
 * Intent: Executes the createWorkout operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createWorkout inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for createWorkout.
 * @returns {Promise<WorkoutDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async createWorkout(dto: TrainerWorkoutCreateWorkoutDto): Promise<WorkoutDomain> {
    const trainerId = this.getTrainerId();
    await this.assertOptionalMemberOwnership(trainerId, dto.assignedMemberId);
    const row = await this.uow.execute(async (context) => {
      const created = await this.workouts.createWorkoutPlan(this.toWorkoutInput(trainerId, dto), context);
      await this.audit.record('WORKOUT_CREATED', 'WORKOUT', created.id, null, { name: created.name }, context);
      return created;
    });
    return row;
  }
  /**
 * Intent: Executes the updateWorkout operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes updateWorkout inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for updateWorkout.
 * @param dto - Input for updateWorkout.
 * @returns {Promise<WorkoutDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateWorkout(id: string, dto: TrainerWorkoutUpdateWorkoutDto): Promise<WorkoutDomain> {
    const trainerId = this.getTrainerId();
    await this.assertOptionalMemberOwnership(trainerId, dto.assignedMemberId);
    const before = await this.workouts.findByIdOrThrow(trainerId, id);
    const row = await this.uow.execute(async (context) => {
      const updated = await this.workouts.updateWorkoutPlanById(trainerId, id, this.toWorkoutUpdate(dto), context);
      await this.audit.record('WORKOUT_UPDATED', 'WORKOUT', id, { name: before.name, level: before.level, days: before.days, exercisesCount: before.exercisesCount, focus: before.focus, duration: before.duration, tags: before.tags, goal: before.goal, startDate: before.startDate, endDate: before.endDate, instructions: before.instructions, assignedMemberId: before.assignedMemberId }, { name: updated.name, level: updated.level, days: updated.days, exercisesCount: updated.exercisesCount, focus: updated.focus, duration: updated.duration, tags: updated.tags, goal: updated.goal, startDate: updated.startDate, endDate: updated.endDate, instructions: updated.instructions, assignedMemberId: updated.assignedMemberId }, context);
      return updated;
    });
    return row;
  }
  /**
 * Intent: Executes the deleteWorkout operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes deleteWorkout inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for deleteWorkout.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async deleteWorkout(id: string): Promise<null> {
    const trainerId = this.getTrainerId();
    await this.workouts.findByIdOrThrow(trainerId, id);
    await this.uow.execute(async (context) => {
      await this.workouts.softDeleteWorkoutById(trainerId, id, context);
      await this.audit.record('WORKOUT_DELETED', 'WORKOUT', id, null, { deleted: true }, context);
    });
    return null;
  }
  /**
 * Intent: Executes the createExercise operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createExercise inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for createExercise.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async createExercise(dto: TrainerWorkoutCreateExerciseDto): Promise<WorkoutExerciseDomain> {
    const trainerId = this.getTrainerId();
    const row = await this.uow.execute(async (context) => {
      const created = await this.exercises.createExercise({ trainerId, name: dto.name, category: dto.category ?? null, muscleGroup: [dto.muscle], equipment: dto.equipment ?? null, difficulty: dto.difficulty, instructions: dto.instructions ?? null, videoUrl: dto.videoUrl ?? null, imageUrl: dto.imageUrl ?? null, reps: dto.reps ?? null, duration: dto.duration ?? null, description: dto.description ?? null, isActive: true }, context);
      await this.audit.record('EXERCISE_CREATED', 'EXERCISE', created.id, null, { name: created.name }, context);
      return created;
    });
    return row;
  }
  /**
 * Intent: Executes the updateExercise operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes updateExercise inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for updateExercise.
 * @param dto - Input for updateExercise.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateExercise(id: string, dto: TrainerWorkoutUpdateExerciseDto): Promise<WorkoutExerciseDomain> {
    const trainerId = this.getTrainerId();
    const before = await this.exercises.findByIdOrThrow(trainerId, id);
    const row = await this.uow.execute(async (context) => {
      const updateInput: TrainerWorkoutExerciseUpdatePersistenceInput = { name: dto.name, category: dto.category, muscleGroup: dto.muscle === undefined ? undefined : [dto.muscle], equipment: dto.equipment, difficulty: dto.difficulty, instructions: dto.instructions, videoUrl: dto.videoUrl, imageUrl: dto.imageUrl, reps: dto.reps, duration: dto.duration, description: dto.description };
      const updated = await this.exercises.updateExerciseById(trainerId, id, updateInput, context);
      await this.audit.record('EXERCISE_UPDATED', 'EXERCISE', id, { name: before.name, category: before.category, muscleGroup: before.muscleGroup, equipment: before.equipment, difficulty: before.difficulty, instructions: before.instructions, videoUrl: before.videoUrl, imageUrl: before.imageUrl, reps: before.reps, duration: before.duration, description: before.description }, { name: updated.name, category: updated.category, muscleGroup: updated.muscleGroup, equipment: updated.equipment, difficulty: updated.difficulty, instructions: updated.instructions, videoUrl: updated.videoUrl, imageUrl: updated.imageUrl, reps: updated.reps, duration: updated.duration, description: updated.description }, context);
      return updated;
    });
    return row;
  }
  /**
 * Intent: Executes the deleteExercise operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes deleteExercise inside the owning backend service/repository boundary without exposing ORM details.
 * @param id - Input for deleteExercise.
 * @returns {Promise<null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async deleteExercise(id: string): Promise<null> {
    const trainerId = this.getTrainerId();
    await this.exercises.findByIdOrThrow(trainerId, id);
    await this.uow.execute(async (context) => {
      await this.exercises.softDeleteExerciseById(trainerId, id, context);
      await this.audit.record('EXERCISE_DELETED', 'EXERCISE', id, null, { deleted: true }, context);
    });
    return null;
  }
  /**
 * Intent: Executes the getTrainerId operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getTrainerId inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private getTrainerId(): string {
    return CoreRequestContext.getUserIdOrThrow();
  }
  /**
 * Intent: Executes the assertOptionalMemberOwnership operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes assertOptionalMemberOwnership inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for assertOptionalMemberOwnership.
 * @param memberId - Input for assertOptionalMemberOwnership.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async assertOptionalMemberOwnership(trainerId: string, memberId?: string): Promise<void> {
    if (!memberId || memberId.trim() === '') return;
    await this.workouts.assertMemberOwnedByTrainer(trainerId, memberId);
  }
  /**
 * Intent: Executes the toWorkoutInput operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toWorkoutInput inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for toWorkoutInput.
 * @param dto - Input for toWorkoutInput.
 * @returns {TrainerWorkoutCreatePersistenceInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toWorkoutInput(trainerId: string, dto: TrainerWorkoutCreateWorkoutDto): TrainerWorkoutCreatePersistenceInput {
    return { trainerId, name: dto.name, level: dto.level, days: dto.days, exercisesCount: dto.exercises, focus: dto.focus, duration: dto.duration, tags: dto.tags ? dto.tags.split(',').map((value) => value.trim()).filter(Boolean) : [], goal: dto.goal ?? null, startDate: dto.startDate ?? null, endDate: dto.endDate ?? null, instructions: dto.instructions ?? null, assignedMemberId: dto.assignedMemberId ?? null, isActive: true, workoutExercises: dto.workoutExercises ?? [] };
  }
  /**
 * Intent: Executes the toWorkoutUpdate operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes toWorkoutUpdate inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for toWorkoutUpdate.
 * @returns {TrainerWorkoutUpdatePersistenceInput} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private toWorkoutUpdate(dto: TrainerWorkoutUpdateWorkoutDto): TrainerWorkoutUpdatePersistenceInput {
    return { name: dto.name, level: dto.level, days: dto.days, exercisesCount: dto.exercises, focus: dto.focus, duration: dto.duration, tags: dto.tags === undefined ? undefined : dto.tags.split(',').map((value) => value.trim()).filter(Boolean), goal: dto.goal, startDate: dto.startDate, endDate: dto.endDate, instructions: dto.instructions, assignedMemberId: dto.assignedMemberId, workoutExercises: dto.workoutExercises };
  }
}
