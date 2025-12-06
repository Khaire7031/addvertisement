import { MapPin, IndianRupee, CheckCircle2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";

interface Listing {
    id: string;
    title: string;
    city: string;
    area: string;
    rent: number;
    roomType: string;
    occupancy: string;
    verified: boolean;
    image: string;
    amenities: string[];
}

interface ListingCardProps {
    listing: Listing;
    showFavoriteButton?: boolean;
}

const ListingCard = ({ listing, showFavoriteButton = true }: ListingCardProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();

    const roomTypeLabel = {
        single: "Single",
        double: "Double",
        triple: "Triple",
    }[listing.roomType];

    const occupancyLabel = {
        boys: "Boys Only",
        girls: "Girls Only",
        unisex: "Co-living",
    }[listing.occupancy];

    return (
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {listing.verified && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-2 py-1 rounded-md flex items-center gap-1 text-xs font-semibold">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                    </div>
                )}
                {showFavoriteButton && (
                    <div className="absolute top-3 right-3">
                        <FavoriteButton
                            isFavorite={isFavorite(listing.id)}
                            onToggle={() => toggleFavorite(listing.id)}
                            size="sm"
                        />
                    </div>
                )}
            </div>

            <CardContent className="p-4">
                <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>

                <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.area}, {listing.city}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                        {roomTypeLabel} Sharing
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {occupancyLabel}
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                    {listing.amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-muted px-2 py-1 rounded">
                            {amenity}
                        </span>
                    ))}
                    {listing.amenities.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                            +{listing.amenities.length - 3} more
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-1 text-primary font-heading font-bold text-xl">
                    <IndianRupee className="h-5 w-5" />
                    {listing.rent.toLocaleString('en-IN')}
                    <span className="text-sm text-muted-foreground font-normal">/month</span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <NavLink to={`/listing/${listing.id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        View Details
                    </Button>
                </NavLink>
            </CardFooter>
        </Card>
    );
};

export default ListingCard;
