import { http, HttpResponse } from 'msw';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_utils/ManagerHttpStatus';
import { MOCK_MANAGER_EXERCISES } from '@/app/manager/library/library_fixtures/ManagerLibraryMockData';
import { MOCK_MANAGER_DIET_PLANS } from '@/app/manager/library/library_fixtures/ManagerLibraryDietMockData';
import type { Exercise, DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';

let mockExercises = [...MOCK_MANAGER_EXERCISES];
let mockDietPlans = [...MOCK_MANAGER_DIET_PLANS];

export const managerLibraryHandlers = [
  http.get(`/api/v1/manager/library/exercises`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase();
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '12', 10), 1);
    let results = [...mockExercises];
    if (search) results = results.filter(e => e.name.toLowerCase().includes(search) || Boolean(e.category?.toLowerCase().includes(search)));
    const total = results.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Exercises fetched', data: { exercises: results.slice(start, start + limit), total, page, limit } });
  }),

  http.post(`/api/v1/manager/library/exercises`, async ({ request }) => {
    const body = await request.json() as Partial<Exercise>;
    const newExercise: Exercise = { ...body, id: `ex-${Date.now()}`, name: body.name || 'New Exercise', muscleGroup: body.muscleGroup || [], category: body.category || '', difficulty: body.difficulty || 'ALL', isActive: body.isActive !== undefined ? body.isActive : true };
    mockExercises = [newExercise, ...mockExercises];
    return HttpResponse.json({ success: true, message: 'Exercise created successfully', data: newExercise });
  }),

  http.patch(`/api/v1/manager/library/exercises/:id`, async ({ request, params }) => {
    const body = await request.json() as Partial<Exercise>;
    const index = mockExercises.findIndex(e => e.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Exercise not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExercises[index] = { ...mockExercises[index], ...body } as Exercise;
    return HttpResponse.json({ success: true, message: 'Exercise updated successfully', data: mockExercises[index] });
  }),

  http.delete(`/api/v1/manager/library/exercises/:id`, ({ params }) => {
    mockExercises = mockExercises.filter(e => e.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Exercise deleted successfully', data: { id: params.id } });
  }),

  http.get(`/api/v1/manager/library/diet-plans`, ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() || '';
    const goal = url.searchParams.get('goal')?.trim().toLowerCase() || '';
    const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1);
    const limit = Math.max(parseInt(url.searchParams.get('limit') || '12', 10), 1);
    let results = [...mockDietPlans];
    if (search) results = results.filter(plan => `${plan.name} ${plan.goal} ${plan.description || ''}`.toLowerCase().includes(search));
    if (goal && goal !== 'all') results = results.filter(plan => plan.goal.toLowerCase() === goal);
    const total = results.length;
    const start = (page - 1) * limit;
    return HttpResponse.json({ success: true, message: 'Diet plans fetched', data: { dietPlans: results.slice(start, start + limit), total, page, limit } });
  }),

  http.post(`/api/v1/manager/library/diet-plans`, async ({ request }) => {
    const body = await request.json() as Partial<DietPlan>;
    const newDietPlan: DietPlan = { ...body, id: `dp-${Date.now()}`, name: body.name || 'New Diet Plan', goal: body.goal || 'Maintenance', meals: body.meals || [], isActive: body.isActive !== undefined ? body.isActive : true } as DietPlan;
    mockDietPlans = [newDietPlan, ...mockDietPlans];
    return HttpResponse.json({ success: true, message: 'Diet plan created successfully', data: newDietPlan });
  }),

  http.patch(`/api/v1/manager/library/diet-plans/:id`, async ({ request, params }) => {
    const body = await request.json() as Partial<DietPlan>;
    const index = mockDietPlans.findIndex(plan => plan.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Diet plan not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockDietPlans[index] = { ...mockDietPlans[index], ...body } as DietPlan;
    return HttpResponse.json({ success: true, message: 'Diet plan updated successfully', data: mockDietPlans[index] });
  }),

  http.delete(`/api/v1/manager/library/diet-plans/:id`, ({ params }) => {
    mockDietPlans = mockDietPlans.filter(plan => plan.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Diet plan deleted successfully', data: { id: params.id } });
  }),
];
