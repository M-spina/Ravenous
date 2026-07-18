import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function BusinessCardSkeleton() {
  return (
    <Card className="h-[31rem] overflow-hidden border-border bg-card shadow-lg sm:h-[30rem]" aria-hidden="true">
      <Skeleton className="h-48 w-full rounded-none sm:h-52" />
      <div className="flex h-[calc(100%-12rem)] flex-col p-5 sm:h-[calc(100%-13rem)]">
        <Skeleton className="h-6 w-3/4" />
        <div className="mt-5 flex gap-3">
          <Skeleton className="size-4 shrink-0 rounded-full" />
          <div className="w-full space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </div>
        <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>
      </div>
    </Card>
  );
}
