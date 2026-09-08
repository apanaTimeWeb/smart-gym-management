export default function Loading() {
  return (
    <div className="min-h-full pb-10">
      <div className="px-6 pt-6 pb-0 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-card rounded-md animate-pulse border border-border"></div>
          <div className="h-4 w-64 bg-card rounded-md animate-pulse border border-border"></div>
        </div>
        <div className="h-10 w-32 bg-card rounded-lg animate-pulse border border-border"></div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-card rounded-xl border border-border animate-pulse"></div>
          ))}
        </div>
        <div className="h-[600px] bg-card rounded-xl border border-border animate-pulse"></div>
      </div>
    </div>
  );
}
