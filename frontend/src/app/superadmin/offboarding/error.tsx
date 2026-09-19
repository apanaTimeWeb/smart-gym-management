
// RESPONSIBILITY: Route-level Superadmin recovery boundary.
'use client';

import type { SuperadminRouteErrorProps } from '@/app/superadmin/offboarding/offboarding_types/SuperadminRouteErrorTypes';

export default function Error({ reset }: SuperadminRouteErrorProps) {
    return (<div className="flex min-h-80 items-center justify-center">
      <div className="max-w-md rounded-xl border border-border bg-card p-8 text-center">
        <h1 className="text-lg font-semibold text-primary">This Superadmin page needs another try.</h1>
        <p className="mt-2 text-sm text-secondary">The platform could not load this section safely.</p>
        <button type="button" onClick={reset} className="mt-5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
          Try Again
        </button>
      </div>
    </div>);
}
