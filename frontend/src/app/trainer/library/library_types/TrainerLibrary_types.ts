// RESPONSIBILITY: Defines all TypeScript types, interfaces, for the Diet Library module.
import { z } from 'zod';
import { DietPlanSchema } from '@/app/trainer/library/library_types/TrainerLibrary.schema';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { type DietFormValues } from '@/app/trainer/library/library_utils/TrainerLibrarySharedConstants';
import React from 'react';

export type DietPlan = z.infer<typeof DietPlanSchema>;

export interface LibraryInitialData {
  dietPlans: DietPlan[];
}

export interface LibraryContextType {
  dietPlans: DietPlan[];
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  saving: boolean;
  toast: { message: string; type: ToastType } | null;
  
  search: string;
  debouncedSearch: string;
  setSearch: (s: string) => void;
  filterGoal: string;
  setFilterGoal: (g: string) => void;
  currentPage: number;
  setCurrentPage: (p: number) => void;

  showToast: (msg: string, type: ToastType) => void;
  hideToast: () => void;
  loadAll: () => Promise<void>;

  // Diet Modal State — view/assign only for Trainer role; create/edit/delete are Manager-only
  showDietModal: boolean;
  editDietId: string | null;
  editDietData: DietPlan | null;
  openAddDiet: () => void;
  openEditDiet: (d: DietPlan) => void;
  closeDietModal: () => void;
  saveDietPlan: () => Promise<void>;
  deleteDietPlan: (id: string) => Promise<void>;
}
