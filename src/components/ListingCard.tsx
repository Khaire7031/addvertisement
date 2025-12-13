import { MapPin, IndianRupee, CheckCircle2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { Carousel } from '@mantine/carousel';

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

interface PostData {
    id?: string;
    pgName: string;
    ownerName: string;
    contactPerson: string;
    mobile: string;
    whatsapp: string;
    email: string;
    address: string;
    category: string;
    numberOfRooms: string;
    deposit: string;
    rentPerPerson: string;
    roomType: string;
    occupancy: string;
    description: string;
    amenities: string;
    images: string;
    googleMapLink: string;
}


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
        // console.log("Listing:", listing.id, "Images type:", typeof listing.images, "Value:", listing.images);
        if (typeof listing.images === 'string') {
            setImages(listing.images.split(","));
        } else if (Array.isArray(listing.images)) {
            setImages(listing.images);
        } else {
            setImages([]);
        }

        if (typeof listing.amenities === 'string') {
            setAmenities(listing.amenities.split(","));
        } else {
            setAmenities([]);
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
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className="relative overflow-hidden">
                {/* <img
                    src={listing.images.split(",")[0]}
                    alt={listing.pgName}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                /> */}
                <Carousel
                    withIndicators
                    height={200}
                    slideSize="100%"
                    slideGap="md"
                >
                    {/* This are the sample images util issue is fixed */}
                    <Carousel.Slide>
                        <img
                            src="https://content.jdmagicbox.com/v2/comp/bangalore/g2/080pxx80.xx80.200104135109.k2g2/catalogue/srm-pg-chamarajpet-bangalore-paying-guest-accommodations-for-men-qjfakk97b8.jpg"
                            alt={listing.pgName}
                            className="w-full h-full object-cover"
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img
                            src="https://content.jdmagicbox.com/v2/comp/delhi/e3/011pxx11.xx11.160928133111.h2e3/catalogue/vardhman-pg-karol-bagh-delhi-paying-guest-accommodations-for-women-rww7ofmbr9.jpg"
                            alt={listing.pgName}
                            className="w-full h-full object-cover"
                        />
                    </Carousel.Slide>
                    <Carousel.Slide>
                        <img
                            src="https://alexandro.in/image/pune/yourspace-vimannagar/4.jpg"
                            alt={listing.pgName}
                            className="w-full h-full object-cover"
                        />
                    </Carousel.Slide>

                    {images.slice(3).map((image) => (
                        <Carousel.Slide key={image}>
                            <img
                                src={image}
                                alt={listing.pgName}
                                className="w-full h-full object-cover"
                            />
                        </Carousel.Slide>
                    ))}
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
                <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-1">{listing.pgName}</h3>

                {/* <div className="flex items-center gap-1 text-muted-foreground text-sm mb-3">
                    <MapPin className="h-4 w-4" />
                    <span>{listing.area}, {listing.city}</span>
                </div> */}

                <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                        {roomTypeLabel} Sharing
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                        {occupancyLabel}
                    </Badge>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                    {amenities.slice(0, 3).map((amenity) => (
                        <span key={amenity} className="text-xs bg-muted px-2 py-1 rounded">
                            {amenity}
                        </span>
                    ))}
                    {amenities.length > 3 && (
                        <span className="text-xs bg-muted px-2 py-1 rounded">
                            +{amenities.length - 3} more
                        </span>
                    )}
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
