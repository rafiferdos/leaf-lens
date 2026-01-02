"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
    SidebarGroup,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Home01Icon,
    InformationCircleIcon,
    Time01Icon,
    Sun01Icon,
    Moon01Icon,
    ComputerIcon,
    Leaf01Icon
} from "@hugeicons/core-free-icons"

export function AppSidebar() {
    const pathname = usePathname()
    const { setTheme } = useTheme()

    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 p-2">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-zinc-50 border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
                                <img src="/logo.png" alt="Logo" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-0.5 truncate group-data-[collapsible=icon]:hidden">
                                <span className="font-bold text-lg bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                                    LeafLens
                                </span>
                                <span className="text-[10px] bg-linear-to-r from-red-500 to-red-500 bg-clip-text text-transparent">
                                    Beta v0.1
                                </span>
                            </div>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                render={<Link href="/" />}
                                isActive={pathname === "/"}
                                tooltip="Scanner"
                            >
                                <HugeiconsIcon icon={Home01Icon} />
                                <span>Plant Scanner</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton
                                render={<Link href="/history" />}
                                isActive={pathname === "/history"}
                                tooltip="History"
                            >
                                <HugeiconsIcon icon={Time01Icon} />
                                <span>Scan History</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <SidebarMenuButton
                                render={<Link href="/about" />}
                                isActive={pathname === "/about"}
                                tooltip="About Us"
                            >
                                <HugeiconsIcon icon={InformationCircleIcon} />
                                <span>About Us</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton tooltip="Select Theme">
                                        <HugeiconsIcon icon={Sun01Icon} className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                        <HugeiconsIcon icon={Moon01Icon} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                        <span>Toggle Theme</span>
                                    </SidebarMenuButton>
                                }
                            />
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                    <HugeiconsIcon icon={Sun01Icon} className="mr-2 h-4 w-4" />
                                    Light
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                    <HugeiconsIcon icon={Moon01Icon} className="mr-2 h-4 w-4" />
                                    Dark
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setTheme("system")}>
                                    <HugeiconsIcon icon={ComputerIcon} className="mr-2 h-4 w-4" />
                                    System
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
