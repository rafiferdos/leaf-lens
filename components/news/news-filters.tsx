import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { NewsCategory, NewsCountry, NewsLanguage } from "@/lib/news-service";
import { RefreshCcw } from "lucide-react";

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

const CATEGORIES: { key: NewsCategory; label: string }[] = [
    { key: 'food', label: 'Food & Nutrition' },
    { key: 'health', label: 'Health' },
    { key: 'lifestyle', label: 'Lifestyle' },
];

const LANGUAGES: { code: NewsLanguage; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'bn', label: 'Bengali', flag: '🇧🇩' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳' },
    { code: 'ur', label: 'Urdu', flag: '🇵🇰' },
];

const COUNTRIES: { code: NewsCountry; label: string; flag: string }[] = [
    { code: 'in', label: 'India', flag: '🇮🇳' },
    { code: 'pk', label: 'Pakistan', flag: '🇵🇰' },
    { code: 'bd', label: 'Bangladesh', flag: '🇧🇩' },
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
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center bg-card p-4 rounded-xl border shadow-sm">
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                <Select value={category} onValueChange={(v) => onCategoryChange(v as NewsCategory)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map(cat => (
                            <SelectItem key={cat.key} value={cat.key}>{cat.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={language} onValueChange={(v) => onLanguageChange(v as NewsLanguage)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {LANGUAGES.map(lang => (
                            <SelectItem key={lang.code} value={lang.code}>
                                <span className="mr-2">{lang.flag}</span> {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={country} onValueChange={(v) => onCountryChange(v as NewsCountry)}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {COUNTRIES.map(c => (
                            <SelectItem key={c.code} value={c.code}>
                                <span className="mr-2">{c.flag}</span> {c.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={onRefresh}
                disabled={isLoading}
                className={isLoading ? "animate-spin" : ""}
            >
                <RefreshCcw className="h-4 w-4" />
            </Button>
        </div>
    );
}
