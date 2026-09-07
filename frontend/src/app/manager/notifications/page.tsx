import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';

export default function NotificationsPage() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Notifications" subtitle="Send Reminder: Due/Expiry reminder send" />
      <div className="p-6">
        <div className="bg-card border border-border rounded-xl p-8 text-center text-secondary">
          <p>Notifications module is under development.</p>
        </div>
      </div>
    </div>
  );
}
