'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useMemo, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { useConfirm } from '@/components/ui/manager_confirm_provider/ManagerConfirmProvider';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { MANAGER_PLANS_ACTIVE_MEMBER_STATUS } from '@/app/frontend_manager/manager_plans/manager_plans_constants/ManagerPlansConstants';
import { useManagerPlansLogic } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansLogic';
import { useManagerPlansMembershipMutations } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansMembershipMutations';
import { useManagerPlansMembershipOverviewQuery } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansMembershipQueries';
import { managerPlansActivateSchema, managerPlansFreezeSchema, managerPlansRenewSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansMembershipSchemas';
import type { ManagerPlansActivateForm, ManagerPlansFreezeForm, ManagerPlansRenewForm } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansMembershipFormTypes';
/** Coordinates the three independent membership forms and their mutation lifecycles. */
/**
 * @description Coordinates plans feature state and its documented UI/API boundary through useManagerPlansMembershipForms.
 * @dependencies Uses ManagerConfirmProvider, ManagerIdempotency, ManagerToastService, ManagerUnsavedChangesGuard.
 * @edge-case surfaces request errors without exposing transport details; preserves explicit loading state until the query or mutation settles; reuses the caller-provided idempotency key for the same mutation intent.
 */
/**
 * @description Owns Manager Plans membership activation, renewal, and freeze form workflows.
 * @dependencies Uses module-owned schemas, mutations, confirmation, idempotency, and query cache reconciliation.
 * @edge-case Prevents duplicate operations and preserves dirty state until each successful mutation completes.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerPlansMembershipForms owns the plans feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerPlansMembershipForms() {
  const t = useTranslations('MANAGER_PLANS');
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
  const freezeMemberOptions = useMemo(() => (overviewQuery.data?.memberOptions ?? []).filter((member) => member.status === MANAGER_PLANS_ACTIVE_MEMBER_STATUS).map((member) => ({ value: member.id, label: `${member.name} (${member.phone})` })), [overviewQuery.data]);
  const formatExpiry = (value: string) => format(parseISO(value), 'dd MMM yyyy');

  const submitActivate = activateForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_ACTIVATION_TITLE'), message: t('CONFIRM_MEMBERSHIP_ACTIVATION_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_ACTIVATE'), type: 'warning' });
    if (!confirmed) return;
    activateKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await activateMutation.mutateAsync({ payload: data, idempotencyKey: activateKeyRef.current }); activateForm.reset(); activateKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-activate-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-activate-error'); }
  });
  const submitRenew = renewForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_RENEWAL_TITLE'), message: t('CONFIRM_MEMBERSHIP_RENEWAL_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_RENEW'), type: 'warning' });
    if (!confirmed) return;
    renewKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await renewMutation.mutateAsync({ payload: data, idempotencyKey: renewKeyRef.current }); renewForm.reset(); renewKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-renew-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-renew-error'); }
  });
  const submitFreeze = freezeForm.handleSubmit(async (data) => {
    const confirmed = await confirm({ title: t('CONFIRM_MEMBERSHIP_FREEZE_TITLE'), message: t('CONFIRM_MEMBERSHIP_FREEZE_MESSAGE'), confirmText: t('CONFIRM_MEMBERSHIP_FREEZE'), type: 'warning' });
    if (!confirmed) return;
    freezeKeyRef.current ??= createManagerIdempotencyKey();
    try { const response = await freezeMutation.mutateAsync({ payload: data, idempotencyKey: freezeKeyRef.current }); freezeForm.reset(); freezeKeyRef.current = null; showManagerSuccessToast(response.message, 'manager-plans-freeze-success'); } catch (error: unknown) { showManagerErrorToast(error, 'manager-plans-freeze-error'); }
  });
  const handleTabChange = (nextTab: typeof activeTab) => { if (nextTab === activeTab) return; void confirmAndClose(() => setActiveTab(nextTab)); };

  return { plans, activeTab, handleTabChange, overview: overviewQuery.data, isPending: overviewQuery.isPending, isError: overviewQuery.isError, error: overviewQuery.error, activateForm, renewForm, freezeForm, memberOptions, planOptions, freezeMemberOptions, formatExpiry, submitActivate, submitRenew, submitFreeze, activateMutation, renewMutation, freezeMutation };
}
