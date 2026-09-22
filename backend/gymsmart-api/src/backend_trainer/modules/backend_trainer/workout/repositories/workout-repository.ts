import { IsNull } from 'typeorm';
// RESPONSIBILITY: Owns Trainer workout-plan persistence and trainer-scoped search/sort/pagination.
// FLOW: Workout service → WorkoutRepository → tenant TypeORM.

import { Injectable } from '@nestjs/common'; import { CoreBaseRepository } from '@/backend_trainer/core/database/core-base.repository'; import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception'; import { CoreTenantDataSourceResolver } from '@/backend_trainer/core/database/core-tenant-datasource.resolver'; import { WorkoutEntity } from '@/backend_trainer/modules/backend_trainer/workout/workout.entity';
export interface WorkoutListQuery { page:number;limit:number;search?:string;category?:string;sortBy:string;sortDirection:string; }
@Injectable() export class WorkoutRepository extends CoreBaseRepository {
  constructor(private readonly resolver:CoreTenantDataSourceResolver){super();}
  /** Lists active trainer-owned workout plans. */
  async findMany(trainerId:string,q:WorkoutListQuery):Promise<{rows:WorkoutEntity[];total:number}>{const repo=await this.resolver.getRepository(WorkoutEntity);const allowed={name:'w.name',category:'w.focus',difficulty:'w.level'} as const;const qb=repo.createQueryBuilder('w').where('w.deleted_at IS NULL AND w.is_active=true AND w.trainer_id=:trainerId',{trainerId});if(q.search)qb.andWhere('(w.name ILIKE :s OR w.focus ILIKE :s)',{s:`%${q.search}%`});if(q.category)qb.andWhere(':category=ANY(w.tags)',{category:q.category});qb.orderBy(allowed[q.sortBy as keyof typeof allowed]??allowed.name,q.sortDirection==='asc'?'ASC':'DESC').skip((q.page-1)*q.limit).take(q.limit);const [rows,total]=await qb.getManyAndCount();return {rows,total};}
  /** Finds one active trainer-owned workout. */ async findById(trainerId:string,id:string):Promise<WorkoutEntity|null>{return (await this.resolver.getRepository(WorkoutEntity)).findOneBy({id,trainerId,deletedAt: IsNull()});}
  /** Returns one trainer-owned workout or a typed not-found error. */ async findByIdOrThrow(trainerId:string,id:string):Promise<WorkoutEntity>{return this.requireEntity(await this.findById(trainerId,id), 'DOMAIN.WORKOUT.PLAN',id);}
  /** Creates one trainer-owned workout plan. */ async createWorkoutPlan(input:Partial<WorkoutEntity>):Promise<WorkoutEntity>{const repo=await this.resolver.getRepository(WorkoutEntity);return repo.save(repo.create(input));}
  /** Updates one trainer-owned workout plan. */ async updateWorkoutPlanById(trainerId:string,id:string,input:Partial<WorkoutEntity>):Promise<WorkoutEntity>{const repo=await this.resolver.getRepository(WorkoutEntity);const result=await repo.update({id,trainerId,deletedAt: IsNull()},input as any);if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);return this.findByIdOrThrow(trainerId,id);}
  /** Soft-deletes one trainer-owned workout plan. */ async softDeleteWorkoutById(trainerId:string,id:string):Promise<void>{const result=await (await this.resolver.getRepository(WorkoutEntity)).softDelete({id,trainerId,deletedAt: IsNull()});if(!result.affected)throw new CoreNotFoundException('DOMAIN.WORKOUT.PLAN',id);}
}
