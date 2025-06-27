"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

export const CTASection = () => {
  const features = [
    "AI-powered market analysis",
    "Smart financial modeling",
    "Investor-ready pitch deck generator",
    "Business plan writer",
    "Weekly startup coaching",
    "Investor matchmaking"
  ];

  return (
    <section id="pricing" className="py-24 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50/70 via-white to-emerald-50/70 dark:from-sky-950/20 dark:via-slate-900 dark:to-emerald-950/20"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-primary">Launch Your Startup</span>?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Get started in minutes with our powerful platform. No credit card required.
          </p>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left side - Features list */}
            <div className="p-8 md:p-12 md:w-1/2">
              <h3 className="text-2xl font-clash font-bold mb-2">Founder Pro Plan</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold font-clash">$99</span>
                <span className="text-slate-500 dark:text-slate-400">/month</span>
              </div>
              
              <div className="mb-8">
                <Link href="/ai">
                  <Button className="w-full btn-gradient-primary text-base font-medium py-6 h-auto">
                    Start 14-Day Free Trial
                  </Button>
                </Link>
                <p className="text-xs text-center mt-2 text-slate-500 dark:text-slate-400">No credit card required</p>
              </div>
              
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-0.5 bg-gradient-primary rounded-full p-0.5 flex-shrink-0">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right side - Testimonial */}
            <div className="relative bg-gradient-primary text-white p-8 md:p-12 md:w-1/2 flex items-center">
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#grid)" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <blockquote className="text-xl font-medium italic mb-6">
                  "Our startup went from idea to funded in just 3 months using this platform. It's the most valuable investment we made."
                </blockquote>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                    <span className="font-bold">AC</span>
                  </div>
                  <div>
                    <p className="font-semibold">Alex Chen</p>
                    <p className="text-sm opacity-80">Founder, DataSync (Raised $2.4M)</p>
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