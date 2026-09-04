"use client";
// RESPONSIBILITY: Renders the top-level KPI stat cards for the Admin Members module.
// DATA FLOW: useAdminMembersContext ? AdminMembersKPIs ? StatCard UI
import { Users, UserCheck, Clock, UserX } from "lucide-react";
import { useAdminMembersContext } from "@/app/admin/members/members_context/AdminMembersContext";

export default function AdminMembersKPIs() {
  const { stats, loading } = useAdminMembersContext();
  const isLoading = loading === "loading";

  const cards = [
    { label: "Total Members", value: stats?.total ?? 0, icon: Users,      color: "text-primary",  bg: "bg-primary/10" },
    { label: "Active",        value: stats?.active ?? 0, icon: UserCheck,  color: "text-success",  bg: "bg-success-bg" },
    { label: "Pending",       value: stats?.pending ?? 0, icon: Clock,     color: "text-warning",  bg: "bg-warning-bg" },
    { label: "Expired",       value: stats?.expired ?? 0, icon: UserX,     color: "text-danger",   bg: "bg-danger-bg"  },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((_, i) => (
          <div key={i} className="h-24 bg-card border border-border rounded-xl motion-safe:animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <div key={label} className="bg-card border border-border rounded-xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
          <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold ${color} mt-0.5`}>{value.toLocaleString("en-IN")}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
