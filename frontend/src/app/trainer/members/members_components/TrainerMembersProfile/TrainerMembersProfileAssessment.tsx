// RESPONSIBILITY: Renders the TrainerMembersProfileAssessment route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
'use client';
import { Activity, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TrainerMemberAssessmentSchema, type TrainerMemberAssessment } from '@/app/trainer/members/members_types/TrainerMembers.schema';
import { useTrainerSelectedMember } from '@/app/trainer/members/members_queries/useTrainerSelectedMember';
import { useTrainerMembersMutations } from '@/app/trainer/members/members_queries/useTrainerMembersMutations';
import { useTrainerFeedback } from '@/app/trainer/trainer_components/TrainerFeedback/useTrainerFeedback';
import { useTrainerIdempotencyKey } from '@/app/trainer/trainer_utils/useTrainerIdempotencyKey';
import { useTrainerUnsavedChangesGuard } from '@/app/trainer/trainer_utils/TrainerUseWarnIfUnsavedChanges';
import { useEffect } from 'react';

export default function TrainerMembersProfileAssessment() {
  const { member } = useTrainerSelectedMember();
  const { updateAssessment } = useTrainerMembersMutations();
  const { showSuccess, showError } = useTrainerFeedback();
  const actionKeys = useTrainerIdempotencyKey();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting }
  } = useForm<TrainerMemberAssessment>({
    resolver: zodResolver(TrainerMemberAssessmentSchema),
    defaultValues: member?.assessment || {
      medicalHistory: '',
      pastInjuries: '',
      vo2Max: undefined,
      flexibility: undefined,
      coreStrength: '',
      fitnessGoals: ''
    }
  });

  const guardNavigation = useTrainerUnsavedChangesGuard(isDirty && !isSubmitting);

  useEffect(() => {
    if (member?.assessment) {
      reset(member.assessment);
    }
  }, [member?.assessment, reset]);

  if (!member) return null;

  const onSubmit = async (data: TrainerMemberAssessment) => {
    try {
      const actionId = `assessment-update-${member.id}`;
      const response = await updateAssessment.mutateAsync({ id: member.id, assessment: data, idempotencyKey: actionKeys.begin(actionId) });
      showSuccess(response.message, actionId);
      actionKeys.clear(actionId);
      reset(data);
    } catch (err) {
      showError(err, 'assessment-error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 motion-safe:animate-in fade-in motion-safe:duration-slow">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-subtle flex items-center justify-center">
            <Activity size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-primary">Day-1 Fitness & Medical Assessment</h3>
            <p className="text-sm text-secondary">Initial fitness test scores and baseline metrics.</p>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={!isDirty || isSubmitting || updateAssessment.isPending}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-50 motion-safe:transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page"
        >
          {isSubmitting ? <Loader2 size={18} className="motion-safe:animate-spin" /> : <Save size={18} />}
          Save Assessment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="trainer-member-medical-history" className="block text-sm font-bold text-primary mb-1">Medical History</label>
            <textarea id="trainer-member-medical-history" aria-invalid={Boolean(errors.medicalHistory)} aria-describedby={errors.medicalHistory ? "trainer-member-medical-history-error" : undefined}
              {...register('medicalHistory')} 
              placeholder="Any known medical conditions..."
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary resize-none h-24"
            />
          </div>
          <div>
            <label htmlFor="trainer-member-past-injuries" className="block text-sm font-bold text-primary mb-1">Past Injuries</label>
            <textarea id="trainer-member-past-injuries" aria-invalid={Boolean(errors.pastInjuries)} aria-describedby={errors.pastInjuries ? "trainer-member-past-injuries-error" : undefined}
              {...register('pastInjuries')} 
              placeholder="Any past injuries..."
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary resize-none h-24"
            />
          </div>
          <div>
            <label htmlFor="trainer-member-fitness-goals" className="block text-sm font-bold text-primary mb-1">Fitness Goals</label>
            <textarea id="trainer-member-fitness-goals" aria-invalid={Boolean(errors.fitnessGoals)} aria-describedby={errors.fitnessGoals ? "trainer-member-fitness-goals-error" : undefined}
              {...register('fitnessGoals')} 
              placeholder="What does the client want to achieve?"
              className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:border-primary resize-none h-24"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-input rounded-xl p-4 border border-border">
            <label htmlFor="trainer-member-vo2" className="block text-sm font-bold text-secondary mb-1">VO2 Max (ml/kg/min)</label>
            <input id="trainer-member-vo2" aria-invalid={Boolean(errors.vo2Max)} aria-describedby={errors.vo2Max ? "trainer-member-vo2-error" : undefined}
              type="number"
              step="0.1"
              {...register('vo2Max', { valueAsNumber: true })} 
              placeholder="e.g. 45"
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none"
            />
          </div>
          <div className="bg-input rounded-xl p-4 border border-border">
            <label htmlFor="trainer-member-flexibility" className="block text-sm font-bold text-secondary mb-1">Flexibility (Sit & Reach in cm)</label>
            <input id="trainer-member-flexibility" aria-invalid={Boolean(errors.flexibility)} aria-describedby={errors.flexibility ? "trainer-member-flexibility-error" : undefined}
              type="number"
              step="0.1"
              {...register('flexibility', { valueAsNumber: true })} 
              placeholder="e.g. 15"
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none"
            />
          </div>
          <div className="bg-input rounded-xl p-4 border border-border">
            <label htmlFor="trainer-member-core-strength" className="block text-sm font-bold text-secondary mb-1">Core Strength</label>
            <input id="trainer-member-core-strength"
              type="text"
              {...register('coreStrength')} 
              placeholder="e.g. 2:30 plank"
              className="w-full bg-transparent text-xl font-bold text-primary focus-visible:outline-none"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
