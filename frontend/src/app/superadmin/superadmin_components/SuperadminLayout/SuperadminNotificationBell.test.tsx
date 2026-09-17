import fs from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('SuperadminNotificationBell accessibility contract', () => {
  it('closes the notification popover on Escape', () => {
    const source = fs.readFileSync(new URL('SuperadminNotificationBell.tsx', import.meta.url), 'utf8');
    expect(source).toContain("if (event.key === 'Escape') setOpen(false);");
    expect(source).toContain("document.addEventListener('keydown', handleKeyDown);");
    expect(source).toContain("document.removeEventListener('keydown', handleKeyDown);");
  });
});
