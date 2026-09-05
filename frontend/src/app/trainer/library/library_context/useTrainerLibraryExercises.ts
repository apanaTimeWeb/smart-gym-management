// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Handles the state and logic for managing gym exercises in the trainer library.
import { useState, useCallback } from 'react';
import { libraryApi } from '@/app/trainer/library/library_api/library_api';
import type { Exercise } from '@/app/trainer/trainer_types/trainer_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';
import { EMPTY_EXERCISE_FORM } from '@/app/trainer/library/library_utils/LibrarySharedConstants';

export function useTrainerLibraryExercises(
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>,
  showToast: (msg: string, t: ToastType) => void,
  setSaving: (saving: boolean) => void,
  confirm: (opts: any) => Promise<boolean>
) {
  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<string | null>(null);
  const [editExData, setEditExData] = useState<Record<string, any> | null>(null);

  const openAddEx = useCallback(() => { 
    setEditExId(null); 
    setEditExData(EMPTY_EXERCISE_FORM); 
    setShowExModal(true); 
  }, []);
  
  const openEditEx = useCallback((ex: Exercise) => {
    setEditExId(ex.id);
    setEditExData({ 
      name: ex.name, 
      category: ex.category, 
      muscleGroup: ex.muscleGroup?.join(', '), 
      sets: ex.sets ? String(ex.sets) : '', 
      reps: ex.reps || '', 
      duration: ex.duration || '', 
      difficulty: ex.difficulty, 
      description: ex.description || '', 
      videoUrl: ex.videoUrl || '' 
    });
    setShowExModal(true);
  }, []);
  
  const saveExercise = useCallback(async (data: Record<string, any>) => {
    setSaving(true);
    try {
      const payload = { 
        ...data, 
        muscleGroup: data.muscleGroup ? data.muscleGroup.split(',').map((s: string) => s.trim()) : [], 
        sets: data.sets ? Number(data.sets) : undefined 
      };
      
      if (editExId) { 
        const res = await libraryApi.updateExercise(editExId, payload as unknown as Partial<Exercise>) as any; 
        const updatedEx = res.data || payload;
        setExercises(prev => prev.map(e => String(e.id) === String(editExId) ? { ...e, ...updatedEx } as unknown as Exercise : e));
        showToast(res.message || 'Exercise updated successfully', 'success'); 
      } else { 
        const res = await libraryApi.createExercise(payload as unknown as Partial<Exercise>) as any; 
        const newEx = res.data ? res.data : { ...payload, id: Math.random().toString(), isActive: true } as unknown as Exercise;
        setExercises(prev => [newEx, ...prev]);
        showToast(res.message || 'Exercise created successfully', 'success'); 
      }
      setShowExModal(false);
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    } finally { 
      setSaving(false); 
    }
  }, [editExId, setExercises, showToast, setSaving]);
  
  const deleteExercise = useCallback(async (id: string) => {
    const isConfirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try { 
      const res = await libraryApi.removeExercise(id) as unknown as { message?: string }; 
      setExercises(prev => prev.filter(e => String(e.id) !== String(id)));
      showToast(res.message || 'Exercise deleted', 'success'); 
    } catch (err) { 
      showToast((err as Error).message, 'error'); 
    }
  }, [confirm, setExercises, showToast]);

  return {
    showExModal, setShowExModal, editExId, editExData, openAddEx, openEditEx, saveExercise, deleteExercise
  };
}

