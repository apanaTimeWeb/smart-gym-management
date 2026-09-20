// RESPONSIBILITY: Framework route artifact for gyms/add.
'use client';

export default function SuperadminAddGymError({ reset }: { reset: () => void }) {
    return (
        <main className="flex min-h-72 items-center justify-center p-6">
            <div className="max-w-md rounded-2xl border border-border bg-danger-bg p-6 text-center">
                <h1 className="text-lg font-semibold text-danger">Add Gym page could not be loaded</h1>
                <p className="mt-2 text-sm text-secondary">Please retry the form.</p>
                <button type="button" onClick={() => reset()} className="mt-4 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                    Retry
                </button>
            </div>
        </main>
    );
}
