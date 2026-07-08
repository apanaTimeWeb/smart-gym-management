"use client";

import { useMembersContext } from '../../members_context/MembersContext';

export default function ProfileAttendance() {
  const { selectedMember, getAtt, toggleAtt } = useMembersContext();

  if (!selectedMember) return null;

  const att = getAtt(selectedMember.id);
  const presentDays = att.filter(a => a.status === 'P').length;
  const absentDays  = att.filter(a => a.status === 'A').length;
  const leaveDays   = att.filter(a => a.status === 'L').length;
  const attPct      = att.length > 0 ? Math.round((presentDays / att.length) * 100) : 0;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Present',      value: presentDays, color: 'text-green-600 dark:text-green-500', bg: 'bg-green-50 dark:bg-green-950/30' },
          { label: 'Absent',       value: absentDays,  color: 'text-red-600 dark:text-red-500',   bg: 'bg-red-50 dark:bg-red-950/30'   },
          { label: 'Leave',        value: leaveDays,   color: 'text-yellow-600 dark:text-yellow-500',bg: 'bg-yellow-50 dark:bg-yellow-950/30'},
          { label: 'Attendance %', value: `${attPct}%`, color: attPct >= 75 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500', bg: 'bg-[var(--members-bg-input)]' },
        ].map((s, i) => (
          <div key={i} className={`${s.bg} rounded-xl p-4 border border-[var(--members-border)]`}>
            <p className="text-xs text-[var(--members-text-secondary)] mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-[var(--members-text-secondary)] mb-3 opacity-70">
        Click a day to toggle: 🟢 Present → 🔴 Absent → 🟡 Leave
      </p>
      <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
        {att.map(({ day, status }) => (
          <button 
            key={day} 
            onClick={() => toggleAtt(selectedMember.id, day)}
            className={`h-10 w-full rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110 ${
              status === 'P' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' 
              : status === 'A' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' 
              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
