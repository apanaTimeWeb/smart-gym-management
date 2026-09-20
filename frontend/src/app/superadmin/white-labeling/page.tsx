// RESPONSIBILITY: Server route entry for Superadmin White-labeling; the interactive feature is isolated in its client component.
import type { Metadata } from 'next';
import SuperadminWhiteLabelingMain from '@/app/superadmin/white-labeling/white-labeling_components/SuperadminWhiteLabelingMain';

export const metadata: Metadata = {
  title: 'White-Labeling & Domains | Superadmin',
  description: 'Manage custom domains and branding for tenant gyms',
};

export default function SuperadminWhiteLabelingPage() {
  return <SuperadminWhiteLabelingMain />;
}
