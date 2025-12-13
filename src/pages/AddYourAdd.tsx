import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@mantine/core";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Home } from "lucide-react";
import LocationPicker from "@/components/LocationPicker";
import PGImageUploader from '../components/PGImageUploader';
import AmenitiesSelector from '@/components/AmenitiesSelector';
import { sendToGoogleSheet } from "@/utility/sendToGoogleSheet";

const categories = ["PG", "1RK", "1BHK", "2BHK", "3BHK", "Apartment"];
const roomTypes = ["single", "double", "triple"];
const occupancyTypes = ["boys", "girls", "unisex"];
const amenitiesList = ["wifi", "meals", "laundry", "ac", "furnished", "gym", "security", "parking"];

interface FormData {
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
    amenities: string[];
    lightBillIncluded: "included" | "not_included";
    images: string[];
    acceptTerms: boolean;
    latitude: number | null;
    longitude: number | null;
    imagesIds: string;
}
const AddYourAdd = () => {

    const [formData, setFormData] = useState<FormData>({
        pgName: "",
        ownerName: "",
        contactPerson: "",
        mobile: "",
        whatsapp: "",
        email: "",
        address: "",
        category: "",
        numberOfRooms: "",
        deposit: "",
        rentPerPerson: "",
        roomType: "",
        occupancy: "",
        description: "",
        amenities: [] as string[],
        lightBillIncluded: "not_included" as "included" | "not_included",
        images: [] as string[],
        acceptTerms: false,
        latitude: null as number | null,
        longitude: null as number | null,
        imagesIds: ""
    });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form imagesIds:", formData.imagesIds);
        if (!formData.acceptTerms) {
            toast.error("Please accept the terms and conditions");
            return;
        }

        console.log("Form submitted:", formData);
        toast.success("Your PG listing has been submitted successfully! We'll verify and list it soon.");

        const data = await sendToGoogleSheet(formData);

        if (data != null) {
            toast.success("Form data sent to Database!");
        }

        // Reset form
        setFormData({
            pgName: "",
            ownerName: "",
            contactPerson: "",
            mobile: "",
            whatsapp: "",
            email: "",
            address: "",
            category: "",
            numberOfRooms: "",
            deposit: "",
            rentPerPerson: "",
            roomType: "",
            occupancy: "",
            description: "",
            amenities: [],
            lightBillIncluded: "not_included",
            images: [],
            acceptTerms: false,
            latitude: null,
            longitude: null,
            imagesIds: ""
        });
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                        <Home className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">Post Your Advertisement</h1>
                    <p className="text-muted-foreground">
                        Reach thousands of potential tenants. Fill in the details below to get started.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-heading">Create Post</CardTitle>
                        <CardDescription>Provide accurate information to help people find your property</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Basic Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="contactPerson">Contact Person Name *</Label>
                                        <Input
                                            id="contactPerson"
                                            required
                                            value={formData.contactPerson}
                                            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                                        <Input
                                            id="whatsapp"
                                            required
                                            value={formData.whatsapp}
                                            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                            placeholder="9876543210"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="pgName">Name *</Label>
                                        <Input
                                            id="pgName"
                                            required
                                            value={formData.pgName}
                                            onChange={(e) => setFormData({ ...formData, pgName: e.target.value })}
                                            placeholder="Sunshine PG / Hostel / Laxmi Apartments"
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Contact Information</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="category">Category *</Label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger id="category">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="deposit">Deposit *</Label>
                                        <Input
                                            id="deposit"
                                            type="number"
                                            required
                                            value={formData.deposit}
                                            onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                                            placeholder="5000"
                                            min="1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="numberOfRooms">Number of Rooms *</Label>
                                        <Input
                                            id="numberOfRooms"
                                            type="number"
                                            required
                                            value={formData.numberOfRooms}
                                            onChange={(e) => setFormData({ ...formData, numberOfRooms: e.target.value })}
                                            placeholder="3"
                                            min="1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Property Details */}
                            <div className="space-y-4">
                                <h3 className="font-heading font-semibold text-lg">Property Details</h3>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                    <div>
                                        <Label htmlFor="rentPerPerson">Rent per Person (₹) *</Label>
                                        <Input
                                            id="rentPerPerson"
                                            type="number"
                                            required
                                            value={formData.rentPerPerson}
                                            onChange={(e) => setFormData({ ...formData, rentPerPerson: e.target.value })}
                                            placeholder="5000"
                                            min="4500"
                                        />
                                    </div>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                </div>

                                {/* Amenities */}
                                <div className="space-y-4">
                                    <AmenitiesSelector
                                        selectedAmenities={formData.amenities}
                                        onChange={(list) => setFormData({ ...formData, amenities: list })}
                                        lightBillIncluded={formData.lightBillIncluded as "included" | "not_included"}
                                        onLightBillChange={(val) => setFormData({ ...formData, lightBillIncluded: val })}
                                    />
                                </div>

                                <div>
                                    <div className="flex items-center mb-2">
                                        <Label htmlFor="description">Headline * </Label> <span className="text-sm text-gray-500">Copy Paste Your Description</span>
                                    </div>
                                    <Textarea
                                        id="description"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        placeholder="Describe your PG, nearby locations, facilities, rules, etc. like Sharvi Girl’s Hostel – Your Safe & Comfortable Stay in Pune!🤩 Looking for a secure, fully furnished, and hassle-free living space in Narayan Peth, Pune? 🔑✨"
                                        rows={4}
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


                                <div className="pt-4">
                                    <Label className="mb-4 block">PG Location on Map</Label>
                                    <LocationPicker
                                        latitude={formData.latitude}
                                        longitude={formData.longitude}
                                        onLocationChange={(lat, lng) => setFormData({ ...formData, latitude: lat, longitude: lng })}
                                    />
                                </div>
                            </div>


                            {/* Image Upload */}
                            {/* Image Upload */}
                            <PGImageUploader onImagesChange={(imageUrls, imageIds) => setFormData({ ...formData, images: imageUrls, imagesIds: imageIds })} />


                            {/* Terms */}
                            <div className="space-y-4">
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={formData.acceptTerms}
                                        onChange={(event) => setFormData({ ...formData, acceptTerms: event.currentTarget.checked })}
                                        color="rgba(252, 0, 0, 1)"
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

export default AddYourAdd;