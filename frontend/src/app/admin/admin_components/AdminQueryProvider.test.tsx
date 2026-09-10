// RESPONSIBILITY: Tests for AdminQueryProvider
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminQueryProvider from '@/app/admin/admin_components/AdminQueryProvider';

describe('AdminQueryProvider Component', () => {
  it('renders children correctly', () => {
    render(
      <AdminQueryProvider>
        <div data-testid="child-element">Child Content</div>
      </AdminQueryProvider>
    );
    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
