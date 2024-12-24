import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function WishlistSkeleton() {
    return (
        <>
            {Array(8)
                .fill(0)
                .map((_, index) => (
                    <Card key={index} className="relative group">
                        <CardContent className="p-4">
                            <Skeleton className="w-full aspect-w-3 aspect-h-4 mb-4" />
                            <Skeleton className="h-4 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}

export default WishlistSkeleton;
