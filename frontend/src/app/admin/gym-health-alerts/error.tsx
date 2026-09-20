"use client";
// RESPONSIBILITY: Error boundary for the Gym Health Alerts page.
export default function GymHealthAlertsError({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4">
      <p className="text-danger font-semibold">Failed to load gym health alerts</p>
      <button onClick={reset} className="motion-safe:transition-all motion-safe:duration-base ease-in-out px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page">Try Again</button>
    </div>
  );
}