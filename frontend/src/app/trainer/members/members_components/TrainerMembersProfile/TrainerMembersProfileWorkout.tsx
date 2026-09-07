'use client';

import { Dumbbell, Calendar, CheckCircle } from 'lucide-react';

export default function TrainerMembersProfileWorkout() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Workout History</h3>
        <button className="text-sm text-primary font-medium hover:underline">View Current Plan</button>
      </div>

      <div className="space-y-3">
        {[
          { date: 'Today, 8:00 AM', workout: 'Chest & Triceps', duration: '45 mins', status: 'Completed', pr: 'Bench Press - 80kg' },
          { date: 'Yesterday, 7:30 AM', workout: 'Back & Biceps', duration: '50 mins', status: 'Completed', pr: null },
          { date: '3 days ago, 8:00 AM', workout: 'Legs & Core', duration: '60 mins', status: 'Completed', pr: 'Squat - 100kg' },
        ].map((w, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-primary/10 text-primary mt-1">
                <Dumbbell size={20} />
              </div>
              <div>
                <p className="font-bold text-foreground">{w.workout}</p>
                <div className="flex items-center gap-3 text-xs text-secondary mt-1">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {w.date}</span>
                  <span>•</span>
                  <span>{w.duration}</span>
                </div>
                {w.pr && (
                  <p className="text-xs text-info font-medium mt-1 bg-info-bg inline-block px-2 py-0.5 rounded-md">
                    PR: {w.pr}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-success text-sm font-medium bg-success-bg px-3 py-1.5 rounded-lg w-fit">
              <CheckCircle size={14} /> {w.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
