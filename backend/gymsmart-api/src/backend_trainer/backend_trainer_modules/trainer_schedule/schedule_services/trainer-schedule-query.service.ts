// RESPONSIBILITY: Reads trainer availability and leave state for the Schedule feature.
// FLOW: Schedule query controller → query service → scoped repository → mappers.
import { Injectable } from '@nestjs/common'; import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context'; import { TrainerScheduleRepository } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_repositories/trainer-schedule-repository';
/**
 * Intent: Defines the TrainerScheduleQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerScheduleQueryService { constructor(private readonly repo:TrainerScheduleRepository){}
 /** Returns trainer availability and leave records with ISO timestamps. */ /**
 * Intent: Executes the find operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes find inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<{availability:Awaited<ReturnType<TrainerScheduleRepository['findAvailability']>>;leaves:Awaited<ReturnType<TrainerScheduleRepository['findLeaves']>>}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async find():Promise<{availability:Awaited<ReturnType<TrainerScheduleRepository['findAvailability']>>;leaves:Awaited<ReturnType<TrainerScheduleRepository['findLeaves']>>}>{const id=CoreRequestContext.getUserIdOrThrow();const availability=await this.repo.findAvailability(id);const leaves=await this.repo.findLeaves(id);return {availability:availability,leaves:leaves};} }
