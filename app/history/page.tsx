"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Time01Icon, Delete02Icon, Calendar03Icon } from "@hugeicons/core-free-icons"
import { getHistory, clearHistory, HistoryItem } from "@/lib/history"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type ViewOption = "default" | "compact" | "comfort"

export default function HistoryPage() {
    const [history, setHistory] = React.useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [view, setView] = React.useState<ViewOption>("default")

    const loadHistory = React.useCallback(() => {
        const data = getHistory()
        setHistory(data)
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        loadHistory()
    }, [loadHistory])

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <div className="text-muted-foreground animate-pulse">Loading history...</div>
            </div>
        )
    }

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                    <HugeiconsIcon icon={Time01Icon} className="h-8 w-8 text-zinc-400" />
                </div>
                <div className="space-y-1">
                    <h1 className="text-2xl font-bold font-heading text-zinc-900 dark:text-zinc-100">No scans yet</h1>
                    <p className="text-zinc-500 max-w-sm">
                        Calculated results from your leaf scans will appear here.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-in fade-in duration-700 h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Scan History</h1>
                    <p className="text-muted-foreground mt-1">Found {history.length} past analyses.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select value={view} onValueChange={(v) => setView(v as ViewOption)}>
                        <SelectTrigger className="w-[140px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="default">
                                <span className="flex items-center gap-2">
                                    Default
                                </span>
                            </SelectItem>
                            <SelectItem value="compact">
                                <span className="flex items-center gap-2">
                                    Compact
                                </span>
                            </SelectItem>
                            <SelectItem value="comfort">
                                <span className="flex items-center gap-2">
                                    Comfort
                                </span>
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <AlertDialog>
                        <AlertDialogTrigger
                            render={
                                <Button variant="outline" size="icon" className="text-destructive hover:text-destructive shrink-0">
                                    <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                                </Button>
                            }
                        />
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your scan history from this device.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => {
                                    clearHistory()
                                    loadHistory()
                                }} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    Delete History
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-2 custom-scrollbar pb-10">
                <div className="flex flex-col gap-3">
                    {history.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "group relative flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-3 shadow-sm transition-all hover:bg-accent/5 hover:border-accent/20 hover:shadow-md",
                                view === "compact" && "p-2 gap-3",
                                view === "comfort" && "p-5 gap-6 flex-col sm:flex-row"
                            )}
                        >
                            <div className={cn(
                                "relative shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800",
                                view === "default" && "h-20 w-20",
                                view === "compact" && "h-12 w-12 rounded-md",
                                view === "comfort" && "h-48 w-full sm:w-48 sm:h-32 rounded-xl"
                            )}>
                                <img
                                    src={item.imageBase64}
                                    alt={item.result.class}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="flex min-w-0 flex-1 flex-col gap-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className={cn(
                                        "font-bold font-heading line-clamp-1",
                                        view === "compact" ? "text-base" : "text-lg",
                                        view === "comfort" && "text-xl"
                                    )}>
                                        {item.result.class}
                                    </h3>
                                    <Badge variant="outline" className={cn(
                                        "bg-background/80 shrink-0",
                                        item.result.confidence > 0.8 ? "text-green-600 border-green-200" : "text-amber-600 border-amber-200"
                                    )}>
                                        {(item.result.confidence * 100).toFixed(0)}%
                                    </Badge>
                                </div>

                                {item.result.all_predictions && item.result.all_predictions.length > 0 && view !== "compact" && (
                                    <div className="mt-2 space-y-2">
                                        {item.result.all_predictions.slice(0, 3).map((pred) => (
                                            <div key={pred.class} className="flex items-center gap-2 text-xs">
                                                <span className="w-24 truncate font-medium text-muted-foreground">{pred.class}</span>
                                                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-primary/70 rounded-full"
                                                        style={{ width: `${pred.confidence * 100}%` }}
                                                    />
                                                </div>
                                                <span className="w-8 text-right text-muted-foreground">{(pred.confidence * 100).toFixed(0)}%</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground mt-1">
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <HugeiconsIcon icon={Calendar03Icon} className="size-3.5" />
                                        <span>
                                            {new Date(item.timestamp).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                                year: view === "comfort" ? 'numeric' : undefined
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs">
                                        <HugeiconsIcon icon={Time01Icon} className="size-3.5" />
                                        <span>
                                            {new Date(item.timestamp).toLocaleTimeString(undefined, {
                                                hour: 'numeric',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
