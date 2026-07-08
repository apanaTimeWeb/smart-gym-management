export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-[var(--bg-page)]">
 <div className="h-20 bg-[var(--bg-card)] rounded-xl animate-pulse"></div>
 <div className="h-[500px] bg-[var(--bg-card)] rounded-xl animate-pulse"></div>
 </div>
 );
}
