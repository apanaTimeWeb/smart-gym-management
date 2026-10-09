// RESPONSIBILITY: Owns module-local MSW request handlers for TrainerWorkoutWorkout Library list and mutation contracts.

import { env } from '@/config/env';

import { http, HttpResponse, delay } from 'msw';

import { TRAINER_WORKOUT_HTTP_STATUS_CODES } from '@/app/frontend_trainer/trainer_workout/trainer_workout_constants/TrainerWorkoutHttpStatusCodes';

import { TRAINER_WORKOUT_MOCK_WORKOUTS, TRAINER_WORKOUT_MOCK_EXERCISES } from '@/app/frontend_trainer/trainer_workout/trainer_workout_mocks/trainer_workout_fixtures/TrainerWorkoutMockData';

import { TrainerWorkoutCreateExerciseSchema, TrainerWorkoutCreateWorkoutPlanSchema, TrainerWorkoutWorkoutSchema, TrainerWorkoutExerciseSchema } from '@/app/frontend_trainer/trainer_workout/trainer_workout_schemas/TrainerWorkoutDomainSchemas';

import { TRAINER_WORKOUT_URLS } from '@/app/frontend_trainer/trainer_workout/trainer_workout_url_config';

const BASE = env.NEXT_PUBLIC_API_URL;
const createInitialWorkoutsDB = () => TRAINER_WORKOUT_MOCK_WORKOUTS.map((workout) => ({ ...workout, tags: workout.tags ? [...workout.tags] : undefined, workoutExercises: workout.workoutExercises ? workout.workoutExercises.map((exercise) => ({ ...exercise })) : undefined }));
const createInitialExercisesDB = () => TRAINER_WORKOUT_MOCK_EXERCISES.map((exercise) => ({ ...exercise, muscleGroup: exercise.muscleGroup ? [...exercise.muscleGroup] : undefined }));
let workoutsDB = createInitialWorkoutsDB();
let exercisesDB = createInitialExercisesDB();

/** Resets mutable mock collections between tests while preserving mutations within an active test. */
export function resetTrainerWorkoutMockData(): void {
  workoutsDB = createInitialWorkoutsDB();
  exercisesDB = createInitialExercisesDB();
}

const SORT_FIELDS = new Set(['name', 'category', 'difficulty']);
const toNumber = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};
const sortRecords = <T extends { name: string }>(records: T[], field: string, direction: string, fieldMap: Record<string, string> = {}) => {
  const requestedKey = SORT_FIELDS.has(field) ? field : 'name';
  const mappedKey = fieldMap[requestedKey] ?? requestedKey;
  const key = records.length > 0 && mappedKey in records[0]! ? mappedKey : 'name';
  const sign = direction === 'desc' ? -1 : 1;
  return [...records].sort((a, b) => {
    const left = String((a as Record<string, unknown>)[key] ?? '');
    const right = String((b as Record<string, unknown>)[key] ?? '');
    return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }) * sign;
  });
};
const pageResult = <T,>(items: T[], page: number, limit: number) => items.slice((page - 1) * limit, page * limit);

export const TrainerWorkoutMockHandlers = [
  http.get(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}`, async ({ request }) => {
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
      (category === 'All' || workout.focus === category || workout.tags?.includes(category)),
    );
    return HttpResponse.json({ success: true, message: 'Workouts fetched successfully', data: { workouts: pageResult(sortRecords(filtered, sortBy, sortDirection, { category: 'focus', difficulty: 'level' }), page, limit), total: filtered.length, page, limit, sortBy, sortDirection } });
  }),
  http.post(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}`, async ({ request }) => {
    await delay(350);
    const parsed = TrainerWorkoutCreateWorkoutPlanSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid workout payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const workout = TrainerWorkoutWorkoutSchema.parse({ ...dto, id: `workout-${Date.now()}`, tags: typeof dto.tags === 'string' ? dto.tags.split(',').map((value) => value.trim()).filter(Boolean) : [], isActive: true });
    workoutsDB = [workout as any, ...workoutsDB];
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutWorkout plan created.', data: workout });
  }),
  http.patch(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/:id`, async ({ params, request }) => {
    await delay(350);
    const index = workoutsDB.findIndex((workout) => workout.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'TrainerWorkoutWorkout plan not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    const patch = (await request.json()) as any;
    const current = workoutsDB[index]!;
    const next = { ...current, ...patch, tags: typeof patch.tags === 'string' ? patch.tags.split(',').map((value: string) => value.trim()).filter(Boolean) : current.tags };
    workoutsDB[index] = next as any;
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutWorkout plan updated.', data: next });
  }),
  http.delete(`${BASE}${TRAINER_WORKOUT_URLS.API.WORKOUTS}/:id`, async ({ params }) => {
    await delay(300);
    const exists = workoutsDB.some((workout) => workout.id === params.id);
    if (!exists) return HttpResponse.json({ success: false, message: 'TrainerWorkoutWorkout plan not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    workoutsDB = workoutsDB.filter((workout) => workout.id !== params.id);
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutWorkout plan deleted.', data: null });
  }),
  http.get(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, async ({ request }) => {
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
  http.post(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}`, async ({ request }) => {
    await delay(350);
    const parsed = TrainerWorkoutCreateExerciseSchema.safeParse(await request.json());
    if (!parsed.success) return HttpResponse.json({ success: false, message: 'Invalid exercise payload.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY });
    const dto = parsed.data;
    const exercise = TrainerWorkoutExerciseSchema.parse({ ...dto, id: `exercise-${Date.now()}`, category: dto.muscle, muscleGroup: [dto.muscle], isActive: true });
    exercisesDB = [exercise as any, ...exercisesDB];
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutExercise created.', data: exercise });
  }),
  http.patch(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params, request }) => {
    await delay(350);
    const index = exercisesDB.findIndex((exercise) => exercise.id === params.id);
    if (index === -1) return HttpResponse.json({ success: false, message: 'TrainerWorkoutExercise not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    const dto = (await request.json()) as any;
    const current = exercisesDB[index]!;
    const next = { ...current, ...dto, category: dto.muscle ?? current.category, muscleGroup: dto.muscle ? [dto.muscle] : current.muscleGroup };
    exercisesDB[index] = next as any;
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutExercise updated.', data: next });
  }),
  http.delete(`${BASE}${TRAINER_WORKOUT_URLS.API.EXERCISES}/:id`, async ({ params }) => {
    await delay(300);
    const exists = exercisesDB.some((exercise) => exercise.id === params.id);
    if (!exists) return HttpResponse.json({ success: false, message: 'TrainerWorkoutExercise not found.', data: null }, { status: TRAINER_WORKOUT_HTTP_STATUS_CODES.NOT_FOUND });
    exercisesDB = exercisesDB.filter((exercise) => exercise.id !== params.id);
    return HttpResponse.json({ success: true, message: 'TrainerWorkoutExercise deleted.', data: null });
  }),
];
