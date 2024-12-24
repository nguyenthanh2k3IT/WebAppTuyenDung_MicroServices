import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type CardSkeletonProps = {
    width?: string;
    height?: string;
    contentWidth?: string;
    contentHeight?: string;
};

const CardSkeleton: React.FC<CardSkeletonProps> = ({
    width = 'w-64',
    height = 'h-32',
    contentWidth = 'w-52',
    contentHeight = 'h-4 ',
}) => {
    return (
        <div className={cn('flex flex-col space-y-3', width)}>
            <Skeleton className={cn(height, 'rounded-xl')} />
            <div className="space-y-2">
                <Skeleton className={cn('w-full', contentHeight)} />
                <Skeleton className={cn(contentWidth, contentHeight)} />
            </div>
        </div>
    );
};

export default CardSkeleton;
