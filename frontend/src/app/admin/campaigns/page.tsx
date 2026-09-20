import AdminCampaignsMain from '@/app/admin/campaigns/campaigns_components/AdminCampaignsMain/AdminCampaignsMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Campaigns | Admin',
};

export default function AdminCampaignsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <AdminCampaignsMain />
    </div>
  );
}
