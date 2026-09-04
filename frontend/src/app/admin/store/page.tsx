import type { Metadata } from "next";
import { AdminStoreProvider } from "@/app/admin/store/store_context/AdminStoreContext";
import AdminStoreKPIs from "@/app/admin/store/store_components/AdminStoreKPIs/AdminStoreKPIs";
import AdminStoreToolbar from "@/app/admin/store/store_components/AdminStoreToolbar/AdminStoreToolbar";
import AdminProductGrid from "@/app/admin/store/store_components/AdminProductGrid/AdminProductGrid";
import AdminOrderTable from "@/app/admin/store/store_components/AdminOrderTable/AdminOrderTable";
import AdminStoreContentSwitcher from "@/app/admin/store/store_components/AdminStoreContentSwitcher";
export const metadata: Metadata = { title: "Store | Admin � GymSmart", description: "Manage gym store, inventory, POS, and orders." };
export default function AdminStorePage() {
  return <AdminStoreProvider><div className="p-6 max-w-7xl mx-auto space-y-6"><div><h1 className="text-2xl font-bold text-text-primary">Store & POS</h1><p className="text-sm text-text-secondary mt-1">Manage products, track inventory, and process sales.</p></div><AdminStoreKPIs /><AdminStoreToolbar /><AdminStoreContentSwitcher /></div></AdminStoreProvider>;
}
