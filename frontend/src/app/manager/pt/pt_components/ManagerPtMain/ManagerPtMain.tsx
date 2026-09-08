'use client';
// RESPONSIBILITY: Root client component for Manager PT page.
// Renders PT packages, session scheduling, trainer assignment, and progress tracking tabs.
// DATA FLOW: useManagerPtLogic → ManagerPtMain

import { Calendar, Loader2, Dumbbell } from 'lucide-react';
import { useManagerPtLogic } from '@/app/manager/pt/pt_context/useManagerPtLogic';
import { PT_TAB_OPTIONS } from '@/app/manager/pt/pt_types/ManagerPtTypes';

export default function ManagerPtMain() {
  const {
    activeTab, setActiveTab,
    packages, assignments,
    fetchState, markingId,
    handleMarkSession,
  } = useManagerPtLogic();

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Personal Training</h1>
        <p className="text-secondary mt-1 text-sm">Manage PT packages, assign trainers, and track sessions.</p>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-1 bg-input border border-border p-1 rounded-xl w-fit">
        {PT_TAB_OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`px-4 py-2 text-sm font-medium rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              activeTab === id
                ? 'bg-card text-foreground shadow-sm'
                : 'text-secondary hover:text-foreground'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <>
          {fetchState === 'loading' && (
            <div className="flex justify-center py-16">
              <Loader2 size={28} className="text-primary motion-safe:animate-spin" />
            </div>
          )}
          {fetchState !== 'loading' && packages.length === 0 && (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <Dumbbell size={40} className="mx-auto text-secondary opacity-40 mb-3" />
              <p className="text-sm text-secondary">No PT packages configured yet.</p>
            </div>
          )}
          {packages.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-card border border-border rounded-xl p-5 motion-safe:hover:-translate-y-1 motion-safe:transition-all motion-safe:duration-200 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                      {pkg.sessionCount} Sessions
                    </span>
                    <span className="text-foreground font-bold text-lg">
                      ₹{pkg.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-sm text-secondary mb-4">{pkg.description}</p>
                  <button
                    onClick={() => setActiveTab('assign')}
                    className="w-full py-2 text-sm font-semibold bg-primary hover:bg-primary-hover text-black rounded-lg motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    Assign to Member
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Calendar size={40} className="mx-auto text-secondary opacity-40 mb-3" />
          <h3 className="text-base font-bold text-foreground mb-2">No PT Sessions Today</h3>
          <p className="text-sm text-secondary">There are no upcoming personal training sessions scheduled for today.</p>
        </div>
      )}

      {/* Assign Tab */}
      {activeTab === 'assign' && (
        <div className="bg-card border border-border rounded-xl p-6 max-w-lg">
          <h2 className="text-base font-semibold text-foreground mb-5">Assign Personal Trainer</h2>
          <p className="text-sm text-secondary">
            Use the Members module to select a member, then assign a PT package and trainer from their profile.
            This ensures the assignment is linked to the correct member record.
          </p>
        </div>
      )}

      {/* Track Tab */}
      {activeTab === 'track' && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Active PT Members Progress</h2>
          </div>
          {fetchState === 'loading' && (
            <div className="p-8 flex justify-center">
              <Loader2 size={24} className="text-primary motion-safe:animate-spin" />
            </div>
          )}
          {fetchState !== 'loading' && assignments.length === 0 && (
            <div className="p-10 text-center">
              <Dumbbell size={36} className="mx-auto text-secondary opacity-40 mb-3" />
              <p className="text-sm text-secondary">No active PT assignments found.</p>
            </div>
          )}
          {assignments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-border">
                    {['Member', 'Trainer', 'Package', 'Progress', 'Action'].map((h) => (
                      <th key={h} className="py-3 px-4 text-xs font-semibold text-secondary uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {assignments.map((a) => {
                    const pct = Math.round((a.completedSessions / a.totalSessions) * 100);
                    const isMarking = markingId === a.id;
                    return (
                      <tr key={a.id} className="hover:bg-primary/5 motion-safe:transition-colors">
                        <td className="py-3 px-4 text-sm font-medium text-foreground">{a.memberName}</td>
                        <td className="py-3 px-4 text-sm text-secondary">{a.trainerName}</td>
                        <td className="py-3 px-4 text-sm text-secondary">{a.totalSessions} Sessions</td>
                        <td className="py-3 px-4 text-sm min-w-40">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-input rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full motion-safe:transition-all motion-safe:duration-500"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-foreground whitespace-nowrap">
                              {a.completedSessions}/{a.totalSessions}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleMarkSession(a.id)}
                            disabled={isMarking || a.completedSessions >= a.totalSessions}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-input hover:bg-primary/10 hover:text-primary text-foreground rounded-lg motion-safe:transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            {isMarking && <Loader2 size={12} className="motion-safe:animate-spin" />}
                            Mark Session
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
