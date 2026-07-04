import { PrismaService } from '../../database/prisma.service';
export declare class PlansService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    update(id: number, dto: any): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
    remove(id: number): import("@prisma/client").Prisma.Prisma__PlanClient<{
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
