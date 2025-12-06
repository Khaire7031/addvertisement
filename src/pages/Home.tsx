import { ArrowRight, Search, Shield, Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import ListingCard from "@/components/ListingCard";
import listingsData from "@/data/listings.json";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
    const featuredListings = listingsData.slice(0, 3);

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section
                className="relative h-[600px] flex items-center justify-center text-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="container mx-auto px-4 z-10">
                    <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Find Your Perfect PG
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
                        Discover verified, safe, and affordable PG accommodations across India.
                        Trusted by thousands of students and professionals.
                    </p>
                    <NavLink to="/listings">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            Browse All PGs
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </NavLink>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-secondary">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <Shield className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Verified Listings</h3>
                            <p className="text-muted-foreground">
                                All PGs are verified for safety and authenticity by our team
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
                                <MapPin className="h-8 w-8 text-accent" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Prime Locations</h3>
                            <p className="text-muted-foreground">
                                PGs near IT hubs, colleges, and major transit points
                            </p>
                        </div>
                        <div className="text-center p-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                                <Star className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold mb-2">Trusted Platform</h3>
                            <p className="text-muted-foreground">
                                Thousands of happy residents across India trust us
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Listings */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Featured PGs</h2>
                        <p className="text-muted-foreground text-lg">
                            Handpicked accommodations from across major cities
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {featuredListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>

                    <div className="text-center">
                        <NavLink to="/listings">
                            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                View All PGs
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                        Own a PG? List it with us!
                    </h2>
                    <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                        Reach thousands of students and professionals looking for accommodation.
                        List your PG today and get verified quickly.
                    </p>
                    <NavLink to="/list-your-pg">
                        <Button size="lg" variant="secondary" className="font-semibold text-lg px-8">
                            List Your PG Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </NavLink>
                </div>
            </section>
        </div>
    );
};

export default Home;