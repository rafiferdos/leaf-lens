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
import { cn } from "@/lib/utils"
import { DiseaseInfo } from "./disease-info"

export function AnalysisView() {
    const { image, previewUrl, result, isAnalyzing, error, analyzeImage, reset } = useScan()

    if (!image || !previewUrl) return null

    return (
        <div className="space-y-8 transition-all duration-500 ease-in-out">
            <div className="grid gap-8 md:grid-cols-2 items-start">
                <div className="relative overflow-hidden rounded-xl border border-zinc-200 bg-primary/10 shadow-sm dark:border-zinc-800 aspect-square">
                    <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="flex flex-col space-y-6">
                    {!result && (
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Image Selected</h2>
                            <p className="text-zinc-500">
                                {image.name} ({(image.size / 1024).toFixed(1)} KB)
                            </p>
                        </div>
                    )}

                    {error && (
                        <div className="rounded-md p-4 text-sm text-red-600 bg-red-100/10 dark:text-red-400">
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
                        <Card className="overflow-hidden border-2 border-primary/10 bg-zinc-50/50 dark:bg-zinc-900/50 h-full">
                            <CardContent className="p-6">
                                <div className="mb-4 flex items-center gap-2">
                                    {result.class.toLowerCase() === 'healthy' ? (
                                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                            <HugeiconsIcon icon={CheckmarkCircle02Icon} className="h-6 w-6" />
                                            <span className="font-semibold">Plant is Healthy</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                            <HugeiconsIcon icon={AlertCircleIcon} className="h-6 w-6" />
                                            <span className="font-semibold">Disease Detected</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1 mb-6">
                                    <p className="text-sm font-medium text-zinc-500">Primary Diagnosis</p>
                                    <p className="text-3xl font-bold capitalize text-zinc-900 dark:text-zinc-50">
                                        {result.class.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-zinc-500">Full Analysis Breakdown</p>
                                    <div className="space-y-3">
                                        {result.all_predictions.map((prediction, index) => (
                                            <div key={prediction.class} className="space-y-1">
                                                <div className="flex justify-between text-xs">
                                                    <span className={cn(
                                                        "font-medium",
                                                        index === 0 ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-500"
                                                    )}>
                                                        {prediction.class.replace(/([A-Z])/g, ' $1').trim()}
                                                    </span>
                                                    <span className="text-zinc-500">{(prediction.confidence * 100).toFixed(1)}%</span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                                                    <div
                                                        className={cn(
                                                            "h-full transition-all duration-500 ease-out",
                                                            prediction.class.toLowerCase() === 'healthy' ? "bg-green-500" : "bg-primary"
                                                        )}
                                                        style={{ width: `${prediction.confidence * 100}%`, opacity: Math.max(0.2, prediction.confidence) }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>

            {result && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <Card className="overflow-hidden border border-zinc-200 dark:border-zinc-800">
                        <CardContent className="p-6">
                            <DiseaseInfo diseaseName={result.class} />
                        </CardContent>
                    </Card>

                    <div className="flex justify-center">
                        <Button onClick={reset} variant="outline" size="lg" className="w-full md:w-auto min-w-[200px]">
                            <HugeiconsIcon icon={ArrowLeft01Icon} className="mr-2 h-4 w-4" />
                            Analyze Another
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

