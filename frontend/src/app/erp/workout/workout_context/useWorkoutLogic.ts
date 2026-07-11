import { useState, useMemo, useCallback, useEffect } from 'react';
import { 
  EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM, WorkoutFormValues, ExerciseFormValues
} from '@/app/erp/workout/workout_utils/WorkoutSharedConstants';
import { WorkoutContextType, Workout } from '@/app/erp/workout/workout_types/workout_types';
import { useConfirm } from '@/app/erp/erp_components/ErpFeedback/ErpConfirmProvider';
import { workoutApi, libraryApi } from '@/lib/api';
import type { Exercise } from '@/lib/api';
import type { ToastType } from '@/app/erp/erp_components/ErpFeedback/ErpToast';

export function useWorkoutLogic(): WorkoutContextType {
  const { confirm } = useConfirm();
  const [tab, setTab] = useState('Workout Plans');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  const [showWkModal, setShowWkModal] = useState(false);
  const [editWkId, setEditWkId] = useState<number | null>(null);
  const [wkForm, setWkForm] = useState(EMPTY_WORKOUT_FORM);

  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<number | null>(null);
  const [exForm, setExForm] = useState(EMPTY_EXERCISE_FORM);

  const showToast = useCallback((msg: string, t: ToastType) => setToast({ message: msg, type: t }), []);
  const hideToast = useCallback(() => setToast(null), []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [wkRes, exRes] = await Promise.all([
        workoutApi.getWorkouts(),
        libraryApi.getExercises(),
      ]);
      setWorkouts(wkRes.data);
      setExercises(Array.isArray(exRes.data) ? exRes.data : (exRes.data as any).Exercises || []);
    } catch (e) {
      showToast((e as Error).message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadAll(); }, [loadAll]);

  // Derived state
  const filteredWk = useMemo(() => 
    workouts.filter(w => w.name.toLowerCase().includes(search.toLowerCase())),
    [workouts, search]
  );
  
  const filteredEx = useMemo(() => 
    exercises.filter(ex => 
      ex.name.toLowerCase().includes(search.toLowerCase()) || 
      ex.muscleGroup?.join(' ').toLowerCase().includes(search.toLowerCase())
    ),
    [exercises, search]
  );

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
  
  const deleteWk = useCallback(async (id: number) => { 
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
      // adapt to Exercise backend payload shape if needed, here we pass the form
      const payload = { ...data, muscleGroup: data.muscle.split(',').map(s => s.trim()) };
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
  
  const deleteEx = useCallback(async (id: number) => { 
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
    workouts, exercises, filteredWk, filteredEx,
    loading, saving, toast, showToast, hideToast, loadAll,
    showWkModal, setShowWkModal, editWkId, wkForm, setWkForm,
    showExModal, setShowExModal, editExId, exForm, setExForm,
    openAddWk, openEditWk, saveWk, deleteWk,
    openAddEx, openEditEx, saveEx, deleteEx
  };
}
