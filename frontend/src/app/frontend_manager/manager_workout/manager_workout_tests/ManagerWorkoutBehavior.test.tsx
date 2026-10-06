// RESPONSIBILITY: Renders or orchestrates the owning Manager feature UI; API transport and business rules remain in module-owned hooks/services.
import { MANAGER_HTTP_STATUS } from '@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus';
import { render, screen } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { managerMockApiUrl } from '@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl';
import { managerMswServer } from '@/app/frontend_manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/frontend_manager/manager_mocks/ManagerTestProviders';
import { ManagerWorkoutApi } from '@/app/frontend_manager/manager_workout/manager_workout_api/ManagerWorkoutApi';
import ManagerWorkoutMain from '@/app/frontend_manager/manager_workout/manager_workout_components/manager_workout_main/ManagerWorkoutMain';
import { ManagerWorkoutUrlConfig } from '@/app/frontend_manager/manager_workout/manager_workout_url_config';

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
    const response = await ManagerWorkoutApi.fetchWorkouts({ page: '1', limit: '10' });
    expect(response.success).toBe(true);
    expect(response.data?.workouts?.length ?? 0).toBeGreaterThan(0);
  });
it('renders the workout empty search state from an MSW response', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.WORKOUTS_BASE), () => HttpResponse.json({ success: true, message: 'Empty result', data: { workouts: [], total: 0, page: 1, limit: 12 } }))
    );
    render(<ManagerTestProviders><ManagerWorkoutMain /></ManagerTestProviders>);
    expect(await screen.findByText(/No workout plans found matching/)).toBeInTheDocument();
  });

  it('renders the workout error state for assignment data from an MSW failure', async () => {
    managerMswServer.use(
      http.get(managerMockApiUrl(ManagerWorkoutUrlConfig.BACKEND_API.ASSIGNMENTS), () => HttpResponse.json({ success: false, message: 'Simulated failure', data: null }, { status: MANAGER_HTTP_STATUS.SERVER_ERROR }))
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
