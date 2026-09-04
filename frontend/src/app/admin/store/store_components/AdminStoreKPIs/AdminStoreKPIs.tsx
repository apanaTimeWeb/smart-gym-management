"use client";
import { Package, ShoppingBag, IndianRupee, AlertTriangle } from "lucide-react";
import { useAdminStoreContext } from "@/app/admin/store/store_context/AdminStoreContext";
import { formatKPI } from "@/lib/formatters";
export default function AdminStoreKPIs() {
  const { stats, loading } = useAdminStoreContext();
  const cards = [
    { label: "Products",     value: String(stats?.totalProducts ?? 0),      icon: Package,       color: "text-primary", bg: "bg-primary/10" },
    { label: "Orders",       value: String(stats?.totalOrders ?? 0),         icon: ShoppingBag,   color: "text-info",    bg: "bg-info-bg" },
    { label: "Revenue",      value: formatKPI(stats?.totalRevenue ?? 0),     icon: IndianRupee,   color: "text-success", bg: "bg-success-bg" },
    { label: "Low Stock",    value: String(stats?.lowStockCount ?? 0),       icon: AlertTriangle, color: "text-danger",  bg: "bg-danger-bg" },
  ];
  if (loading) return <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{cards.map((_,i) => <div key={i} className="h-24 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center`}><Icon className={`w-5 h-5 ${color}`} /></div>
          <div><p className="text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</p><p className={`text-2xl font-bold ${color}`}>{value}</p></div>
        </div>
      ))}
    </div>
  );
}
