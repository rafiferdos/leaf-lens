import { Button } from "@/components/ui/button";
import { NewsCategory, NewsCountry, NewsLanguage } from "@/lib/news-service";
import { RefreshCcw, Layers, Globe, Languages, Filter } from "lucide-react";
import { FilterSelect } from "./filter-select";

interface NewsFiltersProps {
    category: NewsCategory;
    language: NewsLanguage;
    country: NewsCountry;
    onCategoryChange: (value: NewsCategory) => void;
    onLanguageChange: (value: NewsLanguage) => void;
    onCountryChange: (value: NewsCountry) => void;
    onRefresh: () => void;
    isLoading: boolean;
}

const CATEGORIES = [
    { value: 'food', label: 'Food & Nutrition', icon: '🥗' },
    { value: 'health', label: 'Health & Wellness', icon: '❤️' },
    { value: 'lifestyle', label: 'Lifestyle', icon: '🧘' },
];

const LANGUAGES = [
    { value: 'en', label: 'English', icon: '🇬🇧' },
    { value: 'bn', label: 'Bengali', icon: '🇧🇩' },
    { value: 'hi', label: 'Hindi', icon: '🇮🇳' },
    { value: 'ur', label: 'Urdu', icon: '🇵🇰' },
];

const COUNTRIES = [
    { value: 'in', label: 'India', icon: '🇮🇳' },
    { value: 'pk', label: 'Pakistan', icon: '🇵🇰' },
    { value: 'bd', label: 'Bangladesh', icon: '🇧🇩' },
];

export function NewsFilters({
    category,
    language,
    country,
    onCategoryChange,
    onLanguageChange,
    onCountryChange,
    onRefresh,
    isLoading
}: NewsFiltersProps) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-stretch md:items-center bg-card/40 backdrop-blur-xl p-2 rounded-2xl border border-border/40 shadow-sm mx-auto max-w-4xl w-full">
            <div className="hidden md:flex items-center justify-center px-4 py-2 text-muted-foreground border-r border-border/40 gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filters</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1 p-2 md:p-0">
                <FilterSelect
                    value={category}
                    onValueChange={(v) => onCategoryChange(v as NewsCategory)}
                    icon={Layers}
                    options={CATEGORIES}
                    placeholder="Category"
                />

                <FilterSelect
                    value={language}
                    onValueChange={(v) => onLanguageChange(v as NewsLanguage)}
                    icon={Languages}
                    options={LANGUAGES}
                    placeholder="Language"
                />

                <FilterSelect
                    value={country}
                    onValueChange={(v) => onCountryChange(v as NewsCountry)}
                    icon={Globe}
                    options={COUNTRIES}
                    placeholder="Country"
                />
            </div>

            <div className="p-2 md:pl-2">
                <Button
                    variant="default" // Changed to default variant for better visibility
                    size="icon"
                    onClick={onRefresh}
                    disabled={isLoading}
                    className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 shadow-md transition-all hover:scale-105"
                >
                    <RefreshCcw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                </Button>
            </div>
        </div>
    );
}
