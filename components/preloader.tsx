"use client"

import * as React from "react"
import { DotLottiePlayer } from '@dotlottie/react-player';

export function Preloader({ onComplete }: { onComplete: () => void }) {
    const [hasPlayed, setHasPlayed] = React.useState(false)

    const handleComplete = () => {
        setHasPlayed(true)
        setTimeout(() => {
            onComplete()
        }, 500) // gentle fade out delay
    }

    // Fallback timeout in case animation fails or takes too long
    React.useEffect(() => {
        const timer = setTimeout(() => {
            if (!hasPlayed) handleComplete()
        }, 4000)
        return () => clearTimeout(timer)
    }, [hasPlayed])

    if (hasPlayed) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-500">
            <div className="h-64 w-64">
                <DotLottiePlayer
                    src="/Walking Pothos.lottie"
                    loop={false}
                    autoplay
                    // @ts-ignore
                    onEvent={(event) => {
                        if (event === 'complete') handleComplete()
                    }}
                />
            </div>
        </div>
    )
}
