import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LucideIcon } from "lucide-react";

interface FilterSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    icon: LucideIcon;
    options: { value: string; label: string; icon?: string }[];
    placeholder: string;
}

export function FilterSelect({ value, onValueChange, icon: Icon, options, placeholder }: FilterSelectProps) {
    return (
        <Select
            value={value}
            onValueChange={(val) => {
                if (val) onValueChange(val);
            }}
        >
            <SelectTrigger className="w-full bg-background/50 hover:bg-background/80 transition-colors border-border/50 shadow-sm h-11">
                <div className="flex items-center gap-2.5">
                    <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10 text-primary">
                        <Icon className="h-3.5 w-3.5" />
                    </div>
                    {/* SelectValue renders the selected value. We don't need a placeholder prop here as all filters have defaults. */}
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                        <div className="flex items-center gap-2">
                            {option.icon && <span className="text-base">{option.icon}</span>}
                            <span>{option.label}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
