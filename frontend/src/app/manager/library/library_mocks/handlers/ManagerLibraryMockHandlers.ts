import { http, HttpResponse } from 'msw';
import { MOCK_MANAGER_DIET_PLANS } from '@/app/manager/library/library_fixtures/ManagerLibraryDietMockData';
import { MOCK_MANAGER_EXERCISES } from '@/app/manager/library/library_fixtures/ManagerLibraryMockData';
import { ManagerLibraryUrlConfig } from '@/app/manager/library/library_url_config';
import { MANAGER_HTTP_STATUS } from '@/app/manager/manager_infrastructure/ManagerHttpStatus';
import { managerMockApiUrl } from '@/app/manager/manager_infrastructure/ManagerMockApiUrl';
import type { Exercise, DietPlan } from '@/app/manager/library/library_types/ManagerLibraryTypes';


let mockExercises = [...MOCK_MANAGER_EXERCISES];
let mockDietPlans = [...MOCK_MANAGER_DIET_PLANS];

export let mockExerciseIdCounter = 1000;
let mockDietPlanIdCounter = 1000;

export function resetManagerLibraryMockState(): void {
  mockExercises = [...MOCK_MANAGER_EXERCISES];
  mockDietPlans = [...MOCK_MANAGER_DIET_PLANS];
  mockExerciseIdCounter = 1000;
  mockDietPlanIdCounter = 1000;
}
export const managerLibraryHandlers = [
  http.get(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE), ({ request }) => {
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

  http.post(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.EXERCISES_BASE), async ({ request }) => {
    const body = await request.json() as Partial<Exercise>;
    const newExercise: Exercise = { ...body, id: `ex-${mockExerciseIdCounter++}`, name: body.name || 'New Exercise', muscleGroup: body.muscleGroup || [], category: body.category || '', difficulty: body.difficulty || 'ALL', isActive: body.isActive !== undefined ? body.isActive : true };
    mockExercises = [newExercise, ...mockExercises];
    return HttpResponse.json({ success: true, message: 'Exercise created successfully', data: newExercise });
  }),

  http.patch(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_UPDATE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<Exercise>;
    const index = mockExercises.findIndex(e => e.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Exercise not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockExercises[index] = { ...mockExercises[index], ...body } as Exercise;
    return HttpResponse.json({ success: true, message: 'Exercise updated successfully', data: mockExercises[index] });
  }),

  http.delete(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.EXERCISE_DELETE(':id')), ({ params }) => {
    mockExercises = mockExercises.filter(e => e.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Exercise deleted successfully', data: { id: params.id } });
  }),

  http.get(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE), ({ request }) => {
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

  http.post(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE), async ({ request }) => {
    const body = await request.json() as Partial<DietPlan>;
    const newDietPlan: DietPlan = { ...body, id: `dp-${mockDietPlanIdCounter++}`, name: body.name || 'New Diet Plan', goal: body.goal || 'Maintenance', meals: body.meals || [], isActive: body.isActive !== undefined ? body.isActive : true } as DietPlan;
    mockDietPlans = [newDietPlan, ...mockDietPlans];
    return HttpResponse.json({ success: true, message: 'Diet plan created successfully', data: newDietPlan });
  }),

  http.patch(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_UPDATE(':id')), async ({ request, params }) => {
    const body = await request.json() as Partial<DietPlan>;
    const index = mockDietPlans.findIndex(plan => plan.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Diet plan not found', data: null }, { status: MANAGER_HTTP_STATUS.NOT_FOUND });
    mockDietPlans[index] = { ...mockDietPlans[index], ...body } as DietPlan;
    return HttpResponse.json({ success: true, message: 'Diet plan updated successfully', data: mockDietPlans[index] });
  }),

  http.delete(managerMockApiUrl(ManagerLibraryUrlConfig.BACKEND_API.DIET_PLAN_DELETE(':id')), ({ params }) => {
    mockDietPlans = mockDietPlans.filter(plan => plan.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Diet plan deleted successfully', data: { id: params.id } });
  }),
];
