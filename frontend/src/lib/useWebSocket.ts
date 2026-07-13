import { useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { getUser } from '@/lib/api';

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL 
  ? process.env.NEXT_PUBLIC_API_URL.replace('/api/v1', '') 
  : 'http://localhost:5000';

let globalSocket: Socket | null = null;

export const useWebSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(globalSocket);
  const [isConnected, setIsConnected] = useState<boolean>(globalSocket?.connected || false);

  useEffect(() => {
    if (!globalSocket) {
      // Connect to the WebSocket server
      const user = getUser();
      
      const options: any = {
        transports: ['websocket'],
        autoConnect: true,
      };

      if (user && user.tenantId) {
        options.query = { tenantId: user.tenantId };
      }

      globalSocket = io(SOCKET_URL, options);

      globalSocket.on('connect', () => {
        setIsConnected(true);
      });

      globalSocket.on('disconnect', () => {
        setIsConnected(false);
      });
    }

    setSocket(globalSocket);

    return () => {
      // We don't disconnect on unmount to keep the connection persistent across navigation
      // Only disconnect on explicit logout
    };
  }, []);

  const subscribe = useCallback((event: string, callback: (...args: any[]) => void) => {
    if (globalSocket) {
      globalSocket.on(event, callback);
    }
  }, []);

  const unsubscribe = useCallback((event: string, callback?: (...args: any[]) => void) => {
    if (globalSocket) {
      if (callback) {
        globalSocket.off(event, callback);
      } else {
        globalSocket.off(event);
      }
    }
  }, []);

  const emit = useCallback((event: string, ...args: any[]) => {
    if (globalSocket) {
      globalSocket.emit(event, ...args);
    }
  }, []);

  return {
    socket,
    isConnected,
    subscribe,
    unsubscribe,
    emit
  };
};

export const disconnectWebSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
  }
};
