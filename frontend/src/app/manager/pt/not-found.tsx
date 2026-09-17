// RESPONSIBILITY: Framework route boundary for the Manager pt module; renders the route-level shell, loading, error, or 404 state.
import { MANAGER_HOME_ROUTE } from '@/app/manager/manager_utils/ManagerSharedConstants';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold text-primary mb-4">404</h2>
      <h3 className="text-2xl font-semibold mb-2">Resource Not Found</h3>
      <p className="text-secondary mb-8 max-w-md">The requested resource could not be found. It may have been removed or you might not have permission to access it.</p>
      <Link href={MANAGER_HOME_ROUTE} className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 motion-safe:transition-colors">
        Return to Dashboard
      </Link>
    </div>
  );
}
