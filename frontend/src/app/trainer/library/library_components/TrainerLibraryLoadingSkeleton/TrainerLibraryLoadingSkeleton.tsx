// RESPONSIBILITY: Structural loading skeleton matching the library page geometry.
'use client';
export default function TrainerLibraryLoadingSkeleton() { return <> <div className="p-6 space-y-5"><div className="h-14 bg-skeleton-base rounded-xl motion-safe:animate-pulse" /><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{Array.from({ length: 6 }).map((_, i) => <div key={`skeleton-card-${i}`} className="h-48 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />)}</div></div> </>; }
