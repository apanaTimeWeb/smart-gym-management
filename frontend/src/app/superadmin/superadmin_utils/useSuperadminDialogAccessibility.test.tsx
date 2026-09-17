import { useEffect } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { useSuperadminDialogAccessibility } from '@/app/superadmin/superadmin_utils/useSuperadminDialogAccessibility';

function DialogHarness({ isOpen }: { isOpen: boolean }) {
  const dialogRef = useSuperadminDialogAccessibility<HTMLDivElement>(isOpen);
  useEffect(() => {
    if (!isOpen) return;
    document.getElementById('opener')?.focus();
  }, [isOpen]);
  return isOpen ? (
    <div ref={dialogRef} role="dialog" aria-label="Test dialog" tabIndex={-1}>
      <button type="button">First</button>
      <button type="button">Last</button>
    </div>
  ) : null;
}

describe('useSuperadminDialogAccessibility', () => {
  it('keeps Tab focus inside the dialog', async () => {
    const user = userEvent.setup();
    render(<><button id="opener">Open</button><DialogHarness isOpen /></>);
    screen.getByRole('button', { name: 'First' }).focus();
    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Last' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'First' })).toHaveFocus();
  });
});
