"use client";
import { useAdminStoreContext } from "@/app/admin/store/store_context/AdminStoreContext";
import AdminProductGrid from "@/app/admin/store/store_components/AdminProductGrid/AdminProductGrid";
import AdminOrderTable from "@/app/admin/store/store_components/AdminOrderTable/AdminOrderTable";
export default function AdminStoreContentSwitcher() {
  const { activeTab } = useAdminStoreContext();
  return activeTab === "products" ? <AdminProductGrid /> : <AdminOrderTable />;
}
