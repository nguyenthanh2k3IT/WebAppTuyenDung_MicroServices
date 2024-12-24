import { memo } from 'react';
import { Skeleton } from '../ui/skeleton';

interface BreadcrumbSkeletonProps {
    item: number;
}

function BreadcrumbSkeleton({ item }: BreadcrumbSkeletonProps) {
    return (
        <div className="flex space-x-2">
            {Array.from({ length: item }).map((_, index) => (
                <Skeleton key={index} className="w-40 h-9 mb-2" />
            ))}
        </div>
    );
}

export default memo(BreadcrumbSkeleton);
