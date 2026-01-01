"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Camera01Icon, MultiplicationSignIcon, RefreshIcon } from "@hugeicons/core-free-icons"

interface CameraCaptureProps {
    onCapture: (file: File) => void
    onCancel: () => void
}

export function CameraCapture({ onCapture, onCancel }: CameraCaptureProps) {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const [stream, setStream] = React.useState<MediaStream | null>(null)
    const [error, setError] = React.useState<string | null>(null)
    const [facingMode, setFacingMode] = React.useState<"user" | "environment">("environment")

    const startCamera = React.useCallback(async () => {
        try {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop())
            }
            const newStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode },
                audio: false,
            })
            setStream(newStream)
            if (videoRef.current) {
                videoRef.current.srcObject = newStream
            }
            setError(null)
        } catch (err) {
            console.error("Error accessing camera:", err)
            setError("Could not access camera. Please check permissions.")
        }
    }, [facingMode])

    React.useEffect(() => {
        startCamera()
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop())
            }
        }
    }, [startCamera]) // stream added to dependency in next version

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext("2d")
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "camera-capture.jpg", { type: "image/jpeg" })
                        onCapture(file)
                    }
                }, "image/jpeg")
            }
        }
    }

    const switchCamera = () => {
        setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
                <div className="relative aspect-3/4 w-full bg-zinc-900">
                    {!error ? (
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center p-6 text-center text-red-400">
                            {error}
                        </div>
                    )}

                    <div className="absolute top-4 right-4">
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onCancel}>
                            <HugeiconsIcon icon={MultiplicationSignIcon} />
                        </Button>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6 pb-8">
                        <div className="flex items-center justify-between">
                            <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white"
                                onClick={switchCamera}
                            >
                                <HugeiconsIcon icon={RefreshIcon} />
                            </Button>

                            <Button
                                size="lg"
                                className="h-16 w-16 rounded-full border-4 border-white bg-transparent p-1 transition-transform active:scale-95"
                                onClick={handleCapture}
                            >
                                <span className="h-full w-full rounded-full bg-white transition-opacity hover:opacity-90" />
                            </Button>

                            <div className="w-10"></div> {/* Spacer for alignment */}
                        </div>
                    </div>
                </div>
                <canvas ref={canvasRef} className="hidden" />
            </div>
        </div>
    )
}
