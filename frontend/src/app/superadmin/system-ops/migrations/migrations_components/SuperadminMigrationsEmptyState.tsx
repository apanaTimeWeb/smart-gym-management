// RESPONSIBILITY: Renders the empty state for the Superadmin migration history table.
'use client';
import { Database } from 'lucide-react';
export default function SuperadminMigrationsEmptyState() {
    return (<div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Database size={18} className="w-8 text-secondary mb-3" aria-hidden="true"/>
      <p className="text-sm font-medium text-primary">No schema rollouts found.</p>
      <p className="mt-1 text-xs text-secondary">Start a deployment to create the first migration history entry.</p>
    </div>);
}
