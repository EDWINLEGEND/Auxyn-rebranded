"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, PieChart, LineChart, Target, Activity } from "lucide-react";
import { 
  PortfolioPerformanceModal, 
  RiskAssessmentModal,
  MarketIntelligenceModal
} from "@/components/investor-modals";

export default function InvestorAnalyticsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Investment Analytics</h1>
          <p className="text-slate-600 dark:text-slate-400">Advanced analytics and insights for your investment portfolio</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Comprehensive portfolio performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('performance')}
            >
              View Performance
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <PieChart className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Analyze your investment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors duration-200"
            >
              View Allocation
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <LineChart className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Market trends and investment patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200"
            >
              Analyze Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Target className="h-8 w-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Risk Metrics</CardTitle>
            <CardDescription>Risk analysis and assessment tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('risk')}
            >
              View Risk Metrics
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Activity className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Market Intelligence</CardTitle>
            <CardDescription>Real-time market data and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('market')}
            >
              Market Data
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Predictive Analytics</CardTitle>
            <CardDescription>AI-powered investment predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-200"
            >
              View Predictions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <PortfolioPerformanceModal 
        isOpen={activeModal === 'performance'} 
        onClose={closeModal} 
      />
      <RiskAssessmentModal 
        isOpen={activeModal === 'risk'} 
        onClose={closeModal} 
      />
      <MarketIntelligenceModal 
        isOpen={activeModal === 'market'} 
        onClose={closeModal} 
      />
    </div>
  );
} 