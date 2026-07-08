import { PlansService } from './plans.service';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
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
    findOne(id: string): Promise<{
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
    update(id: string, dto: any): Promise<{
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
    remove(id: string): Promise<{
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
