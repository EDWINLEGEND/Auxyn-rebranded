"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp, BarChart3, DollarSign, Target, Calendar } from "lucide-react";

export default function InvestorProgressPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
          <LineChart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Portfolio Tracking</h1>
          <p className="text-slate-600 dark:text-slate-400">Monitor investment performance and track returns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Track ROI and portfolio performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Metrics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>Portfolio Analytics</CardTitle>
            <CardDescription>Detailed analytics and insights</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Analytics</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DollarSign className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Returns Tracking</CardTitle>
            <CardDescription>Monitor investment returns and exits</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Track Returns</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Goal Tracking</CardTitle>
            <CardDescription>Monitor progress towards investment goals</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Set Goals</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Timeline View</CardTitle>
            <CardDescription>View investment timeline and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Timeline</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <LineChart className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Benchmarking</CardTitle>
            <CardDescription>Compare performance against benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Compare Performance</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 