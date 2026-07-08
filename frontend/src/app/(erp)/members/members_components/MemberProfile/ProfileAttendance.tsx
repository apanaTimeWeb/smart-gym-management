"use client";

import { useMembersContext } from '@/app/(erp)/members/members_context/MembersContext';

export default function ProfileAttendance() {
 const { selectedMember, getAtt, toggleAtt } = useMembersContext();

 if (!selectedMember) return null;

 const att = getAtt(selectedMember.id);
 const presentDays = att.filter(a => a.status === 'P').length;
 const absentDays = att.filter(a => a.status === 'A').length;
 const leaveDays = att.filter(a => a.status === 'L').length;
 const attPct = att.length > 0 ? Math.round((presentDays / att.length) * 100) : 0;

 return (
 <div>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
 {[
 { label: 'Present', value: presentDays, color: 'text-[var(--success)] dark:text-[var(--success)]', bg: 'bg-[var(--success-bg)] ' },
 { label: 'Absent', value: absentDays, color: 'text-[var(--danger)] dark:text-[var(--danger)]', bg: 'bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)]' },
 { label: 'Leave', value: leaveDays, color: 'text-[var(--warning)] dark:text-[var(--warning)]',bg: 'bg-[var(--warning-bg)] '},
 { label: 'Attendance %', value: `${attPct}%`, color: attPct >= 75 ? 'text-[var(--success)] dark:text-[var(--success)]' : 'text-[var(--danger)] dark:text-[var(--danger)]', bg: 'bg-[var(--members-bg-input)]' },
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
 status === 'P' ? 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]' 
 : status === 'A' ? 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]' 
 : 'bg-[var(--warning-bg)] text-[var(--warning)] dark:bg-[var(--warning-bg)] dark:text-[var(--warning)]'
 }`}
 >
 {day}
 </button>
 ))}
 </div>
 </div>
 );
}
