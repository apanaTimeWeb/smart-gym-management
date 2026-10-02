import { renderHook, act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { useSuperadminBroadcastsIdempotencyKeys } from '@/app/frontend_superadmin/superadmin_broadcasts/superadmin_broadcasts_hooks/useSuperadminBroadcastsIdempotencyKeys';



describe('useSuperadminBroadcastsIdempotencyKeys', () => {
    it('reuses a create key until the intent succeeds and is explicitly cleared', () => {
        const { result } = renderHook(() => useSuperadminBroadcastsIdempotencyKeys());
        const first = result.current.getCreateKey();
        const retry = result.current.getCreateKey();
        expect(retry).toBe(first);

        act(() => result.current.clearCreateKey());
        expect(result.current.getCreateKey()).not.toBe(first);
    });

    it('isolates resource-scoped keys by broadcast ID', () => {
        const { result } = renderHook(() => useSuperadminBroadcastsIdempotencyKeys());
        const updateA = result.current.getUpdateKey('broadcast-a');
        const updateARetry = result.current.getUpdateKey('broadcast-a');
        const updateB = result.current.getUpdateKey('broadcast-b');
        expect(updateARetry).toBe(updateA);
        expect(updateB).not.toBe(updateA);
    });

    it('allows one intent to be cleared without affecting another resource', () => {
        const { result } = renderHook(() => useSuperadminBroadcastsIdempotencyKeys());
        const deleteA = result.current.getDeleteKey('broadcast-a');
        const deleteB = result.current.getDeleteKey('broadcast-b');
        act(() => result.current.clearDeleteKey('broadcast-a'));
        expect(result.current.getDeleteKey('broadcast-b')).toBe(deleteB);
        expect(result.current.getDeleteKey('broadcast-a')).not.toBe(deleteA);
    });
});
