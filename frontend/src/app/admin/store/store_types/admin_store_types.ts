export interface AdminProduct {
  id: string; name: string; category: string; price: number; stock: number;
  lowStockThreshold: number; unit: string; description?: string; imageUrl?: string;
}
export interface AdminOrder { id: string; items: AdminCartItem[]; total: number; paymentMethod: string; createdAt: string; cashierName?: string; }
export interface AdminCartItem { productId: string; name: string; price: number; qty: number; }
export interface AdminStoreStats { totalProducts: number; totalOrders: number; totalRevenue: number; lowStockCount: number; }
