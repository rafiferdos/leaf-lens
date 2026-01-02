import { ScanResult } from "@/components/leaf-scan/scan-context"

export interface HistoryItem {
    id: string
    timestamp: number
    result: ScanResult
    imageBase64: string
}

const HISTORY_KEY = "leaflens_history"

export async function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = (error) => reject(error)
    })
}

export function getHistory(): HistoryItem[] {
    if (typeof window === "undefined") return []
    try {
        const stored = localStorage.getItem(HISTORY_KEY)
        return stored ? JSON.parse(stored) : []
    } catch (e) {
        console.error("Failed to parse history", e)
        return []
    }
}

export async function addToHistory(result: ScanResult, imageFile: File) {
    try {
        const history = getHistory()
        const imageBase64 = await fileToBase64(imageFile)

        const newItem: HistoryItem = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            result,
            imageBase64
        }

        // Add to beginning, keep max 50 items to avoid storage/quota limits
        const newHistory = [newItem, ...history].slice(0, 50)

        localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
    } catch (e) {
        console.error("Failed to save history", e)
    }
}

export function clearHistory() {
    localStorage.removeItem(HISTORY_KEY)
}
