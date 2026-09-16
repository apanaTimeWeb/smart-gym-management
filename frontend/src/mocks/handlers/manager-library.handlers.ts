import { http, HttpResponse } from 'msw';
import { MOCK_MANAGER_EXERCISES } from '@/app/manager/library/library_fixtures/ManagerLibraryMockData';
import type { Exercise } from '@/app/manager/library/library_types/ManagerLibraryTypes';

let mockExercises = [...MOCK_MANAGER_EXERCISES];

export const managerLibraryHandlers = [
  http.get('http://localhost:5000/api/v1/manager/library/exercises', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '12', 10);
    
    let results = [...mockExercises];
    if (search) {
      results = results.filter(e => e.name.toLowerCase().includes(search) || (e.category && e.category.toLowerCase().includes(search)));
    }
    
    const total = results.length;
    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + limit);
    
    return HttpResponse.json({
      success: true,
      message: 'Exercises fetched',
      data: { exercises: paginated, total }
    });
  }),

  http.post('http://localhost:5000/api/v1/manager/library/exercises', async ({ request }) => {
    const body = await request.json() as Partial<Exercise>;
    const newExercise: Exercise = {
      ...body,
      id: `ex-${Date.now()}`,
      name: body.name || 'New Exercise',
      muscleGroup: body.muscleGroup || [],
      category: body.category || '',
      difficulty: body.difficulty || 'ALL',
      isActive: body.isActive !== undefined ? body.isActive : true
    };
    mockExercises = [newExercise, ...mockExercises];
    return HttpResponse.json({
      success: true,
      message: 'Exercise created successfully',
      data: newExercise
    });
  }),

  http.patch('http://localhost:5000/api/v1/manager/library/exercises/:id', async ({ request, params }) => {
    const body = await request.json() as Partial<Exercise>;
    const { id } = params;
    const index = mockExercises.findIndex(e => e.id === id);
    if (index === -1) {
      return HttpResponse.json({ success: false, message: 'Exercise not found' }, { status: 404 });
    }
    mockExercises[index] = { ...mockExercises[index], ...body } as Exercise;
    return HttpResponse.json({
      success: true,
      message: 'Exercise updated successfully',
      data: mockExercises[index]
    });
  }),

  http.delete('http://localhost:5000/api/v1/manager/library/exercises/:id', ({ params }) => {
    const { id } = params;
    mockExercises = mockExercises.filter(e => e.id !== id);
    return HttpResponse.json({
      success: true,
      message: 'Exercise deleted successfully',
      data: { id }
    });
  })
];
