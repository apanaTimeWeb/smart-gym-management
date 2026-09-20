// RESPONSIBILITY: Framework route artifact for ..
export default function SuperadminLoading() {
    return (
        <main className="space-y-6 p-6" aria-busy="true">
            <div className="h-10 w-56 motion-safe:animate-pulse rounded-xl bg-skeleton-base" />
            <div className="h-32 rounded-2xl bg-skeleton-base" />
            <div className="h-72 rounded-2xl bg-skeleton-base" />
        </main>
    );
}
