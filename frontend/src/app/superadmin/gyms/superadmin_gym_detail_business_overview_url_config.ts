// RESPONSIBILITY: Centralizes all route and API paths for the Superadmin Gym 360 workspace.
export const SuperadminGymDetailUrlConfig = Object.freeze({
    BACKEND_API: {
        BASE: '/superadmin/gym-detail/business-overview',
        BY_GYM: (gymId: string) => `/superadmin/gym-detail/business-overview?gymId=${encodeURIComponent(gymId)}`,
    },
});


