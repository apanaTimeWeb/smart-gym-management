import type { Metadata } from "next";
import ManagerHeader from "@/app/manager/manager_components/ManagerLayout/ManagerHeader";
export const metadata: Metadata = { title: "Finance | Manager � GymSmart", description: "Manage branch finances." };
export default function ManagerFinancePage() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Branch Finance" subtitle="Manage expenses and view revenue" />
      <div className="p-6 max-w-6xl mx-auto"><div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">Finance module coming soon.</div></div>
    </div>
  );
}
