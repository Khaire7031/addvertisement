import { useState } from "react";
import ListingCard from "@/components/ListingCard";
import SearchFilters from "@/components/SearchFilters";
import ListingsMap from "@/components/ListingsMap";
import { Button } from "@/components/ui/button";
import { LayoutGrid, Map } from "lucide-react";
import listingsData from "@/data/listings.json";

const Listings = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("All Cities");
    const [priceRange, setPriceRange] = useState<[number, number]>([5000, 15000]);
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
    const [selectedOccupancy, setSelectedOccupancy] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

    const filteredListings = listingsData.filter((listing) => {
        // Search term filter
        const matchesSearch =
            searchTerm === "" ||
            listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
            listing.city.toLowerCase().includes(searchTerm.toLowerCase());

        // City filter
        const matchesCity = selectedCity === "All Cities" || listing.city === selectedCity;

        // Price filter
        const matchesPrice = listing.rent >= priceRange[0] && listing.rent <= priceRange[1];

        // Room type filter
        const matchesRoomType =
            selectedRoomTypes.length === 0 || selectedRoomTypes.includes(listing.roomType);

        // Occupancy filter
        const matchesOccupancy =
            selectedOccupancy.length === 0 || selectedOccupancy.includes(listing.occupancy);

        // Amenities filter
        const matchesAmenities =
            selectedAmenities.length === 0 ||
            selectedAmenities.every((amenity) => listing.amenities.includes(amenity));

        return (
            matchesSearch &&
            matchesCity &&
            matchesPrice &&
            matchesRoomType &&
            matchesOccupancy &&
            matchesAmenities
        );
    });

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Find Your PG</h1>
                    <p className="text-muted-foreground">
                        Browse through {listingsData.length} verified PG accommodations
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20">
                            <SearchFilters
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedCity={selectedCity}
                                setSelectedCity={setSelectedCity}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                selectedRoomTypes={selectedRoomTypes}
                                setSelectedRoomTypes={setSelectedRoomTypes}
                                selectedOccupancy={selectedOccupancy}
                                setSelectedOccupancy={setSelectedOccupancy}
                                selectedAmenities={selectedAmenities}
                                setSelectedAmenities={setSelectedAmenities}
                            />
                        </div>
                    </div>

                    {/* Listings Grid/Map */}
                    <div className="lg:col-span-3">
                        <div className="mb-4 flex items-center justify-between">
                            <p className="text-muted-foreground">
                                Showing {filteredListings.length} {filteredListings.length === 1 ? "result" : "results"}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <LayoutGrid className="h-4 w-4 mr-1" />
                                    Grid
                                </Button>
                                <Button
                                    variant={viewMode === "map" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setViewMode("map")}
                                >
                                    <Map className="h-4 w-4 mr-1" />
                                    Map
                                </Button>
                            </div>
                        </div>

                        {viewMode === "grid" ? (
                            filteredListings.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredListings.map((listing) => (
                                        <ListingCard key={listing.id} listing={listing} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-muted-foreground text-lg mb-4">No PGs found matching your criteria</p>
                                    <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                                </div>
                            )
                        ) : (
                            <ListingsMap listings={filteredListings} className="h-[600px]" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Listings;