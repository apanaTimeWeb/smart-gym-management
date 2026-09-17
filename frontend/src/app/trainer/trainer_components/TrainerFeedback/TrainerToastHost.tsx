'use client';
// RESPONSIBILITY: Mounts the single Trainer-wide react-hot-toast renderer with Smart Gym 360 surface styling.
import { Toaster } from 'react-hot-toast';

export default function TrainerToastHost() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          width: '320px',
          padding: '16px',
          borderRadius: 'var(--radius-lg)',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
        },
      }}
    />
  );
}
