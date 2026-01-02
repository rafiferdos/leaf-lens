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
                    <button className="flex h-9 w-full items-center gap-2 rounded-lg px-2 text-sidebar-foreground border border-sidebar-border bg-sidebar-background hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0 shadow-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
                        <HugeiconsIcon icon={PaintBoardIcon} className="size-4 shrink-0" />
                        <span className="text-sm font-medium group-data-[collapsible=icon]:hidden truncate">Appearance</span>
                    </button>
                }
            />
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="font-heading">Appearance</SheetTitle>
                    <SheetDescription>
                        Customize the look and feel of the application.
                    </SheetDescription>
                </SheetHeader>
                <div className="py-6 px-6">
                    <h4 className="text-sm font-medium mb-3 text-muted-foreground">Accent Color</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {themeColors.map((theme) => {
                            const isActive = themeColor === theme.name;
                            return (
                                <button
                                    key={theme.name}
                                    onClick={() => setThemeColor(theme.name)}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg border p-2 text-left text-sm transition-all hover:bg-accent",
                                        isActive
                                            ? "border-primary bg-accent ring-1 ring-primary" // Active state
                                            : "border-transparent"
                                    )}
                                    style={isActive ? { borderColor: `var(--primary)` } : {}}
                                >
                                    <div
                                        className={cn(
                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black/10 dark:border-white/10",
                                            theme.activeColor
                                        )}
                                    >
                                        {isActive && (
                                            <HugeiconsIcon icon={Tick02Icon} className="size-3 text-white" />
                                        )}
                                    </div>
                                    <span className="font-medium">{theme.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
