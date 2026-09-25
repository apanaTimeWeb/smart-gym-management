// RESPONSIBILITY: Owns every route consumed by the Admin Campaigns feature.
export const AdminCampaignsUrlConfig = {
  root: '/admin/campaigns',
  api: {
    audiences: '/admin/campaigns/audiences',
    templates: '/admin/campaigns/templates',
    recipients: '/admin/campaigns/recipients',
  },
} as const;
