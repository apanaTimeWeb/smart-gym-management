// RESPONSIBILITY: Builds Trainer attendance list, KPI, and member-selector response data.
// FLOW: Attendance query controller → query service → repository/mapper/domain.

import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/core/utils/core-pagination.utils';
import { AttendanceRepository, type AttendanceListQuery } from '@/backend_trainer/modules/backend_trainer/attendance/repositories/attendance-repository';
import { AttendanceRecordMapper } from '@/backend_trainer/modules/backend_trainer/attendance/attendance-record.mapper';

@Injectable()
export class AttendanceQueryService {
  constructor(private readonly repo:AttendanceRepository){}
  /** Returns trainer-scoped attendance list with pagination. */
  async findMany(query:AttendanceListQuery):Promise<{attendance:unknown[];total:number;page:number;limit:number;pagination:ReturnType<typeof buildCorePaginationMeta>}>{const id=CoreRequestContext.get().userId??'';const r=await this.repo.findMany(id,query);return {attendance:r.rows.map(AttendanceRecordMapper),total:r.total,page:query.page,limit:query.limit,pagination:buildCorePaginationMeta(r.total,query.page,query.limit)};}
  /** Returns trainer attendance KPIs. */
  async findStats():Promise<{totalCheckIns:number;memberCheckIns:number;staffCheckIns:number}>{return this.repo.findStats(CoreRequestContext.get().userId??'');}
  /** Returns trainer-owned member selector options. */
  async findMemberOptions():Promise<Array<{id:string;name:string;phone:string}>>{return this.repo.findMemberOptions(CoreRequestContext.get().userId??'');}
}
