'use client';
import Link from 'next/link';
import { Activity, DatabaseZap, DatabaseBackup, Server } from 'lucide-react';
import { JobsUrlConfig } from '@/app/superadmin/system-ops/jobs/superadmin_jobs_url_config';
import { MigrationsUrlConfig } from '@/app/superadmin/system-ops/migrations/superadmin_migrations_url_config';
import { BackupsUrlConfig } from '@/app/superadmin/system-ops/backups/superadmin_backups_url_config';
import { InfrastructureUrlConfig } from '@/app/superadmin/system-ops/infrastructure/superadmin_infrastructure_url_config';

export default function SystemOpsDashboardClient() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-primary">System Operations Dashboard</h1>
        <p className="text-secondary">Monitor system health, manage background jobs, and execute infrastructure operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Infrastructure Card */}
        <Link href={InfrastructureUrlConfig.PAGES.MAIN} className="group block h-full">
          <div className="flex h-full flex-col space-y-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all hover:border-primary hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary-subtle p-3 text-primary group-hover:scale-110 motion-safe:transition-transform">
                <Server size={24} />
              </div>
              <h2 className="text-lg font-bold text-primary">Infrastructure</h2>
            </div>
            <p className="text-sm text-secondary flex-1">Monitor CPU, Memory, and Node health across all active clusters.</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-semibold text-success bg-success-bg px-2 py-1 rounded">All Nodes Healthy</span>
              <span className="text-primary text-sm font-medium group-hover:underline">View &rarr;</span>
            </div>
          </div>
        </Link>

        {/* Jobs Card */}
        <Link href={JobsUrlConfig.PAGES.MAIN} className="group block h-full">
          <div className="flex h-full flex-col space-y-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all hover:border-primary hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning-bg p-3 text-warning group-hover:scale-110 motion-safe:transition-transform">
                <Activity size={24} />
              </div>
              <h2 className="text-lg font-bold text-primary">Background Jobs</h2>
            </div>
            <p className="text-sm text-secondary flex-1">Manage Redis queue, failed jobs, and scheduled tasks.</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-semibold text-warning bg-warning-bg px-2 py-1 rounded">3 Jobs Pending</span>
              <span className="text-primary text-sm font-medium group-hover:underline">View &rarr;</span>
            </div>
          </div>
        </Link>

        {/* Backups Card */}
        <Link href={BackupsUrlConfig.PAGES.MAIN} className="group block h-full">
          <div className="flex h-full flex-col space-y-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all hover:border-primary hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-bg p-3 text-purple-text group-hover:scale-110 motion-safe:transition-transform">
                <DatabaseBackup size={24} />
              </div>
              <h2 className="text-lg font-bold text-primary">Database Backups</h2>
            </div>
            <p className="text-sm text-secondary flex-1">Schedule and restore automated PostgreSQL backups.</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-semibold text-success bg-success-bg px-2 py-1 rounded">Last run 2h ago</span>
              <span className="text-primary text-sm font-medium group-hover:underline">View &rarr;</span>
            </div>
          </div>
        </Link>

        {/* Migrations Card */}
        <Link href={MigrationsUrlConfig.PAGES.MAIN} className="group block h-full">
          <div className="flex h-full flex-col space-y-4 rounded-xl border border-border bg-card p-6 motion-safe:transition-all hover:border-primary hover:shadow-md">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-danger-bg p-3 text-danger group-hover:scale-110 motion-safe:transition-transform">
                <DatabaseZap size={24} />
              </div>
              <h2 className="text-lg font-bold text-primary">Schema Rollouts</h2>
            </div>
            <p className="text-sm text-secondary flex-1">Apply Prisma migrations to tenant and global databases.</p>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-semibold text-secondary bg-surface px-2 py-1 rounded border border-border">Up to date</span>
              <span className="text-primary text-sm font-medium group-hover:underline">View &rarr;</span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
