import type { Metadata } from "next";
import { AdminLibraryProvider } from "@/app/admin/library/library_context/AdminLibraryContext";
import AdminLibraryTabs from "@/app/admin/library/library_components/AdminLibraryTabs/AdminLibraryTabs";
import AdminLibraryContent from "@/app/admin/library/library_components/AdminLibraryContent";
export const metadata: Metadata = { title: "Library | Admin � GymSmart", description: "Manage exercise and diet plan library." };
export default function AdminLibraryPage() {
  return <AdminLibraryProvider><div className="p-6 max-w-7xl mx-auto space-y-6"><div><h1 className="text-2xl font-bold text-text-primary">Exercise & Diet Library</h1><p className="text-sm text-text-secondary mt-1">Build the gym catalog of exercises and nutritional plans for member assignment.</p></div><AdminLibraryTabs /><AdminLibraryContent /></div></AdminLibraryProvider>;
}
