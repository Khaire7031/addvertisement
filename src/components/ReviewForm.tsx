import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
  listingId: string;
  existingReview?: {
    id: string;
    rating: number;
    review_text: string;
  } | null;
  onReviewSubmitted: () => void;
}

const ReviewForm = ({ listingId, existingReview, onReviewSubmitted }: ReviewFormProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [reviewText, setReviewText] = useState(existingReview?.review_text || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to leave a review");
      navigate("/auth");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error("Please write at least 10 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      if (existingReview) {
        const { error } = await supabase
          .from("reviews")
          .update({ rating, review_text: reviewText.trim() })
          .eq("id", existingReview.id);

        if (error) throw error;
        toast.success("Review updated successfully!");
      } else {
        const { error } = await supabase
          .from("reviews")
          .insert({
            listing_id: listingId,
            user_id: user.id,
            rating,
            review_text: reviewText.trim(),
          });

        if (error) throw error;
        toast.success("Review submitted successfully!");
      }

      onReviewSubmitted();
      if (!existingReview) {
        setRating(0);
        setReviewText("");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="py-6 text-center">
          <p className="text-muted-foreground mb-4">Sign in to leave a review</p>
          <Button onClick={() => navigate("/auth")}>Sign In</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-lg">
          {existingReview ? "Update Your Review" : "Write a Review"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Your Rating</label>
            <StarRating rating={rating} onRatingChange={setRating} size="lg" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience staying at this PG..."
              rows={4}
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {reviewText.length}/1000 characters
            </p>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : existingReview ? "Update Review" : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
