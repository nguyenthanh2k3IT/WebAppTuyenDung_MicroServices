import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function MyOrderSkeleton() {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/3" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-36" />
            </CardFooter>
        </Card>
    );
}

export default MyOrderSkeleton;
