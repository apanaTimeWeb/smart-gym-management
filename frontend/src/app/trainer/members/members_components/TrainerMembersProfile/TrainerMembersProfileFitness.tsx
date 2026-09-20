// RESPONSIBILITY: Renders fitness and medical information sourced from the selected Trainer member API record.
// DATA FLOW: member detail Query → TrainerMembersProfileFitness → read-only fitness cards.
'use client';
import { Activity, HeartPulse, Scale, Target } from 'lucide-react';
import { displayValue } from '@/lib/formatters';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';

export default function TrainerMembersProfileFitness() {
  const { member } = useTrainerSelectedMember();
  if (!member) return null;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-primary-subtle rounded-lg text-primary"><Target size={24} /></div><div><h4 className="font-semibold text-primary">Fitness Goal</h4><p className="text-sm text-secondary mt-1">{displayValue(member.fitnessGoal)}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-info-bg rounded-lg text-info"><Activity size={24} /></div><div><h4 className="font-semibold text-primary">Fitness Level</h4><p className="text-sm text-secondary mt-1">{displayValue(member.fitnessLevel)}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-warning-bg rounded-lg text-warning"><Scale size={24} /></div><div><h4 className="font-semibold text-primary">BMI & Target</h4><p className="text-sm text-secondary mt-1">Current BMI: {displayValue(member.bmi)}</p><p className="text-sm text-secondary">Target Weight: {member.targetWeightKg == null ? '—' : `${displayValue(member.targetWeightKg)} kg`}</p></div></div>
        <div className="bg-input rounded-xl p-4 flex items-start gap-4"><div className="p-3 bg-danger-bg rounded-lg text-danger"><HeartPulse size={24} /></div><div><h4 className="font-semibold text-primary">Medical Restrictions</h4><p className="text-sm text-secondary mt-1">{displayValue(member.medicalRestrictions)}</p></div></div>
      </div>
    </div>
  );
}
