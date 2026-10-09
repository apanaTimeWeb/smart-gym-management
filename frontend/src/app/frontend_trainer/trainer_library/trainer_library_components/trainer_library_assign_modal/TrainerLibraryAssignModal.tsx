"use client";
// RESPONSIBILITY: Assigns one library diet plan to one trainer-owned member and protects typed selection state.
import { useEffect, useId, useRef, useState } from 'react';

import { X, Loader2 } from 'lucide-react';

import { useTranslations } from 'next-intl';

import { useTrainerInfrastructureIdempotencyKey } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureIdempotencyKey';

import { useTrainerInfrastructureUnsavedChangesGuard } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_hooks/useTrainerInfrastructureUnsavedChangesGuard';

import TrainerInfrastructureSearchableDropdown from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/trainer_infrastructure_searchable_dropdown/TrainerInfrastructureSearchableDropdown';

import { useTrainerInfrastructureDialogFocusTrap } from '@/app/frontend_trainer/trainer_infrastructure/trainer_infrastructure_shared/useTrainerInfrastructureDialogFocusTrap';

import type { TrainerLibraryAssignModalProps } from '@/app/frontend_trainer/trainer_library/trainer_library_types/TrainerLibraryAssignModalProps';










/**
 * @description Assigns one library diet plan to one trainer-owned member and protects typed selection state.
 * @dependencies Consumes owning-module props/state and localized UI configuration.
 * @edge-case Preserves the owning feature’s loading, empty, error, permission, and recovery behavior instead of inventing fallback business data.
 */
/**
 * @description Renders and coordinates the library feature form/modal surface for LibraryAssignModal, including validation, async submission, and safe recovery.
 * @dependencies Uses only documented library module dependencies and approved global infrastructure/UI primitives.
 * @edge-case Preserves entered values after validation/API failure and blocks duplicate submission while pending.
 */
export default function TrainerLibraryAssignModal({ isOpen, plan, members, isSaving, errorMessage, onClose, onSubmit, testId }: TrainerLibraryAssignModalProps) {
  const t = useTranslations('TRAINER_LIBRARY');
  const [memberId, setMemberId] = useState('');
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const actionKeys = useTrainerInfrastructureIdempotencyKey();
  const currentActionId = plan && memberId ? `assign-diet-${plan.id}-${memberId}` : '';
  const guardNavigation = useTrainerInfrastructureUnsavedChangesGuard(Boolean(memberId) && !isSaving);
  useTrainerInfrastructureDialogFocusTrap({ isOpen: Boolean(isOpen && plan), dialogRef, onEscape: () => void guardNavigation(onClose) });

// Effect contract: reset the selected member when the assignment modal closes or receives a new plan.
  useEffect(() => {
    if (!isOpen) {
      if (currentActionId) actionKeys.clear(currentActionId);
      setMemberId('');
    }
  }, [isOpen, currentActionId, actionKeys]);

  if (!isOpen || !plan) return null;
  const submit = async () => {
    if (!memberId || !currentActionId) return;
    const key = actionKeys.begin(currentActionId);
    await onSubmit(memberId, key);
  };
  const handleClose = () => {
    if (currentActionId) actionKeys.clear(currentActionId);
    setMemberId('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-40 bg-overlay-backdrop flex items-center justify-center p-4" role="presentation" data-testid={testId ?? "trainer_library-assign-modal"}>
      <div ref={dialogRef} tabIndex={-1} className="w-full max-w-md bg-overlay border border-border rounded-xl shadow-dialog p-5" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="flex items-center justify-between mb-4"><div><h3 id={titleId} className="text-lg font-bold text-primary">{t("TEXT_ASSIGN_DIET_PLAN")}</h3><p className="text-xs text-secondary mt-1">{plan.name}</p></div><button type="button" onClick={() => void guardNavigation(handleClose)} aria-label={t("TEXT_CLOSE_ASSIGNMENT_DIALOG")} className="min-w-11 min-h-11 p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibraryassignmodal-button_1"><X size={18}  strokeWidth={2}/></button></div>
        <label htmlFor="trainer-library-assigned-member" className="block text-sm font-medium text-secondary mb-1.5">{t("TEXT_MEMBER")}<span className="text-danger" aria-hidden="true">*</span></label><p id="trainer-library-assigned-member-help" className="text-xs text-secondary mb-1.5">{t("TEXT_SELECT_THE_MEMBER_WHO_SHOULD_RECEIVE_THI_70490CDD")}</p>
        <TrainerInfrastructureSearchableDropdown options={members.map((member) => ({ value: member.id, label: `${member.name}${member.assignedDietPlanId ? ` ${t("TEXT_CURRENT_PLAN_ASSIGNED")}` : ""}` }))} value={memberId} onChange={(value) => setMemberId(String(value))} placeholder={t("TEXT_SELECT_A_MEMBER")} ariaLabel={t("TEXT_SELECT_A_MEMBER")} testId="trainer_library-trainerlibraryassignmodal-member" />
        {errorMessage && <p role="alert" className="text-sm text-danger bg-danger-bg px-3 py-2 rounded-lg mt-3" data-testid="trainer_library-library-assign_modal_control">{errorMessage}</p>}
        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-5"><button type="button" onClick={() => void guardNavigation(handleClose)} className="min-h-11 px-4 py-2 border border-border rounded-lg text-secondary hover:bg-primary-subtle motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibraryassignmodal-button_3">{t("TEXT_CANCEL")}</button><button type="button" onClick={() => void submit()} disabled={!memberId || isSaving} className="min-h-11 inline-flex min-w-32 items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-semibold disabled:opacity-60 motion-safe:transition-colors motion-safe:duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page motion-safe:transition-all motion-safe:ease-in-out motion-safe:active:scale-95" data-testid="trainer_library-trainerlibraryassignmodal-button_4">{isSaving && <Loader2 size={18} className="motion-safe:animate-spin"  strokeWidth={2}/>}<span>{isSaving ? t("TEXT_ASSIGNING") : t("TEXT_ASSIGN")}</span></button></div>
      </div>
    </div>
  );
}
