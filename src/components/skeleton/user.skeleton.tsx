import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type UserSkeletonProps = {
    avatarSize?: string; // For avatar width/height
    titleWidth?: string; // For the width of the title skeleton
    titleHeight?: string; // For the height of the title skeleton
    subtitleWidth?: string; // For the width of the subtitle skeleton
    subtitleHeight?: string; // For the height of the subtitle skeleton
};

const UserSkeleton: React.FC<UserSkeletonProps> = ({
    avatarSize = 'h-12 w-12', // default avatar size
    titleWidth = 'w-64', // default title width
    titleHeight = 'h-4', // default title height
    subtitleWidth = 'w-52', // default subtitle width
    subtitleHeight = 'h-4', // default subtitle height
}) => {
    return (
        <div className="flex items-center space-x-4 py-2">
            <Skeleton className={cn(avatarSize, 'rounded-full')} />
            <div className="space-y-2">
                <Skeleton className={cn(titleWidth, titleHeight)} />
                <Skeleton className={cn(subtitleWidth, subtitleHeight)} />
            </div>
        </div>
    );
};

export default UserSkeleton;
