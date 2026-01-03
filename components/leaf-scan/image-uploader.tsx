"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useScan } from "./scan-context"
import { CameraCapture } from "./camera-capture"
import { Image as ImageIcon, Camera, Upload, CloudUpload } from "lucide-react"
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
                    "relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border/60 bg-card/30 backdrop-blur-sm p-12 text-center transition-all duration-500 ease-out group dark:bg-card/10 overflow-hidden",
                    isDragOver
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10 scale-[1.02]"
                        : "hover:border-primary/50 hover:bg-card/50"
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {/* Decorative background gradients */}
                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className={cn(
                    "mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-background/80 shadow-xl ring-1 ring-border/50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                    isDragOver && "animate-bounce"
                )}>
                    <CloudUpload className="h-10 w-10 text-primary" />
                </div>

                <h3 className="mb-3 text-3xl font-heading font-semibold tracking-tight text-foreground">
                    Upload Plant Photo
                </h3>
                <p className="mb-10 max-w-md text-base text-muted-foreground leading-relaxed">
                    Drag and drop your image here to analyze it instantly, or choose a method below.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                    <Button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 h-14 rounded-2xl text-base shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
                        size="lg"
                    >
                        <Upload className="mr-2 h-5 w-5" />
                        Choose File
                    </Button>
                    <Button
                        onClick={() => setIsCameraOpen(true)}
                        variant="secondary"
                        className="flex-1 h-14 rounded-2xl text-base border-border/50 backdrop-blur-sm bg-background/50 hover:bg-background/80 shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                        size="lg"
                    >
                        <Camera className="mr-2 h-5 w-5 text-primary" />
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
