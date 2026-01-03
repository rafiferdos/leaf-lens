import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/news-service";
import { CalendarIcon, UserIcon } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
    article: Article;
}

export function NewsCard({ article }: NewsCardProps) {
    return (
        <a href={article.url} target="_blank" rel="noreferrer" className="block h-full group perspective-1000">
            <Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border-border/40 bg-card/50 backdrop-blur-sm flex flex-col group-hover:border-primary/20">
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                    {article.urlToImage ? (
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/30">
                            <span className="text-4xl opacity-50">📰</span>
                        </div>
                    )}
                    {/* Gradient Overlay for better contrast if we wanted text over image, but adds depth nonetheless */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="backdrop-blur-md bg-white/90 dark:bg-black/60 font-medium shadow-sm border-0 px-2.5 py-0.5 text-xs tracking-wide">
                            {article.source.name}
                        </Badge>
                    </div>
                </div>

                <CardHeader className="p-5 pb-2 space-y-3">
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                        <CalendarIcon className="w-3 h-3 text-primary/70" />
                        <span>{article.publishedAt ? format(new Date(article.publishedAt), 'MMM d, yyyy') : 'Recent'}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-xl leading-snug group-hover:text-primary transition-colors duration-300">
                        {article.title}
                    </h3>
                </CardHeader>

                <CardContent className="p-5 pt-1 grow">
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {article.description || "No description available for this article."}
                    </p>
                </CardContent>

                {article.author && (
                    <CardFooter className="p-5 pt-0 mt-auto border-t border-border/30">
                        <div className="flex items-center gap-2 py-3 w-full">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                <UserIcon className="w-3 h-3 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground truncate">{article.author}</span>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </a>
    );
}
