'use client';
// RESPONSIBILITY: Exposes the Trainer-wide confirm() API from ConfirmContext without owning dialog state.
// DATA FLOW: ConfirmContext → useTrainerConfirm → feature action handler.
import { useContext } from 'react';
import { ConfirmContext } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';

/** Owns useTrainerConfirm behavior for this Trainer module. */
export function useTrainerConfirm() {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error('useTrainerConfirm must be used within TrainerConfirmProvider');
  return context;
}
