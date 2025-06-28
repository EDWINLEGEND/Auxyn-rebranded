"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, CheckCircle, AlertTriangle, Users, BarChart3 } from "lucide-react";
import { 
  CompanyResearchModal, 
  DueDiligenceGuidesModal,
  RiskAssessmentModal 
} from "@/components/investor-modals";

export default function InvestorPitchDeckPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const closeModal = () => setActiveModal(null);

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
          <FileText className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Due Diligence</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive due diligence tools and frameworks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Search className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Company Research</CardTitle>
            <CardDescription>Deep dive research on potential investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('research')}
            >
              Start Research
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>DD Checklists</CardTitle>
            <CardDescription>Comprehensive due diligence checklists</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('checklists')}
            >
              View Checklists
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Identify and evaluate investment risks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-orange-600 group-hover:text-white transition-colors duration-200"
              onClick={() => setActiveModal('risk')}
            >
              Assess Risks
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Team Analysis</CardTitle>
            <CardDescription>Evaluate founding team and leadership</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors duration-200"
            >
              Analyze Team
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-teal-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Financial Review</CardTitle>
            <CardDescription>Financial analysis and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200"
            >
              Review Financials
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group">
          <CardHeader>
            <FileText className="h-8 w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform duration-200" />
            <CardTitle>Legal Review</CardTitle>
            <CardDescription>Legal structure and compliance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-200"
            >
              Legal Analysis
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <CompanyResearchModal 
        isOpen={activeModal === 'research'} 
        onClose={closeModal} 
      />
      <DueDiligenceGuidesModal 
        isOpen={activeModal === 'checklists'} 
        onClose={closeModal} 
      />
      <RiskAssessmentModal 
        isOpen={activeModal === 'risk'} 
        onClose={closeModal} 
      />
    </div>
  );
} 