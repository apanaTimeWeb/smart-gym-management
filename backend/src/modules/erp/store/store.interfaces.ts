import { Product } from '@/modules/erp/store/entities/product.entity';
import { OrderItem } from '@/modules/erp/store/entities/order-item.entity';
import { Order } from '@/modules/erp/store/entities/order.entity';

export interface IProduct {
  id: number;
  name: string;
  sku: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: number;
  total: number;
  method: string;
  status: string;
  notes?: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderItem {
  id: number;
  order: IOrder;
  product: Product;
  qty: number;
  price: number;
}

export interface IStoreSummary {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  lowStockProducts: Product[];
}

export interface OrderResponse { success: boolean; message: string; data: any; }
export interface OrderListResponse { success: boolean; message: string; data: any; }
export interface ProductResponse { success: boolean; message: string; data: any; }
export interface ProductListResponse { success: boolean; message: string; data: any; }
export interface StoreSummaryResponse { success: boolean; message: string; data: any; }
