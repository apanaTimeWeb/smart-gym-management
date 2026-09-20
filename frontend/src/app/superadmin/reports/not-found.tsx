// RESPONSIBILITY: Renders the not-found component and its associated UI logic.
import Link from 'next/link';
import { ReportsUrlConfig } from '@/app/superadmin/reports/superadmin_reports_url_config';
export default function ReportsNotFound() {
    return (<div className="empty-state-container">
      <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center">
        <span className="text-3xl font-bold text-secondary">404</span>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary mb-1">Report not found</h2>
        <p className="text-secondary text-sm max-w-sm">
          The report you are looking for does not exist or is no longer available.
        </p>
      </div>
      <Link href={ReportsUrlConfig.PAGES.MAIN} className="px-4 py-2 bg-primary hover:bg-primary-hover text-on-primary font-semibold rounded-lg text-sm motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        Back to Dashboard
      </Link>
    </div>);
}
