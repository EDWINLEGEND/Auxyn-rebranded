"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, Target, BarChart3, PieChart } from "lucide-react";

export default function InvestorReturnsPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600">
          <DollarSign className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-clash font-bold">Returns Tracking</h1>
          <p className="text-slate-600 dark:text-slate-400">Monitor and analyze your investment returns and performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle>Total Returns</CardTitle>
            <CardDescription>Overall portfolio return performance</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Returns</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
            <CardTitle>IRR Analysis</CardTitle>
            <CardDescription>Internal rate of return calculations</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Calculate IRR</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <PieChart className="h-8 w-8 text-purple-600 mb-2" />
            <CardTitle>Multiple Analysis</CardTitle>
            <CardDescription>Investment multiples and ratios</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Multiples</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-8 w-8 text-teal-600 mb-2" />
            <CardTitle>Exit Timeline</CardTitle>
            <CardDescription>Track exits and liquidity events</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Timeline</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Target className="h-8 w-8 text-orange-600 mb-2" />
            <CardTitle>Benchmarking</CardTitle>
            <CardDescription>Compare against market benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Compare Performance</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <DollarSign className="h-8 w-8 text-red-600 mb-2" />
            <CardTitle>Cash Flow</CardTitle>
            <CardDescription>Track cash flows and distributions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View Cash Flow</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 