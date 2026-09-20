// RESPONSIBILITY: Renders metadata for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.
import type { Metadata } from 'next';
import AdminCampaignsMain from '@/app/admin/campaigns/campaigns_components/AdminCampaignsMain/AdminCampaignsMain';

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
