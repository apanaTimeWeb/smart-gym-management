// DATA FLOW: Library UI state → Diet form hook → Zod/RHF → library mutation → Query cache/UI.
// RESPONSIBILITY: Owns Diet Library add/edit form state, validation, conversion to API shape, submission, and dirty-state protection.
'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import { managerLibraryDietFormSchema } from '@/app/manager/library/library_schemas/ManagerLibraryDietFormSchema';
import { EMPTY_DIET_FORM } from '@/app/manager/library/library_types/ManagerLibraryDietFormTypes';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import type { DietFormValues } from '@/app/manager/library/library_types/ManagerLibraryDietFormTypes';


/** Coordinates the diet form lifecycle and converts the editor text representation into the API meal array. */
export function useManagerLibraryDietForm() {
  const { showDietModal, setShowDietModal, editDietId, editDietData, saving, saveDietPlan } = useManagerLibraryLogic();
  const form = useForm<DietFormValues>({ resolver: zodResolver(managerLibraryDietFormSchema) as any, defaultValues: EMPTY_DIET_FORM });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showDietModal) return;
    const mealsText = editDietData?.meals?.map((meal: any) => {
      if (typeof meal === 'string') return meal;
      return [meal.time, meal.name].filter(Boolean).join(': ');
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
