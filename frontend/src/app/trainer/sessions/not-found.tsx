import Link from 'next/link';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="bg-primary/10 p-4 rounded-full mb-4">
        <SearchX size={48} className="text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
      <p className="text-secondary max-w-md mb-6">
        We couldn't find the page you're looking for within the sessions module. 
        It might have been removed, renamed, or temporarily unavailable.
      </p>
      <Link 
        href="/trainer/dashboard"
        className="px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 motion-safe:transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
