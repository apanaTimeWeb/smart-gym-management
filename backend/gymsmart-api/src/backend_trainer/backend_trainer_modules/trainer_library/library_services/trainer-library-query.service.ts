// RESPONSIBILITY: Reads diet plans and assigned-member data within the Library feature boundary.
// FLOW: Library query controller → query service → TrainerLibraryDietPlanRepository.
import { Injectable } from '@nestjs/common'; import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context'; import { TrainerLibraryDietPlanRepository } from '@/backend_trainer/backend_trainer_modules/trainer_library/library_repositories/trainer-library-diet-plan.repository'; import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
 /**
 * Intent: Defines the TrainerLibraryQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable() export class TrainerLibraryQueryService { constructor(private readonly repo:TrainerLibraryDietPlanRepository){}
 /** Returns paginated diet plans for trainer lookup. */ /**
 * Intent: Executes the findDietPlans operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findDietPlans inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findDietPlans.
 * @returns {Promise<{dietPlans:Awaited<ReturnType<TrainerLibraryDietPlanRepository['findDietPlans']>>['rows'];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findDietPlans(query:{page:number;limit:number;search?:string;goal?:string;sortBy:string;sortDirection:string}):Promise<{dietPlans:Awaited<ReturnType<TrainerLibraryDietPlanRepository['findDietPlans']>>['rows'];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{const result=await this.repo.findDietPlans(query); return {dietPlans:result.rows,total:result.total,page:query.page,limit:query.limit,pagination:buildCorePaginationMeta(result.total,query.page,query.limit)};}
 /** Returns member assignment rows. */ /**
 * Intent: Executes the findAssignedMembers operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findAssignedMembers inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<Array<Record<string,unknown>>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findAssignedMembers():Promise<Array<Record<string,unknown>>>{return this.repo.findAssignedMembers(CoreRequestContext.getUserIdOrThrow());} }
