import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

function PointHistorySkeleton() {
    return (
        <>
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <Card key={index} className="relative">
                        <CardContent className="p-4">
                            <Skeleton className="h-6 w-1/4 mb-2" />
                            <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                    </Card>
                ))}
        </>
    );
}

export default PointHistorySkeleton;
