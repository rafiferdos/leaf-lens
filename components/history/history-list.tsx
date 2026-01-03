import { HistoryItem } from "@/lib/history";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, ExternalLink } from "lucide-react";

interface HistoryListProps {
    items: HistoryItem[];
    onDelete: (id: string) => void;
}

export function HistoryList({ items, onDelete }: HistoryListProps) {
    return (
        <div className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden shadow-sm">
            <Table>
                <TableHeader className="bg-muted/30">
                    <TableRow className="hover:bg-transparent">
                        <TableHead className="w-[100px]">Image</TableHead>
                        <TableHead>Diagnosis</TableHead>
                        <TableHead>Confidence</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="hidden lg:table-cell">Details</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item.id} className="group hover:bg-muted/30 transition-colors">
                            <TableCell>
                                <div className="h-12 w-12 rounded-lg overflow-hidden border border-border/50 bg-muted">
                                    <img
                                        src={item.imageBase64}
                                        alt={item.result.class}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">
                                <span className="font-heading text-base">{item.result.class}</span>
                            </TableCell>
                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`${item.result.confidence > 0.7
                                            ? "text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800"
                                            : "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800"
                                        }`}
                                >
                                    {(item.result.confidence * 100).toFixed(0)}%
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-muted-foreground">
                                {new Date(item.timestamp).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="hidden lg:table-cell">
                                <div className="flex -space-x-2">
                                    {item.result.all_predictions?.slice(0, 3).map((p, i) => (
                                        <div key={i} className="h-2 w-full max-w-[40px] rounded-full bg-primary/20 overflow-hidden first:ml-0 border border-background">
                                            <div className="h-full bg-primary" style={{ width: `${p.confidence * 100}%` }} />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs text-muted-foreground mt-1 block">{item.result.all_predictions?.length || 0} variants</span>
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                    onClick={() => onDelete(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
