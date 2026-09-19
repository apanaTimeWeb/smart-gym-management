'use client';
// RESPONSIBILITY: Root shell layout for all TRAINER pages. Composes TrainerSidebar with the main content area. Manages sidebar collapsed state only.
import { useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import TrainerSidebar from '@/app/trainer/trainer_components/TrainerLayout/TrainerSidebar';
import TrainerHeader from '@/app/trainer/trainer_components/TrainerLayout/TrainerHeader';
import { TrainerPageUrlConfig } from '@/app/trainer/Trainer_url_config';

const routeTitleMap: Record<string, { title: string; subtitle: string }> = {
  [TrainerPageUrlConfig.DASHBOARD]: { title: 'Dashboard', subtitle: "Welcome back, Trainer! Here's your gym overview." },
  [TrainerPageUrlConfig.ATTENDANCE]: { title: 'Attendance', subtitle: 'Track daily member and staff check-ins' },
  [TrainerPageUrlConfig.EARNINGS]: { title: 'Earnings & Payouts', subtitle: 'Track your session earnings, commissions, and upcoming payouts.' },
  [TrainerPageUrlConfig.LIBRARY]: { title: 'Library', subtitle: 'Manage diet plans for member assignments' },
  [TrainerPageUrlConfig.MEMBERS]: { title: 'Members Directory', subtitle: 'Manage gym members, profiles, and subscriptions' },
  [TrainerPageUrlConfig.NOTIFICATIONS]: { title: 'Notifications', subtitle: 'Stay updated with your activities and alerts' },
  [TrainerPageUrlConfig.PROFILE]: { title: 'My Profile', subtitle: 'Manage your account details and password.' },
  [TrainerPageUrlConfig.PROGRESS_TRACKING]: { title: 'Progress Tracking', subtitle: 'Track member workouts, measurements, and progress photos' },
  [TrainerPageUrlConfig.SCHEDULE]: { title: 'Schedule & Leaves', subtitle: 'Manage your weekly availability and request time off' },
  [TrainerPageUrlConfig.SESSIONS]: { title: 'Sessions', subtitle: 'Manage your scheduled PT and Group classes' },
  [TrainerPageUrlConfig.WORKOUT]: { title: 'Workout Library', subtitle: 'Comprehensive exercise and workout plan database' },
};

export default function TrainerLayout({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  // For dynamic paths like /trainer/members/[id]
  const baseRoute = Object.keys(routeTitleMap).find(route => pathname === route || pathname.startsWith(route + '/')) || '';
  const headerProps = routeTitleMap[baseRoute] || { title: 'GymSmart TRAINER', subtitle: 'Manage your gym efficiently' };

 return (
 <div className="flex h-screen overflow-hidden bg-page text-primary">
 <TrainerSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
 <main className={`flex-1 flex flex-col h-screen overflow-y-auto motion-safe:transition-all motion-safe:duration-slow ${isCollapsed ? 'lg:ml-15' : 'lg:ml-60'}`}>
 <TrainerHeader title={headerProps.title} subtitle={headerProps.subtitle} />
 {children}
 </main>
 </div>
 );
}

