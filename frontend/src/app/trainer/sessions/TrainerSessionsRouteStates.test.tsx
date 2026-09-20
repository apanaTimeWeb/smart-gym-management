// RESPONSIBILITY: Renders the TrainerSessionsRouteStates.test route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Loading from '@/app/trainer/sessions/loading';
import ErrorBoundary from '@/app/trainer/sessions/error';

describe('Trainer sessions route states', () => {
  it('renders the feature skeleton while the route is loading', () => {
    const { container } = render(<Loading />);
    expect(container.firstElementChild).toHaveClass('p-6');
  });

  it('renders a retry action for the route error state', () => {
    const reset = vi.fn();
    render(<ErrorBoundary error={new Error('test')} reset={reset} />);
    const retry = screen.getByRole('button');
    expect(retry).toBeInTheDocument();
    retry.click();
    expect(reset).toHaveBeenCalledTimes(1);
  });
});
