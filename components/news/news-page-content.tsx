"use client";

import { useEffect, useState } from "react";
import { NewsFilters } from "./news-filters";
import { NewsCard } from "./news-card";
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
        <div className="max-w-7xl mx-auto w-full space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-heading bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                    Articles
                </h1>
                <p className="text-muted-foreground">
                    Latest updates on food, health, and lifestyle from around the world.
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
                <div className="flex justify-center py-20">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
            ) : articles.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <NewsCard key={article.id} article={article} />
                        ))}
                    </div>

                    {nextPage && (
                        <div className="flex justify-center pt-8 pb-4">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="min-w-[200px]"
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
                <div className="text-center py-20 text-muted-foreground">
                    <p className="text-4xl mb-4">📰</p>
                    <p>No articles found for the selected filters.</p>
                </div>
            )}
        </div>
    );
}
