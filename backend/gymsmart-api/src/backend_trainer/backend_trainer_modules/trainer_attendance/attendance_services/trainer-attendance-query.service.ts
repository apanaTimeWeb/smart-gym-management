// RESPONSIBILITY: Builds Trainer attendance list, KPI, and member-selector response data.
// FLOW: Attendance query controller → query service → repository/mapper/domain.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import { TrainerAttendanceRepository } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_repositories/trainer-attendance-repository';
import type { AttendanceListQuery } from '@/backend_trainer/backend_trainer_modules/trainer_attendance/attendance_types/trainer-attendance-list-query.type';
/**
 * Intent: Defines the TrainerAttendanceQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerAttendanceQueryService {
  constructor(private readonly repo:TrainerAttendanceRepository){}
  /** Returns trainer-scoped attendance list with pagination. */
  /**
 * Intent: Executes the findMany operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMany inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findMany.
 * @returns {Promise<{attendance:unknown[];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMany(query:AttendanceListQuery):Promise<{attendance:unknown[];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{const id=CoreRequestContext.getUserIdOrThrow();const r=await this.repo.findMany(id,query);return {attendance:r.rows,total:r.total,page:query.page,limit:query.limit,pagination:buildCorePaginationMeta(r.total,query.page,query.limit)};}
  /** Returns trainer attendance KPIs. */
  /**
 * Intent: Executes the findStats operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findStats inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<{totalCheckIns:number;memberCheckIns:number;staffCheckIns:number}>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findStats():Promise<{totalCheckIns:number;memberCheckIns:number;staffCheckIns:number}>{return this.repo.findStats(CoreRequestContext.getUserIdOrThrow());}
  /** Returns trainer-owned member selector options. */
  /**
 * Intent: Executes the findMemberOptions operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMemberOptions inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<Array<{id:string;name:string;phone:string}>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMemberOptions():Promise<Array<{id:string;name:string;phone:string}>>{return this.repo.findMemberOptions(CoreRequestContext.getUserIdOrThrow());}
}
