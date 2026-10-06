'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { useManagerLibraryLogic } from '@/app/frontend_manager/manager_library/manager_library_hooks/useManagerLibraryLogic';
import { managerLibraryDietFormSchema } from '@/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibraryDietFormSchema';
import { EMPTY_DIET_FORM } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryDietFormTypes';
import type { DietFormValues } from '@/app/frontend_manager/manager_library/manager_library_types/ManagerLibraryDietFormTypes';
import type { Resolver } from 'react-hook-form';


/** Coordinates the diet form lifecycle and converts the editor text representation into the API meal array. */
/**
 * @description Coordinates library feature state and its documented UI/API boundary through useManagerLibraryDietForm.
 * @dependencies Uses useManagerLibraryLogic, ManagerLibraryDietFormSchema, ManagerLibraryDietFormTypes, ManagerUnsavedChangesGuard.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerLibraryDietForm owns the library feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerLibraryDietForm() {
  const { showDietModal, setShowDietModal, editDietId, editDietData, saving, saveDietPlan } = useManagerLibraryLogic();
  const form = useForm<DietFormValues>({ resolver: zodResolver(managerLibraryDietFormSchema) as Resolver<DietFormValues>, defaultValues: EMPTY_DIET_FORM });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showDietModal) return;
    const mealsText = editDietData?.meals?.map((meal: unknown) => {
      if (typeof meal === 'string') return meal;
      if (typeof meal === 'object' && meal !== null) {
        const record = meal as { time?: unknown; name?: unknown };
        return [record.time, record.name].filter((value): value is string => typeof value === 'string' && value.length > 0).join(': ');
      }
      return '';
    }).join('\n') ?? '';
    form.reset(editDietData ? {
      name: editDietData.name, goal: editDietData.goal, calories: editDietData.calories, protein: editDietData.protein,
      carbs: editDietData.carbs, fats: editDietData.fats, description: editDietData.description ?? '', meals: mealsText,
    } : EMPTY_DIET_FORM);
  }, [editDietData, form, showDietModal]);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(showDietModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowDietModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    const meals = values.meals?.split(/\r?\n/).map((meal: string) => meal.trim()).filter(Boolean) ?? [];
    await saveDietPlan({ ...values, meals });
    form.reset(values);
  });

  return { form, showDietModal, editDietId, saving, handleClose, submit };
}
