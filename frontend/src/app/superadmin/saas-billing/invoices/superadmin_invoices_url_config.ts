export const InvoicesUrlConfig = {
    EXTERNAL: {
        WHATSAPP_SHARE: (message: string) => `https://wa.me/?text=${encodeURIComponent(message)}`,
    },
    PAGES: { MAIN: "/superadmin/saas-billing/invoices" },
    BACKEND_API: {
        BASE: "/superadmin/saas-billing/invoices",
        MANUAL_PAYMENT: "/superadmin/saas-billing/invoices/manual-payment",
        TENANTS: "/superadmin/gyms"
    }
};

