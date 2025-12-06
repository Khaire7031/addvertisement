import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

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
    latitude?: number;
    longitude?: number;
}

interface ListingsMapProps {
    listings: Listing[];
    className?: string;
}

const ListingsMap = ({ listings, className = "" }: ListingsMapProps) => {
    // Filter listings that have coordinates
    const listingsWithCoords = listings.filter(
        (listing) => listing.latitude && listing.longitude
    );

    if (listingsWithCoords.length === 0) {
        return (
            <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
                <p className="text-muted-foreground">No locations available to display</p>
            </div>
        );
    }

    // Calculate center based on listings
    const avgLat = listingsWithCoords.reduce((sum, l) => sum + (l.latitude || 0), 0) / listingsWithCoords.length;
    const avgLng = listingsWithCoords.reduce((sum, l) => sum + (l.longitude || 0), 0) / listingsWithCoords.length;

    return (
        <div className={`rounded-lg overflow-hidden border border-border ${className}`}>
            <MapContainer
                center={[avgLat, avgLng]}
                zoom={5}
                className="h-full w-full min-h-[400px]"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {listingsWithCoords.map((listing) => (
                    <Marker
                        key={listing.id}
                        position={[listing.latitude!, listing.longitude!]}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <img
                                    src={listing.image}
                                    alt={listing.title}
                                    className="w-full h-24 object-cover rounded-md mb-2"
                                />
                                <h3 className="font-semibold text-sm">{listing.title}</h3>
                                <p className="text-xs text-muted-foreground mb-1">
                                    {listing.area}, {listing.city}
                                </p>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-primary">₹{listing.rent.toLocaleString()}/mo</span>
                                    {listing.verified && (
                                        <Badge variant="secondary" className="text-xs">Verified</Badge>
                                    )}
                                </div>
                                <Link to={`/listing/${listing.id}`}>
                                    <Button size="sm" className="w-full">View Details</Button>
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default ListingsMap;
