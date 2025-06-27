"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Calendar,
  MapPin,
  Building,
  BarChart3,
  CheckCircle
} from "lucide-react";

interface InvestmentOpportunity {
  id: number;
  title: string;
  description: string;
  marketOpportunity: string;
  valuation: string;
  stage: string;
  sector: string;
  fundingGoal?: string;
  teamSize?: number;
  location?: string;
  foundedYear?: number;
  revenue?: string;
  growth?: string;
  investors?: string[];
}

interface InvestmentOpportunitiesGridProps {
  opportunities: InvestmentOpportunity[];
  selectedOpportunities: number[];
  onSelectOpportunity: (id: number) => void;
}

export const InvestmentOpportunitiesGrid: React.FC<InvestmentOpportunitiesGridProps> = ({
  opportunities,
  selectedOpportunities,
  onSelectOpportunity,
}) => {
  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'pre-seed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'seed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'series a':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'series b':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'series c+':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'growth':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getSectorColor = (sector: string) => {
    const colors = [
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    ];
    return colors[sector.length % colors.length];
  };

  if (opportunities.length === 0) {
    return (
      <div className="text-center py-12">
        <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No Investment Opportunities Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or check back later for new opportunities.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {opportunities.map((opportunity) => (
        <Card
          key={opportunity.id}
          className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedOpportunities.includes(opportunity.id)
              ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'hover:shadow-md'
          }`}
          onClick={() => onSelectOpportunity(opportunity.id)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2">
                {opportunity.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge className={getStageColor(opportunity.stage)}>
                  {opportunity.stage}
                </Badge>
                <Badge className={getSectorColor(opportunity.sector)}>
                  {opportunity.sector}
                </Badge>
              </div>
            </div>
            {selectedOpportunities.includes(opportunity.id) && (
              <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 ml-2" />
            )}
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
            {opportunity.description}
          </p>

          <div className="space-y-3 mb-4">
            {opportunity.valuation && (
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  Valuation: <span className="font-medium text-gray-900 dark:text-white">{opportunity.valuation}</span>
                </span>
              </div>
            )}

            {opportunity.fundingGoal && (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  Seeking: <span className="font-medium text-gray-900 dark:text-white">{opportunity.fundingGoal}</span>
                </span>
              </div>
            )}

            {opportunity.revenue && (
              <div className="flex items-center gap-2 text-sm">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  Revenue: <span className="font-medium text-gray-900 dark:text-white">{opportunity.revenue}</span>
                </span>
              </div>
            )}

            {opportunity.teamSize && (
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  Team: <span className="font-medium text-gray-900 dark:text-white">{opportunity.teamSize} members</span>
                </span>
              </div>
            )}

            {opportunity.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-red-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">{opportunity.location}</span>
                </span>
              </div>
            )}

            {opportunity.foundedYear && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-indigo-600" />
                <span className="text-gray-600 dark:text-gray-300">
                  Founded: <span className="font-medium text-gray-900 dark:text-white">{opportunity.foundedYear}</span>
                </span>
              </div>
            )}
          </div>

          {opportunity.growth && (
            <div className="mb-4">
              <div className="flex items-center gap-2 text-sm mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-gray-900 dark:text-white">Growth Rate</span>
              </div>
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-2">
                <span className="text-green-800 dark:text-green-200 font-medium">
                  {opportunity.growth}
                </span>
              </div>
            </div>
          )}

          {opportunity.marketOpportunity && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                Market Opportunity
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                {opportunity.marketOpportunity}
              </p>
            </div>
          )}

          {opportunity.investors && opportunity.investors.length > 0 && (
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">
                Notable Investors
              </h4>
              <div className="flex flex-wrap gap-1">
                {opportunity.investors.slice(0, 3).map((investor, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {investor}
                  </Badge>
                ))}
                {opportunity.investors.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{opportunity.investors.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant={selectedOpportunities.includes(opportunity.id) ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onSelectOpportunity(opportunity.id);
              }}
            >
              {selectedOpportunities.includes(opportunity.id) ? "Selected" : "Select for Analysis"}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}; 