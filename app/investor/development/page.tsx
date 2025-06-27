"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, BarChart3, TrendingUp, DollarSign, Building } from "lucide-react";

export default function InvestorDevelopmentPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-600">
          <Users className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Portfolio Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your investment portfolio and track performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Target className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Investment Strategy</CardTitle>
            <CardDescription>Define and refine your investment approach</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Strategy Builder</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Performance Analytics</CardTitle>
            <CardDescription>Track portfolio performance and ROI</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Analytics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Risk Management</CardTitle>
            <CardDescription>Assess and manage investment risks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Risk Assessment</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DollarSign className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Capital Allocation</CardTitle>
            <CardDescription>Optimize your capital deployment</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Allocation Tools</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Building className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Company Monitoring</CardTitle>
            <CardDescription>Track portfolio company progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Monitor Companies</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Users className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Board Management</CardTitle>
            <CardDescription>Manage board positions and governance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Board Tools</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 