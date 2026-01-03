import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/news-service";
import { CalendarIcon, UserIcon } from "lucide-react"; // Using Lucide as standard, or HugeIcons if preferred, sticking to Lucide for standard UI consistency if available, otherwise just use lucide-react standard
import { format } from "date-fns";

interface NewsCardProps {
    article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
    return (
        <a href={article.url} target="_blank" rel="noreferrer" className="block h-full group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50 hover:border-primary/50 flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                    {article.urlToImage ? (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/50">
                            <span className="text-4xl">📰</span>
                        </div>
                    )}
                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="backdrop-blur-md bg-background/80 font-semibold shadow-sm">
                            {article.source.name}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{article.publishedAt ? format(new Date(article.publishedAt), 'MMM d, yyyy') : 'Recent'}</span>
                    </div>
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                    </h3>
                </CardHeader>

                <CardContent className="p-4 pt-0 grow">
                    <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.description || "No description available for this article."}
                    </p>
                </CardContent>

                {article.author && (
                    <CardFooter className="p-4 pt-0 text-xs text-muted-foreground/80 mt-auto">
                        <div className="flex items-center gap-1.5">
                            <UserIcon className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{article.author}</span>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </a>
    );
}
