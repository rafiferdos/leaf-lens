"use client"

import * as React from "react"
import { Preloader } from "@/components/preloader"

export function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = React.useState(true)

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}
            {!loading && (
                <div className="animate-in fade-in duration-700">
                    {children}
                </div>
            )}
        </>
    )
}
