"use client"

import * as React from "react"
import { ScanProvider, useScan } from "./scan-context"
import { ImageUploader } from "./image-uploader"
import { AnalysisView } from "./analysis-view"

function LeafScanContent() {
    const { image } = useScan()

    return (
        <div className="mx-auto w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-8 text-center">
                <h1 className="mb-2 lg:text-9xl font-bold tracking-tight text-accent text-4xl">
                    Leaf Lens
                </h1>
                <p className="mx-auto max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
                    Advanced plant disease detection powered by computer vision. Upload a photo or use your camera to get instant analysis.
                </p>
            </div>

            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-10">
                {!image ? <ImageUploader /> : <AnalysisView />}
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
