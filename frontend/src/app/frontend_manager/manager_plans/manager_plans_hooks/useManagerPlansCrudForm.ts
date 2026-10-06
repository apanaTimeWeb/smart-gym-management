'use client';
// DATA FLOW: Plan props → RHF/Zod form → useManagerPlansMutations → ManagerPlansApi → authoritative response → UI reconciliation.

import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { fromManagerMinorUnits, toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { showManagerErrorToast, showManagerSuccessToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { managerPlansCrudFormSchema } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansCrudFormSchema';
import type { ManagerPlansCrudFormOutput } from '@/app/frontend_manager/manager_plans/manager_plans_schemas/ManagerPlansCrudFormSchema';
import { useManagerPlansMutations } from '@/app/frontend_manager/manager_plans/manager_plans_hooks/useManagerPlansMutations';
import type { Plan } from '@/app/frontend_manager/manager_plans/manager_plans_types/ManagerPlansTypes';

/**
 * @description Owns the RHF/Zod plan create/update form and delegates writes to dedicated plan mutations.
 * @dependencies Plan CRUD schema, mutation hook, idempotency and toast infrastructure.
 * @edge-case Form data is reset only after successful create/update; failed requests preserve the draft and error feedback.
 */
export function useManagerPlansCrudForm(plan: Plan | null, open: boolean, onClose: () => void) {
  const { createPlan, updatePlan } = useManagerPlansMutations();
  const idempotencyKeyRef = useRef<string | null>(null);
  const form = useForm<ManagerPlansCrudFormOutput>({
    resolver: zodResolver(managerPlansCrudFormSchema),
    defaultValues: { name: '', tier: 'Basic', price1Month: 0, price3Month: 0, price6Month: 0, price12Month: 0, featuresText: '', isActive: true },
    mode: 'onSubmit'
  });
  const previousPlanId = useRef<string | null>(null);
  // EFFECT: Hydrate the form only when the editor opens for a different plan identity; dependencies are the form instance, open state, and selected plan.
  useEffect(() => {
    if (!open) return;
    const planId = plan?.id ?? null;
    if (planId === previousPlanId.current) return;
    previousPlanId.current = planId;
    form.reset(plan ? { name: plan.name, tier: plan.tier, price1Month: fromManagerMinorUnits(plan.price1Month), price3Month: fromManagerMinorUnits(plan.price3Month), price6Month: fromManagerMinorUnits(plan.price6Month), price12Month: fromManagerMinorUnits(plan.price12Month), featuresText: plan.features.join('\n'), isActive: plan.isActive } : { name: '', tier: 'Basic', price1Month: 0, price3Month: 0, price6Month: 0, price12Month: 0, featuresText: '', isActive: true });
  }, [form, open, plan]);
  const submit = form.handleSubmit(async (values) => {
    const key = idempotencyKeyRef.current ?? createManagerIdempotencyKey();
    idempotencyKeyRef.current = key;
    const payload = { name: values.name, tier: values.tier, price1Month: toManagerMinorUnits(values.price1Month), price3Month: toManagerMinorUnits(values.price3Month), price6Month: toManagerMinorUnits(values.price6Month), price12Month: toManagerMinorUnits(values.price12Month), features: values.featuresText.split('\n').map((value) => value.trim()).filter(Boolean), isActive: values.isActive } satisfies Partial<Plan>;
    try {
      const response = plan ? await updatePlan.mutateAsync({ id: plan.id, payload, idempotencyKey: key }) : await createPlan.mutateAsync({ payload, idempotencyKey: key });
      showManagerSuccessToast(response.message, plan ? 'manager-plans-update-success' : 'manager-plans-create-success');
      idempotencyKeyRef.current = null;
      form.reset(values);
      onClose();
    } catch (error: unknown) {
      showManagerErrorToast(error, 'manager-plans-crud-error');
    }
  });
  return { form, submit, saving: createPlan.isPending || updatePlan.isPending };
}
