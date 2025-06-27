"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { 
  Plus, 
  Menu, 
  X, 
  MessageSquare, 
  LayoutDashboard, 
  TrendingUp, 
  Briefcase, 
  Users, 
  BarChart2, 
  LineChart, 
  Presentation,
  Home,
  Search,
  DollarSign
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-white dark:bg-slate-900">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed z-50 p-2 text-slate-700 dark:text-white bg-white dark:bg-slate-800 rounded-md shadow-md md:hidden left-4 top-4"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Different behavior on mobile vs desktop */}
      <div 
        className={`
          fixed md:relative inset-y-0 left-0 z-40 
          w-72 bg-white dark:bg-slate-800 
          border-r border-slate-200 dark:border-slate-700
          transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          md:flex md:flex-col
        `}
      >
        {/* Overlay for mobile */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden" 
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
            <Link href="/" className="flex items-center gap-2">
              <img src="/images/Vector1.svg" alt="Auxyn Logo" className="w-8 h-8" />
              <span className="font-clash font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
                Auxyn
              </span>
            </Link>
            <ThemeToggle />
          </div>
          
          <div className="p-3">
            <Link href="/investor">
              <Button
                className="w-full flex items-center gap-2 justify-start bg-white dark:bg-slate-800 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <Plus size={16} />
                New Analysis
              </Button>
            </Link>
          </div>
          
          <nav className="overflow-y-auto flex-1 p-3 space-y-6">
            {/* Main Navigation */}
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 pl-3">
                MAIN NAVIGATION
              </div>
              <div className="space-y-1">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Button>
                </Link>
                <Link href="/investor/dashboard">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/dashboard" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>

            {/* AI Assistant */}
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 pl-3">
                AI ASSISTANT
              </div>
              <div className="space-y-1">
                <Link href="/investor">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    AI Chat
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Investment Tools */}
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 pl-3">
                INVESTMENT TOOLS
              </div>
              <div className="space-y-1">
                <Link href="/investor/startups">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/startups" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Search className="mr-2 h-4 w-4" />
                    Startup Discovery
                  </Button>
                </Link>
                <Link href="/investor/resources">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/resources" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Briefcase className="mr-2 h-4 w-4" />
                    Investment Resources
                  </Button>
                </Link>
                <Link href="/investor/development">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/development" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Portfolio Management
                  </Button>
                </Link>
                <Link href="/investor/market-research">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/market-research" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <BarChart2 className="mr-2 h-4 w-4" />
                    Market Analysis
                  </Button>
                </Link>
                <Link href="/investor/progress">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/progress" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <LineChart className="mr-2 h-4 w-4" />
                    Portfolio Tracking
                  </Button>
                </Link>
                <Link href="/investor/pitch-deck">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/pitch-deck" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <Presentation className="mr-2 h-4 w-4" />
                    Due Diligence
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Investment Analytics */}
            <div>
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 pl-3">
                ANALYTICS
              </div>
              <div className="space-y-1">
                <Link href="/investor/analytics">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/analytics" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Investment Analytics
                  </Button>
                </Link>
                <Link href="/investor/returns">
                  <Button
                    variant="ghost"
                    className={`w-full justify-start font-medium ${
                      pathname === "/investor/returns" 
                        ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white" 
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Returns Tracking
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-0">
        <main className="w-full h-full">
          {children}
        </main>
      </div>
    </div>
  );
} 