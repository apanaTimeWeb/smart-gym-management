// RESPONSIBILITY: Owns Trainer workout-exercise persistence and trainer-scoped queries.
// FLOW: Workout service → exercise repository → tenant TypeORM/query builder.

import type { WorkoutExerciseListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout-exercise-list-query.type';
import type { WorkoutExerciseDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.domain';
import { WorkoutExerciseMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.mapper';
// RESPONSIBILITY: Owns Trainer exercise-library persistence and trainer-scoped queries.
// FLOW: Workout exercise service → repository → tenant TypeORM.

import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer exercise search, create, update, and soft-delete persistence.
// FLOW: Workout service → TrainerWorkoutExercisesRepository → tenant TypeORM.

import { Injectable } from '@nestjs/common'; import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository'; import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception'; import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver'; import { TrainerWorkoutExerciseEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout-exercise.entity';
import type { TrainerWorkoutExerciseUpdatePersistenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout.types';

/**
 * Intent: Defines the TrainerWorkoutExercisesRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerWorkoutExercisesRepository extends CoreBaseRepository {
 constructor(private readonly resolver:CoreTenantDatasourceResolver){super();}
 /** Lists active trainer-owned exercises with allowlisted sort fields. */ /**
 * @description Executes findMany inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findMany.
 * @param q - Input for findMany.
 * @returns {Promise<{rows:WorkoutExerciseDomain[];total:number}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMany(trainerId:string,q:WorkoutExerciseListQuery):Promise<{rows:WorkoutExerciseDomain[];total:number}>{const repo=await this.resolver.getRepository(TrainerWorkoutExerciseEntity);const allowed={name:'e.name',difficulty:'e.difficulty',category:'e.category'} as const;const qb=repo.createQueryBuilder('e').where('e.deleted_at IS NULL AND e.is_active=true AND e.trainer_id=:trainerId',{trainerId});if(q.search)qb.andWhere('(e.name ILIKE :s OR e.category ILIKE :s)',{s:`%${q.search}%`});if(q.category && q.category !== 'All')qb.andWhere(':category = ANY(e.muscle_group)',{category:q.category});qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.name,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit);const [rows,total]=await qb.getManyAndCount();return {rows:rows.map(WorkoutExerciseMapper),total};}
 /** Finds one trainer-owned exercise. */ /**
 * @description Executes findById inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findById.
 * @param id - Input for findById.
 * @returns {Promise<WorkoutExerciseDomain|null>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findById(trainerId:string,id:string):Promise<WorkoutExerciseDomain|null>{const entity=await (await this.resolver.getRepository(TrainerWorkoutExerciseEntity)).findOneBy({id,trainerId,deletedAt: IsNull()});return entity?WorkoutExerciseMapper(entity):null;}
 /** Returns one trainer-owned exercise or typed not-found. */ /**
 * @description Executes findByIdOrThrow inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for findByIdOrThrow.
 * @param id - Input for findByIdOrThrow.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findByIdOrThrow(trainerId:string,id:string):Promise<WorkoutExerciseDomain>{const exercise=await this.findById(trainerId,id);if(!exercise)throw new CoreNotFoundException('DOMAIN.WORKOUT.EXERCISE',id);return exercise;}
 /** Creates an exercise. */ /**
 * @description Executes createExercise inside the owning backend service/repository boundary without exposing ORM details.
 * @param input - Input for createExercise.
 * @param context - Input for createExercise.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async createExercise(input:Partial<TrainerWorkoutExerciseEntity>,context?:CoreTransactionContext):Promise<WorkoutExerciseDomain>{const repo=context?.getRepository(TrainerWorkoutExerciseEntity) ?? await this.resolver.getRepository(TrainerWorkoutExerciseEntity);const entity=await repo.save(repo.create(input));return WorkoutExerciseMapper(entity);}
 /** Updates one trainer-owned exercise. */ /**
 * @description Executes updateExerciseById inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for updateExerciseById.
 * @param id - Input for updateExerciseById.
 * @param input - Input for updateExerciseById.
 * @param context - Input for updateExerciseById.
 * @returns {Promise<WorkoutExerciseDomain>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async updateExerciseById(trainerId:string,id:string,input:TrainerWorkoutExerciseUpdatePersistenceInput,context?:CoreTransactionContext):Promise<WorkoutExerciseDomain>{const repo=context?.getRepository(TrainerWorkoutExerciseEntity) ?? await this.resolver.getRepository(TrainerWorkoutExerciseEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},input as any);if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.EXERCISE',id);const entity=await repo.findOneBy({id,trainerId,deletedAt:IsNull()});if(!entity)throw new CoreNotFoundException('DOMAIN.WORKOUT.EXERCISE',id);return WorkoutExerciseMapper(entity);}
 /** Soft-deletes one trainer-owned exercise. */ /**
 * @description Executes softDeleteExerciseById inside the owning backend service/repository boundary without exposing ORM details.
 * @param trainerId - Input for softDeleteExerciseById.
 * @param id - Input for softDeleteExerciseById.
 * @param context - Input for softDeleteExerciseById.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws CoreNotFoundException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async softDeleteExerciseById(trainerId:string,id:string,context?:CoreTransactionContext):Promise<void>{const result=await (context?.getRepository(TrainerWorkoutExerciseEntity) ?? await this.resolver.getRepository(TrainerWorkoutExerciseEntity)).softDelete({id,trainerId,deletedAt: IsNull()});if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.EXERCISE',id);}
}
