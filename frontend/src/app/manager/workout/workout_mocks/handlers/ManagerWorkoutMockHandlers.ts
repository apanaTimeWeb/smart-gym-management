import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import { MOCK_WORKOUT_ASSIGNMENTS } from '@/app/manager/workout/workout_fixtures/ManagerWorkoutAssignmentMockData';
import { MOCK_MANAGER_WORKOUTS } from '@/app/manager/workout/workout_fixtures/ManagerWorkoutMockData';
import { ManagerWorkoutUrlConfig } from '@/app/manager/workout/workout_url_config';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';


let MOCK_DB = [...MOCK_MANAGER_WORKOUTS];

export let mockWorkoutIdCounter = 1000;
export function resetManagerWorkoutMockState(): void {
  MOCK_DB = [...MOCK_MANAGER_WORKOUTS];
  mockWorkoutIdCounter = 1000;
}

export const managerWorkoutHandlers = [
  http.get(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.ASSIGNMENTS), () => HttpResponse.json({ success: true, message: 'Assignments fetched', data: MOCK_WORKOUT_ASSIGNMENTS })),
  http.get(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.EXERCISES_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = (url.searchParams.get('search') ?? '').toLowerCase();
    const mockExercises = [
      { id: 'ex1', name: 'Bench Press', muscleGroup: ['Chest'], difficulty: 'INTERMEDIATE', equipment: 'Barbell' },
      { id: 'ex2', name: 'Squat', muscleGroup: ['Legs'], difficulty: 'ADVANCED', equipment: 'Barbell' },
      { id: 'ex3', name: 'Push Up', muscleGroup: ['Chest', 'Arms'], difficulty: 'BEGINNER', equipment: 'Bodyweight' }
    ];
    const filtered = search ? mockExercises.filter(e => e.name.toLowerCase().includes(search)) : mockExercises;
    return HttpResponse.json({ success: true, message: 'Success', data: { exercises: filtered, total: filtered.length } });
  }),
  http.get(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE), ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const level = url.searchParams.get('level');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);

    let results = [...MOCK_DB];

    if (search) {
      results = results.filter(w => w.name.toLowerCase().includes(search) || w.focus.toLowerCase().includes(search));
    }

    if (level && level !== 'ALL') {
      results = results.filter(w => w.level === level);
    }

    const total = results.length;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);

    return HttpResponse.json({
      success: true,
      message: 'Workouts fetched',
      data: { workouts: paginated, total },
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) }
    });
  }),

  http.post(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Workout>;
    const newWorkout: Workout = {
      ...body,
      id: `wk-${mockWorkoutIdCounter++}`,
      name: body.name || 'New Workout',
      level: body.level || 'ALL',
      days: body.days || 1,
      exercises: body.exercises || 1,
      focus: body.focus || 'General',
      duration: body.duration || '30 min',
      tags: body.tags || [] } as Workout;
    
    MOCK_DB = [newWorkout, ...MOCK_DB];
    return HttpResponse.json({
      success: true,
      message: 'Workout created successfully',
      data: newWorkout
    });
  }),

  http.patch(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUT(':id')), async ({ request, params }) => {
    const { id } = params;
    const body = await request.json() as Partial<Workout>;
    const index = MOCK_DB.findIndex(w => w.id === id);
    if (index === -1) {
      return HttpResponse.json({ success: false, message: 'Workout not found' }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    }
    MOCK_DB[index] = { ...MOCK_DB[index], ...body } as Workout;
    return HttpResponse.json({
      success: true,
      message: 'Workout updated successfully',
      data: MOCK_DB[index]
    });
  }),

  http.delete(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUT(':id')), ({ params }) => {
    const { id } = params;
    MOCK_DB = MOCK_DB.filter(w => w.id !== id);
    return HttpResponse.json({
      success: true,
      message: 'Workout deleted successfully',
      data: { id }
    });
  })
];
