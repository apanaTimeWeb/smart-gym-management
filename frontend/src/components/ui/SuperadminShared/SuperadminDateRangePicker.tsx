"use client";
// RESPONSIBILITY: Renders the SuperadminDateRangePicker component.
import { useState } from "react";
import { Calendar } from "lucide-react";
import { SearchableDropdown } from "@/components/ui/SearchableDropdown";

interface SuperadminDateRangePickerProps {
  onRangeChange: (start: string, end: string) => void;
}

const DATE_OPTIONS = [
  { value: 'today', label: 'Today' },
  { value: 'this_week', label: 'This Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'this_year', label: 'This Year' },
  { value: 'custom', label: 'Custom' },
];

export default function SuperadminDateRangePicker({ onRangeChange }: SuperadminDateRangePickerProps) {
  const [range, setRange] = useState("this_month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const handleChange = (val: string | number) => {
    const stringVal = String(val);
    setRange(stringVal);
    if (stringVal !== "custom") {
      const today = new Date();
      let start = new Date();
      let end = new Date();
      if (stringVal === "this_week") {
        start.setDate(today.getDate() - today.getDay());
      } else if (stringVal === "this_month") {
        start = new Date(today.getFullYear(), today.getMonth(), 1);
      } else if (stringVal === "this_year") {
        start = new Date(today.getFullYear(), 0, 1);
      }
      onRangeChange(start.toISOString().split('T')[0] || '', end.toISOString().split('T')[0] || '');
    }
  };

  return (
    <div className="flex items-center gap-3 bg-background border border-border rounded-lg p-1.5 shadow-sm">
      <div className="pl-2"><Calendar className="w-4 h-4 text-secondary" /></div>
      <div className="w-40 border-none">
        <SearchableDropdown
          options={DATE_OPTIONS}
          value={range}
          onChange={handleChange}
          className="border-none shadow-none bg-transparent !p-0"
        />
      </div>
      {range === "custom" && (
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <input type="date" value={customStart} onChange={e => { setCustomStart(e.target.value); onRangeChange(e.target.value, customEnd); }} className="bg-transparent text-sm text-foreground focus:outline-none" />
          <span className="text-secondary">-</span>
          <input type="date" value={customEnd} onChange={e => { setCustomEnd(e.target.value); onRangeChange(customStart, e.target.value); }} className="bg-transparent text-sm text-foreground focus:outline-none" />
        </div>
      )}
    </div>
  );
}
