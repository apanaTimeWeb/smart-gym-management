// RESPONSIBILITY: Renders one semantic loading skeleton block for the Superadmin shell skeleton.
'use client';
import type { SuperadminPageSuspenseSkeletonPartProps } from '@/app/superadmin/superadmin_layout/SuperadminPageSuspenseSkeletonTypes';
export default function SuperadminPageSuspenseSkeletonPart({ className }: SuperadminPageSuspenseSkeletonPartProps) {
  return <div className={`motion-safe:animate-pulse rounded-md bg-skeleton-base ${className || ''}`} />;
}
