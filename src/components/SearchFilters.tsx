import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchFiltersProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCity: string;
    setSelectedCity: (value: string) => void;
    priceRange: [number, number];
    setPriceRange: (value: [number, number]) => void;
    selectedRoomTypes: string[];
    setSelectedRoomTypes: (value: string[]) => void;
    selectedOccupancy: string[];
    setSelectedOccupancy: (value: string[]) => void;
    selectedAmenities: string[];
    setSelectedAmenities: (value: string[]) => void;
}

const cities = ["All Cities", "Bangalore", "Pune", "Hyderabad", "Chennai", "Delhi", "Mumbai"];
const roomTypes = ["single", "double", "triple"];
const occupancyTypes = ["boys", "girls", "unisex"];
const amenities = ["wifi", "meals", "laundry", "ac", "furnished", "gym", "security", "parking"];

const SearchFilters = ({
    searchTerm,
    setSearchTerm,
    selectedCity,
    setSelectedCity,
    priceRange,
    setPriceRange,
    selectedRoomTypes,
    setSelectedRoomTypes,
    selectedOccupancy,
    setSelectedOccupancy,
    selectedAmenities,
    setSelectedAmenities,
}: SearchFiltersProps) => {
    const handleRoomTypeChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedRoomTypes([...selectedRoomTypes, type]);
        } else {
            setSelectedRoomTypes(selectedRoomTypes.filter((t) => t !== type));
        }
    };

    const handleOccupancyChange = (type: string, checked: boolean) => {
        if (checked) {
            setSelectedOccupancy([...selectedOccupancy, type]);
        } else {
            setSelectedOccupancy(selectedOccupancy.filter((t) => t !== type));
        }
    };

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        if (checked) {
            setSelectedAmenities([...selectedAmenities, amenity]);
        } else {
            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-heading">Filter PGs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Search */}
                <div className="space-y-2">
                    <Label htmlFor="search">Search</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            id="search"
                            placeholder="Search by name, area..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                {/* City */}
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                        <SelectTrigger id="city">
                            <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                            {cities.map((city) => (
                                <SelectItem key={city} value={city}>
                                    {city}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                    <Label>Price Range: ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}</Label>
                    <Slider
                        min={5000}
                        max={15000}
                        step={500}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                        className="py-4"
                    />
                </div>

                {/* Room Type */}
                <div className="space-y-3">
                    <Label>Room Type</Label>
                    {roomTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={type}
                                checked={selectedRoomTypes.includes(type)}
                                onCheckedChange={(checked) => handleRoomTypeChange(type, checked as boolean)}
                            />
                            <label
                                htmlFor={type}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                                {type} Sharing
                            </label>
                        </div>
                    ))}
                </div>

                {/* Occupancy */}
                <div className="space-y-3">
                    <Label>Occupancy</Label>
                    {occupancyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                                id={`occupancy-${type}`}
                                checked={selectedOccupancy.includes(type)}
                                onCheckedChange={(checked) => handleOccupancyChange(type, checked as boolean)}
                            />
                            <label
                                htmlFor={`occupancy-${type}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                            >
                                {type === "unisex" ? "Co-living" : `${type} Only`}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Amenities */}
                <div className="space-y-3">
                    <Label>Amenities</Label>
                    <div className="grid grid-cols-2 gap-3">
                        {amenities.map((amenity) => (
                            <div key={amenity} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`amenity-${amenity}`}
                                    checked={selectedAmenities.includes(amenity)}
                                    onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                                />
                                <label
                                    htmlFor={`amenity-${amenity}`}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                >
                                    {amenity}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SearchFilters;