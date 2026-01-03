import * as React from "react"
import { useTheme } from "next-themes"
import { useThemeColor, ThemeColor } from "@/components/theme-color-provider"
import { cn } from "@/lib/utils"
import { Check, Palette, Sun, Moon, Monitor } from "lucide-react"
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
    const { theme, setTheme } = useTheme()

    const activeThemeLabel = themeColors.find(t => t.name === themeColor)?.label || "Zinc"

    return (
        <Sheet>
            <SheetTrigger
                render={
                    <button className="flex w-full items-center gap-3 rounded-xl border border-dashed border-sidebar-border bg-sidebar-background/50 p-2 hover:bg-sidebar-accent hover:border-sidebar-accent hover:text-sidebar-accent-foreground transition-all group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:border-none group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:rounded-md">
                            <Palette className="size-4" />
                        </div>
                        <div className="flex flex-1 flex-col items-start gap-0.5 text-left group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-medium leading-none">Appearance</span>
                            <span className="text-xs text-muted-foreground">Theme: {activeThemeLabel}</span>
                        </div>
                        <div className="group-data-[collapsible=icon]:hidden">
                            <div className="size-2.5 rounded-full border border-background shadow-xs bg-primary" />
                        </div>
                    </button>
                }
            />
            <SheetContent className="w-[340px] sm:w-[380px] p-0 flex flex-col h-full bg-background border-l border-border shadow-2xl">
                <SheetHeader className="px-6 py-6 border-b border-border/50 bg-muted/20">
                    <SheetTitle className="font-heading text-lg">Appearance</SheetTitle>
                    <SheetDescription>
                        Customize the visual personality of LeafLens.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                    <div className="space-y-6">
                        {/* Theme Mode Section */}
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Theme Mode</h4>
                            <div className="grid grid-cols-3 gap-3">
                                <button
                                    onClick={() => setTheme("light")}
                                    className={cn(
                                        "flex flex-col items-center gap-2 rounded-lg border p-3 text-xs font-medium transition-all hover:bg-accent hover:border-accent-foreground/20 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        theme === "light"
                                            ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30 text-primary"
                                            : "border-border bg-transparent text-muted-foreground"
                                    )}
                                >
                                    <Sun className="size-6" />
                                    <span>Light</span>
                                </button>
                                <button
                                    onClick={() => setTheme("dark")}
                                    className={cn(
                                        "flex flex-col items-center gap-2 rounded-lg border p-3 text-xs font-medium transition-all hover:bg-accent hover:border-accent-foreground/20 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        theme === "dark"
                                            ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30 text-primary"
                                            : "border-border bg-transparent text-muted-foreground"
                                    )}
                                >
                                    <Moon className="size-6" />
                                    <span>Dark</span>
                                </button>
                                <button
                                    onClick={() => setTheme("system")}
                                    className={cn(
                                        "flex flex-col items-center gap-2 rounded-lg border p-3 text-xs font-medium transition-all hover:bg-accent hover:border-accent-foreground/20 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        theme === "system"
                                            ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30 text-primary"
                                            : "border-border bg-transparent text-muted-foreground"
                                    )}
                                >
                                    <Monitor className="size-6" />
                                    <span>System</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-semibold text-foreground">Accent Color</h4>
                                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/50">
                                    {themeColors.length} colors
                                </span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                                {themeColors.map((theme) => {
                                    const isActive = themeColor === theme.name;
                                    return (
                                        <button
                                            key={theme.name}
                                            onClick={() => setThemeColor(theme.name)}
                                            className={cn(
                                                "relative flex items-center justify-start gap-2 rounded-md border p-2 text-xs font-medium transition-all hover:bg-accent hover:border-accent-foreground/20 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                isActive
                                                    ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                                                    : "border-border bg-transparent"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "size-4 rounded-full border border-white/20 shadow-sm shrink-0",
                                                    theme.activeColor
                                                )}
                                            />
                                            <span className="truncate">{theme.label}</span>
                                            {isActive && (
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
                                                    <Check className="size-3" />
                                                </div>
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-border/50 bg-muted/20 text-center">
                    <p className="text-xs text-muted-foreground">
                        Changes are saved automatically.
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    )
}
