"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, BookOpen, Users, TrendingUp, Globe, FileText } from "lucide-react";
import { 
  DueDiligenceGuidesModal, 
  InvestorNetworkModal, 
  MarketIntelligenceModal,
  LegalTemplatesModal,
  PortfolioToolsModal,
  GlobalOpportunitiesModal
} from "@/components/investor-modals";

export default function InvestorResourcesPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600">
          <Briefcase className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Investment Resources</h1>
          <p className="text-slate-600 dark:text-slate-400">Tools, guides, and resources for successful investing</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Due Diligence Guides</CardTitle>
            <CardDescription>Comprehensive guides for evaluating startups</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('dueDiligence')}
            >
              Access Guides
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Users className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Investor Network</CardTitle>
            <CardDescription>Connect with other investors and share insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('network')}
            >
              Join Network
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Market Intelligence</CardTitle>
            <CardDescription>Real-time market data and analysis tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('market')}
            >
              View Data
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Globe className="h-8 w-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Global Opportunities</CardTitle>
            <CardDescription>International investment opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('global')}
            >
              Explore Global
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <FileText className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Legal Templates</CardTitle>
            <CardDescription>Investment agreements and legal documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('legal')}
            >
              Download Templates
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Portfolio Tools</CardTitle>
            <CardDescription>Manage and track your investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('portfolio')}
            >
              Access Tools
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <DueDiligenceGuidesModal 
        isOpen={activeModal === 'dueDiligence'} 
        onClose={closeModal} 
      />
      <InvestorNetworkModal 
        isOpen={activeModal === 'network'} 
        onClose={closeModal} 
      />
      <MarketIntelligenceModal 
        isOpen={activeModal === 'market'} 
        onClose={closeModal} 
      />
      <LegalTemplatesModal 
        isOpen={activeModal === 'legal'} 
        onClose={closeModal} 
      />
      <PortfolioToolsModal 
        isOpen={activeModal === 'portfolio'} 
        onClose={closeModal} 
      />
      <GlobalOpportunitiesModal 
        isOpen={activeModal === 'global'} 
        onClose={closeModal} 
      />
    </div>
  );
} 