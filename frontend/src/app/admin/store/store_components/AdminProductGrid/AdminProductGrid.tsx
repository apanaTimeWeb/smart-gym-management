"use client";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import { useAdminStoreContext } from "@/app/admin/store/store_context/AdminStoreContext";
import { formatCurrency } from "@/lib/formatters";
export default function AdminProductGrid() {
  const { products, loading, openEditProduct, deleteProduct } = useAdminStoreContext();
  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i) => <div key={i} className="h-36 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!products.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No products yet. Add your first product.</div>;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map(p => (
        <div key={p.id} className="bg-card border border-border rounded-xl p-4 hover:shadow-md transition-shadow relative">
          {p.stock <= p.lowStockThreshold && <div className="absolute top-3 right-3"><AlertTriangle className="w-4 h-4 text-danger" /></div>}
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-xl">??</div>
          <h3 className="font-semibold text-text-primary text-sm leading-tight mb-1">{p.name}</h3>
          <p className="text-xs text-text-secondary mb-2">{p.category}</p>
          <p className="text-lg font-bold text-primary">{formatCurrency(p.price)}</p>
          <p className={`text-xs mt-1 font-medium ${p.stock <= p.lowStockThreshold ? "text-danger" : "text-success"}`}>Stock: {p.stock} {p.unit}s</p>
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <button onClick={() => openEditProduct(p)} className="flex-1 text-xs py-1.5 rounded-lg bg-info-bg text-info hover:bg-info/20 transition-colors flex items-center justify-center gap-1"><Pencil className="w-3 h-3" /> Edit</button>
            <button onClick={() => void deleteProduct(p.id)} className="flex-1 text-xs py-1.5 rounded-lg bg-danger-bg text-danger hover:bg-danger/20 transition-colors flex items-center justify-center gap-1"><Trash2 className="w-3 h-3" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
