import { useState, useMemo, useCallback } from 'react';
import { 
  Workout, Exercise, 
  INITIAL_WORKOUTS, INITIAL_EXERCISES, 
  EMPTY_WORKOUT_FORM, EMPTY_EXERCISE_FORM 
} from '../workout_utils/WorkoutSharedConstants';
import { WorkoutContextType } from '../workout_types/workout_types';

export function useWorkoutLogic(): WorkoutContextType {
  const [tab, setTab] = useState('Workout Plans');
  const [search, setSearch] = useState('');
  
  const [workouts, setWorkouts] = useState<Workout[]>(INITIAL_WORKOUTS);
  const [exercises, setExercises] = useState<Exercise[]>(INITIAL_EXERCISES);

  const [showWkModal, setShowWkModal] = useState(false);
  const [editWkId, setEditWkId] = useState<number | null>(null);
  const [wkForm, setWkForm] = useState(EMPTY_WORKOUT_FORM);

  const [showExModal, setShowExModal] = useState(false);
  const [editExId, setEditExId] = useState<number | null>(null);
  const [exForm, setExForm] = useState(EMPTY_EXERCISE_FORM);

  // Derived state
  const filteredWk = useMemo(() => 
    workouts.filter(w => w.name.toLowerCase().includes(search.toLowerCase())),
    [workouts, search]
  );
  
  const filteredEx = useMemo(() => 
    exercises.filter(ex => 
      ex.name.toLowerCase().includes(search.toLowerCase()) || 
      ex.muscle.toLowerCase().includes(search.toLowerCase())
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
  
  const saveWk = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const data = { 
      ...wkForm, 
      days: Number(wkForm.days), 
      exercises: Number(wkForm.exercises), 
      tags: wkForm.tags.split(',').map(t => t.trim()).filter(Boolean) 
    };
    if (editWkId) {
      setWorkouts(prev => prev.map(w => w.id === editWkId ? { ...w, ...data } : w));
    } else {
      setWorkouts(prev => [...prev, { id: Date.now(), ...data }]);
    }
    setShowWkModal(false);
  }, [editWkId, wkForm]);
  
  const deleteWk = useCallback((id: number) => { 
    if (window.confirm('Delete this workout plan?')) {
      setWorkouts(prev => prev.filter(w => w.id !== id));
    }
  }, []);

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
      muscle: ex.muscle, 
      equipment: ex.equipment, 
      difficulty: ex.difficulty 
    }); 
    setShowExModal(true); 
  }, []);
  
  const saveEx = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (editExId) {
      setExercises(prev => prev.map(ex => ex.id === editExId ? { ...ex, ...exForm } : ex));
    } else {
      setExercises(prev => [...prev, { id: Date.now(), ...exForm }]);
    }
    setShowExModal(false);
  }, [editExId, exForm]);
  
  const deleteEx = useCallback((id: number) => { 
    if (window.confirm('Delete this exercise?')) {
      setExercises(prev => prev.filter(ex => ex.id !== id));
    }
  }, []);

  return {
    tab, setTab, search, setSearch,
    workouts, exercises, filteredWk, filteredEx,
    showWkModal, setShowWkModal, editWkId, wkForm, setWkForm,
    showExModal, setShowExModal, editExId, exForm, setExForm,
    openAddWk, openEditWk, saveWk, deleteWk,
    openAddEx, openEditEx, saveEx, deleteEx
  };
}
