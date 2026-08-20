// RESPONSIBILITY: Contains logic, types, or component definition for this module.
'use client';

import { useMembersContext } from '@/app/manager/members/members_context/MembersContext';
import { useMembersStore } from '@/app/manager/members/members_store/useMembersStore';

export default function ProfileAttendance() {
 const { selectedMember } = useMembersContext();
 const attMap = useMembersStore(s => s.attMap);
 const toggleAtt = useMembersStore(s => s.toggleAtt);

 if (!selectedMember) return null;

 const att = attMap[selectedMember.id] || [];
 const presentDays = att.filter(a => a.status === 'P').length;
 const absentDays = att.filter(a => a.status === 'A').length;
 const leaveDays = att.filter(a => a.status === 'L').length;
 const attPct = att.length > 0 ? Math.round((presentDays / att.length) * 100) : 0;

 return (
 <div>
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
 {[
 { label: 'Present', value: presentDays, color: 'text-success dark:text-success', bg: 'bg-success-bg ' },
 { label: 'Absent', value: absentDays, color: 'text-destructive dark:text-destructive', bg: 'bg-danger-bg dark:bg-danger-bg' },
 { label: 'Leave', value: leaveDays, color: 'text-warning dark:text-warning',bg: 'bg-warning-bg '},
 { label: 'Attendance %', value: `${attPct}%`, color: attPct >= 75 ? 'text-success dark:text-success' : 'text-destructive dark:text-destructive', bg: 'bg-input' },
 ].map((s, i) => (
 <div key={i} className={`${s.bg} rounded-xl p-4 border border-border`}>
 <p className="text-xs text-secondary mb-1">{s.label}</p>
 <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
 </div>
 ))}
 </div>
 <p className="text-xs text-secondary mb-3 opacity-70">
 Click a day to toggle: 🟢 Present → 🔴 Absent → 🟡 Leave
 </p>
 <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-10">
 {att.map(({ day, status }) => (
 <button 
 key={day} 
 onClick={() => toggleAtt(selectedMember.id, day)}
 className={`h-10 w-full rounded-lg flex items-center justify-center text-xs font-bold transition-all hover:scale-110 ${
 status === 'P' ? 'bg-success-bg text-success dark:bg-success-bg dark:text-success' 
 : status === 'A' ? 'bg-danger-bg text-destructive dark:bg-danger-bg dark:text-destructive' 
 : 'bg-warning-bg text-warning dark:bg-warning-bg dark:text-warning'
 }`}
 >
 {day}
 </button>
 ))}
 </div>
 </div>
 );
}

