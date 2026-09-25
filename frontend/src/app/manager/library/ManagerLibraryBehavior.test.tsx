import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { beforeAll, afterAll, afterEach, describe, expect, it } from 'vitest';
import ManagerLibraryMain from '@/app/manager/library/library_components/ManagerLibraryMain/ManagerLibraryMain';
import { resetManagerLibraryMockState } from '@/app/manager/library/library_mocks/handlers/ManagerLibraryMockHandlers';
import { managerMswServer } from '@/app/manager/manager_mocks/ManagerMswTestServer';
import { ManagerTestProviders } from '@/app/manager/manager_mocks/ManagerTestProviders';


beforeAll(() => managerMswServer.listen({ onUnhandledRequest: 'error' }));
afterEach(() => { managerMswServer.resetHandlers(); resetManagerLibraryMockState(); });
afterAll(() => managerMswServer.close());

describe('Manager Library user-visible flows', () => {
  it('switches between Diet Plans and Exercises and renders API-backed records', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerLibraryMain /></ManagerTestProviders>);
    expect(await screen.findByText('Diet Plans')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    expect(await screen.findByText('Bench Press')).toBeInTheDocument();
    expect(screen.getByText('Chest, Triceps, Shoulders')).toBeInTheDocument();
  });

  it('search changes the rendered exercise result set through the feature query path', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerLibraryMain /></ManagerTestProviders>);
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    const search = screen.getByRole('textbox', { name: 'Search exercises' });
    await user.type(search, 'Squat');
    expect(await screen.findByText('Squat')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Bench Press')).not.toBeInTheDocument());
  });

  it('opens exercise creation and blocks invalid submission', async () => {
    const user = userEvent.setup();
    render(<ManagerTestProviders><ManagerLibraryMain /></ManagerTestProviders>);
    await user.click(screen.getByRole('tab', { name: 'Exercises' }));
    await user.click(screen.getByRole('button', { name: 'Add Exercise' }));
    expect(screen.getByRole('dialog', { name: 'Add Exercise' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Add Exercise', exact: true }));
    expect(await screen.findByText('Exercise name is required')).toBeInTheDocument();
  });

  it('renders a real query error with a retry affordance', async () => {
    managerMswServer.use(http.get('/manager/library/diet-plans', () => HttpResponse.json({ success: false, message: 'Library temporarily unavailable', data: null }, { status: 500 })));
    render(<ManagerTestProviders><ManagerLibraryMain /></ManagerTestProviders>);
    expect(await screen.findByRole('alert')).toHaveTextContent('Library temporarily unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});
