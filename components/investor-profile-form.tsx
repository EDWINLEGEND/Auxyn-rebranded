"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Target, 
  Shield, 
  Building2,
  X,
  Plus,
  CheckCircle,
  AlertCircle,
  Info,
  User,
  Briefcase
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InvestorProfileData {
  name: string;
  title: string;
  company: string;
  bio: string;
  investorType: string;
  experience: string;
  location: string;
  website: string;
  linkedin: string;
  
  // Investment Preferences
  minInvestment: string;
  maxInvestment: string;
  preferredStages: string[];
  industries: string[];
  riskTolerance: string;
  geographicFocus: string[];
  
  // Investment Criteria
  investmentHorizon: string;
  portfolioSize: string;
  activeInvestments: string;
  exitedInvestments: string;
  
  // Expertise & Value Add
  expertiseAreas: string[];
  valueAdd: string;
  mentorshipAvailable: boolean;
  networkAccess: boolean;
  
  // Additional Info
  investmentThesis: string;
  dealFlow: string;
  decisionProcess: string;
}

const investorTypes = [
  { value: "angel", label: "Angel Investor", description: "Individual investor" },
  { value: "vc", label: "Venture Capital", description: "VC firm partner/associate" },
  { value: "corporate", label: "Corporate VC", description: "Corporate venture arm" },
  { value: "family", label: "Family Office", description: "Family office investment" },
  { value: "fund", label: "Fund Manager", description: "Investment fund manager" },
  { value: "syndicate", label: "Syndicate Lead", description: "Leading investment syndicates" }
];

const stages = [
  "Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D+", "Growth", "Late Stage"
];

const industries = [
  "FinTech", "HealthTech", "EdTech", "AI/ML", "SaaS", "E-commerce", 
  "CleanTech", "Biotech", "Gaming", "IoT", "Blockchain", "Cybersecurity",
  "Food & Beverage", "Real Estate", "Transportation", "Media", "Hardware", "Other"
];

const riskProfiles = [
  { value: "conservative", label: "Conservative", description: "Lower risk, proven models" },
  { value: "moderate", label: "Moderate", description: "Balanced risk-reward" },
  { value: "aggressive", label: "Aggressive", description: "High-risk, high-reward" },
  { value: "diversified", label: "Diversified", description: "Mixed risk portfolio" }
];

const expertiseAreas = [
  "Product Development", "Go-to-Market", "Sales & Marketing", "Operations", 
  "Technology", "Finance & Fundraising", "Legal & Compliance", "HR & Talent",
  "Business Development", "International Expansion", "M&A", "IPO Preparation"
];

const geographicRegions = [
  "North America", "Europe", "Asia Pacific", "Latin America", "Middle East", "Africa", "Global"
];

export const InvestorProfileForm: React.FC<{
  onSubmit: (data: InvestorProfileData) => void;
  initialData?: Partial<InvestorProfileData>;
  isEditing?: boolean;
}> = ({ onSubmit, initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<InvestorProfileData>({
    name: initialData?.name || "",
    title: initialData?.title || "",
    company: initialData?.company || "",
    bio: initialData?.bio || "",
    investorType: initialData?.investorType || "",
    experience: initialData?.experience || "",
    location: initialData?.location || "",
    website: initialData?.website || "",
    linkedin: initialData?.linkedin || "",
    
    minInvestment: initialData?.minInvestment || "",
    maxInvestment: initialData?.maxInvestment || "",
    preferredStages: initialData?.preferredStages || [],
    industries: initialData?.industries || [],
    riskTolerance: initialData?.riskTolerance || "",
    geographicFocus: initialData?.geographicFocus || [],
    
    investmentHorizon: initialData?.investmentHorizon || "",
    portfolioSize: initialData?.portfolioSize || "",
    activeInvestments: initialData?.activeInvestments || "",
    exitedInvestments: initialData?.exitedInvestments || "",
    
    expertiseAreas: initialData?.expertiseAreas || [],
    valueAdd: initialData?.valueAdd || "",
    mentorshipAvailable: initialData?.mentorshipAvailable || false,
    networkAccess: initialData?.networkAccess || false,
    
    investmentThesis: initialData?.investmentThesis || "",
    dealFlow: initialData?.dealFlow || "",
    decisionProcess: initialData?.decisionProcess || "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.bio.trim()) newErrors.bio = "Bio is required";
        if (!formData.investorType) newErrors.investorType = "Investor type is required";
        break;
      case 2:
        if (!formData.minInvestment.trim()) newErrors.minInvestment = "Minimum investment is required";
        if (!formData.maxInvestment.trim()) newErrors.maxInvestment = "Maximum investment is required";
        if (formData.preferredStages.length === 0) newErrors.preferredStages = "Select at least one stage";
        if (formData.industries.length === 0) newErrors.industries = "Select at least one industry";
        break;
      case 3:
        if (!formData.riskTolerance) newErrors.riskTolerance = "Risk tolerance is required";
        if (!formData.investmentHorizon.trim()) newErrors.investmentHorizon = "Investment horizon is required";
        break;
      case 4:
        if (formData.expertiseAreas.length === 0) newErrors.expertiseAreas = "Select at least one expertise area";
        if (!formData.valueAdd.trim()) newErrors.valueAdd = "Value add description is required";
        break;
      case 5:
        if (!formData.investmentThesis.trim()) newErrors.investmentThesis = "Investment thesis is required";
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

  const addToArray = (field: keyof InvestorProfileData, value: string) => {
    const currentArray = formData[field] as string[];
    if (!currentArray.includes(value)) {
      setFormData(prev => ({
        ...prev,
        [field]: [...currentArray, value]
      }));
    }
  };

  const removeFromArray = (field: keyof InvestorProfileData, value: string) => {
    const currentArray = formData[field] as string[];
    setFormData(prev => ({
      ...prev,
      [field]: currentArray.filter(item => item !== value)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Managing Partner, Angel Investor"
                  className={errors.title ? "border-red-500" : ""}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="company">Company/Fund</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  placeholder="Company or fund name"
                />
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="e.g., 10+ years"
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
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="https://yourcompany.com"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div>
              <Label>Investor Type *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {investorTypes.map(type => (
                  <Card
                    key={type.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.investorType === type.value
                        ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, investorType: type.value }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{type.label}</h3>
                        {formData.investorType === type.value && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.investorType && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.investorType}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about your investment background and experience"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  errors.bio ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } dark:bg-gray-800 dark:text-white`}
              />
              {errors.bio && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.bio}
                </p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Preferences</h2>
              <p className="text-gray-600 dark:text-gray-400">Define your investment criteria</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="minInvestment">Minimum Investment *</Label>
                <Input
                  id="minInvestment"
                  value={formData.minInvestment}
                  onChange={(e) => setFormData(prev => ({ ...prev, minInvestment: e.target.value }))}
                  placeholder="e.g., $25K, $100K"
                  className={errors.minInvestment ? "border-red-500" : ""}
                />
                {errors.minInvestment && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.minInvestment}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="maxInvestment">Maximum Investment *</Label>
                <Input
                  id="maxInvestment"
                  value={formData.maxInvestment}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxInvestment: e.target.value }))}
                  placeholder="e.g., $500K, $2M"
                  className={errors.maxInvestment ? "border-red-500" : ""}
                />
                {errors.maxInvestment && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.maxInvestment}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label>Preferred Stages *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.preferredStages.map(stage => (
                  <Badge key={stage} variant="secondary" className="flex items-center gap-1">
                    {stage}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFromArray('preferredStages', stage)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {stages.filter(stage => !formData.preferredStages.includes(stage)).map(stage => (
                  <Button
                    key={stage}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray('preferredStages', stage)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {stage}
                  </Button>
                ))}
              </div>
              {errors.preferredStages && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.preferredStages}
                </p>
              )}
            </div>

            <div>
              <Label>Industries *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.industries.map(industry => (
                  <Badge key={industry} variant="secondary" className="flex items-center gap-1">
                    {industry}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFromArray('industries', industry)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.filter(industry => !formData.industries.includes(industry)).map(industry => (
                  <Button
                    key={industry}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray('industries', industry)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {industry}
                  </Button>
                ))}
              </div>
              {errors.industries && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.industries}
                </p>
              )}
            </div>

            <div>
              <Label>Geographic Focus</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.geographicFocus.map(region => (
                  <Badge key={region} variant="secondary" className="flex items-center gap-1">
                    {region}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFromArray('geographicFocus', region)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {geographicRegions.filter(region => !formData.geographicFocus.includes(region)).map(region => (
                  <Button
                    key={region}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray('geographicFocus', region)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {region}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Criteria</h2>
              <p className="text-gray-600 dark:text-gray-400">Define your investment approach</p>
            </div>

            <div>
              <Label>Risk Tolerance *</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {riskProfiles.map(profile => (
                  <Card
                    key={profile.value}
                    className={`cursor-pointer transition-all duration-200 ${
                      formData.riskTolerance === profile.value
                        ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900/20'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, riskTolerance: profile.value }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{profile.label}</h3>
                        {formData.riskTolerance === profile.value && (
                          <CheckCircle className="h-5 w-5 text-purple-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {profile.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {errors.riskTolerance && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.riskTolerance}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="investmentHorizon">Investment Horizon *</Label>
                <Input
                  id="investmentHorizon"
                  value={formData.investmentHorizon}
                  onChange={(e) => setFormData(prev => ({ ...prev, investmentHorizon: e.target.value }))}
                  placeholder="e.g., 5-7 years, 3-5 years"
                  className={errors.investmentHorizon ? "border-red-500" : ""}
                />
                {errors.investmentHorizon && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.investmentHorizon}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="portfolioSize">Portfolio Size</Label>
                <Input
                  id="portfolioSize"
                  value={formData.portfolioSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioSize: e.target.value }))}
                  placeholder="e.g., 20-30 companies, 50+ investments"
                />
              </div>

              <div>
                <Label htmlFor="activeInvestments">Active Investments</Label>
                <Input
                  id="activeInvestments"
                  value={formData.activeInvestments}
                  onChange={(e) => setFormData(prev => ({ ...prev, activeInvestments: e.target.value }))}
                  placeholder="Number of active investments"
                />
              </div>

              <div>
                <Label htmlFor="exitedInvestments">Exited Investments</Label>
                <Input
                  id="exitedInvestments"
                  value={formData.exitedInvestments}
                  onChange={(e) => setFormData(prev => ({ ...prev, exitedInvestments: e.target.value }))}
                  placeholder="Number of successful exits"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Briefcase className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Expertise & Value Add</h2>
              <p className="text-gray-600 dark:text-gray-400">How you help portfolio companies</p>
            </div>

            <div>
              <Label>Expertise Areas *</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {formData.expertiseAreas.map(area => (
                  <Badge key={area} variant="secondary" className="flex items-center gap-1">
                    {area}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => removeFromArray('expertiseAreas', area)}
                    />
                  </Badge>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {expertiseAreas.filter(area => !formData.expertiseAreas.includes(area)).map(area => (
                  <Button
                    key={area}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addToArray('expertiseAreas', area)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {area}
                  </Button>
                ))}
              </div>
              {errors.expertiseAreas && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.expertiseAreas}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="valueAdd">Value Add Description *</Label>
              <textarea
                id="valueAdd"
                value={formData.valueAdd}
                onChange={(e) => setFormData(prev => ({ ...prev, valueAdd: e.target.value }))}
                placeholder="Describe how you help portfolio companies beyond capital"
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  errors.valueAdd ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                } dark:bg-gray-800 dark:text-white`}
              />
              {errors.valueAdd && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.valueAdd}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  formData.mentorshipAvailable ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, mentorshipAvailable: !prev.mentorshipAvailable }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Mentorship Available</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Provide ongoing mentorship to founders
                      </p>
                    </div>
                    {formData.mentorshipAvailable && (
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all duration-200 ${
                  formData.networkAccess ? 'ring-2 ring-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'hover:shadow-md'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, networkAccess: !prev.networkAccess }))}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold mb-1">Network Access</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Provide access to your professional network
                      </p>
                    </div>
                    {formData.networkAccess && (
                      <CheckCircle className="h-5 w-5 text-orange-500" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Target className="h-12 w-12 text-teal-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Investment Philosophy</h2>
              <p className="text-gray-600 dark:text-gray-400">Share your investment approach</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="investmentThesis">Investment Thesis *</Label>
                <textarea
                  id="investmentThesis"
                  value={formData.investmentThesis}
                  onChange={(e) => setFormData(prev => ({ ...prev, investmentThesis: e.target.value }))}
                  placeholder="Describe your investment philosophy and what you look for in startups"
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.investmentThesis ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                  } dark:bg-gray-800 dark:text-white`}
                />
                {errors.investmentThesis && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.investmentThesis}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="dealFlow">Deal Flow Sources</Label>
                <textarea
                  id="dealFlow"
                  value={formData.dealFlow}
                  onChange={(e) => setFormData(prev => ({ ...prev, dealFlow: e.target.value }))}
                  placeholder="How do you typically find investment opportunities?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <Label htmlFor="decisionProcess">Decision Process</Label>
                <textarea
                  id="decisionProcess"
                  value={formData.decisionProcess}
                  onChange={(e) => setFormData(prev => ({ ...prev, decisionProcess: e.target.value }))}
                  placeholder="Describe your investment decision-making process and timeline"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-teal-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">
                      Profile Review
                    </h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200">
                      Your profile will be used to match you with relevant startups. You can update 
                      your preferences anytime to refine your matches.
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
            {isEditing ? "Edit Investor Profile" : "Create Investor Profile"}
          </CardTitle>
          <CardDescription>
            {isEditing 
              ? "Update your investor information to improve startup matches"
              : "Complete your profile to get matched with the right startups"
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
                className="bg-gradient-to-r from-green-500 to-teal-600 h-2 rounded-full"
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
                  className="bg-gradient-to-r from-green-500 to-teal-600 flex items-center gap-2"
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