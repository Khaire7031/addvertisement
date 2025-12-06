import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Loader2 } from "lucide-react";
import { toast } from "sonner";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface LocationPickerProps {
    latitude: number | null;
    longitude: number | null;
    onLocationChange: (lat: number, lng: number) => void;
}

const MapClickHandler = ({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) => {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
};

const RecenterMap = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
        if (lat && lng) {
            map.setView([lat, lng], 15);
        }
    }, [lat, lng, map]);
    return null;
};

const LocationPicker = ({ latitude, longitude, onLocationChange }: LocationPickerProps) => {
    const [isLocating, setIsLocating] = useState(false);
    const defaultCenter: [number, number] = [20.5937, 78.9629]; // India center
    const position: [number, number] | null = latitude && longitude ? [latitude, longitude] : null;

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Geolocation is not supported by your browser");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude: lat, longitude: lng } = position.coords;
                onLocationChange(lat, lng);
                toast.success("Location captured successfully!");
                setIsLocating(false);
            },
            (error) => {
                console.error("Geolocation error:", error);
                toast.error("Unable to get your location. Please enable location access or pick manually on the map.");
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={getCurrentLocation}
                    disabled={isLocating}
                    className="flex items-center gap-2"
                >
                    {isLocating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Navigation className="h-4 w-4" />
                    )}
                    {isLocating ? "Getting location..." : "Use My Current Location"}
                </Button>
                <span className="text-sm text-muted-foreground">or click on the map</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        type="number"
                        step="any"
                        value={latitude ?? ""}
                        onChange={(e) => onLocationChange(parseFloat(e.target.value) || 0, longitude || 0)}
                        placeholder="12.9716"
                    />
                </div>
                <div>
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        type="number"
                        step="any"
                        value={longitude ?? ""}
                        onChange={(e) => onLocationChange(latitude || 0, parseFloat(e.target.value) || 0)}
                        placeholder="77.5946"
                    />
                </div>
            </div>

            <div className="relative h-[300px] rounded-lg overflow-hidden border border-border">
                <MapContainer
                    center={position || defaultCenter}
                    zoom={position ? 15 : 5}
                    className="h-full w-full"
                    scrollWheelZoom={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapClickHandler onLocationSelect={onLocationChange} />
                    {position && (
                        <>
                            <Marker position={position} />
                            <RecenterMap lat={position[0]} lng={position[1]} />
                        </>
                    )}
                </MapContainer>
                {!position && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/50 pointer-events-none">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-5 w-5" />
                            <span>Click on the map or use current location</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LocationPicker;
