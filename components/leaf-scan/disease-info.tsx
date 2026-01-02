"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Globe02Icon,
    Leaf01Icon,
    Plant01Icon,
    AlertCircleIcon,
    CheckmarkCircle02Icon
} from "@hugeicons/core-free-icons"

interface DiseaseInfoProps {
    diseaseName: string
}

interface DiseaseData {
    name: string
    description: string
    symptoms: string[]
    spread: string
    control: string[]
    link: string
}

const diseaseDatabase: Record<string, DiseaseData> = {
    "Healthy": {
        name: "Healthy Plant",
        description: "Your plant appears to be healthy and thriving! There are no visible signs of pests or diseases.",
        symptoms: ["Vibrant green leaves", "No spots or holes", "Steady growth"],
        spread: "N/A",
        control: ["Continue regular watering", "Ensure proper sunlight", "Monitor for future pests"],
        link: "https://www.google.com/search?q=tips+to+keep+plants+healthy"
    },
    "Caterpillars": {
        name: "Caterpillar Infestation",
        description: "Caterpillars are the larval stage of butterflies and moths. They are voracious eaters and can quickly defoliate plants if left unchecked. They chew on leaves, stems, and sometimes fruits.",
        symptoms: [
            "Ragged holes in leaves",
            "Missing leaf edges",
            "Presence of frass (black droppings)",
            "Rolled leaves or webbing"
        ],
        spread: "Adult moths/butterflies lay eggs on the plant. Caterpillars hatch and move to adjacent leaves or plants.",
        control: [
            "Hand-pick visible caterpillars",
            "Use Bacillus thuringiensis (Bt)",
            "Encourage natural predators like birds",
            "Apply neem oil for young larvae"
        ],
        link: "https://www.google.com/search?q=caterpillar+control+on+plants"
    },
    "EggplantMosaicVirus": {
        name: "Eggplant Mosaic Virus",
        description: "A viral disease affecting eggplants and related crops. It causes distinct patterns on leaves and can stunt growth and reduce yields.",
        symptoms: [
            "Mosaic patterns of light/dark green",
            "Yellow mottling on leaves",
            "Stunted plant growth",
            "Deformed or puckered leaves"
        ],
        spread: "Transmitted primarily by beetles (like flea beetles) and sometimes by mechanical contact or infected seeds.",
        control: [
            "Remove and destroy infected plants immediately",
            "Control beetle vectors",
            "Sanitize tools regularly",
            "Use virus-free seeds"
        ],
        link: "https://www.google.com/search?q=eggplant+mosaic+virus+treatment"
    },
    "EpilachnaBeetleInfestation": {
        name: "Epilachna Beetle Infestation",
        description: "Also known as the Mexican Bean Beetle or Hadda Beetle. Both larvae and adults feed on leaves, often skeletonizing them by eating the tissue between veins.",
        symptoms: [
            "Skeletonized leaves (lace-like appearance)",
            "Yellow/spiny larvae present",
            "Dry, brown patches on leaves",
            "Reduced photosynthesis"
        ],
        spread: "Adult beetles fly to new plants to lay eggs. Larvae crawl to nearby leaves.",
        control: [
            "Hand-pick beetles and larvae",
            "Use neem oil or insecticidal soap",
            "Encourage beneficial insects",
            "Remove weeds that host the beetles"
        ],
        link: "https://www.google.com/search?q=epilachna+beetle+control"
    },
    "FungalBlight": {
        name: "Fungal Blight",
        description: "A general term for fungal infections that cause rapid browning and death of plant tissues. It thrives in humid conditions and spreads quickly.",
        symptoms: [
            "Brown or black spots on leaves/stems",
            "Rapid yellowing or wilting",
            "White fungal growth in high humidity",
            "Lesions with concentric rings"
        ],
        spread: "Spores spread via wind, water splash, or contaminated tools. High humidity accelerates spread.",
        control: [
            "Prune affected areas immediately",
            "Improve air circulation",
            "Avoid overhead watering",
            "Apply copper-based fungicides"
        ],
        link: "https://www.google.com/search?q=fungal+blight+treatment+plants"
    },
    "ThripsInfestation": {
        name: "Thrips Infestation",
        description: "Thrips are tiny, slender insects that puncture plant cells to suck out contents. They cause silvering of leaves and can transmit viruses.",
        symptoms: [
            "Silvery or bronze streaks on leaves",
            "Black specks (fecal matter) on leaves",
            "Distorted young growth",
            "Flower drop or deformation"
        ],
        spread: "They fly or are carried by wind to new plants. They multiply rapidly in warm conditions.",
        control: [
            "Use blue sticky traps",
            "Spray with insecticidal soap or neem oil",
            "Introduce predatory mites",
            "Remove heavily infested leaves"
        ],
        link: "https://www.google.com/search?q=thrips+control+on+plants"
    }
}

export function DiseaseInfo({ diseaseName }: DiseaseInfoProps) {
    // Normalize key lookup
    const key = Object.keys(diseaseDatabase).find(k => k.toLowerCase() === diseaseName.toLowerCase()) || diseaseName
    const data = diseaseDatabase[key]

    if (!data) return null

    const isHealthy = key === "Healthy"

    return (
        <Card className="mt-6 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 shadow-sm">
            <CardHeader className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${isHealthy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} dark:bg-opacity-20`}>
                        <HugeiconsIcon icon={isHealthy ? Leaf01Icon : AlertCircleIcon} strokeWidth={2} />
                    </div>
                    <div>
                        <CardTitle className="text-lg font-semibold">{data.name}</CardTitle>
                        <p className="text-xs text-zinc-500 mt-0.5">Automated Diagnosis Details</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">

                <div className="space-y-2">
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        <HugeiconsIcon icon={Plant01Icon} className="h-4 w-4 text-zinc-500" />
                        About this Condition
                    </h4>
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {data.description}
                    </p>
                </div>

                {!isHealthy && (
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Common Symptoms
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400 marker:text-zinc-300">
                                {data.symptoms.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                                Control & Treatment
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 dark:text-zinc-400 marker:text-zinc-300">
                                {data.control.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {!isHealthy && (
                    <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
                        <h4 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                            How it Spreads
                        </h4>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {data.spread}
                        </p>
                    </div>
                )}

                <div className="pt-2">
                    <Button
                        variant="outline"
                        className="w-full justify-between group"
                        onClick={() => window.open(data.link, '_blank')}
                    >
                        <span>Know more about this {isHealthy ? 'topic' : 'disease'}</span>
                        <HugeiconsIcon icon={Globe02Icon} className="h-4 w-4 text-zinc-400 group-hover:text-primary transition-colors" />
                    </Button>
                    <p className="text-[10px] text-zinc-400 text-center mt-2">
                        External link to latest resources
                    </p>
                </div>

            </CardContent>
        </Card>
    )
}
