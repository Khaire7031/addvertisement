import { useParams, useNavigate } from "react-router-dom";
import { MapPin, IndianRupee, Mail, Phone, MessageSquare, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";
import listingsData from "@/data/listings.json";
import ReviewForm from "@/components/ReviewForm";
import ReviewsList from "@/components/ReviewsList";

const ListingDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const listing = listingsData.find((l) => l.id === id);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [reviewRefresh, setReviewRefresh] = useState(0);
    const [userReview, setUserReview] = useState<{ id: string; rating: number; review_text: string } | null>(null);

    if (!listing) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="font-heading text-2xl font-bold mb-4">Listing not found</h2>
                    <Button onClick={() => navigate("/listings")}>Back to Listings</Button>
                </div>
            </div>
        );
    }

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Inquiry sent successfully! The owner will contact you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hi, I'm interested in ${listing.title} in ${listing.area}, ${listing.city}. Can you provide more details?`
        );
        window.open(`https://wa.me/${listing.whatsapp.replace(/\D/g, "")}?text=${message}`, "_blank");
    };

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="container mx-auto px-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/listings")}
                    className="mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Listings
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Images */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {listing.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${listing.title} - ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>

                        {/* Details */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="font-heading text-2xl mb-2">{listing.title}</CardTitle>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>{listing.area}, {listing.city}</span>
                                        </div>
                                    </div>
                                    {listing.verified && (
                                        <Badge className="bg-primary text-primary-foreground">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Verified
                                        </Badge>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-2 text-primary font-heading font-bold text-3xl">
                                    <IndianRupee className="h-6 w-6" />
                                    {listing.rent.toLocaleString('en-IN')}
                                    <span className="text-lg text-muted-foreground font-normal">/month</span>
                                </div>

                                <div className="flex gap-4">
                                    <Badge variant="secondary" className="text-sm">
                                        {roomTypeLabel} Sharing
                                    </Badge>
                                    <Badge variant="outline" className="text-sm">
                                        {occupancyLabel}
                                    </Badge>
                                </div>

                                <div>
                                    <h3 className="font-heading font-semibold text-lg mb-3">Description</h3>
                                    <p className="text-muted-foreground leading-relaxed">{listing.description}</p>
                                </div>

                                <div>
                                    <h3 className="font-heading font-semibold text-lg mb-3">Amenities</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {listing.amenities.map((amenity) => (
                                            <div key={amenity} className="flex items-center gap-2 text-sm">
                                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                                <span className="capitalize">{amenity}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="font-heading font-semibold text-lg mb-3">Location</h3>
                                    <a
                                        href={listing.mapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center gap-2"
                                    >
                                        <MapPin className="h-4 w-4" />
                                        View on Google Maps
                                    </a>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Reviews Section */}
                        <ReviewForm
                            listingId={listing.id}
                            existingReview={userReview}
                            onReviewSubmitted={() => setReviewRefresh((r) => r + 1)}
                        />
                        <ReviewsList
                            listingId={listing.id}
                            refreshTrigger={reviewRefresh}
                            onUserReviewFound={setUserReview}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-20 space-y-6">
                            {/* Contact Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-heading">Contact Owner</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="font-semibold mb-2">{listing.owner}</p>
                                        <div className="space-y-2">
                                            <a
                                                href={`tel:${listing.contact}`}
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                                            >
                                                <Phone className="h-4 w-4" />
                                                {listing.contact}
                                            </a>
                                            <a
                                                href={`mailto:${listing.email}`}
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                                            >
                                                <Mail className="h-4 w-4" />
                                                {listing.email}
                                            </a>
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleWhatsApp}
                                        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white"
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4" />
                                        WhatsApp
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Inquiry Form */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-heading">Send Inquiry</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                id="name"
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="your.email@example.com"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone</Label>
                                            <Input
                                                id="phone"
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="message">Message</Label>
                                            <Textarea
                                                id="message"
                                                required
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us about your requirements..."
                                                rows={4}
                                            />
                                        </div>
                                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                                            Send Inquiry
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListingDetail;