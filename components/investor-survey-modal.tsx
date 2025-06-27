"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { X, TrendingUp, DollarSign, Target, Users, BarChart3, Building } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface InvestorSurveyModalProps {
  onSubmit: (prompt: string) => void;
  onClose: () => void;
}

export const InvestorSurveyModal: React.FC<InvestorSurveyModalProps> = ({ onSubmit, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    investorType: "",
    investmentStage: "",
    preferredSectors: [] as string[],
    investmentRange: "",
    riskTolerance: "",
    investmentHorizon: "",
    specificInterests: "",
    geographicFocus: "",
    portfolioSize: ""
  });

  const steps = [
    {
      title: "Investor Profile",
      icon: <Users className="h-6 w-6" />,
      description: "Tell us about your investment background"
    },
    {
      title: "Investment Preferences",
      icon: <Target className="h-6 w-6" />,
      description: "What type of investments interest you?"
    },
    {
      title: "Investment Criteria",
      icon: <BarChart3 className="h-6 w-6" />,
      description: "Define your investment parameters"
    },
    {
      title: "Portfolio Strategy",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Share your investment strategy"
    }
  ];

  const investorTypes = [
    { id: "angel", label: "Angel Investor", description: "Individual investor funding early-stage startups" },
    { id: "vc", label: "Venture Capitalist", description: "Professional investor managing institutional funds" },
    { id: "pe", label: "Private Equity", description: "Investor in established companies for growth or buyouts" },
    { id: "family_office", label: "Family Office", description: "Managing wealth for high-net-worth families" },
    { id: "institutional", label: "Institutional Investor", description: "Pension funds, endowments, insurance companies" },
    { id: "strategic", label: "Strategic Investor", description: "Corporate investor seeking strategic value" }
  ];

  const investmentStages = [
    { id: "pre_seed", label: "Pre-Seed", description: "Very early stage, idea validation" },
    { id: "seed", label: "Seed", description: "Early stage, product development" },
    { id: "series_a", label: "Series A", description: "Growth stage, scaling operations" },
    { id: "series_b", label: "Series B", description: "Expansion stage, market growth" },
    { id: "series_c_plus", label: "Series C+", description: "Late stage, mature companies" },
    { id: "growth", label: "Growth Stage", description: "Established revenue, scaling" },
    { id: "pre_ipo", label: "Pre-IPO", description: "Preparing for public offering" }
  ];

  const sectors = [
    "Technology", "Healthcare", "Fintech", "E-commerce", "SaaS", "AI/ML", 
    "Biotech", "Clean Energy", "EdTech", "Real Estate", "Consumer Goods", 
    "Manufacturing", "Agriculture", "Transportation", "Media", "Gaming"
  ];

  const investmentRanges = [
    { id: "under_100k", label: "Under $100K", description: "Small angel investments" },
    { id: "100k_500k", label: "$100K - $500K", description: "Seed stage investments" },
    { id: "500k_2m", label: "$500K - $2M", description: "Series A range" },
    { id: "2m_10m", label: "$2M - $10M", description: "Growth stage" },
    { id: "10m_50m", label: "$10M - $50M", description: "Large growth rounds" },
    { id: "over_50m", label: "Over $50M", description: "Late stage, institutional" }
  ];

  const riskTolerances = [
    { id: "conservative", label: "Conservative", description: "Lower risk, stable returns" },
    { id: "moderate", label: "Moderate", description: "Balanced risk-return profile" },
    { id: "aggressive", label: "Aggressive", description: "Higher risk, higher potential returns" },
    { id: "very_aggressive", label: "Very Aggressive", description: "Maximum risk tolerance" }
  ];

  const investmentHorizons = [
    { id: "short", label: "1-3 Years", description: "Short-term investments" },
    { id: "medium", label: "3-7 Years", description: "Medium-term growth" },
    { id: "long", label: "7-15 Years", description: "Long-term value creation" },
    { id: "very_long", label: "15+ Years", description: "Generational wealth building" }
  ];

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      preferredSectors: prev.preferredSectors.includes(sector)
        ? prev.preferredSectors.filter(s => s !== sector)
        : [...prev.preferredSectors, sector]
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const investorTypeLabel = investorTypes.find(t => t.id === formData.investorType)?.label || formData.investorType;
    const stageLabel = investmentStages.find(s => s.id === formData.investmentStage)?.label || formData.investmentStage;
    const rangeLabel = investmentRanges.find(r => r.id === formData.investmentRange)?.label || formData.investmentRange;
    const riskLabel = riskTolerances.find(r => r.id === formData.riskTolerance)?.label || formData.riskTolerance;
    const horizonLabel = investmentHorizons.find(h => h.id === formData.investmentHorizon)?.label || formData.investmentHorizon;

    const prompt = `I am a ${investorTypeLabel} looking for investment opportunities. I typically invest in ${stageLabel} companies with investment amounts in the ${rangeLabel} range. My preferred sectors are: ${formData.preferredSectors.join(', ')}. I have a ${riskLabel} risk tolerance and a ${horizonLabel} investment horizon. ${formData.geographicFocus ? `I focus on ${formData.geographicFocus} markets.` : ''} ${formData.specificInterests ? `I'm particularly interested in: ${formData.specificInterests}.` : ''} ${formData.portfolioSize ? `My current portfolio size is ${formData.portfolioSize}.` : ''} Please help me find suitable investment opportunities and provide market insights.`;

    onSubmit(prompt);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.investorType !== "";
      case 1:
        return formData.investmentStage !== "" && formData.preferredSectors.length > 0;
      case 2:
        return formData.investmentRange !== "" && formData.riskTolerance !== "";
      case 3:
        return formData.investmentHorizon !== "";
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                What type of investor are you?
              </Label>
              <RadioGroup
                value={formData.investorType}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investorType: value }))}
                className="space-y-3"
              >
                {investorTypes.map((type) => (
                  <div key={type.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={type.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        {type.label}
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {type.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                What investment stage do you prefer?
              </Label>
              <RadioGroup
                value={formData.investmentStage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investmentStage: value }))}
                className="space-y-3"
              >
                {investmentStages.map((stage) => (
                  <div key={stage.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={stage.id} id={stage.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={stage.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        {stage.label}
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                Which sectors interest you? (Select multiple)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {sectors.map((sector) => (
                  <Button
                    key={sector}
                    type="button"
                    variant={formData.preferredSectors.includes(sector) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleSectorToggle(sector)}
                    className="justify-start"
                  >
                    {sector}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                What's your typical investment range?
              </Label>
              <RadioGroup
                value={formData.investmentRange}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investmentRange: value }))}
                className="space-y-3"
              >
                {investmentRanges.map((range) => (
                  <div key={range.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={range.id} id={range.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={range.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        {range.label}
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {range.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                What's your risk tolerance?
              </Label>
              <RadioGroup
                value={formData.riskTolerance}
                onValueChange={(value) => setFormData(prev => ({ ...prev, riskTolerance: value }))}
                className="space-y-3"
              >
                {riskTolerances.map((risk) => (
                  <div key={risk.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={risk.id} id={risk.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={risk.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        {risk.label}
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-white mb-4 block">
                What's your investment horizon?
              </Label>
              <RadioGroup
                value={formData.investmentHorizon}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investmentHorizon: value }))}
                className="space-y-3"
              >
                {investmentHorizons.map((horizon) => (
                  <div key={horizon.id} className="flex items-start space-x-3">
                    <RadioGroupItem value={horizon.id} id={horizon.id} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={horizon.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                        {horizon.label}
                      </Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {horizon.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="geographicFocus" className="text-sm font-medium text-gray-900 dark:text-white">
                  Geographic Focus (Optional)
                </Label>
                <Input
                  id="geographicFocus"
                  value={formData.geographicFocus}
                  onChange={(e) => setFormData(prev => ({ ...prev, geographicFocus: e.target.value }))}
                  placeholder="e.g., North America, Europe, Asia-Pacific"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="portfolioSize" className="text-sm font-medium text-gray-900 dark:text-white">
                  Current Portfolio Size (Optional)
                </Label>
                <Input
                  id="portfolioSize"
                  value={formData.portfolioSize}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioSize: e.target.value }))}
                  placeholder="e.g., $10M AUM, 25 companies"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specificInterests" className="text-sm font-medium text-gray-900 dark:text-white">
                  Specific Investment Interests (Optional)
                </Label>
                <Input
                  id="specificInterests"
                  value={formData.specificInterests}
                  onChange={(e) => setFormData(prev => ({ ...prev, specificInterests: e.target.value }))}
                  placeholder="e.g., AI startups, sustainable technology, B2B SaaS"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  {steps[currentStep].icon}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {steps[currentStep].title}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {steps[currentStep].description}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-primary"
              >
                {currentStep === steps.length - 1 ? "Get Investment Recommendations" : "Next"}
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 