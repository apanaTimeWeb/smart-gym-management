"use client";
import { MessageSquare, Sparkles, RotateCcw, CheckCircle } from "lucide-react";
import { useAdminInquiriesContext } from "@/app/admin/inquiries/inquiries_context/AdminInquiriesContext";
export default function AdminInquiriesKPIs() {
  const { stats, loading } = useAdminInquiriesContext();
  const cards = [
    { label: "Total Leads",     value: stats?.total ?? 0,          icon: MessageSquare, color: "text-primary", bg: "bg-primary/10" },
    { label: "New",             value: stats?.new ?? 0,            icon: Sparkles,      color: "text-info",    bg: "bg-info-bg" },
    { label: "Follow Ups",      value: stats?.followUp ?? 0,       icon: RotateCcw,     color: "text-warning", bg: "bg-warning-bg" },
    { label: "Converted",       value: stats?.converted ?? 0,      icon: CheckCircle,   color: "text-success", bg: "bg-success-bg" },
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
