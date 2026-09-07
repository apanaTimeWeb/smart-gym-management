import Link from 'next/link';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { Activity, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Progress Tracking | Trainer | GymSmart',
};

export default function TrainerProgressTrackingPage() {
  return (
    <div className="min-h-full pb-10">
      <TrainerHeader title="Progress Tracking" subtitle="Monitor member progress and updates" />
      
      <div className="p-6">
        <div className="bg-card rounded-xl border border-border p-10 flex flex-col items-center justify-center text-center max-w-2xl mx-auto shadow-sm">
          <div className="p-4 bg-primary/10 text-primary rounded-full mb-5">
            <Activity size={40} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Progress Tracking is Member-Specific</h2>
          <p className="text-secondary mb-8 max-w-md">
            To view detailed progress tracking, body measurements, and progress photos, please navigate to a specific Member's Profile.
          </p>
          <Link 
            href="/trainer/members" 
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Go to Members Directory <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
