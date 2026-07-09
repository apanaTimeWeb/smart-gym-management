import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<{
        success: boolean;
        data: {
            totalMembers: number;
            activeMembers: number;
            newMembersThisMonth: number;
            totalRevenue: number;
            monthlyRevenue: number;
            pendingPayments: number;
            totalStaff: number;
            activeStaff: number;
            totalProducts: number;
            lowStockCount: number;
            totalInquiries: number;
            newInquiries: number;
            memberGrowth: {
                month: string;
                count: number;
            }[];
            revenueChart: {
                month: string;
                revenue: number;
            }[];
            membersByPlan: {
                plan: string;
                count: number;
            }[];
            membersByStatus: {
                active: number;
                pending: number;
                expired: number;
            };
            recentMembers: import("../members/entities/member.entity").Member[];
            recentPayments: import("../finance/entities/payment.entity").Payment[];
            pendingPaymentsList: import("../members/entities/member.entity").Member[];
        };
    }>;
}
