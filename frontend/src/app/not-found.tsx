import Link from 'next/link';

export default function NotFound() {
 return (
 <div className="min-h-screen flex items-center justify-center bg-[var(--bg-page)]">
 <div className="text-center">
 <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-2">404</h1>
 <p className="text-[var(--text-secondary)]">Page not found</p>
 <Link href="/" className="mt-4 inline-block text-sm font-medium text-[var(--primary)] hover:underline">← Back to Dashboard</Link>
 </div>
 </div>
 );
}
