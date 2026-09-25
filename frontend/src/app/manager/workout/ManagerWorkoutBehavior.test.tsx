import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';
import { workoutApi } from '@/app/manager/workout/workout_api/ManagerWorkoutApi';
import ManagerWorkoutMain from '@/app/manager/workout/workout_components/ManagerWorkoutMain/ManagerWorkoutMain';

beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => managerMswServer.resetHandlers());
afterAll(() => managerMswServer.close());

describe('Manager Workout user-visible behavior', () => {
  it('renders the real feature UI against module MSW handlers', async () => {
    render(<ManagerTestProviders><ManagerWorkoutMain /></ManagerTestProviders>);
    expect(await screen.findByText('Workout Management')).toBeInTheDocument();
    expect(await screen.findByText('Beginner Full Body')).toBeInTheDocument();
  });

  it('proves module MSW supplies non-placeholder API data', async () => {
    const response = await workoutApi.fetchWorkouts({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.workouts?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the workout empty search state from an MSW response', async () => {
    managerMswServer.use(
      http.get('/manager/workouts', () => HttpResponse.json({ success: true, message: 'Empty result', data: { workouts: [], total: 0, page: 1, limit: 12 } }))
    );
    render(<ManagerTestProviders><ManagerWorkoutMain /></ManagerTestProviders>);
    expect(await screen.findByText(/No workout plans found matching/)).toBeInTheDocument();
  });

  it('renders the workout error state for assignment data from an MSW failure', async () => {
    managerMswServer.use(
      http.get('/manager/workout/assignments', () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: 500 }))
    );
    render(<ManagerTestProviders><ManagerWorkoutMain /></ManagerTestProviders>);
    expect(await screen.findByText('Unable to load assigned workout plans.')).toBeInTheDocument();
  });

  it('proves workout search changes the rendered plan dataset', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerWorkoutMain /></ManagerTestProviders>);
    expect(await screen.findByText('Beginner Full Body')).toBeInTheDocument();
    const search = await screen.findByPlaceholderText('Search...');
    await user.clear(search);
    await user.type(search, 'ZZZ-No-Such-Workout');
    expect(await screen.findByText(/No workout plans found matching/)).toBeInTheDocument();
  });

});
