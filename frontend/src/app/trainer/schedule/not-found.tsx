// RESPONSIBILITY: 404 fallback route boundary for the Trainer Schedule module.
import Link from 'next/link';

export default function TrainerScheduleNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
      <div className="text-6xl font-bold text-primary opacity-30">404</div>
      <h1 className="text-2xl font-semibold text-text-primary">Schedule Not Found</h1>
      <p className="text-text-secondary max-w-md">
        The schedule or leave request you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/trainer/schedule" className="btn btn-primary">
        Back to Schedule
      </Link>
    </div>
  );
}
