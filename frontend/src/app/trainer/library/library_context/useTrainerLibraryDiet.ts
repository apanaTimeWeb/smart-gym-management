// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Handles the state and logic for the Diet Library module.
// ROLE BOUNDARY: Trainers can ONLY VIEW and ASSIGN diet plans.
//                Create / Update / Delete are Manager-only operations.
//                The backend must enforce POST/PATCH/DELETE guards on /trainer/library/diet-plans.
import { useState, useCallback } from 'react';
import type { DietPlan } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';

export function useTrainerLibraryDiet(
  setDietPlans: React.Dispatch<React.SetStateAction<DietPlan[]>>,
  showToast: (msg: string, t: ToastType) => void,
  setSaving: (saving: boolean) => void,
  confirm: (opts: any) => Promise<boolean>
) {
  const [showDietModal, setShowDietModal] = useState(false);
  // editDietId here is used for VIEW mode only, not for mutating the global plan
  const [editDietId, setEditDietId] = useState<string | null>(null);
  const [editDietData, setEditDietData] = useState<DietPlan | null>(null);

  // Opens a diet plan for viewing / assigning — NOT for creating or editing the global plan
  const openViewDiet = useCallback((d: DietPlan) => {
    setEditDietId(d.id);
    setEditDietData(d);
    setShowDietModal(true);
  }, []);

  const closeDietModal = useCallback(() => {
    setShowDietModal(false);
    setEditDietId(null);
    setEditDietData(null);
  }, []);

  // These stubs preserve the interface contract so consuming components still compile.
  // UI must NOT render Add/Edit/Delete buttons for the trainer role.
  const openAddDiet = useCallback(() => {
    showToast('Creating diet plans is a Manager-only action.', 'error');
  }, [showToast]);

  const openEditDiet = openViewDiet;

  const saveDietPlan = useCallback(async () => {
    showToast('Modifying global diet plans is a Manager-only action.', 'error');
  }, [showToast]);

  const deleteDietPlan = useCallback(async (_id: string) => {
    showToast('Deleting diet plans is a Manager-only action.', 'error');
  }, [showToast]);

  return {
    showDietModal,
    editDietId,
    editDietData,
    openAddDiet,
    openEditDiet,
    closeDietModal,
    saveDietPlan,
    deleteDietPlan,
  };
}

