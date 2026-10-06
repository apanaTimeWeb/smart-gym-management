"use client";
// RESPONSIBILITY: Owns the single Admin shell WebSocket lifecycle and exposes event subscriptions to feature hooks.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import type { AdminLayoutWebSocketContextValue, AdminLayoutWebSocketProviderProps, AdminSocketListener } from '@/app/frontend_admin/admin_layout/admin_layout_types/AdminLayoutTypes';

const AdminLayoutWebSocketContext = createContext<AdminLayoutWebSocketContextValue | null>(null);

/**
 * @description AdminLayoutWebSocketProvider owns connection lifecycle/reconnect and exposes a cleanup-safe event subscription API.
 * @dependencies Uses socket.io-client over WebSocket transport only; no feature business logic is stored here.
 * @edge-case When no host-supplied URL exists, the provider stays disconnected and feature recovery falls back to query revalidation.
 */
export default function AdminLayoutWebSocketProvider({ children, url }: AdminLayoutWebSocketProviderProps) {
  const [connected, setConnected] = useState(false);
  const listenersRef = useRef(new Map<string, Set<AdminSocketListener>>());
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!url) return;
    let disposed = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let retryDelay = 1000;
    const connect = () => {
      if (disposed) return;
      const socket = io(url, { transports: ['websocket'], autoConnect: false });
      socketRef.current = socket;
      socket.on('connect', () => { retryDelay = 1000; setConnected(true); });
      socket.onAny((eventName, payload) => {
        listenersRef.current.get(eventName)?.forEach((listener) => listener(payload));
      });
      socket.on('disconnect', () => {
        setConnected(false); socketRef.current = null;
        if (!disposed) { retryTimer = setTimeout(connect, retryDelay); retryDelay = Math.min(retryDelay * 2, 10000); }
      });
      socket.on('connect_error', () => setConnected(false));
      socket.connect();
    };
    connect();
    return () => { disposed = true; if (retryTimer) clearTimeout(retryTimer); socketRef.current?.close(); socketRef.current = null; setConnected(false); };
  }, [url]);

  const subscribe = useCallback((eventName: string, listener: AdminSocketListener) => {
    const listeners = listenersRef.current.get(eventName) ?? new Set<AdminSocketListener>();
    listeners.add(listener); listenersRef.current.set(eventName, listeners);
    return () => { listeners.delete(listener); if (!listeners.size) listenersRef.current.delete(eventName); };
  }, []);
  const value = useMemo(() => ({ connected, subscribe }), [connected, subscribe]);
  return <AdminLayoutWebSocketContext.Provider value={value}>{children}</AdminLayoutWebSocketContext.Provider>;
}

/**
 * @description Subscribes an Admin feature hook to one named WebSocket event without creating a feature-owned connection.
 * @dependencies Requires the nearest AdminLayoutWebSocketProvider and a stable event listener callback.
 * @edge-case Throws when rendered outside the provider; cleanup is automatic on dependency change/unmount.
 */
export function useAdminLayoutWebSocketEvent(eventName: string, listener: AdminSocketListener) {
  const context = useContext(AdminLayoutWebSocketContext);
  if (!context) throw new Error('useAdminLayoutWebSocketEvent must be used inside AdminLayoutWebSocketProvider');
  useEffect(() => context.subscribe(eventName, listener), [context, eventName, listener]);
  return context.connected;
}
