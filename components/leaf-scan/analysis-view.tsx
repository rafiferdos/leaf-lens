"use client"

import * as React from "react"
import { useScan } from "./scan-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ArrowLeft01Icon,
    Search01Icon,
    AlertCircleIcon,
    CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons"

export function AnalysisView() {
    const { image, previewUrl, result, isAnalyzing, error, analyzeImage, reset } = useScan()

    if (!image || !previewUrl) return null

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover aspect-square"
                />
            </div>

            <div className="flex flex-col justify-center space-y-6">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Image Selected</h2>
                    <p className="text-zinc-500">
                        {image.name} ({(image.size / 1024).toFixed(1)} KB)
                    </p>
                </div>

                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                        <div className="flex items-center gap-2">
                            <HugeiconsIcon icon={AlertCircleIcon} />
                            <span>{error}</span>
                        </div>
                    </div>
                )}

                {!result ? (
                    <div className="space-y-4">
                        <Button
                            onClick={analyzeImage}
                            disabled={isAnalyzing}
                            size="lg"
                            className="w-full gap-2"
                        >
                            {isAnalyzing ? (
                                <>Analyzing...</>
                            ) : (
                                <>
                                    <HugeiconsIcon icon={Search01Icon} />
                                    Identify Plant Disease
                                </>
                            )}
                        </Button>
                        <Button onClick={reset} variant="ghost" className="w-full" disabled={isAnalyzing}>
                            Remove Image
                        </Button>
                    </div>
                ) : (
                    <Card className="overflow-hidden border-2 border-primary/10 bg-zinc-50/50 dark:bg-zinc-900/50">
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center gap-2 text-primary">
                                <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6" />
                                <span className="font-semibold">Analysis Complete</span>
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm font-medium text-zinc-500">Detected Condition</p>
                                <p className="text-2xl font-bold capitalize text-zinc-900 dark:text-zinc-50">
                                    {result.class}
                                </p>
                            </div>

                            <div className="mt-4 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">Confidence</span>
                                    <span className="font-medium">{(result.confidence * 100).toFixed(1)}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                                    <div
                                        className="h-full bg-primary transition-all duration-500 ease-out"
                                        style={{ width: `${result.confidence * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className="mt-6">
                                <Button onClick={reset} variant="outline" className="w-full">
                                    <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" />
                                    Analyze Another
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}
