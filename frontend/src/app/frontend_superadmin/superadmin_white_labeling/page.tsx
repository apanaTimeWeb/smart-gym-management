// RESPONSIBILITY: Server route entry for Superadmin White-labeling; the interactive feature is isolated in its client component.
import SuperadminWhiteLabelingMain from '@/app/frontend_superadmin/superadmin_white_labeling/superadmin_white_labeling_components/SuperadminWhiteLabelingMain';

import type { Metadata } from 'next';



export const metadata: Metadata = {
  title: 'White-Labeling & Domains | Superadmin',
  description: 'Manage custom domains and branding for tenant gyms',
};

/**
 * @description Server route entry for Superadmin White-labeling; the interactive feature is isolated in its client component.
 * @dependencies Delegates domain behavior to the feature-local dependencies imported by this file.
 * @state Keeps server state in TanStack Query and module UI state in the owning feature state layer where applicable.
 * @edge-cases Preserves documented loading, empty, error, disabled, cancellation, retry, and repeated-action behavior.
 */
export default function SuperadminWhiteLabelingPage() {
  return <SuperadminWhiteLabelingMain />;
}
