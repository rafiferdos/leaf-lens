import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function NewsSkeleton() {
    return (
        <Card className="h-full overflow-hidden border-border/50 flex flex-col">
            <div className="h-48 w-full">
                <Skeleton className="h-full w-full" />
            </div>

            <CardHeader className="p-4 pb-2 space-y-2">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-4" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>

            <CardContent className="p-4 pt-0 grow space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>

            <CardFooter className="p-4 pt-0 mt-auto">
                <div className="flex items-center gap-2">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </CardFooter>
        </Card>
    );
}

export function NewsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <NewsSkeleton key={i} />
            ))}
        </div>
    );
}
