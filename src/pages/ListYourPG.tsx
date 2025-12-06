import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Home } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";

const cities = ["Bangalore", "Pune", "Hyderabad", "Chennai", "Delhi", "Mumbai"];
const roomTypes = ["single", "double", "triple"];
const occupancyTypes = ["boys", "girls", "unisex"];
const amenitiesList = ["wifi", "meals", "laundry", "ac", "furnished", "gym", "security", "parking"];

const ListYourPG = () => {
    const [formData, setFormData] = useState({
        pgName: "",
        ownerName: "",
        contactPerson: "",
        mobile: "",
        whatsapp: "",
        email: "",
        address: "",
        city: "",
        numberOfRooms: "",
        rentPerRoom: "",
        roomType: "",
        occupancy: "",
        description: "",
        amenities: [] as string[],
        acceptTerms: false,
        latitude: null as number | null,
        longitude: null as number | null,
    });

    const handleAmenityChange = (amenity: string, checked: boolean) => {
        if (checked) {
            setFormData({ ...formData, amenities: [...formData.amenities, amenity] });
        } else {
            setFormData({ ...formData, amenities: formData.amenities.filter((a) => a !== amenity) });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.acceptTerms) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        console.log("Form submitted:", formData);
        toast.success("Your PG listing has been submitted successfully! We'll verify and list it soon.");

        // Reset form
        setFormData({
            pgName: "",
            ownerName: "",
            contactPerson: "",
            mobile: "",
            whatsapp: "",
            email: "",
            address: "",
            city: "",
            numberOfRooms: "",
            rentPerRoom: "",
            roomType: "",
            occupancy: "",
            description: "",
            amenities: [],
            acceptTerms: false,
            latitude: null,
            longitude: null,
        });
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">List Your PG</h1>
                    <p className="text-muted-foreground">
                        Reach thousands of potential tenants. Fill in the details below to get started.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-heading">PG Details</CardTitle>
                        <CardDescription>Provide accurate information to help tenants find your property</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Basic Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="pgName">PG Name *</Label>
                                        <Input
                                            id="pgName"
                                            required
                                            value={formData.pgName}
                                            onChange={(e) => setFormData({ ...formData, pgName: e.target.value })}
                                            placeholder="Sunshine PG"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="ownerName">Owner Name *</Label>
                                        <Input
                                            id="ownerName"
                                            required
                                            value={formData.ownerName}
                                            onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="contactPerson">Contact Person Name *</Label>
                                    <Input
                                        id="contactPerson"
                                        required
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Contact Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="mobile">Mobile Number *</Label>
                                        <Input
                                            id="mobile"
                                            required
                                            value={formData.mobile}
                                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                                        <Input
                                            id="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="your.email@example.com"
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Location</h3>

                                <div>
                                    <Label htmlFor="address">Full Address *</Label>
                                    <Textarea
                                        id="address"
                                        required
                                        value={formData.address}
                                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                        placeholder="Street address, landmark, area"
                                        rows={3}
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="city">City *</Label>
                                    <Select value={formData.city} onValueChange={(value) => setFormData({ ...formData, city: value })}>
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

                                <div className="pt-4">
                                    <Label className="mb-4 block">PG Location on Map</Label>
                                    <LocationPicker
                                        latitude={formData.latitude}
                                        longitude={formData.longitude}
                                        onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                                    />
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Property Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="numberOfRooms">Number of Rooms *</Label>
                                        <Input
                                            id="numberOfRooms"
                                            type="number"
                                            required
                                            value={formData.numberOfRooms}
                                            onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                                            placeholder="10"
                                            min="1"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="rentPerRoom">Rent per Room (₹) *</Label>
                                        <Input
                                            id="rentPerRoom"
                                            type="number"
                                            required
                                            value={formData.rentPerRoom}
                                            onChange={(e) => setFormData({ ...formData, rentPerRoom: e.target.value })}
                                            placeholder="8500"
                                            min="1000"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="roomType">Room Type *</Label>
                                        <Select value={formData.roomType} onValueChange={(value) => setFormData({ ...formData, roomType: value })}>
                                            <SelectTrigger id="roomType">
                                                <SelectValue placeholder="Select room type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roomTypes.map((type) => (
                                                    <SelectItem key={type} value={type} className="capitalize">
                                                        {type} Sharing
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="occupancy">Occupancy Type *</Label>
                                        <Select value={formData.occupancy} onValueChange={(value) => setFormData({ ...formData, occupancy: value })}>
                                            <SelectTrigger id="occupancy">
                                                <SelectValue placeholder="Select occupancy" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {occupancyTypes.map((type) => (
                                                    <SelectItem key={type} value={type} className="capitalize">
                                                        {type === "unisex" ? "Co-living" : `${type} Only`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="description">Description *</Label>
                                    <Textarea
                                        id="description"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your PG, nearby locations, facilities, rules, etc."
                                        rows={5}
                                    />
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {amenitiesList.map((amenity) => (
                                        <div key={amenity} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`form-amenity-${amenity}`}
                                                checked={formData.amenities.includes(amenity)}
                                                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                                            />
                                            <label
                                                htmlFor={`form-amenity-${amenity}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                                            >
                                                {amenity}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.acceptTerms}
                                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        I agree to the terms and conditions and verify that all information provided is accurate *
                                    </label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                                Submit Listing
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ListYourPG;