"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Rocket, TrendingUp, Users, BarChart3, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { authAPI, handleApiError, type User } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserTypeModal: React.FC<UserTypeModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleUserTypeSelection = async (userType: 'startup' | 'investor') => {
    setLoading(true);
    
    try {
      // Create a demo user session based on role selection
      // In a real app, you might want to have a proper signup flow
      const demoEmail = `demo-${userType}@auxyn.com`;
      const demoPassword = 'demo123';
      
      // Try to register/login with demo credentials
      try {
        await authAPI.register(demoEmail, demoPassword, userType);
      } catch (error) {
        // If registration fails (user exists), try login
        try {
          await authAPI.login(demoEmail, demoPassword);
        } catch (loginError) {
          throw new Error('Authentication failed. Please try again.');
        }
      }

      // Success! Navigate based on user type
      toast({
        title: "Welcome to Auxyn!",
        description: `Logged in as ${userType === 'startup' ? 'Startup Founder' : 'Investor'}`,
      });

      onClose();
      
      // Navigate to appropriate dashboard
      if (userType === 'startup') {
        router.push('/ai');
      } else {
        router.push('/investor');
      }

    } catch (error) {
      toast({
        title: "Error",
        description: handleApiError(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
                disabled={loading}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Startup Option */}
              <Card 
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 group"
                onClick={() => !loading && handleUserTypeSelection('startup')}
              >
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

                  <Button 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Start Building My Startup'
                    )}
                  </Button>
                </div>
              </Card>

              {/* Investor Option */}
              <Card 
                className="p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-green-200 dark:hover:border-green-800 group"
                onClick={() => !loading && handleUserTypeSelection('investor')}
              >
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

                  <Button 
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Explore Investment Opportunities'
                    )}
                  </Button>
                </div>
              </Card>
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