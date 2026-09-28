// RESPONSIBILITY: Replaces the trainer weekly availability inside one tenant transaction.
// FLOW: Schedule command → availability service → UnitOfWork → repository.
import { Injectable } from '@nestjs/common'; import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context'; import { CoreUnitOfWorkService } from '@/backend_trainer/backend_core/core_database/core-unit-of-work.service'; import { CoreAuditService } from '@/backend_trainer/backend_core/core_audit/core-audit.service'; import { TrainerScheduleRepository } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_repositories/trainer-schedule-repository';
import type { ScheduleAvailabilityDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-availability.domain'; import { TrainerScheduleUpdateAvailabilityBodyDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-update-availability-body.dto';
 /**
 * Intent: Defines the TrainerScheduleAvailabilityUpdateService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerScheduleAvailabilityUpdateService { constructor(private readonly uow:CoreUnitOfWorkService,private readonly repo:TrainerScheduleRepository,private readonly audit:CoreAuditService){}
 /** Replaces seven availability rows and records the mutation. */ /**
 * Intent: Executes the update operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes update inside the owning backend service/repository boundary without exposing ORM details.
 * @param dto - Input for update.
 * @returns {Promise<ScheduleAvailabilityDomain[]>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async update(dto:TrainerScheduleUpdateAvailabilityBodyDto):Promise<ScheduleAvailabilityDomain[]>{const id=CoreRequestContext.getUserIdOrThrow(); const days=dto.days.map((day)=>({day:day.day,isAvailable:day.isAvailable,startTime:day.startTime,endTime:day.endTime})); const result=await this.uow.execute(async (context)=>{const before=await this.repo.findAvailability(id); const updated=await this.repo.replaceAvailability(id,days,context); await this.audit.record('TRAINER_AVAILABILITY_UPDATED','WEEKLY_AVAILABILITY',id,{days:before.map((day)=>({day:day.day,isAvailable:day.isAvailable,startTime:day.startTime,endTime:day.endTime}))},{days:updated.map((day)=>({day:day.day,isAvailable:day.isAvailable,startTime:day.startTime,endTime:day.endTime}))},context); return updated;}); return result;} }
