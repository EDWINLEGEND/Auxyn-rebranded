"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  X, 
  Star, 
  Send,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Loader2
} from "lucide-react";
import { ratingAPI, authAPI, handleApiError, type StartupRating, type RatingsResponse } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface Review {
  id: number;
  investorName: string;
  investorTitle: string;
  rating: number;
  review: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface StartupRatingModalProps {
  startup: any;
  isOpen: boolean;
  onClose: () => void;
  onSubmitRating?: (rating: number, review: string) => void;
  defaultTab?: "rate" | "reviews";
}

export const StartupRatingModal: React.FC<StartupRatingModalProps> = ({
  startup,
  isOpen,
  onClose,
  onSubmitRating,
  defaultTab = "rate"
}) => {
  const [activeTab, setActiveTab] = useState<"rate" | "reviews">(defaultTab);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<StartupRating[]>([]);
  const [ratingsData, setRatingsData] = useState<RatingsResponse | null>(null);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      loadCurrentUser();
      if (startup?.id) {
        loadReviews();
      }
    }
  }, [isOpen, defaultTab, startup?.id]);

  const loadCurrentUser = () => {
    const user = authAPI.getCurrentUser();
    setCurrentUser(user);
  };

  const loadReviews = async () => {
    if (!startup?.id) return;
    
    try {
      setLoadingReviews(true);
      const data = await ratingAPI.getStartupRatings(startup.id);
      setRatingsData(data);
      setReviews(data.ratings);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  };



  if (!isOpen || !startup) return null;

  const handleSubmit = async () => {
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to rate startups.",
        variant: "destructive",
      });
      return;
    }

    if (currentUser.user_type !== 'investor') {
      toast({
        title: "Investor Only",
        description: "Only investors can rate startups.",
        variant: "destructive",
      });
      return;
    }

    if (rating === 0 || !review.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a rating and review.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await ratingAPI.rateStartup(startup.id, rating, review);
      
      // Call optional callback
      if (onSubmitRating) {
        onSubmitRating(rating, review);
      }

      toast({
        title: "Rating Submitted",
        description: "Thank you for your review!",
      });

      // Reset form
      setRating(0);
      setReview("");
      
      // Reload reviews to show the new one
      await loadReviews();
      
      // Switch to reviews tab to show the submitted review
      setActiveTab("reviews");
      
    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (currentRating: number, interactive = false, size = "h-6 w-6") => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoverRating || rating) : currentRating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => setRating(star) : undefined}
            onMouseEnter={interactive ? () => setHoverRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoverRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  const renderRatingTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Rate {startup.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Share your investment perspective to help other investors
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-base font-medium">Your Rating</Label>
          <div className="flex items-center gap-4 mt-2">
            {renderStars(rating, true)}
            <span className="text-sm text-gray-600">
              {rating > 0 && (
                rating === 1 ? "Poor" :
                rating === 2 ? "Fair" :
                rating === 3 ? "Good" :
                rating === 4 ? "Very Good" : "Excellent"
              )}
            </span>
          </div>
        </div>

        {currentUser && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Submitting as: <span className="font-medium">{currentUser.email}</span>
            </p>
          </div>
        )}

        <div>
          <Label htmlFor="review">Your Review</Label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts about this startup's potential, team, market opportunity, etc."
            className="mt-1 w-full min-h-[120px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 resize-none"
            maxLength={500}
          />
          <p className="text-sm text-gray-500 mt-1">{review.length}/500 characters</p>
        </div>

        <Button 
          onClick={handleSubmit}
          disabled={rating === 0 || !review.trim() || loading || !currentUser}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Rating & Review
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Investor Reviews</h3>
        <div className="flex items-center justify-center gap-4 mb-6">
          {renderStars(ratingsData?.average_rating || startup.rating, false, "h-5 w-5")}
          <span className="text-lg font-medium">{(ratingsData?.average_rating || startup.rating).toFixed(1)}</span>
          <span className="text-gray-600">({ratingsData?.total_ratings || startup.totalRatings || 0} reviews)</span>
        </div>
      </div>

      {loadingReviews ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Loading reviews...</span>
        </div>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {reviews.length > 0 ? reviews.map((reviewItem) => (
            <Card key={reviewItem.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">User #{reviewItem.user_id}</span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Investor
                    </span>
                    <span className="text-sm text-gray-500">
                      • {reviewItem.created_at ? new Date(reviewItem.created_at).toLocaleDateString() : 'Recently'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(reviewItem.rating, false, "h-4 w-4")}
                  </div>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{reviewItem.review_text}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-green-600">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-600">
                      <ThumbsDown className="h-4 w-4" />
                    </button>
                    <button className="flex items-center gap-1 hover:text-blue-600">
                      <MessageCircle className="h-4 w-4" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No reviews yet. Be the first to review this startup!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-white dark:bg-gray-800 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Rate & Review</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="rate">Rate Startup</TabsTrigger>
              <TabsTrigger value="reviews">View Reviews ({ratingsData?.total_ratings || 0})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="rate" className="mt-6">
              {renderRatingTab()}
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              {renderReviewsTab()}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}; 