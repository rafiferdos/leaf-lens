export interface Article {
    id: string;
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export type NewsCategory = 'food' | 'health' | 'lifestyle';
export type NewsLanguage = 'en' | 'bn' | 'hi' | 'ur';
export type NewsCountry = 'in' | 'pk' | 'bd';

export interface NewsResponse {
    articles: Article[];
    nextPage: string | null;
}

// Deduplicate helper
const deduplicateById = (articles: Article[]): Article[] => {
    const seen = new Set<string>();
    return articles.filter(article => {
        if (seen.has(article.id)) return false;
        seen.add(article.id);
        return true;
    });
};

export const fetchNews = async (
    category: NewsCategory,
    language: NewsLanguage,
    country: NewsCountry,
    page?: string | null
): Promise<NewsResponse> => {
    try {
        const params = new URLSearchParams({ category, language, country });
        if (page) params.append('page', page);

        const response = await fetch(`/api/news?${params.toString()}`);
        const data = await response.json();

        if (data.status !== 'success' || !data.results) {
            console.error('API Error:', data);
            return { articles: [], nextPage: null };
        }

        const articles: Article[] = data.results
            .filter((item: any) => item.title && item.image_url)
            .map((item: any) => ({
                id: item.article_id,
                source: {
                    id: item.source_id || null,
                    name: item.source_name || item.source_id || 'Unknown'
                },
                author: item.creator ? (Array.isArray(item.creator) ? item.creator.join(', ') : item.creator) : null,
                title: item.title,
                description: item.description || null,
                url: item.link,
                urlToImage: item.image_url,
                publishedAt: item.pubDate,
                content: item.content || null
            }));

        return {
            articles: deduplicateById(articles),
            nextPage: data.nextPage || null
        };
    } catch (error) {
        console.error('Fetch error:', error);
        return { articles: [], nextPage: null };
    }
};
