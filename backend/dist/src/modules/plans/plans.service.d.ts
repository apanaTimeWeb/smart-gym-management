import { PrismaService } from '../../database/prisma.service';
export declare class PlansService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    findAll(): Promise<{
        success: boolean;
        data: {
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
        }[];
    }>;
    findOne(id: number): Promise<{
        success: boolean;
        data: {
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
        } | null;
    }>;
    update(id: number, dto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    remove(id: number): Promise<{
        success: boolean;
        data: {
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
    }>;
}
