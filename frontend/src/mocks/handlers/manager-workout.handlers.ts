import { http, HttpResponse } from 'msw';
import { MOCK_MANAGER_WORKOUTS } from '@/app/manager/workout/workout_api/ManagerWorkoutMockData';
import type { Workout } from '@/app/manager/workout/workout_types/ManagerWorkoutTypes';

let MOCK_DB = [...MOCK_MANAGER_WORKOUTS];

export const managerWorkoutHandlers = [
  http.get('http://localhost:5000/api/v1/manager/workouts', ({ request }) => {
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

  http.post('http://localhost:5000/api/v1/manager/workouts', async ({ request }) => {
    const body = await request.json() as Partial<Workout>;
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
    } as Workout;
    
    MOCK_DB = [newWorkout, ...MOCK_DB];
    return HttpResponse.json({
      success: true,
      message: 'Workout created successfully',
      data: newWorkout
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/workouts/:id', async ({ request, params }) => {
    const { id } = params;
    const body = await request.json() as Partial<Workout>;
    const index = MOCK_DB.findIndex(w => w.id === id);
    if (index === -1) {
      return HttpResponse.json({ success: false, message: 'Workout not found' }, { status: 404 });
    }
    MOCK_DB[index] = { ...MOCK_DB[index], ...body } as Workout;
    return HttpResponse.json({
      success: true,
      message: 'Workout updated successfully',
      data: MOCK_DB[index]
    });
  }),

  http.delete('http://localhost:5000/api/v1/manager/workouts/:id', ({ params }) => {
    const { id } = params;
    MOCK_DB = MOCK_DB.filter(w => w.id !== id);
    return HttpResponse.json({
      success: true,
      message: 'Workout deleted successfully',
      data: { id }
    });
  })
];
