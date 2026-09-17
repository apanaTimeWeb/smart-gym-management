export default function SuperadminAddGymLoading() {
    return (
        <main className="space-y-5 p-6" aria-busy="true">
            <div className="h-9 w-64 motion-safe:animate-pulse rounded-xl bg-skeleton-base" />
            <div className="h-96 rounded-2xl bg-skeleton-base" />
        </main>
    );
}
