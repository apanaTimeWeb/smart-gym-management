import { PrismaService } from '../../database/prisma.service';
export declare class StoreService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllProducts(query: any): import("@prisma/client").Prisma.PrismaPromise<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        price: number;
        stock: number;
        description: string | null;
        imageUrl: string | null;
    }[]>;
    createProduct(dto: any): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        price: number;
        stock: number;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateProduct(id: number, dto: any): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        price: number;
        stock: number;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    removeProduct(id: number): import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: number;
        name: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        category: string;
        price: number;
        stock: number;
        description: string | null;
        imageUrl: string | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAllOrders(query: any): Promise<{
        orders: ({
            items: ({
                product: {
                    id: number;
                    name: string;
                    isActive: boolean;
                    createdAt: Date;
                    updatedAt: Date;
                    category: string;
                    price: number;
                    stock: number;
                    description: string | null;
                    imageUrl: string | null;
                };
            } & {
                id: number;
                price: number;
                orderId: number;
                productId: number;
                qty: number;
            })[];
        } & {
            id: number;
            createdAt: Date;
            status: string;
            method: string;
            notes: string | null;
            total: number;
        })[];
        total: number;
    }>;
    createOrder(dto: any): Promise<({
        items: {
            id: number;
            price: number;
            orderId: number;
            productId: number;
            qty: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        status: string;
        method: string;
        notes: string | null;
        total: number;
    }) | null>;
    getStoreSummary(): Promise<{
        totalProducts: number;
        totalOrders: number;
        totalRevenue: number;
        lowStockProducts: {
            id: number;
            name: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            category: string;
            price: number;
            stock: number;
            description: string | null;
            imageUrl: string | null;
        }[];
    }>;
}
