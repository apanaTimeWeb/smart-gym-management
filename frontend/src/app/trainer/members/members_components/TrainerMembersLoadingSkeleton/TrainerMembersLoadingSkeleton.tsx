// RESPONSIBILITY: Structural loading skeleton matching the members page geometry.
'use client';
export default function TrainerMembersLoadingSkeleton() { return <> <div className="p-6 space-y-5"><div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{Array.from({ length: 3 }).map((_, i) => <div key={`skeleton-card-${i}`} className="h-28 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />)}</div><div className="h-16 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /><div className="h-96 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /></div> </>; }
