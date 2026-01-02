"use client"

import * as React from "react"

export interface Prediction {
    class: string
    confidence: number
}

export interface ScanResult {
    class: string
    confidence: number
    all_predictions: Prediction[]
}

interface ScanContextValue {
    image: File | null
    previewUrl: string | null
    result: ScanResult | null
    isAnalyzing: boolean
    error: string | null
    setImage: (file: File | null) => void
    analyzeImage: () => Promise<void>
    reset: () => void
}

const ScanContext = React.createContext<ScanContextValue | undefined>(undefined)

export function ScanProvider({ children }: { children: React.ReactNode }) {
    const [image, setImage] = React.useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    const [result, setResult] = React.useState<ScanResult | null>(null)
    const [isAnalyzing, setIsAnalyzing] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)

    const handleSetImage = React.useCallback((file: File | null) => {
        setImage(file)
        if (file) {
            const url = URL.createObjectURL(file)
            setPreviewUrl(url)
            setResult(null)
            setError(null)
        } else {
            setPreviewUrl(null)
        }
    }, [])

    const analyzeImage = React.useCallback(async () => {
        if (!image) return

        setIsAnalyzing(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("file", image)

            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to analyze image")
            }

            const data = await response.json()
            setResult(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred")
        } finally {
            setIsAnalyzing(false)
        }
    }, [image])

    const reset = React.useCallback(() => {
        setImage(null)
        setPreviewUrl(null)
        setResult(null)
        setError(null)
    }, [])

    const value = React.useMemo(
        () => ({
            image,
            previewUrl,
            result,
            isAnalyzing,
            error,
            setImage: handleSetImage,
            analyzeImage,
            reset,
        }),
        [image, previewUrl, result, isAnalyzing, error, handleSetImage, analyzeImage, reset]
    )

    return <ScanContext.Provider value={value}>{children}</ScanContext.Provider>
}

export function useScan() {
    const context = React.useContext(ScanContext)
    if (!context) {
        throw new Error("useScan must be used within a ScanProvider")
    }
    return context
}
