import { Skeleton } from '@/components/ui/skeleton';

function CheckoutSkeleton() {
    return (
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}

export default CheckoutSkeleton;
