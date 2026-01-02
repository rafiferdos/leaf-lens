"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Time01Icon, Delete02Icon, Calendar03Icon, Search01Icon } from "@hugeicons/core-free-icons"
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

export default function HistoryPage() {
    const [history, setHistory] = React.useState<HistoryItem[]>([])
    const [isLoading, setIsLoading] = React.useState(true)

    const loadHistory = React.useCallback(() => {
        const data = getHistory()
        setHistory(data)
        setIsLoading(false)
    }, [])

    React.useEffect(() => {
        loadHistory()
    }, [loadHistory])

    const handleClearHistory = () => {
        if (confirm("Are you sure you want to clear all history?")) {
            clearHistory()
            loadHistory()
        }
    }

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
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold font-heading">Scan History</h1>
                    <p className="text-muted-foreground mt-1">Found {history.length} past analyses.</p>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger
                        render={
                            <Button variant="outline" size="sm" className="text-destructive hover:text-destructive gap-2">
                                <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                                Clear History
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

            <div className="h-[calc(100vh-12rem)] overflow-y-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                    {history.map((item, index) => (
                        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-border/50 bg-background/50 backdrop-blur-sm">
                            <div className="aspect-square relative overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                <img
                                    src={item.imageBase64}
                                    alt={item.result.class}
                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <Badge variant="secondary" className="bg-white/90 text-black hover:bg-white">
                                        {(item.result.confidence * 100).toFixed(1)}% Confidence
                                    </Badge>
                                </div>
                            </div>
                            <CardContent className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-bold text-lg leading-tight line-clamp-1" title={item.result.class}>
                                        {item.result.class}
                                    </h3>
                                    <div className="shrink-0 flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                        <HugeiconsIcon icon={Calendar03Icon} className="size-3 mr-1" />
                                        {new Date(item.timestamp).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center gap-1">
                                    <HugeiconsIcon icon={Time01Icon} className="size-3" />
                                    {new Date(item.timestamp).toLocaleTimeString(undefined, {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div >
    )
}
