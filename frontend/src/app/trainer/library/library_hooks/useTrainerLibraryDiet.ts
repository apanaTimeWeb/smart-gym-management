// RESPONSIBILITY: Owns Trainer Diet Library view-modal UI state; Manager-only mutations are intentionally absent.
// DATA FLOW: Diet library Query data → view modal state → Diet Library UI.
'use client';
import { useCallback, useState } from 'react';
import type { DietPlan } from '@/app/trainer/library/library_types/TrainerLibrary_types';

/** Owns useTrainerLibraryDiet behavior for this Trainer module. */
export function useTrainerLibraryDiet() {
  const [showDietModal, setShowDietModal] = useState(false);
  const [selectedDiet, setSelectedDiet] = useState<DietPlan | null>(null);
  const openViewDiet = useCallback((diet: DietPlan) => { setSelectedDiet(diet); setShowDietModal(true); }, []);
  const closeDietModal = useCallback(() => { setShowDietModal(false); setSelectedDiet(null); }, []);
  return { showDietModal, editDietId: selectedDiet?.id ?? null, editDietData: selectedDiet, openEditDiet: openViewDiet, closeDietModal };
}
