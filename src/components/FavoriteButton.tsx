import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
    isFavorite: boolean;
    onToggle: () => void;
    className?: string;
    size?: "sm" | "default";
}

const FavoriteButton = ({ isFavorite, onToggle, className, size = "default" }: FavoriteButtonProps) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggle();
            }}
            className={cn(
                "rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-all",
                size === "sm" ? "h-8 w-8" : "h-10 w-10",
                className
            )}
        >
            <Heart
                className={cn(
                    "transition-colors",
                    size === "sm" ? "h-4 w-4" : "h-5 w-5",
                    isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
                )}
            />
        </Button>
    );
};

export default FavoriteButton;
