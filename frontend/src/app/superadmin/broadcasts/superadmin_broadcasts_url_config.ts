export const BroadcastsUrlConfig = {
    PAGES: { MAIN: "/superadmin/broadcasts" },
    BACKEND_API: { BASE: "/superadmin/broadcasts", TENANTS: "/api/gyms", DELIVER_TO_RECIPIENT: (broadcastId: string, recipientId: string) => `/superadmin/broadcasts/${encodeURIComponent(broadcastId)}/deliveries/${encodeURIComponent(recipientId)}` }
};
