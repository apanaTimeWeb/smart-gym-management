import { Activity } from 'lucide-react';

export default function TrainerMembersProfileAssessment() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Activity size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-foreground">Fitness Assessment</h3>
          <p className="text-sm text-secondary">Initial fitness test scores and baseline metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-input rounded-xl p-4">
          <p className="text-sm font-semibold text-secondary mb-1">VO2 Max</p>
          <p className="text-xl font-bold text-foreground">45 <span className="text-sm font-medium text-secondary">ml/kg/min</span></p>
        </div>
        <div className="bg-input rounded-xl p-4">
          <p className="text-sm font-semibold text-secondary mb-1">Flexibility (Sit & Reach)</p>
          <p className="text-xl font-bold text-foreground">15 <span className="text-sm font-medium text-secondary">cm</span></p>
        </div>
        <div className="bg-input rounded-xl p-4">
          <p className="text-sm font-semibold text-secondary mb-1">Core Strength</p>
          <p className="text-xl font-bold text-foreground">2:30 <span className="text-sm font-medium text-secondary">plank</span></p>
        </div>
      </div>
    </div>
  );
}
