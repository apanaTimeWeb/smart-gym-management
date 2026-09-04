import type { Metadata } from "next";
import { AdminInquiriesProvider } from "@/app/admin/inquiries/inquiries_context/AdminInquiriesContext";
import AdminInquiriesKPIs from "@/app/admin/inquiries/inquiries_components/AdminInquiriesKPIs/AdminInquiriesKPIs";
import AdminInquiriesToolbar from "@/app/admin/inquiries/inquiries_components/AdminInquiriesToolbar/AdminInquiriesToolbar";
import AdminInquiriesTable from "@/app/admin/inquiries/inquiries_components/AdminInquiriesTable/AdminInquiriesTable";
export const metadata: Metadata = { title: "Inquiries | Admin � GymSmart", description: "Manage leads from Facebook, Instagram, Google and walk-ins." };
export default function AdminInquiriesPage() {
  return (
    <AdminInquiriesProvider>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div><h1 className="text-2xl font-bold text-text-primary">Inquiries & CRM</h1><p className="text-sm text-text-secondary mt-1">Convert leads from Facebook, Instagram, Google, and walk-ins into loyal members.</p></div>
        <AdminInquiriesKPIs />
        <AdminInquiriesToolbar />
        <AdminInquiriesTable />
      </div>
    </AdminInquiriesProvider>
  );
}
