"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Quote, Code2, Leaf, Sparkles, GraduationCap, Github, Linkedin, Mail } from "lucide-react"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background/50">
            {/* Background elements */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-500/5 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="container max-w-5xl mx-auto px-6 py-20 space-y-20">

                {/* Header Section */}
                <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="font-arabic text-2xl md:text-3xl text-primary/80 block select-none">
                        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </span>
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-heading font-bold tracking-tight bg-linear-to-r from-green-600 via-teal-500 to-green-600 bg-clip-text text-transparent pb-2">
                            About LeafLens
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Empowering agriculture through artificial intelligence, one leaf at a time.
                        </p>
                    </div>
                </div>

                {/* Mission Card */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <Card className="bg-card/40 backdrop-blur-md border-primary/10 overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                        <CardContent className="p-8 md:p-12 relative">
                            <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10 -scale-x-100" />
                            <div className="relative z-10 text-center space-y-4 max-w-3xl mx-auto">
                                <p className="text-lg md:text-xl font-medium text-foreground/80 leading-loose">
                                    "Our mission is to bridge the gap between traditional farming and modern technology.
                                    By providing instant, accurate plant disease diagnosis, we help farmers and gardening enthusiasts
                                    save their crops and ensure a greener future."
                                </p>
                            </div>
                            <Quote className="absolute bottom-8 right-8 h-12 w-12 text-primary/10" />
                        </CardContent>
                    </Card>
                </div>

                {/* Team Section */}
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    <div className="text-center space-y-2">
                        <Badge variant="outline" className="px-4 py-1 rounded-full text-primary border-primary/20 bg-primary/5">
                            The Minds Behind
                        </Badge>
                        <h2 className="text-3xl font-heading font-bold">Meet the Team</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Creator Card */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-green-500 to-teal-500 rounded-3xl opacity-30 group-hover:opacity-70 blur transition duration-500" />
                            <Card className="relative h-full bg-card border-border/50 overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="h-32 bg-linear-to-r from-green-600/10 to-teal-600/10 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                    </div>
                                    <div className="px-8 pb-8 -mt-16 flex-1 flex flex-col items-center text-center">
                                        <div className="relative h-32 w-32 rounded-full p-1 bg-background ring-4 ring-background shadow-xl mb-6">
                                            <img src="/rafi.jpg" alt="Rafi Ferdos" className="h-full w-full rounded-full object-cover" />
                                            <div className="absolute bottom-2 right-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ring-2 ring-background">
                                                LEAD
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-1">Rafi Ferdos</h3>
                                        <div className="flex items-center gap-2 text-primary font-medium text-sm mb-4">
                                            <GraduationCap className="h-4 w-4" />
                                            Daffodil International University
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                                            Lead Developer & Project Creator. Full-stack engineer passionate about applying computer vision and AI to solve real-world agricultural problems.
                                        </p>

                                        <div className="flex gap-3">
                                            <ButtonIcon icon={Github} />
                                            <ButtonIcon icon={Linkedin} />
                                            <ButtonIcon icon={Mail} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Member Card */}
                        <div className="group relative">
                            <div className="absolute -inset-0.5 bg-linear-to-r from-zinc-500 to-zinc-400 rounded-3xl opacity-20 group-hover:opacity-50 blur transition duration-500" />
                            <Card className="relative h-full bg-card border-border/50 overflow-hidden rounded-2xl transition-transform duration-500 hover:-translate-y-1">
                                <CardContent className="p-0 flex flex-col h-full">
                                    <div className="h-32 bg-linear-to-r from-zinc-500/5 to-zinc-500/10 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                                    </div>
                                    <div className="px-8 pb-8 -mt-16 flex-1 flex flex-col items-center text-center">
                                        <div className="relative h-32 w-32 rounded-full p-1 bg-background ring-4 ring-background shadow-xl mb-6">
                                            <img src="/mim.jpg" alt="Siam Akter Mim" className="h-full w-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                        </div>

                                        <h3 className="text-2xl font-bold mb-1">Siam Akter Mim</h3>
                                        <div className="flex items-center gap-2 text-primary font-medium text-sm mb-4">
                                            <GraduationCap className="h-4 w-4" />
                                            Daffodil International University
                                        </div>

                                        <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                                            Team Member & Researcher. Contributed significantly to dataset curation, documentation, and project analysis.
                                        </p>

                                        <div className="flex gap-3 opactiy-80">
                                            {/* Placeholders for social links if needed, or remove */}
                                            <div className="h-8 w-8" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div className="text-center md:text-left flex items-center gap-4">
                        <div className="h-px flex-1 bg-border/50" />
                        <span className="text-muted-foreground text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
                            <Code2 className="h-4 w-4" /> Built With
                        </span>
                        <div className="h-px flex-1 bg-border/50" />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        {["Next.js 15", "React Native", "Expo", "Python FastAPI", "TensorFlow", "Tailwind CSS", "ShadCN UI", "PostgreSQL"].map((tech) => (
                            <Badge
                                key={tech}
                                variant="secondary"
                                className="px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary border-none transition-colors cursor-default"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                <div className="text-center pt-10 pb-6 animate-in fade-in duration-700 delay-500">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} LeafLens Project. Open Source for Education.
                    </p>
                </div>
            </div>
        </div>
    )
}

function ButtonIcon({ icon: Icon }: { icon: any }) {
    return (
        <button className="p-2 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-colors">
            <Icon className="h-4 w-4" />
        </button>
    )
}
