import { StoreService } from './store.service';
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    findAllProducts(query: any): Promise<{
        success: boolean;
        data: {
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
    createProduct(dto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    updateProduct(id: string, dto: any): Promise<{
        success: boolean;
        data: {
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
    }>;
    removeProduct(id: string): Promise<{
        success: boolean;
        data: {
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
    }>;
    findAllOrders(query: any): Promise<{
        success: boolean;
        data: {
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
                    qty: number;
                    productId: number;
                    orderId: number;
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
        };
    }>;
    createOrder(dto: any): Promise<{
        success: boolean;
        data: {
            items: {
                id: number;
                price: number;
                qty: number;
                productId: number;
                orderId: number;
            }[];
        } & {
            id: number;
            createdAt: Date;
            status: string;
            method: string;
            notes: string | null;
            total: number;
        };
    }>;
    getStoreSummary(): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
}
