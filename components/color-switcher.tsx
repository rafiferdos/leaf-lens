"use client"

import * as React from "react"
import { useThemeColor, ThemeColor } from "@/components/theme-color-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip"
import { Tick02Icon, PaintBoardIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const themeColors: { name: ThemeColor; label: string; activeColor: string }[] = [
    { name: "zinc", label: "Zinc", activeColor: "bg-zinc-900" },
    { name: "slate", label: "Slate", activeColor: "bg-slate-900" },
    { name: "stone", label: "Stone", activeColor: "bg-stone-900" },
    { name: "red", label: "Red", activeColor: "bg-red-600" },
    { name: "rose", label: "Rose", activeColor: "bg-rose-600" },
    { name: "orange", label: "Orange", activeColor: "bg-orange-600" },
    { name: "amber", label: "Amber", activeColor: "bg-amber-600" },
    { name: "yellow", label: "Yellow", activeColor: "bg-yellow-600" },
    { name: "lime", label: "Lime", activeColor: "bg-lime-600" },
    { name: "green", label: "Green", activeColor: "bg-green-600" },
    { name: "emerald", label: "Emerald", activeColor: "bg-emerald-600" },
    { name: "teal", label: "Teal", activeColor: "bg-teal-600" },
    { name: "cyan", label: "Cyan", activeColor: "bg-cyan-600" },
    { name: "sky", label: "Sky", activeColor: "bg-sky-600" },
    { name: "blue", label: "Blue", activeColor: "bg-blue-600" },
    { name: "indigo", label: "Indigo", activeColor: "bg-indigo-600" },
    { name: "violet", label: "Violet", activeColor: "bg-violet-600" },
    { name: "purple", label: "Purple", activeColor: "bg-purple-600" },
    { name: "fuchsia", label: "Fuchsia", activeColor: "bg-fuchsia-600" },
    { name: "pink", label: "Pink", activeColor: "bg-pink-600" },
]

export function ColorSwitcher() {
    const { themeColor, setThemeColor } = useThemeColor()

    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                        <HugeiconsIcon icon={PaintBoardIcon} className="h-4 w-4" />
                        <span className="sr-only">Customize Color</span>
                    </Button>
                }
            />
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Customize Look</SheetTitle>
                    <SheetDescription>
                        Choose a primary color for the application.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-2 py-6">
                    {themeColors.map((theme) => (
                        <TooltipProvider key={theme.name}>
                            <Tooltip>
                                <TooltipTrigger
                                    render={
                                        <button
                                            onClick={() => setThemeColor(theme.name)}
                                            className={cn(
                                                "flex items-center justify-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground transition-all",
                                                themeColor === theme.name && "border-primary"
                                            )}
                                        >
                                            <div className={cn("h-6 w-6 rounded-full", theme.activeColor)} />
                                            <span className="sr-only">{theme.label}</span>
                                            {themeColor === theme.name && (
                                                <HugeiconsIcon icon={Tick02Icon} className="ml-2 h-4 w-4 text-primary" />
                                            )}
                                        </button>
                                    }
                                />
                                <TooltipContent>
                                    {theme.label}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
