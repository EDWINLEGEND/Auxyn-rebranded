"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Upload,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StartupProfileData {
  companyName: string;
  description: string;
  industry: string[];
  stage: string;
  teamSize: number;
  fundingNeeded: string;
  equityOffered: string;
  timeline: string;
  riskProfile: string;
  revenue: string;
  location: string;
  foundedYear: string;
  website: string;
  pitch: string;
  businessModel: string;
  targetMarket: string;
  competitiveAdvantage: string;
  useOfFunds: string;
}

const industries = [
  "FinTech", "HealthTech", "EdTech", "AI/ML", "SaaS", "E-commerce", 
  "CleanTech", "Biotech", "Gaming", "IoT", "Blockchain", "Cybersecurity",
  "Food & Beverage", "Real Estate", "Transportation", "Media", "Other"
];

const stages = [
  "Idea Stage", "Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"
];

const riskProfiles = [
  { value: "conservative", label: "Conservative", description: "Stable, proven business model" },
  { value: "moderate", label: "Moderate", description: "Balanced risk with growth potential" },
  { value: "aggressive", label: "Aggressive", description: "High-risk, high-reward venture" },
  { value: "disruptive", label: "Disruptive", description: "Revolutionary technology/approach" }
];

export const StartupProfileForm: React.FC<{
  onSubmit: (data: StartupProfileData) => void;
  initialData?: Partial<StartupProfileData>;
  isEditing?: boolean;
}> = ({ onSubmit, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<StartupProfileData>({
    companyName: initialData?.companyName || "",
    description: initialData?.description || "",
    industry: initialData?.industry || [],
    stage: initialData?.stage || "",
    teamSize: initialData?.teamSize || 1,
    fundingNeeded: initialData?.fundingNeeded || "",
    equityOffered: initialData?.equityOffered || "",
    timeline: initialData?.timeline || "",
    riskProfile: initialData?.riskProfile || "",
    revenue: initialData?.revenue || "",
    location: initialData?.location || "",
    foundedYear: initialData?.foundedYear || "",
    website: initialData?.website || "",
    pitch: initialData?.pitch || "",
    businessModel: initialData?.businessModel || "",
    targetMarket: initialData?.targetMarket || "",
    competitiveAdvantage: initialData?.competitiveAdvantage || "",
    useOfFunds: initialData?.useOfFunds || "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);

  const totalSteps = 4;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (formData.industry.length === 0) newErrors.industry = "Select at least one industry";
        if (!formData.stage) newErrors.stage = "Funding stage is required";
        break;
      case 2:
        if (!formData.fundingNeeded.trim()) newErrors.fundingNeeded = "Funding amount is required";
        if (!formData.equityOffered.trim()) newErrors.equityOffered = "Equity percentage is required";
        if (!formData.timeline.trim()) newErrors.timeline = "Timeline is required";
        if (!formData.riskProfile) newErrors.riskProfile = "Risk profile is required";
        break;
      case 3:
        if (!formData.businessModel.trim()) newErrors.businessModel = "Business model is required";
        if (!formData.targetMarket.trim()) newErrors.targetMarket = "Target market is required";
        if (!formData.competitiveAdvantage.trim()) newErrors.competitiveAdvantage = "Competitive advantage is required";
        break;
      case 4:
        if (!formData.useOfFunds.trim()) newErrors.useOfFunds = "Use of funds is required";
        if (!formData.pitch.trim()) newErrors.pitch = "Pitch summary is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const addIndustry = (industry: string) => {
    if (!formData.industry.includes(industry)) {
      setFormData(prev => ({
        ...prev,
        industry: [...prev.industry, industry]
      }));
    }
  };

  const removeIndustry = (industry: string) => {
    setFormData(prev => ({
      ...prev,
      industry: prev.industry.filter(i => i !== industry)
    }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedLogo(file);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Company Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your startup</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Enter your company name"
                  className={errors.companyName ? "border-red-500" : ""}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.companyName}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Company Description *</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what your company does and the problem it solves"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="stage">Funding Stage *</Label>
                <select
                  id="stage"
                  value={formData.stage}
                  onChange={(e) => setFormData(prev => ({ ...prev, stage: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.stage ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                >
                  <option value="">Select stage</option>
                  {stages.map(stage => (
                    <option key={stage} value={stage}>{stage}</option>
                  ))}
                </select>
                {errors.stage && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.stage}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="teamSize">Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  min="1"
                  value={formData.teamSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, teamSize: parseInt(e.target.value) || 1 }))}
                  placeholder="Number of team members"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>

              <div>
                <Label htmlFor="foundedYear">Founded Year</Label>
                <Input
                  id="foundedYear"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.foundedYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: e.target.value }))}
                  placeholder="YYYY"
                />
              </div>

              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div>
                <Label htmlFor="revenue">Current Revenue</Label>
                <Input
                  id="revenue"
                  value={formData.revenue}
                  onChange={(e) => setFormData(prev => ({ ...prev, revenue: e.target.value }))}
                  placeholder="e.g., $50K ARR, Pre-revenue"
                />
              </div>
            </div>

            <div>
              <Label>Industries *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.industry.map(ind => (
                  <Badge key={ind} variant="secondary" className="flex items-center gap-1">
                    {ind}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeIndustry(ind)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.filter(ind => !formData.industry.includes(ind)).map(industry => (
                  <Button
                    key={industry}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addIndustry(industry)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {industry}
                  </Button>
                ))}
              </div>
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.industry}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="logo">Company Logo</Label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo')?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Upload Logo
                </Button>
                {uploadedLogo && (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <CheckCircle className="h-4 w-4" />
                    {uploadedLogo.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Funding Requirements</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about your funding needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fundingNeeded">Funding Amount Needed *</Label>
                <Input
                  id="fundingNeeded"
                  value={formData.fundingNeeded}
                  onChange={(e) => setFormData(prev => ({ ...prev, fundingNeeded: e.target.value }))}
                  placeholder="e.g., $500K, $2M"
                  className={errors.fundingNeeded ? "border-red-500" : ""}
                />
                {errors.fundingNeeded && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.fundingNeeded}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="equityOffered">Equity Offered *</Label>
                <Input
                  id="equityOffered"
                  value={formData.equityOffered}
                  onChange={(e) => setFormData(prev => ({ ...prev, equityOffered: e.target.value }))}
                  placeholder="e.g., 10%, 15-20%"
                  className={errors.equityOffered ? "border-red-500" : ""}
                />
                {errors.equityOffered && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.equityOffered}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="timeline">Funding Timeline *</Label>
                <Input
                  id="timeline"
                  value={formData.timeline}
                  onChange={(e) => setFormData(prev => ({ ...prev, timeline: e.target.value }))}
                  placeholder="e.g., 3-6 months, Q2 2024"
                  className={errors.timeline ? "border-red-500" : ""}
                />
                {errors.timeline && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.timeline}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Risk Profile *</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Select the risk profile that best describes your venture
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {riskProfiles.map(profile => (
                  <Card
                    key={profile.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.riskProfile === profile.value
                        ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, riskProfile: profile.value }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{profile.label}</h3>
                        {formData.riskProfile === profile.value && (
                          <CheckCircle className="h-5 w-5 text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.riskProfile && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.riskProfile}
                </p>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Business Details</h2>
              <p className="text-gray-600 dark:text-gray-400">Describe your business model and market</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="businessModel">Business Model *</Label>
                <textarea
                  id="businessModel"
                  value={formData.businessModel}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessModel: e.target.value }))}
                  placeholder="Describe how your company makes money (e.g., SaaS subscription, marketplace commission, etc.)"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.businessModel ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.businessModel && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.businessModel}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="targetMarket">Target Market *</Label>
                <textarea
                  id="targetMarket"
                  value={formData.targetMarket}
                  onChange={(e) => setFormData(prev => ({ ...prev, targetMarket: e.target.value }))}
                  placeholder="Describe your target customers and market size"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.targetMarket ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.targetMarket && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.targetMarket}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="competitiveAdvantage">Competitive Advantage *</Label>
                <textarea
                  id="competitiveAdvantage"
                  value={formData.competitiveAdvantage}
                  onChange={(e) => setFormData(prev => ({ ...prev, competitiveAdvantage: e.target.value }))}
                  placeholder="What makes your company unique and difficult to replicate?"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.competitiveAdvantage ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.competitiveAdvantage && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.competitiveAdvantage}
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <TrendingUp className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Details</h2>
              <p className="text-gray-600 dark:text-gray-400">Final details about your funding</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="useOfFunds">Use of Funds *</Label>
                <textarea
                  id="useOfFunds"
                  value={formData.useOfFunds}
                  onChange={(e) => setFormData(prev => ({ ...prev, useOfFunds: e.target.value }))}
                  placeholder="Describe how you plan to use the investment (e.g., 40% product development, 30% marketing, 20% hiring, 10% operations)"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.useOfFunds ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.useOfFunds && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.useOfFunds}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="pitch">Pitch Summary *</Label>
                <textarea
                  id="pitch"
                  value={formData.pitch}
                  onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                  placeholder="Write a compelling summary of your startup that will attract investors (elevator pitch)"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.pitch ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.pitch && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.pitch}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Profile Review
                    </h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Once you submit your profile, it will be reviewed and matched with relevant investors. 
                      You can always edit your profile later to improve your matches.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            {isEditing ? "Edit Startup Profile" : "Create Startup Profile"}
          </CardTitle>
          <CardDescription>
            {isEditing 
              ? "Update your startup information to improve investor matches"
              : "Complete your profile to get matched with the right investors"
            }
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-green-500 to-teal-600 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      {isEditing ? "Updating..." : "Creating Profile..."}
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      {isEditing ? "Update Profile" : "Create Profile"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 