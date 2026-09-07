'use client';

import { TrendingDown, Calculator, Camera, Dumbbell } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const progressData = [
  { month: 'Jan', weight: 82, bodyFat: 24 },
  { month: 'Feb', weight: 80, bodyFat: 22 },
  { month: 'Mar', weight: 79, bodyFat: 21 },
  { month: 'Apr', weight: 77, bodyFat: 19 },
  { month: 'May', weight: 76, bodyFat: 18 },
  { month: 'Jun', weight: 75, bodyFat: 17 },
];

export default function TrainerMembersProfileProgress() {
  const currentWeight = 75; // kg
  const height = 1.75; // meters (175 cm)
  const bmi = (currentWeight / (height * height)).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-foreground">Progress & Measurements</h3>
        <button className="text-sm text-white bg-primary px-3 py-1.5 rounded-lg font-medium hover:bg-primary/90 motion-safe:transition-colors">+ Log Measurement</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Weight', current: '75 kg', prev: '76 kg', change: '-1 kg' },
          { label: 'Body Fat', current: '17%', prev: '18%', change: '-1%' },
          { label: 'Chest', current: '38 in', prev: '38 in', change: '0' },
          { label: 'Waist', current: '31 in', prev: '32 in', change: '-1 in' },
          { label: 'Arms', current: '14 in', prev: '13.5 in', change: '+0.5 in' },
        ].map((m, i) => (
          <div key={i} className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <p className="text-xs text-secondary mb-1">{m.label}</p>
            <p className="text-lg font-bold text-foreground">{m.current}</p>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingDown size={12} /> {m.change} (from {m.prev})
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border p-4 rounded-xl shadow-sm h-72">
          <h4 className="text-sm font-semibold mb-4 text-foreground">Weight & Body Fat Trend</h4>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={progressData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dy={10} />
              <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={-10} />
              <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dx={10} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                itemStyle={{ fontSize: '14px' }}
              />
              <Line yAxisId="left" type="monotone" name="Weight (kg)" dataKey="weight" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line yAxisId="right" type="monotone" name="Body Fat (%)" dataKey="bodyFat" stroke="var(--warning)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border p-5 rounded-xl shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-12 h-12 bg-info-bg text-info rounded-full flex items-center justify-center mb-3">
            <Calculator size={24} />
          </div>
          <h4 className="text-sm font-semibold text-secondary mb-1">Current BMI</h4>
          <p className="text-3xl font-bold text-foreground mb-2">{bmi}</p>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-success/10 text-success">
            Normal Weight
          </span>
          <p className="text-xs text-secondary mt-4">Based on 175 cm and 75 kg</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Camera size={16} className="text-primary" /> Progress Photos
            </h4>
            <button className="text-xs text-primary font-medium hover:underline">Upload New</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="aspect-[3/4] bg-input border border-border rounded-lg flex flex-col items-center justify-center text-secondary">
                <Camera size={24} className="opacity-50 mb-2" />
                <span className="text-xs">Before (Jan 2026)</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="aspect-[3/4] bg-input border border-border rounded-lg flex flex-col items-center justify-center text-secondary">
                <Camera size={24} className="opacity-50 mb-2" />
                <span className="text-xs">Current (Jun 2026)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border p-5 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Dumbbell size={16} className="text-primary" /> Strength Progression
            </h4>
            <select className="text-xs bg-input border border-border rounded-md px-2 py-1 text-foreground">
              <option>Bench Press (1RM)</option>
              <option>Squat (1RM)</option>
              <option>Deadlift (1RM)</option>
            </select>
          </div>
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { month: 'Jan', weight: 60 },
                { month: 'Feb', weight: 65 },
                { month: 'Mar', weight: 70 },
                { month: 'Apr', weight: 72.5 },
                { month: 'May', weight: 75 },
                { month: 'Jun', weight: 80 },
              ]} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--secondary)' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '14px' }}
                />
                <Line type="monotone" name="1RM (kg)" dataKey="weight" stroke="var(--success)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
