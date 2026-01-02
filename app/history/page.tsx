"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { Time01Icon } from "@hugeicons/core-free-icons"

export default function HistoryPage() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                <HugeiconsIcon icon={Time01Icon} className="h-8 w-8 text-zinc-400" />
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Scan History</h1>
            <p className="text-zinc-500 max-w-sm">
                Your past analysis results will be saved here. This feature is coming soon!
            </p>
        </div>
    )
}
