import { Skeleton } from '@/components/ui/skeleton';

function CommentSkeleton() {
    return (
        <div className="mb-4">
            <div className="flex space-x-2 items-center">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex flex-col space-y-1">
                    <Skeleton className="w-24 h-4" />
                    <Skeleton className="w-16 h-3 opacity-70" />
                </div>
            </div>
            <Skeleton className="w-full h-6 mt-3" />
        </div>
    );
}

export default CommentSkeleton;
