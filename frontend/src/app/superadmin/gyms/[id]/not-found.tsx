import Link from 'next/link';

export default function GymNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center p-8">
      <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center shadow-sm">
        <span className="text-2xl text-secondary">?</span>
      </div>
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground">Gym Not Found</h2>
        <p className="text-secondary max-w-sm mx-auto">
          The gym you are looking for does not exist or has been removed from the platform.
        </p>
      </div>
      <Link 
        href="/superadmin/gyms"
        className="mt-4 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 motion-safe:transition-colors"
      >
        Back to Gyms Directory
      </Link>
    </div>
  );
}
