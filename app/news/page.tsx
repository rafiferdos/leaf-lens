import { NewsPageContent } from "@/components/news/news-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News - LeafLens",
    description: "Latest news and updates",
};

export default function NewsPage() {
    return <NewsPageContent />;
}
