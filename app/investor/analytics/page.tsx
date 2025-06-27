"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, BarChart3, PieChart, LineChart, Target, Activity } from "lucide-react";

export default function InvestorAnalyticsPage() {
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
        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>Comprehensive portfolio performance analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Performance</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <PieChart className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Analyze your investment distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Allocation</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <LineChart className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Trend Analysis</CardTitle>
            <CardDescription>Market trends and investment patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Analyze Trends</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Risk Metrics</CardTitle>
            <CardDescription>Risk analysis and assessment tools</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Risk Metrics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Activity className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Market Intelligence</CardTitle>
            <CardDescription>Real-time market data and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Market Data</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Predictive Analytics</CardTitle>
            <CardDescription>AI-powered investment predictions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Predictions</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 