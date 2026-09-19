'use client';
// RESPONSIBILITY: Structural loading skeleton matching the earnings page geometry.
export default function TrainerEarningsLoadingSkeleton() { return <> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={`skeleton-card-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />)}</div><div className="h-64 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /><div className="h-80 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /></div> </>; }
