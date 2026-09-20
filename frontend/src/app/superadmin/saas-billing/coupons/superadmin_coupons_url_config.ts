export const CouponsUrlConfig = {
    EXTERNAL: {
        WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    PAGES: { MAIN: "/superadmin/saas-billing/coupons" },
    BACKEND_API: { BASE: "/superadmin/saas-billing/coupons" }
};
