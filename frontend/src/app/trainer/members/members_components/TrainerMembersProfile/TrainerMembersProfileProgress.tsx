// RESPONSIBILITY: Renders API-backed member measurements and progress photos; no hardcoded member measurements.
'use client';
// DATA FLOW: selectedMemberId → TanStack Query progress entries → derived latest/first measurements → UI.
import { useTrainerMembersStore } from '@/app/trainer/members/members_store/useTrainerMembersStore';
import { useTrainerMemberProgressEntriesQuery } from '@/app/trainer/members/members_queries/useTrainerMembersQuery';
import { displayValue, formatDate, formatNumber } from '@/lib/formatters';
import Image from 'next/image';
import { Camera, Calculator } from 'lucide-react';

export default function TrainerMembersProfileProgress() {
  const memberId = useTrainerMembersStore((state) => state.selectedMemberId);
  const { data: entries = [], isPending, isError } = useTrainerMemberProgressEntriesQuery(memberId ?? '');
  if (!memberId) return null;
  if (isPending) return <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="h-56 rounded-xl bg-skeleton-base motion-safe:animate-pulse" /><div className="h-56 rounded-xl bg-skeleton-base motion-safe:animate-pulse" /></div>;
  if (isError) return <div className="rounded-xl border border-danger bg-danger-bg p-4 text-danger">Unable to load progress data. Retry the progress request.</div>;
  const ordered = [...entries].sort((a,b) => a.date.localeCompare(b.date));
  const latest = ordered.at(-1);
  const first = ordered.at(0);
  const delta = latest && first ? latest.weightKg - first.weightKg : null;
  const metrics = latest ? [
    ['Weight', `${formatNumber(latest.weightKg)} kg`, delta === null ? '—' : `${delta >= 0 ? '+' : ''}${formatNumber(delta)} kg`],
    ['Body Fat', latest.bodyFatPercent == null ? '—' : `${formatNumber(latest.bodyFatPercent)}%`, latest.bodyFatPercent == null || first?.bodyFatPercent == null ? '—' : `${formatNumber(latest.bodyFatPercent - first.bodyFatPercent)}%`],
    ['Chest', latest.chestCm == null ? '—' : `${formatNumber(latest.chestCm)} cm`, ''],
    ['Waist', latest.waistCm == null ? '—' : `${formatNumber(latest.waistCm)} cm`, ''],
    ['Muscle Mass', latest.muscleMassKg == null ? '—' : `${formatNumber(latest.muscleMassKg)} kg`, ''],
  ] : [];
  const bmi = latest?.bmi ?? null;
  return <div className="space-y-6">
    <div className="flex items-center justify-between"><h3 className="font-bold text-primary">Progress & Measurements</h3><span className="text-xs text-secondary">Source: Trainer Progress API</span></div>
    {latest ? <>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{metrics.map(([label,current,change]) => <div key={label} className="bg-card border border-border rounded-xl p-4"><p className="text-xs text-secondary mb-1">{label}</p><p className="text-lg font-bold text-primary">{current}</p><p className="text-xs text-secondary mt-1">{displayValue(change)}</p></div>)}</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border rounded-xl p-5"><h4 className="font-semibold text-primary mb-4">Measurement History</h4><div className="space-y-3">{ordered.map((entry) => <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3"><span className="text-sm text-secondary">{formatDate(entry.date)}</span><span className="text-sm font-semibold">{formatNumber(entry.weightKg ?? 0)} kg</span><span className="text-sm text-secondary">BMI {formatNumber(entry.bmi ?? 0)}</span><span className="text-sm text-secondary">Body Fat {entry.bodyFatPercent == null ? '—' : `${formatNumber(entry.bodyFatPercent)}%`}</span></div>)}</div></div>
        <div className="bg-card border border-border rounded-xl p-5 flex flex-col items-center justify-center text-center"><div className="w-12 h-12 rounded-full bg-info-bg text-info flex items-center justify-center mb-3"><Calculator size={18}/></div><h4 className="text-sm font-semibold text-secondary">Current BMI</h4><p className="text-3xl font-bold text-primary">{bmi == null ? '—' : formatNumber(bmi)}</p></div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5"><div className="flex items-center gap-2 mb-4"><Camera size={18} className="text-primary"/><h4 className="font-semibold text-primary">Progress Photos</h4></div>{latest.progressPhotos?.length ? <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{latest.progressPhotos.map((src, index) => <div key={src} className="aspect-square rounded-lg overflow-hidden bg-input"><Image src={src} alt={`Progress photo ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover" /></div>)}</div> : <p className="text-sm text-secondary">No progress photos recorded.</p>}</div>
    </> : <p className="text-sm text-secondary">No measurements recorded yet.</p>}
  </div>;
}
