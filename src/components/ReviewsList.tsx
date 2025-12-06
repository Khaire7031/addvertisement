import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Review {
    id: string;
    rating: number;
    review_text: string;
    created_at: string;
    user_id: string;
    user_name: string | null;
}

interface ReviewsListProps {
    listingId: string;
    refreshTrigger: number;
    onUserReviewFound: (review: { id: string; rating: number; review_text: string } | null) => void;
}

const ReviewsList = ({ listingId, refreshTrigger, onUserReviewFound }: ReviewsListProps) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchReviews = async () => {
        // Fetch reviews
        const { data: reviewsData, error: reviewsError } = await supabase
            .from("reviews")
            .select("id, rating, review_text, created_at, user_id")
            .eq("listing_id", listingId)
            .order("created_at", { ascending: false });

        if (reviewsError) {
            console.error("Error fetching reviews:", reviewsError);
            setLoading(false);
            return;
        }

        // Fetch profiles for all reviewers
        const userIds = [...new Set(reviewsData?.map(r => r.user_id) || [])];
        const { data: profilesData } = await supabase
            .from("profiles")
            .select("id, full_name")
            .in("id", userIds);

        const profilesMap = new Map(profilesData?.map(p => [p.id, p.full_name]) || []);

        const reviewsWithNames: Review[] = (reviewsData || []).map(r => ({
            ...r,
            user_name: profilesMap.get(r.user_id) || null,
        }));

        setReviews(reviewsWithNames);

        if (user) {
            const userReview = reviewsData?.find((r) => r.user_id === user.id);
            onUserReviewFound(userReview ? {
                id: userReview.id,
                rating: userReview.rating,
                review_text: userReview.review_text,
            } : null);
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchReviews();
    }, [listingId, refreshTrigger, user]);

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete your review?")) return;

        const { error } = await supabase.from("reviews").delete().eq("id", reviewId);

        if (error) {
            toast.error("Failed to delete review");
            return;
        }

        toast.success("Review deleted");
        fetchReviews();
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    if (loading) {
        return <div className="text-center py-4 text-muted-foreground">Loading reviews...</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="font-heading font-semibold text-lg">
                    Reviews ({reviews.length})
                </h3>
                {averageRating && (
                    <div className="flex items-center gap-2">
                        <StarRating rating={Math.round(Number(averageRating))} readonly size="sm" />
                        <span className="font-semibold">{averageRating}</span>
                    </div>
                )}
            </div>

            {reviews.length === 0 ? (
                <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                        No reviews yet. Be the first to review!
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardContent className="pt-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                        <Avatar>
                                            <AvatarFallback>
                                                {review.user_name?.charAt(0)?.toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">
                                                {review.user_name || "Anonymous User"}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <StarRating rating={review.rating} readonly size="sm" />
                                                <span className="text-xs text-muted-foreground">
                                                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {user?.id === review.user_id && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(review.id)}
                                            className="text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                                <p className="mt-3 text-muted-foreground">{review.review_text}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewsList;
