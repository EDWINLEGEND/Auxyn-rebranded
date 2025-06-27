"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Zap, Trophy, TrendingUp, Users, DollarSign, CheckCircle, Play, Sparkles, Target, Rocket, Award } from "lucide-react";
import Link from 'next/link';

export const CTASection = () => {
  const [activeTab, setActiveTab] = useState('features');

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechFlow",
      image: "/images/mentors/sarah-johnson.jpg",
      quote: "Auxyn helped us secure $2M in seed funding within 6 months. The AI guidance was invaluable.",
      rating: 5,
      badge: "Series A"
    },
    {
      name: "Marcus Rodriguez",
      role: "CEO, DataVault",
      image: "/images/mentors/david-rodriguez.jpg",
      quote: "The market research tools saved us months of work. We found our perfect investor match.",
      rating: 5,
      badge: "Funded"
    },
    {
      name: "Emily Park",
      role: "Co-founder, GreenTech",
      image: "/images/mentors/elena-kim.jpg",
      quote: "From idea to pitch deck in 3 weeks. The AI mentor felt like having a co-founder.",
      rating: 5,
      badge: "YC Alumni"
    }
  ];

  const features = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "AI-Powered Insights",
      description: "Get personalized recommendations based on your industry and goals"
    },
    {
      icon: <Target className="h-5 w-5" />,
      title: "Smart Investor Matching",
      description: "Connect with investors who align with your vision and stage"
    },
    {
      icon: <Rocket className="h-5 w-5" />,
      title: "Pitch Deck Generator",
      description: "Create investor-ready presentations in minutes, not weeks"
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Market Analysis",
      description: "Deep insights into your target market and competition"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Startups Launched", icon: <Rocket className="h-5 w-5" /> },
    { value: "$500M+", label: "Funding Raised", icon: <DollarSign className="h-5 w-5" /> },
    { value: "95%", label: "Success Rate", icon: <Trophy className="h-5 w-5" /> },
    { value: "24/7", label: "AI Support", icon: <Sparkles className="h-5 w-5" /> }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-green-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-green-950/20"></div>
        
        {/* Animated background patterns */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="cta-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-green-200/50 dark:text-green-800/30" />
              </pattern>
              <radialGradient id="cta-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
              </radialGradient>
            </defs>
            <rect width="100" height="100" fill="url(#cta-grid)" />
            <rect width="100" height="100" fill="url(#cta-glow)" />
          </svg>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
              scale: [1.2, 1, 1.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
            <Award className="h-4 w-4" />
            Join 10,000+ Successful Founders
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold tracking-tight mb-6">
            Ready to Build Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 animate-gradient-x">
              Dream Startup?
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs who've turned their ideas into funded startups with our AI-powered platform
          </p>
        </motion.div>

        {/* Interactive Tabs */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'features', label: 'Key Features', icon: <Zap className="h-4 w-4" /> },
              { id: 'testimonials', label: 'Success Stories', icon: <Star className="h-4 w-4" /> },
              { id: 'stats', label: 'Our Impact', icon: <TrendingUp className="h-4 w-4" /> }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg shadow-green-500/25'
                    : 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.icon}
                {tab.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center mb-4 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover ring-2 ring-green-500/20"
                          />
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-2.5 w-2.5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                        </div>
                        <div className="px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full text-xs font-medium text-green-700 dark:text-green-300">
                          {testimonial.badge}
                        </div>
                      </div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 italic">"{testimonial.quote}"</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === 'stats' && (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300">
                          {stat.icon}
                        </div>
                        <div className="text-3xl md:text-4xl font-clash font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 mb-2">
                          {stat.value}
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 font-medium">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-r from-green-600 to-blue-600 p-12 rounded-3xl shadow-2xl backdrop-blur-sm">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-3xl md:text-4xl font-clash font-bold text-white mb-4">
                  Start Your Startup Journey Today
                </h3>
                <p className="text-xl text-green-100 mb-8">
                  Join 10,000+ founders who've successfully launched and scaled their startups with our AI platform
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link href="/ai">
                    <Button 
                      size="lg"
                      className="group relative overflow-hidden bg-white text-green-600 hover:text-green-700 text-lg font-bold px-8 py-6 h-auto rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started Free
                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className="group flex items-center gap-3 text-lg font-semibold h-auto px-6 py-6 border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm hover:shadow-lg"
                  >
                    <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/20 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Play size={16} className="text-white ml-0.5" />
                    </span>
                    Watch Demo
                  </Button>
                </div>
                
                <div className="mt-8 flex flex-wrap justify-center gap-8 text-green-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>No Credit Card Required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>14-Day Free Trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 