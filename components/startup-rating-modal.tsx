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
  MessageCircle
} from "lucide-react";

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
  onSubmitRating: (rating: number, review: string) => void;
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
  const [investorName, setInvestorName] = useState("");
  const [investorTitle, setInvestorTitle] = useState("");

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  // Mock reviews data - in a real app, this would come from a database
  const mockReviews: Review[] = [
    {
      id: 1,
      investorName: "Sarah Johnson",
      investorTitle: "Partner at TechVentures",
      rating: 5,
      review: "Exceptional team with a clear vision. Their AI technology is revolutionary and the market potential is enormous. The founders are experienced and have a solid execution track record.",
      date: "2 days ago",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      investorName: "Michael Chen",
      investorTitle: "Angel Investor",
      rating: 4,
      review: "Strong product-market fit and impressive early traction. The revenue growth is outstanding, though I'd like to see more focus on customer retention metrics.",
      date: "1 week ago",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      investorName: "Emily Rodriguez",
      investorTitle: "Managing Director, Growth Capital",
      rating: 5,
      review: "This startup stands out in a crowded market. Their technology differentiation is clear, and they've assembled an incredible advisory board. Highly recommend for Series A investors.",
      date: "2 weeks ago",
      helpful: 15,
      verified: true
    },
    {
      id: 4,
      investorName: "David Kim",
      investorTitle: "Venture Partner",
      rating: 3,
      review: "Good team and decent traction, but the competitive landscape is challenging. The business model needs refinement and the go-to-market strategy could be stronger.",
      date: "3 weeks ago",
      helpful: 5,
      verified: false
    }
  ];

  if (!isOpen || !startup) return null;

  const handleSubmit = () => {
    if (rating > 0 && review.trim()) {
      onSubmitRating(rating, review);
      // Reset form
      setRating(0);
      setReview("");
      setInvestorName("");
      setInvestorTitle("");
      onClose();
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

        <div>
          <Label htmlFor="investorName">Your Name</Label>
          <Input
            id="investorName"
            value={investorName}
            onChange={(e) => setInvestorName(e.target.value)}
            placeholder="Enter your name"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="investorTitle">Your Title/Company</Label>
          <Input
            id="investorTitle"
            value={investorTitle}
            onChange={(e) => setInvestorTitle(e.target.value)}
            placeholder="e.g., Partner at ABC Ventures"
            className="mt-1"
          />
        </div>

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
          disabled={rating === 0 || !review.trim() || !investorName.trim()}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
        >
          <Send className="h-4 w-4 mr-2" />
          Submit Rating & Review
        </Button>
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Investor Reviews</h3>
        <div className="flex items-center justify-center gap-4 mb-6">
          {renderStars(startup.rating, false, "h-5 w-5")}
          <span className="text-lg font-medium">{startup.rating.toFixed(1)}</span>
          <span className="text-gray-600">({startup.totalRatings} reviews)</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {mockReviews.map((reviewItem) => (
          <Card key={reviewItem.id} className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {reviewItem.investorName.charAt(0)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{reviewItem.investorName}</span>
                  {reviewItem.verified && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Verified Investor
                    </span>
                  )}
                  <span className="text-sm text-gray-500">• {reviewItem.date}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{reviewItem.investorTitle}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  {renderStars(reviewItem.rating, false, "h-4 w-4")}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">{reviewItem.review}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <button className="flex items-center gap-1 hover:text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    Helpful ({reviewItem.helpful})
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
        ))}
      </div>
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
              <TabsTrigger value="reviews">View Reviews ({mockReviews.length})</TabsTrigger>
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