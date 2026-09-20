// RESPONSIBILITY: Renders the Landing route skeleton using canonical semantic loading tokens.
export default function LandingLoading() {
  return (
    <div className="min-h-screen bg-page flex flex-col" aria-busy="true" aria-label="Loading Landing page">
      <div className="min-h-16 border-b border-border bg-header" />
      <div className="flex-1 flex items-center justify-center relative bg-page">
        <div className="relative z-10 w-full max-w-4xl px-4 space-y-6 flex flex-col items-center">
          <div className="h-8 w-48 bg-skeleton-base rounded-full motion-safe:animate-pulse" />
          <div className="h-16 w-3/4 sm:w-1/2 bg-skeleton-highlight rounded-lg motion-safe:animate-pulse" />
          <div className="h-16 w-full sm:w-2/3 bg-skeleton-base rounded-lg motion-safe:animate-pulse" />
          <div className="h-24 w-full sm:w-3/4 bg-skeleton-highlight rounded-lg motion-safe:animate-pulse" />
          <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center">
            <div className="h-12 w-40 bg-skeleton-base rounded-xl motion-safe:animate-pulse" />
            <div className="h-12 w-40 bg-skeleton-highlight rounded-xl motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
