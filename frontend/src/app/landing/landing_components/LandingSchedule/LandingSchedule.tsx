// RESPONSIBILITY: Renders the published static timetable; pagination, sorting, and filtering are intentionally not applicable.
import { LANDING_SCHEDULE, LANDING_SCHEDULE_DAYS } from '@/app/landing/landing_utils/LandingSharedConstants';

export default function LandingSchedule() {
  return (
    <section id="schedule" className="py-24 px-4 bg-page">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block text-xs font-bold tracking-widest uppercase text-warning bg-warning-bg border border-border rounded-full px-4 py-2 mb-5">Timetable</div>
          <h2 className="text-4xl sm:text-5xl font-black text-primary mb-4">Class <span className="text-primary">Schedule</span></h2>
          <p className="text-secondary max-w-xl mx-auto">Published class batches designed for morning and evening flexibility.</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full min-w-max border-collapse bg-card">
            <caption className="sr-only">Weekly GymSmart class schedule</caption>
            <thead>
              <tr className="bg-surface-highlight text-primary">
                <th scope="col" className="sticky left-0 z-10 bg-surface-highlight py-4 px-4 text-left font-semibold">Time</th>
                {LANDING_SCHEDULE_DAYS.map(({ key, label }) => (
                  <th key={key} scope="col" className="py-4 px-4 text-left font-semibold">{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LANDING_SCHEDULE.map((row) => (
                <tr key={row.time} className="odd:bg-card even:bg-surface-zebra hover:bg-surface-hover motion-safe:transition-colors motion-safe:duration-base text-sm text-secondary">
                  <th scope="row" className="sticky left-0 z-10 bg-card py-4 px-4 font-semibold text-warning">{row.time}</th>
                  {LANDING_SCHEDULE_DAYS.map(({ key }) => (
                    <td key={key} className="py-4 px-4">{row[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
