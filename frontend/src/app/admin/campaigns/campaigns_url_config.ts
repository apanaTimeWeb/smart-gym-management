// RESPONSIBILITY: Owns every route consumed by the Admin Campaigns feature.
export const AdminCampaignsUrlConfig = {
  root: '/admin/campaigns',
  api: {
    audiences: '/api/admin/campaigns/audiences',
    templates: '/api/admin/campaigns/templates',
    recipients: '/api/admin/campaigns/recipients',
  },
} as const;
