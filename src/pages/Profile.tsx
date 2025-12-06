import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart, User, LogOut, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ListingCard from "@/components/ListingCard";
import listings from "@/data/listings.json";

const Profile = () => {
    const { user, loading: authLoading, signOut } = useAuth();
    const { favorites, loading: favoritesLoading } = useFavorites();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/auth');
        }
    }, [user, authLoading, navigate]);

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!user) return null;

    const favoriteListings = listings.filter(listing =>
        favorites.includes(listing.id)
    );

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-muted/30 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Profile Header */}
                <Card className="mb-8">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h1 className="font-heading text-2xl font-bold">
                                        {user.user_metadata?.full_name || 'User'}
                                    </h1>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Mail className="h-4 w-4" />
                                        <span className="text-sm">{user.email}</span>
                                    </div>
                                </div>
                            </div>
                            <Button variant="outline" onClick={handleSignOut} className="gap-2">
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Wishlist Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-heading">
                            <Heart className="h-5 w-5 text-red-500" />
                            My Wishlist
                            <span className="text-muted-foreground font-normal text-base">
                                ({favoriteListings.length} saved)
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="p-6">
                        {favoritesLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : favoriteListings.length === 0 ? (
                            <div className="text-center py-12">
                                <Heart className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                                <h3 className="font-heading text-lg font-semibold mb-2">No saved PGs yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start exploring and save PGs you're interested in!
                                </p>
                                <Button onClick={() => navigate('/listings')}>
                                    Browse Listings
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favoriteListings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} showFavoriteButton />
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
