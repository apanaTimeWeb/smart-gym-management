'use client';
// RESPONSIBILITY: Renders member overview metrics, recent progress, and trainer-safe contact actions using API-backed data.
// DATA FLOW: selectedMemberId → TanStack Query member/progress data → TrainerMembersProfileOverview.
import { MessageCircle, Mail, Target } from 'lucide-react';
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import { useTrainerMemberProgressEntriesQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';
import { displayValue, formatDate } from '@/lib/formatters';

export default function TrainerMembersProfileOverview() {
  const { member: selectedMember } = useTrainerSelectedMember();
  const openMsg = useTrainerMembersStore((state) => state.openMsg);
  const { data: progressEntries = [], isPending } = useTrainerMemberProgressEntriesQuery(selectedMember?.id ?? '');
  if (!selectedMember) return null;
  const latest = progressEntries.at(-1);
  const previous = progressEntries.at(-2);
  const weightChange = latest && previous ? latest.weightKg - previous.weightKg : null;
  return <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
    <div className="xl:col-span-2 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl"><p className="text-xs text-secondary mb-1">Fitness Goal</p><p className="text-sm font-semibold text-primary">{displayValue(selectedMember.fitnessGoal)}</p></div>
        <div className="bg-card border border-border p-4 rounded-xl"><p className="text-xs text-secondary mb-1">Days Since Last Check-in</p><p className="text-sm font-semibold text-primary">{displayValue(selectedMember.daysSinceLastCheckIn)}</p></div>
      </div>
      <div><h3 className="font-semibold text-primary mb-3">Physical Progress</h3><div className="bg-card border border-border p-4 rounded-xl min-h-48">
        {isPending ? <div className="space-y-4 motion-safe:animate-pulse">{[1,2,3].map((row) => <div key={row} className="h-4 rounded bg-skeleton-base" />)}</div> : latest ? <div className="space-y-4"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm text-secondary">Latest: {formatDate(latest.date)}</span><span className="text-sm font-semibold text-primary">{latest.weightKg} kg</span></div><div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><div><p className="text-xs text-secondary">BMI</p><p className="font-semibold text-primary">{latest.bmi}</p></div><div><p className="text-xs text-secondary">Body Fat</p><p className="font-semibold text-primary">{displayValue(latest.bodyFatPercent)}{latest.bodyFatPercent != null ? '%' : ''}</p></div><div><p className="text-xs text-secondary">Muscle Mass</p><p className="font-semibold text-primary">{displayValue(latest.muscleMassKg)}{latest.muscleMassKg != null ? ' kg' : ''}</p></div><div><p className="text-xs text-secondary">Weight Change</p><p className="font-semibold text-primary">{weightChange == null ? '—' : `${weightChange > 0 ? '+' : ''}${weightChange} kg`}</p></div></div></div> : <p className="text-sm text-secondary">No progress measurements available.</p>}
      </div></div>
    </div>
    <div><h3 className="font-semibold text-primary mb-3">Member Actions</h3><div className="bg-floating rounded-xl p-4 mb-4 border border-border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-primary-subtle text-on-primary flex items-center justify-center"><Target size={20} /></div><div><p className="text-xs text-secondary">Coaching Status</p><p className="text-sm font-semibold text-primary">{displayValue(selectedMember.progressStatus)}</p></div></div></div><div className="flex flex-col gap-2"><button type="button" onClick={() => openMsg({ name: selectedMember.name, phone: selectedMember.phone, email: selectedMember.email }, 'whatsapp', '')} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl justify-center bg-success motion-safe:transition-colors hover:opacity-90"><MessageCircle size={14} />Send WhatsApp</button><button type="button" onClick={() => openMsg({ name: selectedMember.name, phone: selectedMember.phone, email: selectedMember.email }, 'email', '')} className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-on-success rounded-xl justify-center bg-info motion-safe:transition-colors hover:opacity-90"><Mail size={14} />Send Email</button></div></div>
  </div>;
}
