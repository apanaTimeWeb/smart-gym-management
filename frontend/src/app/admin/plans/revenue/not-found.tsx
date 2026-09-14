"use client";
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <h2 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h2>
      <p className="text-secondary mb-6 max-w-md">
        The requested resource could not be found.
      </p>
      <Link href="/admin/dashboard" className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-hover motion-safe:transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}