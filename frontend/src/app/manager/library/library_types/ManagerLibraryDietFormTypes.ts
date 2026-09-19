import type { ManagerLibraryDietFormValues } from '@/app/manager/library/library_schemas/ManagerLibraryDietFormSchema';

export type DietFormValues = ManagerLibraryDietFormValues;

export const EMPTY_DIET_FORM: DietFormValues = {
  name: '', goal: 'Weight Loss', calories: undefined, protein: undefined, carbs: undefined, fats: undefined, description: '', meals: ''
};
