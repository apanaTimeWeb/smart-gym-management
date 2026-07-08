"use client";

import { SCHEDULE } from '@/app/(landing)/landing_utils/LandingSharedConstants';

export default function LandingSchedule() {
 return (
 <section id="schedule" className="py-24 px-4 bg-[var(--landing-bg-dark)]">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <div className="inline-block text-xs font-bold tracking-widest uppercase text-[var(--warning)] bg-[var(--warning)]/10 border border-[var(--warning)]/20 rounded-full px-4 py-2 mb-5">
 Timetable
 </div>
 <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
 Class <span style={{ background: 'var(--landing-text-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Schedule</span>
 </h2>
 <p className="text-[var(--landing-text-secondary)] max-w-xl mx-auto">
 Dynamic batches designed for morning and evening flexibility
 </p>
 </div>
 <div className="overflow-x-auto">
 <table className="w-full min-w-[800px] border-collapse bg-[var(--landing-bg-card)] rounded-2xl overflow-hidden border border-[var(--landing-border)]">
 <thead>
 <tr className="bg-white/10 text-white">
 <th className="py-4 px-4 text-left font-semibold">Time</th>
 <th className="py-4 px-4 text-left font-semibold">Monday</th>
 <th className="py-4 px-4 text-left font-semibold">Tuesday</th>
 <th className="py-4 px-4 text-left font-semibold">Wednesday</th>
 <th className="py-4 px-4 text-left font-semibold">Thursday</th>
 <th className="py-4 px-4 text-left font-semibold">Friday</th>
 <th className="py-4 px-4 text-left font-semibold">Saturday</th>
 <th className="py-4 px-4 text-left font-semibold text-[var(--warning)]">Sunday</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-[var(--landing-border)]">
 {SCHEDULE.map((row, i) => (
 <tr key={i} className="hover:bg-white/5 transition-colors text-sm text-[var(--text-secondary)]">
 <td className="py-4 px-4 font-semibold text-[var(--warning)]">{row.time}</td>
 <td className="py-4 px-4">{row.monday}</td>
 <td className="py-4 px-4">{row.tuesday}</td>
 <td className="py-4 px-4">{row.wednesday}</td>
 <td className="py-4 px-4">{row.thursday}</td>
 <td className="py-4 px-4">{row.friday}</td>
 <td className="py-4 px-4">{row.saturday}</td>
 <td className="py-4 px-4 text-[var(--landing-text-muted)]">{row.sunday}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </section>
 );
}
