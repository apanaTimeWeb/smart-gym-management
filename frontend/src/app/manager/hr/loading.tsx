// RESPONSIBILITY: Next.js loading.tsx � renders skeleton loader fallback while HR & Payroll module data loads.
export default function HrLoading() {
 return (
 <div className="min-h-full flex items-center justify-center">
 <div className="text-center">
 <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full motion-safe:animate-spin mx-auto mb-3" />
 <p className="text-sm text-secondary">Loading HR module...</p>
 </div>
 </div>
 );
}
