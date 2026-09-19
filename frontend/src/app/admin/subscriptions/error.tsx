"use client";
// RESPONSIBILITY: Renders/orchestrates error for the admin module; UI composition stays here and business/API logic remains in dedicated hooks and APIs.
import { CreditCard } from 'lucide-react';

export default function AdminSubscriptionsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <CreditCard size={40} className="text-danger opacity-60" />
      <p className="text-primary font-semibold">Failed to load Subscription data</p>
      <button onClick={reset} className="px-5 py-2 bg-primary text-on-primary rounded-xl text-sm font-semibold hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base">
        Try Again
      </button>
    </div>
  );
}