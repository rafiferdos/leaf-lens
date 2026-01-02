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
    const [themeColor, setThemeColor] = React.useState<ThemeColor>("zinc")

    React.useEffect(() => {
        const savedColor = localStorage.getItem("theme-color") as ThemeColor
        if (savedColor) {
            setThemeColor(savedColor)
        }
    }, [])

    React.useEffect(() => {
        localStorage.setItem("theme-color", themeColor)
        const body = document.body
        // Remove all existing theme classes
        const themes: ThemeColor[] = [
            "zinc", "slate", "stone", "gray", "neutral", "red", "rose", "orange", "green", "blue", "yellow", "violet", "amber", "cyan", "emerald", "fuchsia", "indigo", "lime", "pink", "purple", "sky", "teal"
        ]
        themes.forEach((t) => body.classList.remove(`theme-${t}`))

        // Add new theme class (except for zinc which is default)
        if (themeColor !== "zinc") {
            body.classList.add(`theme-${themeColor}`)
        }
    }, [themeColor])

    return (
        <ThemeColorContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeColorContext.Provider>
    )
}

export function useThemeColor() {
    return React.useContext(ThemeColorContext)
}
