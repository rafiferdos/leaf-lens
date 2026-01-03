import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Grid, List as ListIcon, Trash2, Filter } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HistoryToolbarProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    view: "grid" | "list";
    onViewChange: (view: "grid" | "list") => void;
    onClearHistory: () => void;
    hasHistory: boolean;
}

export function HistoryToolbar({
    searchQuery,
    onSearchChange,
    view,
    onViewChange,
    onClearHistory,
    hasHistory
}: HistoryToolbarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-border/40">
            {/* Search Bar */}
            <div className="relative w-full sm:max-w-md group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                <Input
                    placeholder="Search by plant name, disease, or date..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-9 h-11 bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all focus:ring-primary/20 rounded-xl"
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto sm:overflow-visible p-1 sm:p-0">
                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-lg border border-border/40">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewChange("grid")}
                        className={`h-9 w-9 p-0 rounded-md transition-all ${view === 'grid' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        aria-label="Grid view"
                    >
                        <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewChange("list")}
                        className={`h-9 w-9 p-0 rounded-lg transition-all ${view === 'list' ? 'bg-background shadow-sm text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        aria-label="List view"
                    >
                        <ListIcon className="h-4 w-4" />
                    </Button>
                </div>

                <div className="w-px h-8 bg-border/50 mx-2 hidden sm:block" />

                <AlertDialog>
                    <AlertDialogTrigger
                        render={
                            <Button
                                variant="outline"
                                className="h-11 px-4 rounded-xl border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-all gap-2"
                                disabled={!hasHistory}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="hidden sm:inline">Clear History</span>
                            </Button>
                        }
                    />
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete all history?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. All your saved plant analysis records will be permanently removed from this device.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onClearHistory}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-lg"
                            >
                                Yes, Delete All
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}
