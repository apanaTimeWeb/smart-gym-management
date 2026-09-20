'use client';
import { formatMemberMonthYear } from '@/app/manager/members/members_utils/ManagerMembersDateFormatters';
// RESPONSIBILITY: Contains logic, types, or component definition for this module.
import { useManagerMembersLogic } from '@/app/manager/members/members_hooks/ManagerUseManagerMembersLogic';
import { useFetchAttendance } from '@/app/manager/members/members_api/ManagerUseManagerMembersQueries';

export default function ManagerProfileAttendance() {
  const { selectedMember } = useManagerMembersLogic();
  const { data: att = [] } = useFetchAttendance(selectedMember?.id || '');

  if (!selectedMember) return null;

  const attendanceData = att as Array<{ day?: number; status?: string }>;
  const presentDays = attendanceData.filter((a) => a.status === 'P').length;
  const absentDays = attendanceData.filter((a) => a.status === 'A').length;
  const attPct = att.length > 0 ? Math.round((presentDays / att.length) * 100) : 0;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Present', value: presentDays, color: 'text-success dark:text-success', bg: 'bg-success-bg ' },
          { label: 'Absent', value: absentDays, color: 'text-danger dark:text-danger', bg: 'bg-danger-bg dark:bg-danger-bg' },
          { label: 'Attendance %', value: `${attPct}%`, color: attPct >= 75 ? 'text-success dark:text-success' : 'text-danger dark:text-danger', bg: 'bg-input' },
        ].map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-4 border border-border`}>
            <p className="text-xs text-secondary mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-secondary">
          Current Month Attendance
        </p>
        <span className="text-sm font-bold text-on-primary bg-primary-subtle px-3 py-1 rounded-full">
          {formatMemberMonthYear(new Date())}
        </span>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
        {attendanceData.map(({ day, status }) => (
          <div 
            key={day} 
            className={`h-10 w-full rounded-lg flex items-center justify-center text-xs font-bold border-none ${
              status === 'P' ? 'bg-success text-on-success' 
              : status === 'A' ? 'bg-danger text-on-danger' 
              : 'bg-input text-secondary border border-border'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

