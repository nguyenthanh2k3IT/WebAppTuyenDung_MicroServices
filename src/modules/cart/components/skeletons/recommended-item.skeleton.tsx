import { Skeleton } from '@/components/ui/skeleton';

function RecommendedItemSkeleton() {
    return (
        <div className="w-40 flex-shrink-0 space-y-2">
            <Skeleton className="w-full h-48" />
            <Skeleton className="h-4 w-3/4" />
        </div>
    );
}

export default RecommendedItemSkeleton;
