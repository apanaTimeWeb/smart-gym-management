'use client';
// RESPONSIBILITY: Owns membership lifecycle form setup, submission, reset, and dirty-state handling.
// DATA FLOW: Plans UI → RHF/Zod forms → membership mutations → authoritative query cache → rendered overview.
import { useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { useManagerPlansLogic } from '@/app/manager/plans/plans_hooks/ManagerUseManagerPlansLogic';
import { useManagerPlansMembershipOverviewQuery } from '@/app/manager/plans/plans_api/ManagerUseManagerPlansMembershipQueries';
import { useManagerPlansMembershipMutations } from '@/app/manager/plans/plans_api/ManagerUseManagerPlansMembershipMutations';
import { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/manager/plans/plans_schemas/ManagerPlansMembershipSchemas';
import type { ManagerPlansActivateForm, ManagerPlansFreezeForm, ManagerPlansRenewForm } from '@/app/manager/plans/plans_types/ManagerPlansMembershipFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { useConfirm } from '@/app/manager/manager_components/ManagerFeedback/ManagerConfirmProvider';

/** Coordinates the three independent membership forms and their mutation lifecycles. */
export function useManagerPlansMembershipForms() {
  const { plans, activeTab, setActiveTab } = useManagerPlansLogic();
  const overviewQuery = useManagerPlansMembershipOverviewQuery();
  const { activateMutation, renewMutation, freezeMutation } = useManagerPlansMembershipMutations();
  const { confirm } = useConfirm();
  const activateForm = useForm<ManagerPlansActivateForm>({ resolver: zodResolver(managerPlansActivateSchema), defaultValues: { memberId: '', planId: '', startDate: '' } });
  const renewForm = useForm<ManagerPlansRenewForm>({ resolver: zodResolver(managerPlansRenewSchema), defaultValues: { memberId: '', planId: '', newExpiryDate: '' } });
  const freezeForm = useForm<ManagerPlansFreezeForm>({ resolver: zodResolver(managerPlansFreezeSchema), defaultValues: { memberId: '', freezeFrom: '', freezeUntil: '' } });
  const activateKeyRef = useRef<string | null>(null);
  const renewKeyRef = useRef<string | null>(null);
  const freezeKeyRef = useRef<string | null>(null);
  const isDirty = activateForm.formState.isDirty || renewForm.formState.isDirty || freezeForm.formState.isDirty;
  const { confirmAndClose } = useManagerUnsavedChangesGuard(isDirty);

  const memberOptions = useMemo(() => (overviewQuery.data?.memberOptions ?? []).map((member) => ({ value: member.id, label: `${member.name} (${member.phone})` })), [overviewQuery.data]);
  const planOptions = useMemo(() => plans.map((plan) => ({ value: plan.id, label: `${plan.name} — ${plan.tier}` })), [plans]);
  const freezeMemberOptions = useMemo(() => (overviewQuery.data?.memberOptions ?? []).filter((member) => member.status === 'ACTIVE').map((member) => ({ value: member.id, label: `${member.name} (${member.phone})` })), [overviewQuery.data]);
  const formatExpiry = (value: string) => new Intl.DateTimeFormat(undefined, { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(value));

  const submitActivate = activateForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: 'Confirm Membership Activation', message: 'This will activate the selected membership using the submitted plan and start date.', confirmText: 'Activate Membership', type: 'warning' });
    if (!confirmed) return;
    activateKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await activateMutation.mutateAsync({ payload: data, idempotencyKey: activateKeyRef.current }); activateForm.reset(); activateKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-activate-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-activate-error'); }
  });
  const submitRenew = renewForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: 'Confirm Membership Renewal', message: 'This will renew the selected membership and change its expiry date.', confirmText: 'Confirm Renewal', type: 'warning' });
    if (!confirmed) return;
    renewKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await renewMutation.mutateAsync({ payload: data, idempotencyKey: renewKeyRef.current }); renewForm.reset(); renewKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-renew-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-renew-error'); }
  });
  const submitFreeze = freezeForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: 'Confirm Membership Freeze', message: 'This will freeze the selected membership for the submitted date range.', confirmText: 'Apply Freeze', type: 'warning' });
    if (!confirmed) return;
    freezeKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await freezeMutation.mutateAsync({ payload: data, idempotencyKey: freezeKeyRef.current }); freezeForm.reset(); freezeKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-freeze-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-freeze-error'); }
  });
  const handleTabChange = (nextTab: typeof activeTab) => { if (nextTab === activeTab) return; void confirmAndClose(() => setActiveTab(nextTab)); };

  return { plans, activeTab, handleTabChange, overview: overviewQuery.data, isLoading: overviewQuery.isLoading, isError: overviewQuery.isError, error: overviewQuery.error, activateForm, renewForm, freezeForm, memberOptions, planOptions, freezeMemberOptions, formatExpiry, submitActivate, submitRenew, submitFreeze, activateMutation, renewMutation, freezeMutation };
}
