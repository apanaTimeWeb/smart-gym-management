import { renderHook } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import enMessages from '@/app/frontend_public/landing/_locales/en.json';
import { usePublicLandingUnsavedChangesGuard } from '@/app/frontend_public/landing/landing_hooks/usePublicLandingUnsavedChangesGuard';

const wrapper = ({ children }: { children: ReactNode }) => (
  <NextIntlClientProvider locale="en" messages={enMessages}>{children}</NextIntlClientProvider>
);

describe('usePublicLandingUnsavedChangesGuard', () => {
  afterEach(() => vi.restoreAllMocks());

  it('blocks same-origin navigation when the user cancels confirmation', () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    renderHook(() => usePublicLandingUnsavedChangesGuard(true), { wrapper });
    const anchor = document.createElement('a');
    anchor.href = '/other';
    document.body.appendChild(anchor);
    const event = new MouseEvent('click', { bubbles: true, cancelable: true, button: 0 });
    anchor.dispatchEvent(event);
    expect(confirm).toHaveBeenCalled();
    expect(event.defaultPrevented).toBe(true);
    anchor.remove();
  });
});
