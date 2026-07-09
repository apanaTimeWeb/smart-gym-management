import { StoreService } from "./store.service";
export declare class StoreController {
    private readonly storeService;
    constructor(storeService: StoreService);
    findAllProducts(query: any): Promise<{
        success: boolean;
        data: import("./entities/product.entity").Product[];
    }>;
    createProduct(dto: any): Promise<{
        success: boolean;
        data: import("./entities/product.entity").Product[];
    }>;
    updateProduct(id: string, dto: any): Promise<{
        success: boolean;
        data: import("./entities/product.entity").Product | null;
    }>;
    removeProduct(id: string): Promise<{
        success: boolean;
        data: import("./entities/product.entity").Product | null;
    }>;
    findAllOrders(query: any): Promise<{
        success: boolean;
        data: {
            orders: import("./entities/order.entity").Order[];
            total: number;
        };
    }>;
    createOrder(dto: any): Promise<{
        success: boolean;
        data: import("./entities/order.entity").Order;
    }>;
    getStoreSummary(): Promise<{
        success: boolean;
        data: {
            totalProducts: number;
            totalOrders: number;
            totalRevenue: number;
            lowStockProducts: import("./entities/product.entity").Product[];
        };
    }>;
}
