"use client"

import * as React from "react"
import { ScanProvider, useScan } from "./scan-context"
import { ImageUploader } from "./image-uploader"
import { AnalysisView } from "./analysis-view"

function LeafScanContent() {
    const { image } = useScan()

    return (
        <div className="mx-auto w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <div className="mb-12 text-center space-y-4">
                <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in zoom-in duration-500 delay-150">
                    AI Powered Analysis
                </div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight bg-linear-to-r from-green-500 via-teal-500 to-green-600 bg-clip-text text-transparent pb-2">
                    Leaf Lens
                </h1>
                <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Advanced plant disease detection powered by computer vision. <br className="hidden md:block" />
                    Upload a photo or use your camera to get instant diagnosis.
                </p>
            </div>

            <div className="relative isolate">
                {/* Glow effect behind the card */}
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 opacity-40">
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] sm:left-[calc(50%-30rem)] sm:w-288.75"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                            background: "linear-gradient(to top right, var(--color-primary), var(--color-teal-400))"
                        }}
                    />
                </div>

                <div className="rounded-3xl border border-border/50 bg-background/40 backdrop-blur-md shadow-2xl p-6 sm:p-12 relative overflow-hidden">
                    {!image ? <ImageUploader /> : <AnalysisView />}
                </div>
            </div>
        </div>
    )
}

export function LeafScan() {
    return (
        <ScanProvider>
            <LeafScanContent />
        </ScanProvider>
    )
}
