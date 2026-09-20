// RESPONSIBILITY: Structural loading skeleton matching the notifications page geometry.
'use client';
export default function TrainerNotificationsLoadingSkeleton() { return <> <div className="p-6 space-y-4"><div className="h-14 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />{Array.from({ length: 5 }).map((_, i) => <div key={`skeleton-row-${i}`} className="h-20 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />)}</div> </>; }
