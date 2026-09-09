// RESPONSIBILITY: 404 fallback route boundary for the Trainer Sessions module.
import Link from 'next/link';

export default function TrainerSessionsNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="text-6xl font-bold text-primary opacity-30">404</div>
      <h1 className="text-2xl font-semibold text-text-primary">Session Not Found</h1>
      <p className="text-text-secondary max-w-md">
        The session you&apos;re looking for doesn&apos;t exist or may have been cancelled.
      </p>
      <Link href="/trainer/sessions" className="btn btn-primary">
        Back to Sessions
      </Link>
    </div>
  );
}
