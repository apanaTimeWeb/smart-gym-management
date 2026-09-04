import type { Metadata } from "next";
import ManagerHeader from "@/app/manager/manager_components/ManagerLayout/ManagerHeader";
export const metadata: Metadata = { title: "Plans | Manager � GymSmart", description: "View membership plans." };
export default function ManagerPlansPage() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Membership Plans" subtitle="View available plans" />
      <div className="p-6 max-w-6xl mx-auto"><div className="bg-card border border-border rounded-xl p-16 text-center text-text-secondary text-sm">Plans module coming soon.</div></div>
    </div>
  );
}
