"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Rocket, TrendingUp, Users, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserTypeModal: React.FC<UserTypeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Welcome to Auxyn
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose your path to get started with personalized tools and insights
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Startup Option */}
              <Link href="/ai" className="block">
                <Card className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <Rocket className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      I'm a Startup Founder
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                      Get AI-powered guidance to validate, develop, and scale your startup idea with personalized mentorship and tools.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>AI Startup Mentor & Idea Generator</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Market Research & Validation Tools</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Team Building & Resource Hub</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span>Progress Tracking & Pitch Deck Tools</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Start Building My Startup
                    </Button>
                  </div>
                </Card>
              </Link>

              {/* Investor Option */}
              <Link href="/investor" className="block">
                <Card className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 group">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      I'm an Investor
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                      Discover high-potential startups, analyze investment opportunities, and manage your portfolio with AI-driven insights.
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>AI Investment Advisor & Deal Flow</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                        <span>Startup Discovery & Due Diligence</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Portfolio Management & Analytics</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Market Analysis & Returns Tracking</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white">
                      Explore Investment Opportunities
                    </Button>
                  </div>
                </Card>
              </Link>
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Not sure which path is right for you?{" "}
                <button 
                  onClick={onClose}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Browse our features first
                </button>
              </p>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}; 