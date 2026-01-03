import { History } from "lucide-react";

export function EmptyHistoryState() {
    return (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/30 transition-all duration-500" />
                <div className="relative h-24 w-24 rounded-3xl bg-card border border-border/50 shadow-xl flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300">
                    <History className="h-10 w-10 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </div>
            </div>
            <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-heading font-semibold text-foreground">No scans recorded</h3>
                <p className="text-muted-foreground leading-relaxed">
                    Your plant diagnosis history will appear here. Start by analyzing a photo of your plant.
                </p>
            </div>
        </div>
    );
}
