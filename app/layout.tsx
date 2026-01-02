import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree, Kablammo } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeColorProvider } from "@/components/theme-color-provider"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "./globals.css";

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });
const kablammo = Kablammo({ subsets: ['latin'], variable: '--font-heading', weight: '400' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { ClientWrapper } from "@/components/client-wrapper"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "LeafLens",
  description: "AI Powered Plant Disease Detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kablammo.variable} antialiased`}
      >
        <ClientWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeColorProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
                    <SidebarTrigger className="-ml-1" />
                    <div className="flex items-center gap-2 font-semibold">
                      <span className="text-lg bg-linear-to-r from-green-500 to-teal-500 bg-clip-text text-transparent font-heading">
                        LeafLens
                      </span>
                    </div>
                  </header>
                  <main className="flex flex-1 flex-col gap-4 p-4 lg:p-6 overflow-x-hidden">
                    {children}
                  </main>
                  <Toaster />
                </SidebarInset>
              </SidebarProvider>
            </ThemeColorProvider>
          </ThemeProvider>
        </ClientWrapper>
      </body>
    </html>
  );
}
