"use client";

import { useEffect, useState } from "react";
import { NewsFilters } from "./news-filters";
import { NewsCard } from "./news-card";
import { NewsGridSkeleton } from "./news-skeleton";
import { Article, fetchNews, NewsCategory, NewsCountry, NewsLanguage } from "@/lib/news-service";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NewsPageContent() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [nextPage, setNextPage] = useState<string | null>(null);

    const [category, setCategory] = useState<NewsCategory>('food');
    const [language, setLanguage] = useState<NewsLanguage>('en');
    const [country, setCountry] = useState<NewsCountry>('in');

    const loadInitialNews = async () => {
        setLoading(true);
        const data = await fetchNews(category, language, country);
        setArticles(data.articles);
        setNextPage(data.nextPage);
        setLoading(false);
    };

    const loadMore = async () => {
        if (!nextPage) return;
        setLoadingMore(true);
        const data = await fetchNews(category, language, country, nextPage);
        setArticles(prev => [...prev, ...data.articles]);
        setNextPage(data.nextPage);
        setLoadingMore(false);
    };

    useEffect(() => {
        loadInitialNews();
    }, [category, language, country]);

    return (
        <div className="max-w-7xl mx-auto w-full space-y-8 pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-4 text-center items-center py-6">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                    Global Updates
                </div>
                <h1 className="text-4xl md:text-5xl font-heading bg-linear-to-r from-green-600 to-teal-600 dark:from-green-400 dark:to-teal-400 bg-clip-text text-transparent">
                    Articles
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                    Discover the latest insights on plant care, sustainable food, and healthy living from trusted sources worldwide.
                </p>
            </div>

            <NewsFilters
                category={category}
                language={language}
                country={country}
                onCategoryChange={setCategory}
                onLanguageChange={setLanguage}
                onCountryChange={setCountry}
                onRefresh={loadInitialNews}
                isLoading={loading}
            />

            {loading ? (
                <NewsGridSkeleton />
            ) : articles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article, index) => (
                            <div
                                key={article.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <NewsCard article={article} />
                            </div>
                        ))}
                    </div>

                    {nextPage && (
                        <div className="flex justify-center pt-12 pb-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="min-w-[200px] h-12 rounded-full border-border/60 hover:bg-secondary/50 transition-all hover:scale-105"
                            >
                                {loadingMore ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Loading...
                                    </>
                                ) : (
                                    "Load More Articles"
                                )}
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-dashed border-border/50">
                    <p className="text-5xl mb-6">📰</p>
                    <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
                    <p>Try adjusting your filters or refreshing the page.</p>
                </div>
            )}
        </div>
    );
}
