// RESPONSIBILITY: Maps leave-request persistence to the Trainer schedule response contract.
// FLOW: ScheduleLeaveRequestEntity → ScheduleLeaveMapper → API data.

import type { ScheduleLeaveRequestEntity } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-leave-request.entity';
export function ScheduleLeaveMapper(entity:ScheduleLeaveRequestEntity){return {id:entity.id,trainerId:entity.trainerId,startDate:entity.startDate,endDate:entity.endDate,reason:entity.reason,leaveType:entity.leaveType,status:entity.status,managerNotes:entity.managerNotes,totalDays:entity.totalDays,attachmentUrl:entity.attachmentUrl,approvedBy:entity.approvedBy,rejectedReason:entity.rejectedReason,createdAt:entity.createdAt.toISOString(),updatedAt:entity.updatedAt.toISOString()};}
