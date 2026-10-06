import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ManagerCommandPalette from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_command_palette/ManagerCommandPalette';
import { MANAGER_NAV_GROUPS } from '@/app/frontend_manager/manager_navigation/ManagerNavigationConfig';

const push = vi.fn();
const mockTranslations = (key: string) => key;

vi.mock('next-intl', () => ({
  useTranslations: () => mockTranslations,
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
  usePathname: () => '/',
}));

describe('ManagerCommandPalette user-visible keyboard behavior', () => {
  beforeEach(() => {
    push.mockReset();
    document.body.innerHTML = '';
  });

  it('opens when the host shell requests the command palette and restores focus after close', async () => {
    const user = userEvent.setup();
    const trigger = document.createElement('button');
    trigger.textContent = 'trigger';
    document.body.appendChild(trigger);
    trigger.focus();
    render(<ManagerCommandPalette requestedOpen={true} onRequestedOpenHandled={vi.fn()} />);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'COMMAND_PALETTE_SEARCH' })).toHaveFocus();

    await user.click(screen.getByTestId('manager_navigation-command-palette-button-close'));
    expect(trigger).toHaveFocus();
  });

  it('opens from Ctrl+K, filters pages, and navigates when a page is selected', async () => {
    const user = userEvent.setup();
    render(<ManagerCommandPalette />);

    fireEvent.keyDown(window, { key: 'k', ctrlKey: true });
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const search = screen.getByRole('textbox', { name: 'COMMAND_PALETTE_SEARCH' });
    await user.type(search, 'NAV_MEMBER_MANAGEMENT');

    const memberCommand = screen.getByTestId('manager_navigation-command-palette-page-nav_member_management');
    expect(memberCommand).toHaveTextContent('NAV_MEMBER_MANAGEMENT');

    await user.click(memberCommand);
    const expected = MANAGER_NAV_GROUPS.flatMap((group) => group.items).find((item) => item.labelKey === 'NAV_MEMBER_MANAGEMENT');
    expect(push).toHaveBeenCalledWith(expected?.href);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows shortcut help from ? and closes it with Escape', async () => {
    fireEvent.keyDown(window, { key: '?' });
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('SHORTCUT_HELP_TITLE')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('submits the focused form from Ctrl+S', () => {
    const requestSubmit = vi.fn();
    render(
      <>
        <form onSubmit={(event) => event.preventDefault()}>
          <input className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page" aria-label="name" data-testid="manager_navigation-command-palette-test-form-input" />
        </form>
        <ManagerCommandPalette />
      </>,
    );

    const input = screen.getByTestId('manager_navigation-command-palette-test-form-input');
    const form = input.closest('form');
    if (!form) throw new Error('Expected test form to exist');
    form.requestSubmit = requestSubmit;
    input.focus();

    fireEvent.keyDown(window, { key: 's', ctrlKey: true });
    expect(requestSubmit).toHaveBeenCalledTimes(1);
  });
});
