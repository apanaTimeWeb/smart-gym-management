import { FinanceService } from './finance.service';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    createPayment(dto: any): Promise<{
        id: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        memberId: number;
        amount: number;
        method: string;
        notes: string | null;
        invoiceNo: string;
        paidAt: Date;
    }>;
    findAllPayments(query: any): Promise<{
        payments: ({
            member: {
                id: number;
                email: string;
                name: string;
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
        total: number;
    }>;
    getSummary(): Promise<{
        totalRevenue: number;
        monthlyRevenue: number;
        pendingAmount: number;
        totalPayments: number;
        revenueByMethod: Record<string, number>;
        monthlyData: {
            month: string;
            revenue: number;
        }[];
    }>;
    getPaymentsByMember(memberId: string): Promise<{
        id: number;
        createdAt: Date;
        status: import("@prisma/client").$Enums.PaymentStatus;
        memberId: number;
        amount: number;
        method: string;
        notes: string | null;
        invoiceNo: string;
        paidAt: Date;
    }[]>;
}
