import { PlansService } from './plans.service';
export declare class PlansController {
    private readonly plansService;
    constructor(plansService: PlansService);
    create(dto: any): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(id: string): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, dto: any): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
