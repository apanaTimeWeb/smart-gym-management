/**
 * RESPONSIBILITY: React component SuperadminLayoutNotFound owned by the SuperadminLayoutStyles feature boundary.
 * INTENT: Keep this file’s presentation, logic, and state responsibility isolated from unrelated business modules.
 * STATE DEPENDENCIES: No React/client state primitive detected.
 * MODULE DEPENDENCIES: next/link, lucide-react
 * EDGE CASES: Preserve implemented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 * REPAIR CONSTRAINT: Cross-feature business dependencies require explicit documentation; do not move business logic into global UI infrastructure.
 */
// RESPONSIBILITY: Reusable 404 Not Found template for superadmin modules
import Link from 'next/link';

import { AlertCircle } from 'lucide-react';

import { MODULE_URLS as SUPERADMIN_DASHBOARD_URLS } from '@/app/frontend_superadmin/superadmin_dashboard/superadmin_dashboard_url_config';



export default function SuperadminLayoutNotFound({
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist or has been moved.",
  returnLink = SUPERADMIN_DASHBOARD_URLS.PAGES.MAIN,
  returnText = 'Return to Dashboard',
}: {
  title?: string;
  description?: string;
  returnLink?: string;
  returnText?: string;
}) {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center p-6 bg-card rounded-xl border border-border mt-4">
      <AlertCircle size={18} className="text-secondary mb-4" />
      <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
      <p className="text-secondary mb-6">{description}</p>
      <Link href={returnLink} className="px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base" data-testid="SuperadminLayoutStyles-superadmin-not-found-superadmin-not-found-link">
        {returnText}
      </Link>
    </div>
  );
}
