"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import { ColorSwitcher } from "@/components/color-switcher"
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
                <div className="flex flex-col items-center justify-center py-6 gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:py-2">
                    <div className="relative h-24 w-24 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 transition-all duration-300">
                        <img src="/logo.png" alt="LeafLens" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex flex-col items-center group-data-[collapsible=icon]:hidden animate-in fade-in zoom-in duration-300">
                        <span className="text-2xl font-heading bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                            LeafLens
                        </span>
                        <span className="text-xs text-muted-foreground font-mono mt-1">
                            v0.1 Beta
                        </span>
                    </div>
                </div>
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
                    <SidebarMenuItem className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <SidebarMenuButton tooltip="Select Theme" className="flex-1">
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
                        <ColorSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
