import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';

export default function ReportsPage() {
  return (
    <div className="min-h-full pb-10">
      <ManagerHeader title="Reports" subtitle="Daily Collection Report, Membership Report, Attendance Report, Due Report, Trainer Performance" />
      <div className="p-6">
        <div className="bg-card border border-border rounded-xl p-8 text-center text-secondary">
          <p>Reports module is under development.</p>
        </div>
      </div>
    </div>
  );
}
