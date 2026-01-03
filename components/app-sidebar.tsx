"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ColorSwitcher } from "@/components/color-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarRail,
    SidebarGroup,
    sidebarMenuButtonVariants,
} from "@/components/ui/sidebar"
import { Sprout, History, Newspaper, Info, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

export function AppSidebar() {
    const pathname = usePathname()

    const navItems = [
        { href: "/", label: "Plant Scanner", icon: Sprout },
        { href: "/history", label: "Scan History", icon: History },
        { href: "/news", label: "News", icon: Newspaper },
        { href: "/about", label: "About Us", icon: Info },
    ]

    return (
        <Sidebar variant="floating" collapsible="icon" className="border-r-0 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
            <SidebarHeader>
                <div className="flex flex-col items-center justify-center py-6 gap-3 group-data-[collapsible=icon]:gap-0 group-data-[collapsible=icon]:py-2">
                    <div className="relative h-24 w-24 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 transition-all duration-300 drop-shadow-lg filter">
                        <img src="/logo.png" alt="LeafLens" className="h-full w-full object-contain" />
                    </div>
                    <div className="flex flex-col items-center group-data-[collapsible=icon]:hidden animate-in fade-in zoom-in duration-300">
                        <span className="text-2xl font-heading bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent filter drop-shadow-sm">
                            LeafLens
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mt-1">
                            v0.1 Beta
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-3">
                    <SidebarMenu className="gap-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <SidebarMenuItem key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            sidebarMenuButtonVariants({ variant: "default" }),
                                            "group relative overflow-hidden transition-all duration-300 ease-out py-3",
                                            isActive
                                                ? "bg-primary/10 text-primary font-medium hover:bg-primary/15 hover:text-primary"
                                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                                        )}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full animate-in fade-in zoom-in duration-300" />
                                        )}
                                        <item.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive && "text-primary")} />
                                        <span className={cn("text-sm transition-all duration-300", isActive && "translate-x-1")}>
                                            {item.label}
                                        </span>
                                    </Link>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-1 shadow-sm">
                            <ColorSwitcher />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
