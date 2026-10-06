'use client';
// DATA FLOW: Owning feature API/query/store state → useSuperadminBroadcastsIdempotencyKeys → consuming feature component.
import { useCallback, useMemo, useRef } from 'react';

/**
 * @description Owns idempotency-key lifecycle for broadcast user intents. One key is created per logical intent and retained across retries until the server confirms success.
 * @dependencies React refs/memoization only; no API, query, or UI dependencies.
 * @edge-case Failed retries reuse the same key. A new create flow explicitly resets the create key, while resource-scoped update/delete/send keys remain isolated by broadcast ID.
 */
export function useSuperadminBroadcastsIdempotencyKeys() {
    const createKeyRef = useRef<string | null>(null);
    const updateKeysRef = useRef(new Map<string, string>());
    const deleteKeysRef = useRef(new Map<string, string>());
    const sendKeysRef = useRef(new Map<string, string>());

    const getCreateKey = useCallback(() => {
        createKeyRef.current ??= crypto.randomUUID();
        return createKeyRef.current;
    }, []);
    const clearCreateKey = useCallback(() => { createKeyRef.current = null; }, []);
    const getUpdateKey = useCallback((id: string) => getResourceKey(updateKeysRef.current, id), []);
    const clearUpdateKey = useCallback((id: string) => updateKeysRef.current.delete(id), []);
    const getDeleteKey = useCallback((id: string) => getResourceKey(deleteKeysRef.current, id), []);
    const clearDeleteKey = useCallback((id: string) => deleteKeysRef.current.delete(id), []);
    const getSendKey = useCallback((id: string) => getResourceKey(sendKeysRef.current, id), []);
    const clearSendKey = useCallback((id: string) => sendKeysRef.current.delete(id), []);

    return useMemo(() => ({
        getCreateKey,
        clearCreateKey,
        getUpdateKey,
        clearUpdateKey,
        getDeleteKey,
        clearDeleteKey,
        getSendKey,
        clearSendKey,
    }), [
        getCreateKey,
        clearCreateKey,
        getUpdateKey,
        clearUpdateKey,
        getDeleteKey,
        clearDeleteKey,
        getSendKey,
        clearSendKey,
    ]);
}

function getResourceKey(store: Map<string, string>, id: string) {
    const existing = store.get(id);
    if (existing) return existing;
    const generated = crypto.randomUUID();
    store.set(id, generated);
    return generated;
}
