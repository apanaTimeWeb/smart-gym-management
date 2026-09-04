"use client";
import { useAdminStoreContext } from "@/app/admin/store/store_context/AdminStoreContext";
import { formatCurrency } from "@/lib/formatters";
import { PAYMENT_METHOD_BADGE } from "@/config/statusBadgeConfig";
export default function AdminOrderTable() {
  const { orders, loading } = useAdminStoreContext();
  if (loading) return <div className="space-y-2">{Array.from({length:5}).map((_,i) => <div key={i} className="h-12 bg-card border border-border rounded-xl motion-safe:animate-pulse" />)}</div>;
  if (!orders.length) return <div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">No orders yet.</div>;
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-border bg-bg-page">{["Order ID", "Items", "Total", "Payment", "Date"].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-text-secondary uppercase tracking-wide whitespace-nowrap">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-border">
            {orders.map(o => {
              const method = (o.paymentMethod as keyof typeof PAYMENT_METHOD_BADGE);
              const badge = PAYMENT_METHOD_BADGE[method] ?? { className: "bg-border text-text-secondary", label: o.paymentMethod };
              return (
                <tr key={o.id} className="hover:bg-bg-overlay transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-text-secondary">#{o.id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3 text-text-primary">{o.items.length} item{o.items.length !== 1 ? "s" : ""}</td>
                  <td className="px-4 py-3 font-bold text-success">{formatCurrency(o.total)}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badge.className}`}>{badge.label}</span></td>
                  <td className="px-4 py-3 text-text-secondary text-xs">{new Date(o.createdAt).toLocaleDateString("en-IN")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
