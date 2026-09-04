"use client";
import { ShoppingCart, PlusCircle } from "lucide-react";
import { useAdminStoreContext } from "@/app/admin/store/store_context/AdminStoreContext";
import { ADMIN_STORE_TABS } from "@/app/admin/store/store_utils/AdminStoreSharedConstants";
export default function AdminStoreToolbar() {
  const { activeTab, setActiveTab, openAddProduct, setShowPosModal } = useAdminStoreContext();
  return (
    <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
      <div className="flex gap-1 bg-bg-page p-1 rounded-lg">
        {ADMIN_STORE_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as "products" | "orders")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === tab.id ? "bg-primary text-black shadow-sm" : "text-text-secondary hover:text-text-primary"}`}>{tab.label}</button>
        ))}
      </div>
      <div className="flex gap-2">
        {activeTab === "products" && <button id="admin-store-add-product-btn" onClick={openAddProduct} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-black rounded-lg transition-colors"><PlusCircle className="w-4 h-4" /> Add Product</button>}
        <button id="admin-store-pos-btn" onClick={() => setShowPosModal(true)} className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border border-primary text-primary hover:bg-primary/10 rounded-lg transition-colors"><ShoppingCart className="w-4 h-4" /> POS</button>
      </div>
    </div>
  );
}
