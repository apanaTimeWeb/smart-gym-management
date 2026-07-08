import { MembersService } from './members.service';
export declare class MembersController {
    private readonly membersService;
    constructor(membersService: MembersService);
    create(createMemberDto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    getStats(): Promise<{
        success: boolean;
        data: {
            total: number;
            active: number;
            pending: number;
            expired: number;
        };
    }>;
    findAll(query: any): Promise<{
        success: boolean;
        data: {
            members: ({
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
            })[];
            total: number;
            page: number;
            limit: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        data: ({
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
            payments: {
                id: number;
                createdAt: Date;
                status: import("@prisma/client").$Enums.PaymentStatus;
                memberId: number;
                amount: number;
                method: string;
                notes: string | null;
                invoiceNo: string;
                paidAt: Date;
            }[];
        } & {
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
        }) | null;
    }>;
    update(id: string, updateMemberDto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    remove(id: string): Promise<{
        success: boolean;
        data: {
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
    }>;
    renewMembership(id: string, body: any): Promise<{
        success: boolean;
        data: {
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
    }>;
}
