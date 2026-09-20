import type { Metadata } from 'next';
import SuperadminWhiteLabelingMain from './white-labeling_components/SuperadminWhiteLabelingMain';

export const metadata: Metadata = {
  title: 'White-Labeling & Domains | Superadmin',
  description: 'Manage custom domains and branding for tenant gyms',
};

export default function SuperadminWhiteLabelingPage() {
  return <SuperadminWhiteLabelingMain />;
}
