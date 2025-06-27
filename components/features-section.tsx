"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, LineChart, Presentation, Users, Bot, FileText } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: "AI Market Analysis",
      description: "Analyze market trends, identify competitors, and find your product niche with AI-powered market research."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Customer Validation",
      description: "Generate customer personas and validate your idea with synthetic user feedback before building."
    },
    {
      icon: <LineChart className="h-6 w-6" />,
      title: "Financial Modeling",
      description: "Create investor-ready financial projections with automated revenue, expense, and growth models."
    },
    {
      icon: <Presentation className="h-6 w-6" />,
      title: "Pitch Deck Builder",
      description: "Generate compelling pitch decks with key metrics, clear value propositions, and engaging visuals."
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Business Plan Writer",
      description: "Draft comprehensive business plans with market research, operational strategies, and growth forecasts."
    },
    {
      icon: <Check className="h-6 w-6" />,
      title: "Investor Matching",
      description: "Get matched with relevant investors based on your industry, stage, and business model."
    }
  ];

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="features" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-r from-sky-100 to-emerald-100 dark:from-sky-900/20 dark:to-emerald-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6">
            All-in-One <span className="bg-clip-text text-transparent bg-gradient-primary">Startup Toolkit</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Everything founders need to go from idea to investor meetings in one streamlined platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUpVariants}
              className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-primary mb-6 overflow-hidden">
                <div className="text-white z-10">
                  {feature.icon}
                </div>
                <div className="absolute inset-0 bg-white opacity-20"></div>
              </div>
              <h3 className="text-xl font-bold font-clash mb-4 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 