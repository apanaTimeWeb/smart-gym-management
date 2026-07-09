import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
export declare class StoreService {
    private readonly productRepository;
    private readonly orderRepository;
    private readonly orderItemRepository;
    constructor(productRepository: Repository<Product>, orderRepository: Repository<Order>, orderItemRepository: Repository<OrderItem>);
    findAllProducts(query: any): Promise<{
        success: boolean;
        data: Product[];
    }>;
    createProduct(dto: any): Promise<{
        success: boolean;
        data: Product[];
    }>;
    updateProduct(id: number, dto: any): Promise<{
        success: boolean;
        data: Product | null;
    }>;
    removeProduct(id: number): Promise<{
        success: boolean;
        data: Product | null;
    }>;
    findAllOrders(query: any): Promise<{
        success: boolean;
        data: {
            orders: Order[];
            total: number;
        };
    }>;
    createOrder(dto: any): Promise<{
        success: boolean;
        data: Order;
    }>;
    getStoreSummary(): Promise<{
        success: boolean;
        data: {
            totalProducts: number;
            totalOrders: number;
            totalRevenue: number;
            lowStockProducts: Product[];
        };
    }>;
}
