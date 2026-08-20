// RESPONSIBILITY: Custom hook encapsulating all UI state and API orchestration for the Workout Library module.
import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { 
  EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM, WorkoutFormValues, ExerciseFormValues
} from '@/app/trainer/workout/workout_utils/WorkoutSharedConstants';
import { WorkoutContextType, Workout } from '@/app/trainer/workout/workout_types/workout_types';
import { useDebounce } from '@/app/trainer/trainer_utils/useDebounce';
import { useConfirm } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerConfirmProvider';
import { workoutApi } from '@/app/trainer/workout/workout_api/workout_api';
import { libraryApi } from '@/app/trainer/library/library_api/library_api';
import type { Exercise } from '@/app/trainer/library/library_types/library_types';
import type { ToastType } from '@/app/trainer/trainer_components/TrainerFeedback/TrainerToast';

export function useWorkoutLogic(): WorkoutContextType {
  const { confirm } = useConfirm();
  const [tab, setTab] = useState('Workout Plans');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [totalExercises, setTotalExercises] = useState(0);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [showWkModal, setShowWkModal] = useState(false);
  const [editWkId, setEditWkId] = useState<string | null>(null);
  const [wkForm, setWkForm] = useState(EMPTY_WORKOUT_FORM);

  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<string | null>(null);
  const [exForm, setExForm] = useState(EMPTY_EXERCISE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {
        limit: '12',
        page: currentPage.toString()
      };
      if (debouncedSearch) params.search = debouncedSearch;

      const [wkRes, exRes] = await Promise.all([
        workoutApi.getWorkouts(params),
        libraryApi.getExercises(params),
      ]);
      setWorkouts(wkRes.data.workouts || []);
      setTotalWorkouts(wkRes.data.total || 0);
      setExercises(exRes.data.exercises || []);
      setTotalExercises(exRes.data.total || 0);
    } catch (e) {
      showToast((e as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast, currentPage, debouncedSearch]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Derived state

  // Workout CRUD
  const openAddWk = useCallback(() => { 
    setEditWkId(null); 
    setWkForm(EMPTY_WORKOUT_FORM); 
    setShowWkModal(true); 
  }, []);
  
  const openEditWk = useCallback((w: Workout) => { 
    setEditWkId(w.id); 
    setWkForm({ 
      name: w.name, 
      level: w.level, 
      days: String(w.days), 
      exercises: String(w.exercises), 
      focus: w.focus, 
      duration: w.duration, 
      tags: w.tags.join(', ') 
    }); 
    setShowWkModal(true); 
  }, []);
  
  const saveWk = useCallback(async (data: WorkoutFormValues) => {
    setSaving(true);
    try {
      const payload = { 
        ...data, 
        days: Number(data.days), 
        exercises: Number(data.exercises), 
        tags: data.tags.split(',').map(t => t.trim()).filter(Boolean) 
      };
      
      if (editWkId) {
        const res = await workoutApi.updateWorkout(editWkId, payload);
        showToast((res as any).message, 'success');
      } else {
        const res = await workoutApi.createWorkout(payload);
        showToast((res as any).message, 'success');
      }
      setShowWkModal(false);
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editWkId, loadAll, showToast]);
  
  const deleteWk = useCallback(async (id: string) => { 
    const isConfirmed = await confirm({ title: 'Delete Workout', message: 'Delete this workout plan?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await workoutApi.removeWorkout(id);
      showToast((res as any).message, 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [confirm, loadAll, showToast]);

  // Exercise CRUD
  const openAddEx = useCallback(() => { 
    setEditExId(null); 
    setExForm(EMPTY_EXERCISE_FORM); 
    setShowExModal(true); 
  }, []);
  
  const openEditEx = useCallback((ex: Exercise) => { 
    setEditExId(ex.id); 
    setExForm({ 
      name: ex.name, 
      muscle: ex.muscleGroup?.join(', ') || '', 
      equipment: ex.category || '', 
      difficulty: ex.difficulty 
    }); 
    setShowExModal(true); 
  }, []);
  
  const saveEx = useCallback(async (data: ExerciseFormValues) => {
    setSaving(true);
    try {
      // adapt to Exercise backend payload shape
      const { muscle, equipment, ...rest } = data;
      const payload = { 
        ...rest, 
        category: equipment,
        muscleGroup: muscle.split(',').map(s => s.trim()) 
      };
      if (editExId) {
        const res = await libraryApi.updateExercise(editExId, payload);
        showToast((res as any).message, 'success');
      } else {
        const res = await libraryApi.createExercise(payload);
        showToast((res as any).message, 'success');
      }
      setShowExModal(false);
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setSaving(false);
    }
  }, [editExId, loadAll, showToast]);
  
  const deleteEx = useCallback(async (id: string) => { 
    const isConfirmed = await confirm({ title: 'Delete Exercise', message: 'Delete this exercise?', confirmText: 'Delete', type: 'danger' });
    if (!isConfirmed) return;
    try {
      const res = await libraryApi.removeExercise(id);
      showToast((res as any).message, 'success');
      await loadAll();
    } catch (err) {
      showToast((err as Error).message, 'error');
    }
  }, [confirm, loadAll, showToast]);

  return {
    tab, setTab, search, setSearch, currentPage, setCurrentPage,
    workouts, totalWorkouts, exercises, totalExercises,
    loading, saving, toast, showToast, hideToast, loadAll,
    showWkModal, setShowWkModal, editWkId, wkForm, setWkForm,
    showExModal, setShowExModal, editExId, exForm, setExForm,
    openAddWk, openEditWk, saveWk, deleteWk,
    openAddEx, openEditEx, saveEx, deleteEx
  };
}
