// RESPONSIBILITY: Next.js loading.tsx — renders skeleton loader fallback while Workout Library module data loads.
/** @description Route-level Loading for the Manager frontend module. */
/**
 * @description Renders the route-segment skeleton while the module data or route is loading. The skeleton mirrors the module layout without initiating data fetching. @dependencies Uses the module route shell or confirmation provider plus approved application infrastructure only. @edge-case Preserves safe fallback/recovery behavior and avoids exposing implementation details to the user. 
 */
export default function Loading() {
 return (
 <div className="min-h-screen flex flex-col p-6 space-y-5 bg-page">
 <div className="h-20 bg-skeleton-base bg-skeleton-highlight rounded-xl motion-safe:animate-pulse"></div>
 
 {/* Banner Skeleton */}
 <div className="h-32 bg-card rounded-xl motion-safe:animate-pulse motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1"></div>

 {/* Main Content Skeleton */}
 <div className="min-h-96 h-full bg-card rounded-xl motion-safe:animate-pulse mt-6 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1"></div>
 </div>
 );
}
