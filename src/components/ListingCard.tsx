import { MapPin, IndianRupee, CheckCircle2, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { Carousel } from '@mantine/carousel';
import { Group } from "@mantine/core";
import { PostData } from "@/dto/PG";

interface ListingCardProps {
    listing: PostData;
    showFavoriteButton?: boolean;
}

const ListingCard = ({ listing, showFavoriteButton = true }: ListingCardProps) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const [verified, setVerified] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [amenities, setAmenities] = useState<string[]>([]);

    useEffect(() => {
        if (typeof listing.images === 'string') {
            setImages(listing.images.split(","));
        } else if (Array.isArray(listing.images)) {
            setImages(listing.images);
        } else {
            setImages([]);
        }
    }, [listing]);

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
        <Card className="lg:w-[330px] overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden">
                <Carousel
                    withIndicators
                    height={200}
                    slideSize="100%"
                    slideGap="md"
                >
                    {
                        images.length > 0 ?
                            images.slice(0, 7).map((image, index) => (
                                <Carousel.Slide key={index}>
                                    <img
                                        src={image}
                                        alt={listing.pgName}
                                        className="w-full h-full object-cover"
                                    />
                                </Carousel.Slide>
                            ))
                            : 1
                    }
                </Carousel>

                {verified && (
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
                <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2">{listing.pgName}</h3>

                <div className="flex items-center capitalize gap-1 text-muted-foreground text-sm mb-3">
                    <User className="h-4 w-4" />
                    <span>{listing.category}</span>
                    <Badge variant="secondary" className="text-xs">
                        {roomTypeLabel} Sharing
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {occupancyLabel}
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                    {amenities.slice(5).map((amenity) => (
                        <span key={amenity} className="text-xs bg-muted px-2 py-1 rounded">
                            {amenity}
                        </span>
                    ))}
                    <Group gap="xs">
                        {listing.amenities.slice(0, 5).map((amenity, index) => (
                            <Badge key={index} color="blue">
                                {amenity}
                            </Badge>
                        ))}
                        more...
                    </Group>
                </div>

                <div className="flex items-center gap-1 text-primary font-heading font-bold text-xl">
                    <IndianRupee className="h-5 w-5" />
                    {Number(listing.rentPerPerson).toLocaleString('en-IN')}
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
