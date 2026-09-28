// RESPONSIBILITY: Owns Trainer workout persistence and trainer-scoped workout queries.
// FLOW: Workout service → repository → tenant TypeORM/query builder.

import type { WorkoutListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout-list-query.type';
import type { WorkoutDomain } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.domain';
import { WorkoutMapper } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.mapper';
// RESPONSIBILITY: Owns Trainer workout-plan persistence and trainer-scoped queries.
// FLOW: Workout service → repository → tenant TypeORM.

import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer workout-plan persistence and trainer-scoped search/sort/pagination.
// FLOW: Workout service → TrainerWorkoutRepository → tenant TypeORM.

import { Injectable } from '@nestjs/common'; import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository'; import { CoreNotFoundException } from '@/backend_trainer/backend_core/core_errors/core-not-found.exception'; import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver'; import { TrainerWorkoutEntity } from '@/backend_trainer/backend_trainer_modules/trainer_workout/trainer-workout.entity';
import type { TrainerWorkoutCreatePersistenceInput, TrainerWorkoutUpdatePersistenceInput } from '@/backend_trainer/backend_trainer_modules/trainer_workout/workout_types/trainer-workout.types';

/**
 * Intent: Defines the TrainerWorkoutRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerWorkoutRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDatasourceResolver){super();}
  /** Lists active trainer-owned workout plans. */
  async findMany(trainerId:string,q:WorkoutListQuery):Promise<{rows:WorkoutDomain[];total:number}>{const repo=await this.resolver.getRepository(TrainerWorkoutEntity);const allowed={name:'w.name',category:'w.focus',difficulty:'w.level'} as const;const qb=repo.createQueryBuilder('w').where('w.deleted_at IS NULL AND w.is_active=true AND w.trainer_id=:trainerId',{trainerId});if(q.search)qb.andWhere('(w.name ILIKE :s OR w.focus ILIKE :s)',{s:`%${q.search}%`});if(q.category && q.category !== 'All')qb.andWhere('w.focus=:category',{category:q.category});qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.name,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit);const [rows,total]=await qb.getManyAndCount();return {rows:rows.map(WorkoutMapper),total};}
  /** Finds one active trainer-owned workout. */ async findById(trainerId:string,id:string):Promise<WorkoutDomain|null>{const entity=await (await this.resolver.getRepository(TrainerWorkoutEntity)).findOneBy({id,trainerId,deletedAt: IsNull()});return entity?WorkoutMapper(entity):null;}
  /** Returns one trainer-owned workout or a typed not-found error. */ async findByIdOrThrow(trainerId:string,id:string):Promise<WorkoutDomain>{const workout=await this.findById(trainerId,id);if(!workout)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);return workout;}
  /** Verifies that an optional assignment target belongs to the authenticated trainer. */
  async assertMemberOwnedByTrainer(trainerId:string,memberId:string):Promise<void>{
    const ds=await this.resolver.getDataSource();
    const row=await ds.createQueryBuilder().select('m.id','id').from('trainer_members','m').where('m.id=:memberId AND m.assigned_trainer_id=:trainerId AND m.deleted_at IS NULL',{memberId,trainerId}).getRawOne<{id:string}>();
    if(!row?.id) throw new CoreNotFoundException('WORKOUT.MEMBER',memberId);
  }
  /** Creates one trainer-owned workout plan from an application persistence input. */ async createWorkoutPlan(input:TrainerWorkoutCreatePersistenceInput,context?:CoreTransactionContext):Promise<WorkoutDomain>{const repo=context?.getRepository(TrainerWorkoutEntity) ?? await this.resolver.getRepository(TrainerWorkoutEntity);const entity=await repo.save(repo.create(input));return WorkoutMapper(entity);}
  /** Updates one trainer-owned workout plan from an application persistence input. */ async updateWorkoutPlanById(trainerId:string,id:string,input:TrainerWorkoutUpdatePersistenceInput,context?:CoreTransactionContext):Promise<WorkoutDomain>{const repo=context?.getRepository(TrainerWorkoutEntity) ?? await this.resolver.getRepository(TrainerWorkoutEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},input);if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);const entity=await repo.findOneBy({id,trainerId,deletedAt:IsNull()});if(!entity)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);return WorkoutMapper(entity);}
  /** Soft-deletes one trainer-owned workout plan. */ async softDeleteWorkoutById(trainerId:string,id:string,context?:CoreTransactionContext):Promise<void>{const result=await (context?.getRepository(TrainerWorkoutEntity) ?? await this.resolver.getRepository(TrainerWorkoutEntity)).softDelete({id,trainerId,deletedAt: IsNull()});if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);}
}
