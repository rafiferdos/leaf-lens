"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export type ThemeColor =
    | "zinc"
    | "slate"
    | "stone"
    | "gray"
    | "neutral"
    | "red"
    | "rose"
    | "orange"
    | "green"
    | "blue"
    | "yellow"
    | "violet"
    | "amber"
    | "cyan"
    | "emerald"
    | "fuchsia"
    | "indigo"
    | "lime"
    | "pink"
    | "purple"
    | "sky"
    | "teal"

const ThemeColorContext = React.createContext<{
    themeColor: ThemeColor
    setThemeColor: (color: ThemeColor) => void
}>({
    themeColor: "zinc",
    setThemeColor: () => null,
})

export function ThemeColorProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [mounted, setMounted] = React.useState(false)
    const [themeColor, setThemeColor] = React.useState<ThemeColor>("zinc")

    React.useEffect(() => {
        setMounted(true)
    }, [])

    React.useEffect(() => {
        const savedColor = localStorage.getItem("theme-color") as ThemeColor
        if (savedColor) {
            setThemeColor(savedColor)
        }
    }, [])

    React.useEffect(() => {
        if (!mounted) return

        localStorage.setItem("theme-color", themeColor)
        const root = document.documentElement

        // Remove all existing theme classes
        const themes: ThemeColor[] = [
            "zinc", "slate", "stone", "gray", "neutral", "red", "rose", "orange", "green", "blue", "yellow", "violet", "amber", "cyan", "emerald", "fuchsia", "indigo", "lime", "pink", "purple", "sky", "teal"
        ]
        themes.forEach((t) => root.classList.remove(`theme-${t}`))

        // Add new theme class (except for zinc which is default)
        if (themeColor !== "zinc") {
            root.classList.add(`theme-${themeColor}`)
        }
    }, [themeColor, mounted])

    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeColorContext.Provider>
    )
}

export function useThemeColor() {
    return React.useContext(ThemeColorContext)
}
