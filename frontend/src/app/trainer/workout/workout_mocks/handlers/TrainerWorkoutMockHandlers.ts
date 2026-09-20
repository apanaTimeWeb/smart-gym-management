// RESPONSIBILITY: Owns module-local MSW request handlers for Workout Library list and mutation contracts.
import { http, HttpResponse, delay } from 'msw';
import { StatusCodes } from 'http-status-codes';
import { env } from '@/config/env';
import { MOCK_WORKOUTS, MOCK_EXERCISES } from '@/app/trainer/workout/workout_mocks/fixtures/TrainerWorkoutMockData';
import { CreateExerciseSchema, CreateWorkoutPlanSchema, WorkoutSchema, ExerciseSchema } from '@/app/trainer/workout/workout_types/TrainerWorkout.schema';
import { WorkoutUrlConfig } from '@/app/trainer/workout/workout_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
let workoutsDB = MOCK_WORKOUTS.map((workout) => ({ ...workout }));
let exercisesDB = MOCK_EXERCISES.map((exercise) => ({ ...exercise }));
const SORT_FIELDS = new Set(['name', 'category', 'difficulty']);
const toNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const sortRecords = <T extends { name: string; category?: string | null; difficulty?: string }>(records: T[], field: string, direction: string) => {
  const key = SORT_FIELDS.has(field) ? field : 'name';
  const sign = direction === 'desc' ? -1 : 1;
  return [...records].sort((a, b) => String(a[key as keyof T] ?? '').localeCompare(String(b[key as keyof T] ?? '')) * sign);
};
const pageResult = <T,>(items: T[], page: number, limit: number) => items.slice((page - 1) * limit, page * limit);

export const trainerWorkoutMockHandlers = [
  http.get(`${BASE}${WorkoutUrlConfig.BACKEND_API.WORKOUTS}`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const category = url.searchParams.get('category') ?? 'All';
    const page = toNumber(url.searchParams.get('page'), 1);
    const limit = toNumber(url.searchParams.get('limit'), 12);
    const sortBy = url.searchParams.get('sortBy') ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') ?? 'asc';
    const filtered = workoutsDB.filter((workout) =>
      (!search || workout.name.toLowerCase().includes(search) || workout.focus.toLowerCase().includes(search)) &&
      (category === 'All' || workout.focus === category || workout.tags.includes(category)),
    );
    return HttpResponse.json({ success: true, message: 'Workouts fetched successfully', data: { workouts: pageResult(sortRecords(filtered, sortBy, sortDirection), page, limit), total: filtered.length, page, limit, sortBy, sortDirection } });
  }),
  http.post(`${BASE}${WorkoutUrlConfig.BACKEND_API.WORKOUTS}`, async ({ request }) => {
    await delay(350);
    const parsed = CreateWorkoutPlanSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid workout payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const workout = WorkoutSchema.parse({ ...dto, id: `workout-${Date.now()}`, tags: typeof dto.tags === 'string' ? dto.tags.split(',').map((value) => value.trim()).filter(Boolean) : [], isActive: true });
    workoutsDB = [workout, ...workoutsDB];
    return HttpResponse.json({ success: true, message: 'Workout plan created.', data: workout });
  }),
  http.patch(`${BASE}${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/:id`, async ({ params, request }) => {
    await delay(350);
    const index = workoutsDB.findIndex((workout) => workout.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Workout plan not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    const parsed = CreateWorkoutPlanSchema.partial().safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid workout payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const current = workoutsDB[index]!;
    const patch = parsed.data;
    const next = WorkoutSchema.parse({ ...current, ...patch, tags: typeof patch.tags === 'string' ? patch.tags.split(',').map((value) => value.trim()).filter(Boolean) : current.tags });
    workoutsDB[index] = next;
    return HttpResponse.json({ success: true, message: 'Workout plan updated.', data: next });
  }),
  http.delete(`${BASE}${WorkoutUrlConfig.BACKEND_API.WORKOUTS}/:id`, async ({ params }) => {
    await delay(300);
    const exists = workoutsDB.some((workout) => workout.id === params.id);
    if (!exists) return HttpResponse.json({ success: false, message: 'Workout plan not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    workoutsDB = workoutsDB.filter((workout) => workout.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Workout plan deleted.', data: null });
  }),
  http.get(`${BASE}${WorkoutUrlConfig.BACKEND_API.EXERCISES}`, async ({ request }) => {
    await delay(350);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const category = url.searchParams.get('category') ?? 'All';
    const page = toNumber(url.searchParams.get('page'), 1);
    const limit = toNumber(url.searchParams.get('limit'), 12);
    const sortBy = url.searchParams.get('sortBy') ?? 'name';
    const sortDirection = url.searchParams.get('sortDirection') ?? 'asc';
    const filtered = exercisesDB.filter((exercise) =>
      (!search || exercise.name.toLowerCase().includes(search) || (exercise.category ?? '').toLowerCase().includes(search)) &&
      (category === 'All' || exercise.category === category || exercise.difficulty === category),
    );
    return HttpResponse.json({ success: true, message: 'Exercises fetched successfully', data: { exercises: pageResult(sortRecords(filtered, sortBy, sortDirection), page, limit), total: filtered.length, page, limit, sortBy, sortDirection } });
  }),
  http.post(`${BASE}${WorkoutUrlConfig.BACKEND_API.EXERCISES}`, async ({ request }) => {
    await delay(350);
    const parsed = CreateExerciseSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid exercise payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const exercise = ExerciseSchema.parse({ ...dto, id: `exercise-${Date.now()}`, category: dto.muscle, muscleGroup: [dto.muscle], isActive: true });
    exercisesDB = [exercise, ...exercisesDB];
    return HttpResponse.json({ success: true, message: 'Exercise created.', data: exercise });
  }),
  http.patch(`${BASE}${WorkoutUrlConfig.BACKEND_API.EXERCISES}/:id`, async ({ params, request }) => {
    await delay(350);
    const index = exercisesDB.findIndex((exercise) => exercise.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'Exercise not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    const parsed = CreateExerciseSchema.partial().safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid exercise payload.', data: null }, { status: StatusCodes.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const current = exercisesDB[index]!;
    const next = ExerciseSchema.parse({ ...current, ...dto, category: dto.muscle ?? current.category, muscleGroup: dto.muscle ? [dto.muscle] : current.muscleGroup });
    exercisesDB[index] = next;
    return HttpResponse.json({ success: true, message: 'Exercise updated.', data: next });
  }),
  http.delete(`${BASE}${WorkoutUrlConfig.BACKEND_API.EXERCISES}/:id`, async ({ params }) => {
    await delay(300);
    const exists = exercisesDB.some((exercise) => exercise.id === params.id);
    if (!exists) return HttpResponse.json({ success: false, message: 'Exercise not found.', data: null }, { status: StatusCodes.NOT_FOUND });
    exercisesDB = exercisesDB.filter((exercise) => exercise.id !== params.id);
    return HttpResponse.json({ success: true, message: 'Exercise deleted.', data: null });
  }),
];
