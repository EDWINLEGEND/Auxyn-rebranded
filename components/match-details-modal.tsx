"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  X,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Building,
  TrendingUp,
  Target,
  CheckCircle,
  AlertCircle,
  Heart,
  MessageCircle,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  BarChart3,
  Zap,
  Award,
  Globe,
  Mail,
  Phone,
  Linkedin,
  Twitter,
  Info,
  ThumbsUp,
  ThumbsDown,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MatchDetailsData {
  id: number;
  name: string;
  description: string;
  type: "startup" | "investor";
  compatibilityScore: number;
  matchReasons: string[];
  
  // Basic Info
  location: string;
  industry: string[];
  stage?: string;
  foundedYear?: number;
  website?: string;
  
  // Contact Info
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  
  // Startup specific
  fundingNeeded?: string;
  equityOffered?: string;
  teamSize?: number;
  revenue?: string;
  businessModel?: string;
  targetMarket?: string;
  competitiveAdvantage?: string;
  useOfFunds?: string;
  
  // Investor specific
  investmentRange?: string;
  portfolioSize?: number;
  expertise?: string[];
  investmentThesis?: string;
  valueAdd?: string;
  
  // Metadata
  lastActive: string;
  verified: boolean;
  premium: boolean;
  responseRate?: number;
  totalInvestments?: number;
  successfulExits?: number;
  
  // Media
  logo?: string;
  images?: string[];
  documents?: { name: string; type: string; url: string }[];
}

interface MatchDetailsModalProps {
  match: MatchDetailsData | null;
  isOpen: boolean;
  onClose: () => void;
  onExpressInterest: (matchId: number) => void;
  onSaveMatch: (matchId: number) => void;
  onStartConversation: (matchId: number) => void;
  onShare: (matchId: number) => void;
  userType: "startup" | "investor";
}

export const MatchDetailsModal: React.FC<MatchDetailsModalProps> = ({
  match,
  isOpen,
  onClose,
  onExpressInterest,
  onSaveMatch,
  onStartConversation,
  onShare,
  userType
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "details" | "compatibility" | "contact">("overview");
  const [isSaved, setIsSaved] = useState(false);
  const [hasExpressedInterest, setHasExpressedInterest] = useState(false);

  if (!isOpen || !match) return null;

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSaveMatch(match.id);
  };

  const handleExpressInterest = () => {
    setHasExpressedInterest(true);
    onExpressInterest(match.id);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-green-600 bg-green-100 dark:bg-green-900/20";
    if (score >= 80) return "text-blue-600 bg-blue-100 dark:bg-blue-900/20";
    if (score >= 70) return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20";
    return "text-gray-600 bg-gray-100 dark:bg-gray-900/20";
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 90) return "Excellent Match";
    if (score >= 80) return "Great Match";
    if (score >= 70) return "Good Match";
    return "Potential Match";
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-500" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-sm">{match.location}</span>
            </div>
            
            {match.foundedYear && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Founded in {match.foundedYear}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-sm">Active {match.lastActive}</span>
            </div>
            
            {match.responseRate && (
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm">{match.responseRate}% response rate</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              Industries & Focus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {match.industry.map(ind => (
                <Badge key={ind} variant="secondary">
                  {ind}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      {match.type === "startup" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Startup Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{match.fundingNeeded}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Funding Needed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{match.teamSize}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Team Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{match.revenue}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{match.stage}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Stage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {match.type === "investor" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="h-5 w-5 text-gold-500" />
              Investment Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{match.investmentRange}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Investment Range</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{match.portfolioSize}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Portfolio Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{match.totalInvestments || 'N/A'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Investments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{match.successfulExits || 'N/A'}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Successful Exits</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About {match.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {match.description}
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderDetailsTab = () => (
    <div className="space-y-6">
      {match.type === "startup" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Business Model</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.businessModel || "Business model information not provided."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Target Market</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.targetMarket || "Target market information not provided."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Competitive Advantage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.competitiveAdvantage || "Competitive advantage information not provided."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Use of Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.useOfFunds || "Use of funds information not provided."}
              </p>
            </CardContent>
          </Card>
        </>
      )}

      {match.type === "investor" && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Investment Thesis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.investmentThesis || "Investment thesis not provided."}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Value Add</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300">
                {match.valueAdd || "Value add information not provided."}
              </p>
            </CardContent>
          </Card>

          {match.expertise && match.expertise.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expertise Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {match.expertise.map(area => (
                    <Badge key={area} variant="outline">
                      {area}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );

  const renderCompatibilityTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Compatibility Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-bold ${getCompatibilityColor(match.compatibilityScore)}`}>
              {match.compatibilityScore}% {getCompatibilityLabel(match.compatibilityScore)}
            </div>
          </div>
          
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${match.compatibilityScore}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Why This Match?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {match.matchReasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-[20px]"
              >
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContactTab = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {match.email && (
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-500" />
              <span className="text-sm">{match.email}</span>
            </div>
          )}
          
          {match.phone && (
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-green-500" />
              <span className="text-sm">{match.phone}</span>
            </div>
          )}
          
          {match.website && (
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-purple-500" />
              <a 
                href={match.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                {match.website}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          
          {match.linkedin && (
            <div className="flex items-center gap-3">
              <Linkedin className="h-5 w-5 text-blue-700" />
              <a 
                href={match.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                LinkedIn Profile
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
          
          {match.twitter && (
            <div className="flex items-center gap-3">
              <Twitter className="h-5 w-5 text-blue-400" />
              <a 
                href={match.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline flex items-center gap-1"
              >
                Twitter Profile
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connect with {match.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-[20px] p-4">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Ready to connect?
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  Express your interest to start a conversation or save this match for later.
                </p>
                <div className="flex gap-2">
                  {!hasExpressedInterest ? (
                    <Button
                      size="sm"
                      onClick={handleExpressInterest}
                      className="bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      Express Interest
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => onStartConversation(match.id)}
                      className="bg-gradient-to-r from-green-500 to-teal-600"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Start Conversation
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                  >
                    {isSaved ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 mr-1" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-1" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-4xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="h-full">
            <CardHeader className="border-b">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl">{match.name}</CardTitle>
                    {match.verified && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {match.premium && (
                      <Star className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={`${getCompatibilityColor(match.compatibilityScore)}`}>
                      {match.compatibilityScore}% Match
                    </Badge>
                    <Badge variant="outline">
                      {match.type === "startup" ? "Startup" : "Investor"}
                    </Badge>
                  </div>
                  
                  <CardDescription className="text-base">
                    {match.description}
                  </CardDescription>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onShare(match.id)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onClose}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-t pt-4">
                {[
                  { id: "overview", label: "Overview" },
                  { id: "details", label: "Details" },
                  { id: "compatibility", label: "Compatibility" },
                  { id: "contact", label: "Contact" }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            
            <div className="overflow-y-auto max-h-[60vh] p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "overview" && renderOverviewTab()}
                  {activeTab === "details" && renderDetailsTab()}
                  {activeTab === "compatibility" && renderCompatibilityTab()}
                  {activeTab === "contact" && renderContactTab()}
                </motion.div>
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 