// RESPONSIBILITY: Mounts the single Trainer-wide react-hot-toast renderer with Smart Gym 360 semantic token styling.
'use client';
import { Toaster } from 'react-hot-toast';

export default function TrainerToastHost() {
  return <Toaster position="bottom-right" toastOptions={{ duration: 4000, className: '!w-80 !p-4 !rounded-lg !bg-card !text-primary !border !border-border !shadow-toast' }} />;
}
