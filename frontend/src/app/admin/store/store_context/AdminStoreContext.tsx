"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { adminStoreApi } from "@/app/admin/store/store_api/admin_store_api";
import type { AdminProduct, AdminOrder, AdminStoreStats, AdminCartItem } from "@/app/admin/store/store_types/admin_store_types";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";

interface AdminStoreContextType {
  products: AdminProduct[]; orders: AdminOrder[]; stats: AdminStoreStats | null; loading: boolean;
  activeTab: "products" | "orders"; setActiveTab: (t: "products" | "orders") => void;
  showProductModal: boolean; editProduct: AdminProduct | null;
  openAddProduct: () => void; openEditProduct: (p: AdminProduct) => void; closeProductModal: () => void;
  saveProduct: (data: Partial<AdminProduct>) => Promise<void>; deleteProduct: (id: string) => Promise<void>;
  showPosModal: boolean; setShowPosModal: (v: boolean) => void;
  cart: AdminCartItem[]; addToCart: (p: AdminProduct) => void; removeFromCart: (id: string) => void; clearCart: () => void;
  checkout: (paymentMethod: string) => Promise<void>;
}
const Ctx = createContext<AdminStoreContextType | null>(null);

export function AdminStoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [stats, setStats] = useState<AdminStoreStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<AdminProduct | null>(null);
  const [showPosModal, setShowPosModal] = useState(false);
  const [cart, setCart] = useState<AdminCartItem[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, o, s] = await Promise.all([adminStoreApi.getProducts(), adminStoreApi.getOrders(), adminStoreApi.getStats()]);
      if (p.success) setProducts(p.data);
      if (o.success) setOrders(o.data);
      if (s.success) setStats(s.data);
    } catch (e) { logger.error("[AdminStore] load:", e); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const openAddProduct = () => { setEditProduct(null); setShowProductModal(true); };
  const openEditProduct = (p: AdminProduct) => { setEditProduct(p); setShowProductModal(true); };
  const closeProductModal = () => { setShowProductModal(false); setEditProduct(null); };

  const saveProduct = async (data: Partial<AdminProduct>) => {
    try {
      if (editProduct) await adminStoreApi.updateProduct(editProduct.id, data); else await adminStoreApi.createProduct(data);
      toast.success(editProduct ? "Product updated" : "Product added");
      closeProductModal(); void load();
    } catch (e) { logger.error("[AdminStore] save:", e); }
  };
  const deleteProduct = async (id: string) => {
    try { await adminStoreApi.deleteProduct(id); toast.success("Product deleted"); void load(); }
    catch (e) { logger.error("[AdminStore] delete:", e); }
  };
  const addToCart = (p: AdminProduct) => {
    setCart(prev => { const ex = prev.find(c => c.productId === p.id); return ex ? prev.map(c => c.productId === p.id ? { ...c, qty: c.qty + 1 } : c) : [...prev, { productId: p.id, name: p.name, price: p.price, qty: 1 }]; });
  };
  const removeFromCart = (id: string) => setCart(prev => prev.filter(c => c.productId !== id));
  const clearCart = () => setCart([]);
  const checkout = async (paymentMethod: string) => {
    try {
      const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
      await adminStoreApi.checkout({ items: cart, total, paymentMethod });
      toast.success("Order placed successfully!"); clearCart(); setShowPosModal(false); void load();
    } catch (e) { logger.error("[AdminStore] checkout:", e); }
  };

  return <Ctx.Provider value={{ products, orders, stats, loading, activeTab, setActiveTab, showProductModal, editProduct, openAddProduct, openEditProduct, closeProductModal, saveProduct, deleteProduct, showPosModal, setShowPosModal, cart, addToCart, removeFromCart, clearCart, checkout }}>{children}</Ctx.Provider>;
}
export function useAdminStoreContext() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAdminStoreContext must be within AdminStoreProvider");
  return ctx;
}
