// RESPONSIBILITY: Produces a bounded CSV attendance export for the authenticated Trainer.
// FLOW: Attendance query controller → AttendanceExportService → AttendanceRepository → tenant DB.

import { Injectable } from '@nestjs/common';
import { AttendanceRepository } from '@/backend_trainer/modules/backend_trainer/attendance/repositories/attendance-repository';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';

@Injectable()
export class AttendanceExportService {
  constructor(private readonly repo: AttendanceRepository) {}

  /** Produces a bounded CSV string using repository-owned attendance queries. */
  async exportCsv(): Promise<string> {
    const staffId = CoreRequestContext.get().userId ?? '';
    const rows = await this.repo.findExportRows(staffId);
    const escape = (value: unknown): string => `"${String(value ?? '').replaceAll('"', '""')}"`;
    return ['id,date,type,checkIn,checkOut,durationMinutes', ...rows.map((row) => [row.id, row.date instanceof Date ? row.date.toISOString() : row.date, row.type, row.checkIn instanceof Date ? row.checkIn.toISOString() : row.checkIn, row.checkOut instanceof Date ? row.checkOut.toISOString() : row.checkOut, row.durationMinutes].map(escape).join(','))].join('\n');
  }
}
