"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search, CheckCircle, AlertTriangle, Users, BarChart3 } from "lucide-react";

export default function InvestorPitchDeckPage() {
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
        <Card>
          <CardHeader>
            <Search className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Company Research</CardTitle>
            <CardDescription>Deep dive research on potential investments</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Start Research</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>DD Checklists</CardTitle>
            <CardDescription>Comprehensive due diligence checklists</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Checklists</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <AlertTriangle className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>Identify and evaluate investment risks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Assess Risks</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Team Analysis</CardTitle>
            <CardDescription>Evaluate founding team and leadership</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Analyze Team</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Financial Review</CardTitle>
            <CardDescription>Financial analysis and projections</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Review Financials</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <FileText className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Legal Review</CardTitle>
            <CardDescription>Legal structure and compliance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Legal Analysis</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 