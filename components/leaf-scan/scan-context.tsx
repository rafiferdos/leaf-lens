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

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
            const response = await fetch(`${apiUrl}/predict`, {
                method: "POST",
                body: formData,
            })

            if (!response.ok) {
                throw new Error("Failed to analyze image")
            }

            const data = await response.json()
            setResult(data)

            // Save to history
            if (image) {
                // We use the imported function but we need to import it first. 
                // Since I can't add import easily with replace_file_content if it's far away, 
                // I will assume I will add import in a separate step or try to add it here if I include top of file? 
                // No, replace_file_content targets a block.
                // I'll add the logic here and then add import.
                // Actually, I can allow multiple edits? No, "Do NOT make multiple parallel calls to this tool".
                // I'll do two edits sequentially.
                // First the logic.
                import("@/lib/history").then(({ addToHistory }) => {
                    addToHistory(data, image)
                }).catch(err => console.error("Failed to save history import", err))
            }
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
