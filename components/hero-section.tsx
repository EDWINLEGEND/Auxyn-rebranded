"use client";

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play, Sparkles, Zap, Star, ArrowRight } from "lucide-react";

export const HeroSection = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  useEffect(() => {
    const mockup = mockupRef.current;
    if (!mockup) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = mockup.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      
      mockup.style.transform = `
        perspective(1000px)
        rotateY(${x * 15}deg)
        rotateX(${-y * 15}deg)
        scale3d(1.02, 1.02, 1.02)
      `;
    };
    
    const handleMouseLeave = () => {
      mockup.style.transform = `
        perspective(1000px)
        rotateY(0deg)
        rotateX(0deg)
        scale3d(1, 1, 1)
      `;
    };
    
    mockup.addEventListener('mousemove', handleMouseMove);
    mockup.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      mockup.removeEventListener('mousemove', handleMouseMove);
      mockup.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <motion.section 
      ref={sectionRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
      style={{ y, opacity }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/40 to-cyan-50/80 dark:from-green-950/20 dark:via-blue-950/10 dark:to-cyan-950/20"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        {/* Mouse-following gradient */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-300"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center md:text-left md:max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Animated badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Startup Platform</span>
              <Zap className="h-4 w-4" />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-clash font-bold tracking-tight mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Turn Ideas into{' '}
              <span className="relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 animate-gradient-x">
                  Fundable Startups
                </span>
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="h-6 w-6 text-yellow-400 fill-current" />
                </motion.div>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI-powered guidance from validation to pitch deck. Get investor-ready in weeks, not years with our comprehensive startup toolkit.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/ai">
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-lg font-semibold px-8 py-6 h-auto rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group flex items-center gap-3 text-lg font-semibold h-auto px-6 py-6 border-2 border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-400 transition-all duration-300 rounded-2xl backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-green-500/10 before:to-blue-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              >
                <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-blue-500 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play size={16} className="text-white ml-0.5" />
                </span>
                Watch Demo
              </Button>
            </motion.div>

            {/* Enhanced trust indicators */}
            <motion.div 
              className="flex flex-wrap items-center justify-center md:justify-start gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Trusted by innovative teams at:</p>
              <div className="flex flex-wrap gap-8 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image src="/images/logos/techcrunch-logo.png" alt="TechCrunch" width={120} height={36} className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image src="/images/logos/y-combinator-logo.png" alt="Y Combinator" width={120} height={36} className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Image src="/images/logos/venture-beat-logo.png" alt="VentureBeat" width={120} height={36} className="h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="flex-1 w-full max-w-lg mx-auto relative"
            initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            {/* Enhanced floating elements */}
            <div className="absolute -z-10 inset-0">
              <motion.div 
                className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl shadow-xl"
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [0, 5, 0],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute top-1/3 -right-8 w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full shadow-xl"
                animate={{ 
                  y: [10, -10, 10],
                  rotate: [0, -5, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute bottom-1/4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-xl shadow-xl"
                animate={{ 
                  y: [-5, 15, -5],
                  rotate: [0, 10, 0],
                }}
                transition={{ 
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
            
            <div 
              ref={mockupRef} 
              className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden will-change-transform transition-all duration-300 hover:shadow-3xl"
            >
              {/* Enhanced browser chrome */}
              <div className="bg-gradient-to-r from-slate-800 to-slate-900 h-12 flex items-center px-4 gap-2">
                <div className="flex gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500 cursor-pointer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-slate-700 rounded-lg px-4 py-1 text-xs text-slate-300 font-mono">
                    auxyn.ai/dashboard
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4 mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg">Startup Dashboard</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      AI-Powered Guidance
                    </p>
                  </div>
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs py-2 px-3 rounded-full font-semibold shadow-lg"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    LIVE
                  </motion.div>
                </div>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200/50 dark:border-green-700/50"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center shadow-lg">
                      <span className="text-white text-lg font-bold">85</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">Pitch Deck Score</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Last updated 2 hours ago</p>
                    </div>
                    <motion.div
                      className="ml-auto"
                      animate={{ y: [-2, 2, -2] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-5 w-5 text-green-500" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="h-24 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-2xl relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm text-slate-600 dark:text-slate-300 font-medium">Market Analysis Report</p>
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-blue-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div 
                      className="h-28 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-4 border border-green-200/50 dark:border-green-700/50 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Investor Matches</h5>
                      <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">24</p>
                    </motion.div>
                    <motion.div 
                      className="h-28 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-700/50 shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Feedback Tasks</h5>
                      <p className="text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">7</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Enhanced background blobs */}
            <motion.div 
              className="absolute -z-20 top-1/2 right-1/4 w-80 h-80 bg-gradient-to-br from-green-300/30 to-emerald-300/30 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.div 
              className="absolute -z-20 top-1/3 right-1/2 w-72 h-72 bg-gradient-to-br from-blue-300/30 to-cyan-300/30 dark:from-blue-600/20 dark:to-cyan-600/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl"
              animate={{ 
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
              }}
              transition={{ 
                duration: 25,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}; 