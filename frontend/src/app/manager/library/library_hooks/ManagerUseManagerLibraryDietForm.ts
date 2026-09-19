'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerLibraryLogic } from '@/app/manager/library/library_hooks/ManagerUseManagerLibraryLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { managerLibraryDietFormSchema } from '@/app/manager/library/library_schemas/ManagerLibraryDietFormSchema';
import type { DietFormValues } from '@/app/manager/library/library_types/ManagerLibraryDietFormTypes';
import { EMPTY_DIET_FORM } from '@/app/manager/library/library_types/ManagerLibraryDietFormTypes';

// RESPONSIBILITY: Owns Diet Library add/edit form state, validation, conversion to API shape, submission, and dirty-state protection.
// DATA FLOW: Library UI state → Diet form hook → Zod/RHF → library mutation → Query cache/UI.
/** Coordinates the diet form lifecycle and converts the editor text representation into the API meal array. */
export function useManagerLibraryDietForm() {
  const { showDietModal, setShowDietModal, editDietId, editDietData, saving, saveDietPlan } = useManagerLibraryLogic();
  const form = useForm<DietFormValues>({ resolver: zodResolver(managerLibraryDietFormSchema as any), defaultValues: EMPTY_DIET_FORM });

  useEffect(() => {
    if (!showDietModal) return;
    const mealsText = editDietData?.meals?.map((meal) => {
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
    const meals = values.meals?.split(/\r?\n/).map((meal) => meal.trim()).filter(Boolean) ?? [];
    await saveDietPlan({ ...values, meals });
    form.reset(values);
  });

  return { form, showDietModal, editDietId, saving, handleClose, submit };
}
