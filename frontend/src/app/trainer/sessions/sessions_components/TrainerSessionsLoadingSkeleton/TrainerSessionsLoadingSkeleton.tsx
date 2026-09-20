// RESPONSIBILITY: Structural loading skeleton matching the sessions page geometry.
'use client';
export default function TrainerSessionsLoadingSkeleton() { return <> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-4 gap-4">{Array.from({ length: 4 }).map((_, i) => <div key={`skeleton-card-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />)}</div><div className="h-12 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /><div className="h-96 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /></div> </>; }
