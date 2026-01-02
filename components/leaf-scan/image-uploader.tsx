"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useScan } from "./scan-context"
import { CameraCapture } from "./camera-capture"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    ImageIcon,
    Camera01Icon,
    Upload02Icon,
    File01Icon
} from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export function ImageUploader() {
    const { setImage } = useScan()
    const [isCameraOpen, setIsCameraOpen] = React.useState(false)
    const [isDragOver, setIsDragOver] = React.useState(false)
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Filter for images?
            const file = e.dataTransfer.files[0]
            if (file.type.startsWith("image/")) {
                setImage(file)
            }
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDragLeave = () => {
        setIsDragOver(false)
    }

    return (
        <>
            <div
                className={cn(
                    "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center transition-colors dark:border-zinc-800 dark:bg-zinc-950/50",
                    isDragOver && "border-primary bg-primary/5 ring-1 ring-primary/20"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 shadow-sm dark:bg-zinc-900">
                    <HugeiconsIcon icon={ImageIcon} className="h-8 w-8" />
                </div>

                <h3 className="mb-2 text-3xl text-primary font-semibold tracking-tight">
                    Upload Plant Photo
                </h3>
                <p className="mb-8 max-w-sm text-sm text-zinc-500">
                    Drag and drop your image here, or choose an option below to get started.
                </p>

                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <Button onClick={() => fileInputRef.current?.click()} className="w-full gap-2" size="lg">
                        <HugeiconsIcon icon={Upload02Icon} />
                        Choose from Device
                    </Button>
                    <Button onClick={() => setIsCameraOpen(true)} variant="outline" className="w-full gap-2 text-primary" size="lg">
                        <HugeiconsIcon icon={Camera01Icon} />
                        Take Photo
                    </Button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>

            {isCameraOpen && (
                <CameraCapture
                    onCapture={(file) => {
                        setImage(file)
                        setIsCameraOpen(false)
                    }}
                    onCancel={() => setIsCameraOpen(false)}
                />
            )}
        </>
    )
}
