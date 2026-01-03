import { HistoryItem, removeFromHistory } from "@/lib/history";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2 } from "lucide-react";

interface HistoryGridProps {
    items: HistoryItem[];
    onDelete: (id: string) => void;
}

export function HistoryGrid({ items, onDelete }: HistoryGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
                <Card key={item.id} className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col bg-card/50 backdrop-blur-sm">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                        <img
                            src={item.imageBase64}
                            alt={item.result.class}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <Button
                                variant="destructive"
                                size="icon"
                                className="h-8 w-8 rounded-full shadow-md"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onDelete(item.id);
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="absolute bottom-2 left-2 z-20">
                            <Badge
                                variant="secondary"
                                className={`backdrop-blur-md shadow-sm border-0 ${item.result.confidence > 0.7
                                        ? "bg-green-500/90 text-white"
                                        : "bg-amber-500/90 text-white"
                                    }`}
                            >
                                {(item.result.confidence * 100).toFixed(0)}% Confidence
                            </Badge>
                        </div>
                    </div>

                    <CardHeader className="p-4 pb-2 space-y-1">
                        <h3 className="font-heading font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                            {item.result.class}
                        </h3>
                    </CardHeader>

                    <CardContent className="p-4 pt-1 grow">
                        {item.result.all_predictions && item.result.all_predictions.length > 0 ? (
                            <div className="space-y-1.5 mt-2">
                                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Top Matches</p>
                                {item.result.all_predictions.slice(0, 2).map((pred) => (
                                    <div key={pred.class} className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground truncate max-w-[70%]">{pred.class}</span>
                                        <span className="font-mono text-muted-foreground">{(pred.confidence * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">No detailed analysis available.</p>
                        )}
                    </CardContent>

                    <CardFooter className="p-4 pt-0 text-xs text-muted-foreground border-t border-border/30 mt-auto flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-1.5 py-2">
                            <Calendar className="h-3 w-3" />
                            <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5 py-2">
                            <Clock className="h-3 w-3" />
                            <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
