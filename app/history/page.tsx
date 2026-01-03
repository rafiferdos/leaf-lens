"use client"

import * as React from "react"
import { getHistory, clearHistory, removeFromHistory, HistoryItem } from "@/lib/history"
import { HistoryToolbar } from "@/components/history/history-toolbar"
import { HistoryGrid } from "@/components/history/history-grid"
import { HistoryList } from "@/components/history/history-list"
import { EmptyHistoryState } from "@/components/history/empty-state"

// Checking imports: toast might not be installed. I'll avoid toast for now to avoid errors, or check package.json.
// Step 722 viewed package.json... it has "sonner": "^1.5.0"? No, I didn't see it in the summary.
// I'll stick to standard React state updates.

// Re-viewing package.json from step 722... I didn't see sonner. I'll list package.json to be safe if I wanted to add toasts, but for now I'll just rely on UI updates.

export default function HistoryPage() {
    const [history, setHistory] = React.useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [view, setView] = React.useState<"grid" | "list">("grid")
    const [searchQuery, setSearchQuery] = React.useState("")

    const loadHistory = React.useCallback(() => {
        const data = getHistory()
        setHistory(data)
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        loadHistory()
    }, [loadHistory])

    const handleClearHistory = () => {
        clearHistory()
        setHistory([])
    }

    const handleDeleteItem = (id: string) => {
        removeFromHistory(id)
        setHistory(prev => prev.filter(item => item.id !== id))
    }

    const filteredHistory = React.useMemo(() => {
        if (!searchQuery) return history;
        const lowerQ = searchQuery.toLowerCase();
        return history.filter(item =>
            item.result.class.toLowerCase().includes(lowerQ) ||
            new Date(item.timestamp).toLocaleDateString().includes(lowerQ)
        );
    }, [history, searchQuery]);

    if (isLoading) {
        return (
            <div className="container mx-auto max-w-7xl p-6 min-h-screen pt-24 space-y-8">
                <div className="h-12 w-48 bg-muted animate-pulse rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background/50">
            <div className="container mx-auto max-w-7xl p-6 pt-10 space-y-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-heading font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        Scan History
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Manage and review your past plant diagnoses.
                    </p>
                </div>

                <div className="space-y-6">
                    <HistoryToolbar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        view={view}
                        onViewChange={setView}
                        onClearHistory={handleClearHistory}
                        hasHistory={history.length > 0}
                    />

                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {filteredHistory.length > 0 ? (
                            view === "grid" ? (
                                <HistoryGrid items={filteredHistory} onDelete={handleDeleteItem} />
                            ) : (
                                <HistoryList items={filteredHistory} onDelete={handleDeleteItem} />
                            )
                        ) : (
                            <div className="pt-10">
                                {searchQuery ? (
                                    <div className="text-center py-20 text-muted-foreground bg-muted/20 rounded-3xl border border-dashed border-border/50">
                                        <p className="text-lg">No results found for "{searchQuery}"</p>
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="text-primary hover:underline mt-2 text-sm"
                                        >
                                            Clear search
                                        </button>
                                    </div>
                                ) : (
                                    <EmptyHistoryState />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
