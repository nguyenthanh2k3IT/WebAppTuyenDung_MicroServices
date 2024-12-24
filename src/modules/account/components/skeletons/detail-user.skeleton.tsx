import { Skeleton } from '@/components/ui/skeleton';

function DetailUserSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export default DetailUserSkeleton;
