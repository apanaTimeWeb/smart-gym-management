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
            recentMembers: ({
                plan: {
                    id: number;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    tier: import("@prisma/client").$Enums.PlanTier;
                    price1Month: number;
                    price3Month: number;
                    price6Month: number;
                    price12Month: number;
                    features: string[];
                };
            } & {
                id: number;
                name: string;
                email: string;
                phone: string;
                branch: string;
                createdAt: Date;
                updatedAt: Date;
                gender: import("@prisma/client").$Enums.Gender;
                address: string | null;
                joinDate: Date;
                planId: number;
                billingCycle: import("@prisma/client").$Enums.BillingCycle;
                status: import("@prisma/client").$Enums.MemberStatus;
                expiryDate: Date;
                paidAmount: number;
                pendingAmount: number;
                photo: string | null;
            })[];
            recentPayments: ({
                member: {
                    id: number;
                    name: string;
                    email: string;
                    phone: string;
                    branch: string;
                    createdAt: Date;
                    updatedAt: Date;
                    gender: import("@prisma/client").$Enums.Gender;
                    address: string | null;
                    joinDate: Date;
                    planId: number;
                    billingCycle: import("@prisma/client").$Enums.BillingCycle;
                    status: import("@prisma/client").$Enums.MemberStatus;
                    expiryDate: Date;
                    paidAmount: number;
                    pendingAmount: number;
                    photo: string | null;
                };
            } & {
                id: number;
                createdAt: Date;
                status: import("@prisma/client").$Enums.PaymentStatus;
                memberId: number;
                amount: number;
                method: string;
                notes: string | null;
                invoiceNo: string;
                paidAt: Date;
            })[];
            pendingPaymentsList: {
                id: number;
                name: string;
                expiryDate: Date;
                pendingAmount: number;
            }[];
        };
    }>;
}
