// RESPONSIBILITY: Reusable 404 Not Found template for admin modules
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export default function AdminNotFound({
  title = 'Page Not Found',
  description = "The page you are looking for doesn't exist or has been moved.",
  returnLink = '/admin/dashboard',
  returnText = 'Return to Dashboard',
}: {
  title?: string;
  description?: string;
  returnLink?: string;
  returnText?: string;
}) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-6 bg-card rounded-2xl border border-border mt-4">
      <AlertCircle className="w-12 h-12 text-secondary mb-4" />
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-secondary mb-6">{description}</p>
      <Link href={returnLink} className="px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-hover motion-safe:transition-colors">
        {returnText}
      </Link>
    </div>
  );
}
