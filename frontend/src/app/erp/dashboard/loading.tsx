// RESPONSIBILITY: Renders the loading fallback for the dashboard layout.
export default function DashboardLoading() {
 return (
 <div className="min-h-full flex items-center justify-center">
 <div className="text-center">
 <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-3 border-primary" />
 <p className="text-sm text-secondary">Loading dashboard module...</p>
 </div>
 </div>
 );
}
