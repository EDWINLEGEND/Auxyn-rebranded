"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export const HeroSection = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const mockup = mockupRef.current;
    if (!mockup) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = mockup.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      mockup.style.transform = `
        perspective(1000px)
        rotateY(${x * 10}deg)
        rotateX(${-y * 10}deg)
      `;
    };
    
    mockup.addEventListener('mousemove', handleMouseMove);
    return () => mockup.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center md:text-left md:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold tracking-tight mb-6">
              Turn Ideas into <span className="bg-clip-text text-transparent bg-gradient-primary">Fundable Startups</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8">
              AI-powered guidance from validation to pitch deck. Get investor-ready in weeks, not years.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="/ai">
                <Button 
                  size="lg" 
                  className="btn-gradient-primary text-lg font-medium px-8 py-6 h-auto"
                >
                  Start Free Trial
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group flex items-center gap-2 text-lg font-medium h-auto px-6 py-6 border-slate-300 hover:border-slate-400 transition-colors"
              >
                <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-primary group-hover:scale-110 transition-transform">
                  <Play size={14} className="text-white ml-0.5" />
                </span>
                Watch Demo
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center md:justify-start gap-6">
              <p className="text-sm text-slate-500 dark:text-slate-400">Trusted by innovative teams at:</p>
              <div className="flex flex-wrap gap-8 opacity-70">
                <Image src="/images/logos/techcrunch-logo.png" alt="TechCrunch" width={100} height={30} className="h-6 w-auto object-contain" />
                <Image src="/images/logos/y-combinator-logo.png" alt="Y Combinator" width={100} height={30} className="h-6 w-auto object-contain" />
                <Image src="/images/logos/venture-beat-logo.png" alt="VentureBeat" width={100} height={30} className="h-6 w-auto object-contain" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full max-w-lg mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div 
              ref={mockupRef} 
              className="relative bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden will-change-transform"
            >
              <div className="bg-slate-900 h-10 flex items-center px-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 mb-4">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">Startup Dashboard</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">AI-Powered Guidance</p>
                  </div>
                  <div className="bg-gradient-primary text-white text-xs py-1 px-2 rounded-full">LIVE</div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center">
                      <span className="text-sky-600 dark:text-sky-400 text-lg font-bold">85</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Pitch Deck Score</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Last updated 2 hours ago</p>
                    </div>
                  </div>
                  
                  <div className="h-20 bg-slate-100 dark:bg-slate-700 rounded w-full relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Market Analysis Report</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-sky-100 dark:bg-sky-900/50 rounded p-3">
                      <h5 className="text-sm font-semibold">Investor Matches</h5>
                      <p className="text-2xl font-bold mt-2">24</p>
                    </div>
                    <div className="h-24 bg-emerald-100 dark:bg-emerald-900/50 rounded p-3">
                      <h5 className="text-sm font-semibold">Feedback Tasks</h5>
                      <p className="text-2xl font-bold mt-2">7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -z-10 top-1/2 right-1/4 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-float"></div>
            <div className="absolute -z-10 top-1/3 right-1/2 w-72 h-72 bg-cyan-200 dark:bg-cyan-900/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-70 animate-float animation-delay-2000"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Background gradient */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-50 dark:from-sky-900/10 to-transparent -z-10"></div>
    </section>
  );
}; 