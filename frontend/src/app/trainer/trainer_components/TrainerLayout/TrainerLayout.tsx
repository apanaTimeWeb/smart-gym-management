// RESPONSIBILITY: Encapsulates logic, UI, or types for the trainer module.
// DATA FLOW: Standard component data flow.
// RESPONSIBILITY: Root shell layout for all TRAINER pages. Composes TrainerSidebar with the main content area. Manages sidebar collapsed state only.
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import TrainerSidebar from '@/app/trainer/trainer_components/TrainerLayout/TrainerSidebar';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';

const routeTitleMap: Record<string, { title: string; subtitle: string }> = {
  '/trainer/dashboard': { title: 'Dashboard', subtitle: "Welcome back, Trainer! Here's your gym overview." },
  '/trainer/attendance': { title: 'Attendance', subtitle: 'Track daily member and staff check-ins' },
  '/trainer/earnings': { title: 'Earnings & Payouts', subtitle: 'Track your session earnings, commissions, and upcoming payouts.' },
  '/trainer/library': { title: 'Library', subtitle: 'Manage diet plans for member assignments' },
  '/trainer/members': { title: 'Members Directory', subtitle: 'Manage gym members, profiles, and subscriptions' },
  '/trainer/notifications': { title: 'Notifications', subtitle: 'Stay updated with your activities and alerts' },
  '/trainer/profile': { title: 'My Profile', subtitle: 'Manage your account details and password.' },
  '/trainer/progress-tracking': { title: 'Progress Tracking', subtitle: 'Track member workouts, measurements, and progress photos' },
  '/trainer/schedule': { title: 'Schedule & Leaves', subtitle: 'Manage your weekly availability and request time off' },
  '/trainer/sessions': { title: 'Sessions', subtitle: 'Manage your scheduled PT and Group classes' },
  '/trainer/workout': { title: 'Workout Library', subtitle: 'Comprehensive exercise and workout plan database' },
};

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // For dynamic paths like /trainer/members/[id]
  const baseRoute = Object.keys(routeTitleMap).find(route => pathname === route || pathname.startsWith(route + '/')) || '';
  const headerProps = routeTitleMap[baseRoute] || { title: 'GymSmart TRAINER', subtitle: 'Manage your gym efficiently' };

 return (
 <div className="flex h-screen overflow-hidden bg-background text-foreground">
 <TrainerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto motion-safe:transition-all motion-safe:duration-300 ${isCollapsed ? 'lg:ml-23' : 'lg:ml-64'}`}>
 <TrainerHeader title={headerProps.title} subtitle={headerProps.subtitle} />
 {children}
 </main>
 </div>
 );
}

