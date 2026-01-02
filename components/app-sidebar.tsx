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
    sidebarMenuButtonVariants,
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
                        <span className="text-xs text-primary font-mono mt-1">
                            v0.1 Beta
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link
                                href="/"
                                data-active={pathname === "/"}
                                className={sidebarMenuButtonVariants({
                                    variant: "default"
                                })}
                            >
                                <HugeiconsIcon icon={Home01Icon} />
                                <span>Plant Scanner</span>
                            </Link>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <Link
                                href="/history"
                                data-active={pathname === "/history"}
                                className={sidebarMenuButtonVariants({
                                    variant: "default"
                                })}
                            >
                                <HugeiconsIcon icon={Time01Icon} />
                                <span>Scan History</span>
                            </Link>
                        </SidebarMenuItem>

                        <SidebarMenuItem>
                            <Link
                                href="/about"
                                data-active={pathname === "/about"}
                                className={sidebarMenuButtonVariants({
                                    variant: "default"
                                })}
                            >
                                <HugeiconsIcon icon={InformationCircleIcon} />
                                <span>About Us</span>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <ColorSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
