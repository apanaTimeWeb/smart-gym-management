import { http, HttpResponse, delay } from 'msw';
import { env } from '@/config/env';
import { MOCK_WORKOUTS, MOCK_EXERCISES } from '@/app/trainer/workout/workout_fixtures/TrainerWorkoutMockData';

const BASE = env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

let workoutsDB = [...MOCK_WORKOUTS];
let exercisesDB = [...MOCK_EXERCISES];

export const trainerWorkoutHandlers = [
  http.get(`${BASE}/trainer/workout/workouts`, async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    let filtered = [...workoutsDB];
    if (search) {
      filtered = filtered.filter(w => w.name.toLowerCase().includes(search));
    }

    return HttpResponse.json({
      success: true,
      message: 'Workouts fetched successfully',
      data: {
        workouts: filtered,
      }
    });
  }),

  http.get(`${BASE}/trainer/workout/exercises`, async ({ request }) => {
    await delay(500);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() || '';

    let filtered = [...exercisesDB];
    if (search) {
      filtered = filtered.filter(e => e.name.toLowerCase().includes(search));
    }

    return HttpResponse.json({
      success: true,
      message: 'Exercises fetched successfully',
      data: {
        exercises: filtered,
      }
    });
  }),
];
