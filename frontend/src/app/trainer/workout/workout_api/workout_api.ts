// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Provides strongly-typed network calls for the workout module.
import { z } from 'zod';
import type { Workout, Exercise } from '@/app/trainer/workout/workout_types/workout.schema';
import { WorkoutSchema, ExerciseSchema } from '@/app/trainer/workout/workout_types/workout.schema';
import { MOCK_WORKOUTS, MOCK_EXERCISES } from '@/app/trainer/workout/workout_fixtures/TrainerWorkoutMockData';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

let mockWorkouts = [...MOCK_WORKOUTS];
let mockExercises = [...MOCK_EXERCISES];

export const workoutApi = {
  getWorkouts: async (params?: Record<string, string>) => {
    await delay(400);
    let results = [...mockWorkouts];
    if (params?.search) {
      const s = params.search.toLowerCase();
      results = results.filter(w => w.name.toLowerCase().includes(s) || w.tags.some(t => t.toLowerCase().includes(s)));
    }
    if (params?.category && params.category !== 'All') {
      const cat = params.category;
      results = results.filter(w => w.focus === cat || w.tags.includes(cat));
    }
    return { data: { workouts: z.array(WorkoutSchema).parse(results), total: results.length } };
  },
  
  createWorkout: async (body: Partial<Workout>) => {
    await delay(400);
    const newWorkout = {
      ...body,
      id: `wk-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,
      isActive: true,
      workoutExercises: body.workoutExercises ?? []
    } as Workout;
    mockWorkouts = [newWorkout, ...mockWorkouts];
    return { data: WorkoutSchema.parse(newWorkout) };
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>) => {
    await delay(400);
    const idx = mockWorkouts.findIndex(w => String(w.id) === String(id));
    if (idx === -1) throw new Error('Workout not found');
    const updated = { ...mockWorkouts[idx]!, ...body } as Workout;
    mockWorkouts[idx] = updated;
    return { data: WorkoutSchema.parse(updated) };
  },
  
  removeWorkout: async (id: string) => {
    await delay(400);
    mockWorkouts = mockWorkouts.filter(w => String(w.id) !== String(id));
    return { data: { id } };
  },
  
  getExercises: async (params?: Record<string, string>) => {
    await delay(400);
    let results = [...mockExercises];
    if (params?.search) {
      const s = params.search.toLowerCase();
      results = results.filter(e => e.name.toLowerCase().includes(s) || (e.category?.toLowerCase() ?? '').includes(s));
    }
    return { data: { exercises: z.array(ExerciseSchema).parse(results), total: results.length } };
  },
  
  createExercise: async (body: Partial<Exercise>) => {
    await delay(400);
    const newEx = {
      ...body,
      id: `ex-${Date.now()}-${Math.random().toString(36).substring(2,6)}`,
      isActive: true,
    } as Exercise;
    mockExercises = [newEx, ...mockExercises];
    return { data: ExerciseSchema.parse(newEx) };
  },
  
  updateExercise: async (id: string, body: Partial<Exercise>) => {
    await delay(400);
    const idx = mockExercises.findIndex(e => String(e.id) === String(id));
    if (idx === -1) throw new Error('Exercise not found');
    const updated = { ...mockExercises[idx]!, ...body } as Exercise;
    mockExercises[idx] = updated;
    return { data: ExerciseSchema.parse(updated) };
  },
  
  removeExercise: async (id: string) => {
    await delay(400);
    mockExercises = mockExercises.filter(e => String(e.id) !== String(id));
    return { data: { id } };
  },
};
