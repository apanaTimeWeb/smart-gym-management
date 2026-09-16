'use client';
// RESPONSIBILITY: Renders the empty state for the Superadmin migration history table.

import { Database } from 'lucide-react';

export default function SuperadminMigrationsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <Database className="w-8 h-8 text-secondary/40 mb-3" aria-hidden="true" />
      <p className="text-sm font-medium text-foreground">No schema rollouts found.</p>
      <p className="mt-1 text-xs text-secondary">Start a deployment to create the first migration history entry.</p>
    </div>
  );
}
