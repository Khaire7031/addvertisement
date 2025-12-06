import { Shield, CheckCircle2, Wifi, Utensils, Shirt, Dumbbell, Lock, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
    const services = [
        {
            icon: Shield,
            title: "Verification Process",
            description: "Every PG listed on our platform goes through a rigorous verification process. We check property documents, amenities, and safety measures to ensure authenticity.",
        },
        {
            icon: CheckCircle2,
            title: "Trust & Safety",
            description: "Your safety is our priority. All owners are verified, and we maintain strict quality standards. We encourage reviews and feedback to maintain transparency.",
        },
        {
            icon: Lock,
            title: "Secure Platform",
            description: "Your personal information is protected with industry-standard security measures. We never share your contact details without your consent.",
        },
    ];

    const amenities = [
        { icon: Wifi, name: "High-Speed WiFi", description: "Reliable internet connectivity for work and study" },
        { icon: Utensils, name: "Meals", description: "Hygienic home-cooked food options" },
        { icon: Shirt, name: "Laundry", description: "Convenient laundry facilities" },
        { icon: Dumbbell, name: "Gym", description: "Fitness facilities at select locations" },
        { icon: Lock, name: "24/7 Security", description: "CCTV surveillance and security personnel" },
        { icon: Car, name: "Parking", description: "Secure vehicle parking space" },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero */}
            <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">About PG Finder</h1>
                    <p className="text-lg opacity-90 max-w-2xl mx-auto">
                        India's most trusted platform for finding verified PG accommodations.
                        Helping students and professionals find their home away from home.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-heading text-3xl font-bold mb-6">Our Mission</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            We understand the challenges students and young professionals face when relocating to new cities.
                            Finding safe, affordable, and comfortable accommodation shouldn't be stressful.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            PG Finder bridges the gap between property owners and seekers, providing a transparent,
                            verified, and user-friendly platform that makes the search process simple and trustworthy.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <h2 className="font-heading text-3xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <Card key={service.title}>
                                <CardHeader>
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                                        <service.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="font-heading">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl font-bold mb-4">Common Amenities</h2>
                        <p className="text-muted-foreground text-lg">
                            Features you can expect at our listed PG accommodations
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {amenities.map((amenity) => (
                            <div
                                key={amenity.name}
                                className="flex gap-4 p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                            >
                                <div className="flex-shrink-0">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10">
                                        <amenity.icon className="h-6 w-6 text-accent" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold mb-1">{amenity.name}</h3>
                                    <p className="text-sm text-muted-foreground">{amenity.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-heading font-bold mb-2">1000+</div>
                            <div className="text-lg opacity-90">Listed PGs</div>
                        </div>
                        <div>
                            <div className="text-4xl font-heading font-bold mb-2">50+</div>
                            <div className="text-lg opacity-90">Cities Covered</div>
                        </div>
                        <div>
                            <div className="text-4xl font-heading font-bold mb-2">10K+</div>
                            <div className="text-lg opacity-90">Happy Residents</div>
                        </div>
                        <div>
                            <div className="text-4xl font-heading font-bold mb-2">98%</div>
                            <div className="text-lg opacity-90">Satisfaction Rate</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;