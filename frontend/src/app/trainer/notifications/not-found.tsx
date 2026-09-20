// RESPONSIBILITY: Renders the not-found route/UI for the owning Trainer feature; data access remains in the feature API/query layer.
import { TrainerNotificationsUrlConfig } from '@/app/trainer/notifications/notifications_url_config';
import Link from 'next/link';
import { SearchX } from 'lucide-react';
import { TrainerPageUrlConfig } from '@/app/trainer/trainer_url_config';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 text-center">
      <div className="bg-primary-subtle p-4 rounded-full mb-4">
        <SearchX size={48} className="text-primary" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">Page Not Found</h2>
      <p className="text-secondary max-w-md mb-6">
        We couldn't find the page you're looking for within the notifications module. 
        It might have been removed, renamed, or temporarily unavailable.
      </p>
      <Link 
        href={TrainerNotificationsUrlConfig.PAGES.LIST}
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page px-6 py-2 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-hover motion-safe:transition-colors motion-safe:duration-base"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
