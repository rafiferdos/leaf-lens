"use client"

import * as React from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { HugeiconsIcon } from "@hugeicons/react"
import { QuoteUpIcon, UserCircleIcon, CodeIcon } from "@hugeicons/core-free-icons"

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-12 px-4 space-y-8">

            <div className="text-center space-y-2">
                <span className="font-arabic text-3xl font-bold text-primary block mb-6">
                    بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                </span>
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-linear-to-r from-green-600 to-teal-500 bg-clip-text text-transparent">
                    About LeafLens
                </h1>
            </div>

            <div className="grid gap-6 w-full">
                <Card className="bg-zinc-50/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800">
                    <CardContent className="pt-6 relative">
                        <HugeiconsIcon icon={QuoteUpIcon} className="absolute top-6 left-6 h-8 w-8 text-primary" />
                        <p className="text-center text-lg italic text-zinc-600 dark:text-zinc-400 relative z-10 px-8">
                            "Empowering agriculture through artificial intelligence, one leaf at a time."
                        </p>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Creator - Rafi */}
                    <Card className="relative overflow-hidden border-2 border-primary/20 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                        <CardContent className="flex flex-col items-center p-8 text-center space-y-4">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-linear-to-r from-green-400 to-emerald-500 p-1">
                                    <div className="h-full w-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center">
                                        <HugeiconsIcon icon={CodeIcon} className="h-10 w-10 text-green-600 dark:text-green-400" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                                    CREATOR
                                </div>
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                    Rafi Ferdos
                                </CardTitle>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    Daffodil International University
                                </p>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Lead Developer & Project Creator. Passionate about applying AI to solve real-world problems.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Team Member - Siam */}
                    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                        <CardContent className="flex flex-col items-center p-8 text-center space-y-4">
                            <div className="h-24 w-24 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                <HugeiconsIcon icon={UserCircleIcon} className="h-10 w-10 text-zinc-400" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                    Siam Akter Mim
                                </CardTitle>
                                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                                    Daffodil International University
                                </p>
                            </div>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Team Member & Researcher. Contributed to documentation and project analysis.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <Separator className="my-6" />

                <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    <p>Developed with ❤️ by the <span className="text-primary">LeafLens</span> Team</p>
                    <p className="mt-1 text-xs">© {new Date().getFullYear()} LeafLens Project</p>
                </div>
            </div>
        </div>
    )
}
