export const TicketsUrlConfig = {
    PAGES: { MAIN: "/superadmin/tickets", GYMS: "/superadmin/gyms" },
    BACKEND_API: {
        BASE: "/superadmin/tickets",
        REPLY: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/reply`,
        CLOSE: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/close`,
        ASSIGN: (id: string) => `/superadmin/tickets/${encodeURIComponent(id)}/assign`,
    }
};
