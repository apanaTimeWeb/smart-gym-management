// RESPONSIBILITY: Renders the empty state UI for the Broadcasts table when no broadcasts exist. Shows icon, message, and CTA to create first broadcast.
'use client';
import { Megaphone } from 'lucide-react';
import type { SuperadminBroadcastsEmptyStateProps } from '@/app/superadmin/broadcasts/broadcasts_types/SuperadminBroadcastsTypes';
export default function SuperadminBroadcastsEmptyState({ onCreateClick }: SuperadminBroadcastsEmptyStateProps) {
    return (<div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mb-4">
        <Megaphone className="w-8 h-8 text-secondary opacity-50"/>
      </div>
      <h3 className="text-base font-semibold text-primary">No Broadcasts Yet</h3>
      <p className="text-sm text-secondary mt-1 max-w-xs">Create your first announcement to push notifications to all gym dashboards.</p>
      <button onClick={onCreateClick} className="mt-4 px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary text-sm font-medium rounded-lg motion-safe:transition-all motion-safe:duration-base motion-safe:ease-in-out motion-safe:active:scale-95">
        Create First Broadcast
      </button>
    </div>);
}
