import { Skeleton } from '@/components/ui/skeleton';

function CartItemSkeleton() {
    return (
        <div className="flex space-x-4">
            <Skeleton className="w-24 h-32" />
            <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
}

export default CartItemSkeleton;
