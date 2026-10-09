"use client";
// RESPONSIBILITY: Renders the member's assigned workout plan and provides plan assignment capabilities for trainers.
// DATA FLOW: useTrainerMembersSelectedMember/useTrainerMembersQuery → Members API → TrainerMembersProfileWorkout

import { useState } from 'react';

import { Dumbbell, Plus, Check, Loader2, MessageCircle, RefreshCw, Calendar, Flame } from 'lucide-react';

import { useLocale, useTranslations } from 'next-intl';

import { TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS } from '@/app/frontend_trainer/trainer_members/trainer_members_constants/TrainerMembersConstants';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_searchable_dropdown/TrainerInfrastructureSearchableDropdown';

import { useTrainerMembersMutations } from '@/app/frontend_trainer/trainer_members/trainer_members_hooks/useTrainerMembersMutations';

import { useTrainerMembersMemberWorkoutPlansQuery } from '@/app/frontend_trainer/trainer_members/trainer_members_hooks/useTrainerMembersProfileQueries';

import { useTrainerMembersSelectedMember } from '@/app/frontend_trainer/trainer_members/trainer_members_hooks/useTrainerMembersSelectedMember';


import { TrainerMembersDisplayValue, TrainerMembersFormatNumber } from '@/app/frontend_trainer/trainer_members/trainer_members_utils/TrainerMembersDisplayFormatters';

import { TrainerMembersBuildWhatsAppUrl } from '@/app/frontend_trainer/trainer_members/trainer_members_utils/TrainerMembersBuildWhatsAppUrl';












/**
 * @description Renders the member's assigned workout plan and provides plan assignment capabilities for trainers.
 * @dependencies useTrainerMembersSelectedMember/useTrainerMembersQuery → Members API → TrainerMembersProfileWorkout
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Owns the members feature UI responsibility represented by TrainerMembersProfileWorkout, keeping feature behavior, state, and data ownership inside the Trainer module.
 * @dependencies Uses only documented members module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves documented loading, empty, error, accessibility, responsive, and recovery behavior without inventing business fallbacks.
 */
export default function TrainerMembersProfileWorkout() {
  const locale = useLocale();
  const t = useTranslations('TRAINER_MEMBERS');
  const { member: selectedMember } = useTrainerMembersSelectedMember();
  const { assignWorkout } = useTrainerMembersMutations();
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const [isAssigning, setIsAssigning] = useState(false);
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [saving, setSaving] = useState(false);
  const workoutsQuery = useTrainerMembersMemberWorkoutPlansQuery(isAssigning);
  const availableWorkouts = workoutsQuery.data ?? [];

  if (!selectedMember) return null;

  const workout = selectedMember.assignedWorkout;
  const hasWorkoutPlan = !!workout;

  const handleAssign = async () => {
    if (!selectedWorkoutId) return;
    const selected = availableWorkouts.find(w => String(w.id) === selectedWorkoutId) || null;
    setSaving(true);
    const actionId = `assign-workout-${selectedMember.id}`;
    try {
      await assignWorkout({ id: selectedMember.id, workout: selected, idempotencyKey: actionKeys.begin(actionId) });
      setIsAssigning(false);
      setSelectedWorkoutId('');
      actionKeys.clear(actionId);
    } finally {
      setSaving(false);
    }
  };

  const handleShareWhatsApp = () => {
    if (!workout) return;
    const exerciseLines = workout.workoutExercises && workout.workoutExercises.length > 0
      ? [
          t('TEXT_WHATSAPP_EXERCISES'),
          ...workout.workoutExercises.map((exercise, index) => t('TEXT_WHATSAPP_EXERCISE_LINE', {
            index: index + 1,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            rest: exercise.restTime || t('TEXT_WHATSAPP_DEFAULT_REST'),
          })),
        ].join('\n')
      : t('TEXT_CUSTOM_ROUTINE_ASSIGNED_REVIEW_STANDARD');

    const text = [
      t('TEXT_WHATSAPP_WORKOUT_HEADER', { name: selectedMember.name.toUpperCase() }),
      t('TEXT_WHATSAPP_WORKOUT_PLAN', { plan: workout.name, level: TrainerMembersDisplayValue(workout.level) }),
      t('TEXT_WHATSAPP_WORKOUT_DURATION', { duration: TrainerMembersDisplayValue(workout.duration) }),
      t('TEXT_WHATSAPP_WORKOUT_FOCUS', { focus: TrainerMembersDisplayValue(workout.focus) }),
      '',
      exerciseLines,
    ].join('\n');
    window.open(TrainerMembersBuildWhatsAppUrl(selectedMember.phone ?? '', text), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6 motion-safe:transition-opacity motion-safe:duration-slow">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-primary">{t("TEXT_WORKOUT_PLAN")}</h3>
          <p className="text-sm text-secondary">{t('TEXT_ASSIGN_OR_UPDATE_DAILY_WORKOUT_ROUTINES_FOR', { name: selectedMember.name })}</p>
        </div>
        <div className="flex items-center gap-2">
          {hasWorkoutPlan ? (
            <>
              <button type="button" 
                onClick={handleShareWhatsApp}
                className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page flex items-center gap-2 px-4 py-2 bg-success text-on-success rounded-xl text-sm font-semibold hover:bg-primary-hover shadow-card motion-safe:transition-all motion-safe:active:scale-95 motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofileworkout-button_1">
                <MessageCircle size={18}  strokeWidth={2}/> {t("TEXT_SHARE_VIA_WHATSAPP")}</button>
              <button type="button" 
                onClick={() => {
                  setSelectedWorkoutId(workout.id || '');
                  setIsAssigning(true);
                }}
                className="min-h-11 flex items-center gap-2 px-4 py-2 bg-input text-primary border border-border rounded-xl text-sm font-semibold hover:bg-primary-subtle motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofileworkout-button_2">
                <RefreshCw size={18}  strokeWidth={2}/> {t("TEXT_CHANGE_PLAN")}</button>
            </>
          ) : !isAssigning ? (
            <button type="button" 
              onClick={() => setIsAssigning(true)}
              className="min-h-11 flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card hover:border-focus motion-safe:transition-all motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:duration-base motion-safe:ease-in-out" data-testid="trainer_members-trainermembersprofileworkout-button_3">
              <Plus size={18}  strokeWidth={2}/> {t("TEXT_ASSIGN_WORKOUT_PLAN")}</button>
          ) : null}
        </div>
      </div>

      {/* Plan Assignment Box */}
      {isAssigning && (
        <div className="bg-card border border-focus p-5 rounded-2xl space-y-4 shadow-card">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <Dumbbell size={18}  strokeWidth={2}/> {t("TEXT_SELECT_WORKOUT_PLAN_FROM_LIBRARY")}</h4>
            <button type="button" 
              onClick={() => setIsAssigning(false)}
              className="min-h-11 text-xs text-secondary hover:text-primary font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofileworkout-button_4">
              {t("TEXT_CANCEL")}</button>
          </div>

          {workoutsQuery.isPending ? (
            <p className="text-sm text-secondary py-3">{t("TEXT_LOADING_AVAILABLE_WORKOUT_PLANS")}</p>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3">
              <TrainerInfrastructureSearchableDropdown
                options={availableWorkouts.map(w => ({ value: w.id, label: `${w.name} · ${TrainerMembersDisplayValue(w.level)} (${TrainerMembersDisplayValue(w.duration)})` }))}
                value={selectedWorkoutId}
                onChange={(value: string | number) => setSelectedWorkoutId(String(value))}
                placeholder={t("TEXT_CHOOSE_A_WORKOUT_PLAN")}
                ariaLabel={t("TEXT_CHOOSE_A_WORKOUT_PLAN")}
                className="flex-1"
               testId="trainer-members-members-profile-workout-choose-a-workout-plan"/>
              <div className="flex gap-2">
                <button type="button" 
                  onClick={handleAssign}
                  disabled={!selectedWorkoutId || saving}
                  className="min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page min-w-40 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card motion-safe:transition-all disabled:opacity-50 flex items-center gap-2 motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofileworkout-button_6">
                  {saving ? <><Loader2 size={18} strokeWidth={2} motion-safe:animate-spin aria-hidden="true" />{t("TEXT_ASSIGNING_B89E1D")}</> : <><Check size={18} strokeWidth={2} />{t("TEXT_CONFIRM_ASSIGNMENT")}</>}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Active Workout Display */}
      {hasWorkoutPlan ? (
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-subtle text-primary">
                  {t("TEXT_ACTIVE_PLAN")}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-info-bg text-info" data-testid={"trainer_members-trainer_members-profile-info-state-142-1"}>
                  {TrainerMembersDisplayValue(workout.level)}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-primary">{workout.name}</h3>
              <p className="text-sm text-secondary mt-1">{TrainerMembersDisplayValue(workout.focus)}</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-end">
                <p className="text-xs text-secondary">{t("TEXT_SESSION_DURATION")}</p>
                <p className="text-base font-bold text-primary flex items-center gap-1">
                  <Calendar size={18} className="text-primary"  strokeWidth={2}/> {TrainerMembersDisplayValue(workout.duration)}
                </p>
              </div>
              <div className="text-end">
                <p className="text-xs text-secondary">{t("TEXT_FREQUENCY")}</p>
                <p className="text-base font-bold text-primary flex items-center gap-1">
                  <Flame size={18} className="text-warning"  strokeWidth={2}/> {typeof workout.days === 'number' ? TrainerMembersFormatNumber(workout.days, locale) : TrainerMembersDisplayValue(workout.days)} {t("TEXT_DAYS_WEEK")}</p>
              </div>
            </div>
          </div>

          {/* Exercises Breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-3">{t("TEXT_EXERCISES_ROUTINE")}</h4>
            {workout.workoutExercises && workout.workoutExercises.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {workout.workoutExercises.map((ex, idx) => (
                  <div key={`${ex.name}-${ex.sets}-${ex.reps}-${ex.restTime ?? 'none'}-${ex.weight ?? 'none'}`} className="bg-floating border border-border rounded-xl p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary-subtle text-primary text-xs font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <div>
                        <p className="text-sm font-bold text-primary">{ex.name}</p>
                        <p className="text-xs text-secondary">{t("TEXT_REST_33D2CB")}{TrainerMembersDisplayValue(ex.restTime)}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <span className="text-sm font-bold text-primary">{ex.sets} {t("TEXT_SETS_99FB45")}{ex.reps}</span>
                      {ex.weight && <p className="text-xs text-secondary">{ex.weight}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-floating border border-dashed border-border rounded-xl p-6 text-center text-secondary text-sm">
                {t("TEXT_CUSTOM_ROUTINE_ASSIGNED_REVIEW_STANDARD__67ED152E")}</div>
            )}
          </div>
        </div>
      ) : !isAssigning ? (
        <div className="bg-card border border-dashed border-border rounded-2xl p-12 text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-primary-subtle text-primary flex items-center justify-center mx-auto">
            <Dumbbell size={18}  strokeWidth={2}/>
          </div>
          <h4 className="text-lg font-bold text-primary">{t("TEXT_NO_WORKOUT_PLAN_ASSIGNED")}</h4>
          <p className="text-sm text-secondary max-w-md mx-auto">
            {selectedMember.name} {t("TEXT_HAS_NOT_BEEN_ASSIGNED_A_WORKOUT_PLAN_YET_E4ADEB71")}</p>
          <button type="button"
            onClick={() => setIsAssigning(true)}
            className="min-h-11 mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:shadow-card motion-safe:transition-all motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_members-trainermembersprofileworkout-button_8">
            <Plus size={18}  strokeWidth={2}/> {t("TEXT_ASSIGN_WORKOUT_PLAN")}</button>
        </div>
      ) : null}

      {/* Workout History Section */}
      <div className="bg-card border border-border rounded-2xl p-6 mt-6">
        <h4 className="text-lg font-bold text-primary mb-4">{t("TEXT_WORKOUT_HISTORY")}</h4>
        <div className="space-y-3">
          {(selectedMember.workoutHistory ?? []).map((historyItem) => (
            <div key={historyItem.id} className="bg-input rounded-xl p-4 flex items-center justify-between">
              <div>
                <h5 className="font-bold text-sm text-primary">{historyItem.name}</h5>
                <p className="text-xs text-secondary">{historyItem.date} · {historyItem.level}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success-bg text-success flex items-center gap-1" data-testid={`trainer_members-profile-workout_history_state${historyItem.id}`}>
                <Check size={18}  strokeWidth={2}/> {historyItem.status === TRAINER_MEMBERS_WORKOUT_HISTORY_STATUS.COMPLETED ? t('TEXT_COMPLETED') : t('TEXT_STATUS_UNKNOWN')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

