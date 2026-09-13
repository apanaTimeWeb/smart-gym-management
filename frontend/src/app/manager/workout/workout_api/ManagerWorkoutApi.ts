// RESPONSIBILITY: Provides strongly-typed network calls for the workout module.
import type { ApiResponse } from '@/lib/api';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';
import { MOCK_MANAGER_WORKOUTS } from '@/app/manager/workout/workout_api/ManagerWorkoutMockData';

let MOCK_DB = [...MOCK_MANAGER_WORKOUTS];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const workoutApi = {
  getWorkouts: async (params?: Record<string, string>): Promise<ApiResponse<{ workouts: Workout[], total: number }>> => {
    await delay(600);
    let results = [...MOCK_DB];
    
    if (params?.search) {
      const q = params.search.toLowerCase();
      results = results.filter(w => w.name.toLowerCase().includes(q) || w.focus.toLowerCase().includes(q));
    }
    
    if (params?.level && params.level !== 'ALL') {
      results = results.filter(w => w.level === params.level);
    }
    
    const page = parseInt(params?.page || '1', 10);
    const limit = parseInt(params?.limit || '12', 10);
    const total = results.length;
    
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);
    
    return { success: true, data: { workouts: paginated, total }, message: 'Workouts fetched' };
  },
  
  createWorkout: async (body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    await delay(600);
    const newWorkout: Workout = {
      ...body,
      id: `wk-${Date.now()}`,
      name: body.name || 'New Workout',
      level: body.level || 'ALL',
      days: body.days || 1,
      exercises: body.exercises || 1,
      focus: body.focus || 'General',
      duration: body.duration || '30 min',
      tags: body.tags || [],
    };
    MOCK_DB = [newWorkout, ...MOCK_DB];
    return { success: true, data: newWorkout, message: 'Workout created successfully' };
  },
  
  updateWorkout: async (id: string, body: Partial<Workout>): Promise<ApiResponse<Workout>> => {
    await delay(600);
    const index = MOCK_DB.findIndex(w => w.id === id);
    if (index === -1) throw new Error('Workout not found');
    MOCK_DB[index] = { ...MOCK_DB[index], ...body } as Workout;
    return { success: true, data: MOCK_DB[index], message: 'Workout updated successfully' };
  },
  
  removeWorkout: async (id: string): Promise<ApiResponse<{ id: string }>> => {
    await delay(600);
    MOCK_DB = MOCK_DB.filter(w => w.id !== id);
    return { success: true, data: { id }, message: 'Workout deleted successfully' };
  },
};
