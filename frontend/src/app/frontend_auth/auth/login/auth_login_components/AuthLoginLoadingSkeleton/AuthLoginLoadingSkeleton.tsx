// RESPONSIBILITY: Mirrors the Login route geometry with structural skeleton surfaces during route loading.
/**
 * Renders the Login route structural skeleton while Next.js resolves the page.
 * @description Mirrors the Login layout and uses the documented skeleton semantic tokens instead of a full-page spinner.
 * @dependencies Global Smart Gym 360 skeleton tokens only.
 * @edge-case The skeleton intentionally contains no interactive controls or authentication state.
 */
export default function AuthLoginLoadingSkeleton() {
  return (
    <div data-testid="auth-login-loading-skeleton" className="min-h-screen bg-page p-6 lg:grid lg:grid-cols-5">
      <div className="hidden rounded-lg bg-skeleton-base p-12 lg:col-span-3 lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-3 w-44 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-12 w-64 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-12 w-52 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-4 w-80 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-72 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-4 w-64 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-4 w-56 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-24 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
        </div>
        <div className="h-10 w-44 rounded-full bg-skeleton-highlight motion-safe:animate-pulse" />
      </div>

      <div className="flex items-center justify-center lg:col-span-2">
        <div className="w-full max-w-md space-y-8">
          <div className="h-4 w-28 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          <div className="flex flex-col items-center gap-3">
            <div className="h-16 w-16 rounded-lg bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-8 w-40 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
            <div className="h-4 w-56 rounded bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
          <div className="space-y-5 rounded-lg border border-border bg-skeleton-base p-8">
            <div className="space-y-2"><div className="h-4 w-24 rounded bg-skeleton-highlight motion-safe:animate-pulse" /><div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" /></div>
            <div className="space-y-2"><div className="h-4 w-20 rounded bg-skeleton-highlight motion-safe:animate-pulse" /><div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" /></div>
            <div className="h-11 rounded-md bg-skeleton-highlight motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
