"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lightbulb, Check, ArrowRight, BarChart3 } from 'lucide-react';

interface StartupIdea {
  id: number;
  title: string;
  description: string;
  marketOpportunity: string;
}

interface StartupIdeasGridProps {
  ideas: StartupIdea[];
  selectedIdeas?: number[];
  onSelectIdea: (ideaId: number) => void;
  onAnalyzeSelected?: () => void;
  onClose?: () => void;
}

export const StartupIdeasGrid: React.FC<StartupIdeasGridProps> = ({ 
  ideas, 
  selectedIdeas = [], 
  onSelectIdea,
  onAnalyzeSelected,
  onClose
}) => {
  
  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Lightbulb className="h-6 w-6 text-blue-500 mr-3" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Startup Ideas</h2>
          </div>
          <div className="flex items-center gap-2">
            {onAnalyzeSelected && selectedIdeas.length > 0 && (
              <Button
                onClick={onAnalyzeSelected}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                size="sm"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Selected ({selectedIdeas.length})
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Close
              </Button>
            )}
          </div>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Select ideas to develop them with AI assistance. You can select multiple ideas for comparison.
        </p>
      </div>
      
      <div className="p-6 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ideas.map((idea) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedIdeas.includes(idea.id)
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700'
              }`}
              onClick={() => onSelectIdea(idea.id)}
            >
              <div className="flex items-start">
                <div className={`mt-0.5 mr-3 rounded-full flex-shrink-0 w-6 h-6 flex items-center justify-center ${
                  selectedIdeas.includes(idea.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  {selectedIdeas.includes(idea.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{idea.id}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{idea.title}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{idea.description}</p>
                  <div className="mt-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                    <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                      Market: {idea.marketOpportunity}
                    </p>
                  </div>
                  {selectedIdeas.includes(idea.id) && (
                    <Button
                      size="sm"
                      className="mt-3 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectIdea(idea.id);
                      }}
                    >
                      Develop This Idea <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {selectedIdeas.length > 0 && onAnalyzeSelected && (
          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-700">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-200">
                  {selectedIdeas.length} idea{selectedIdeas.length > 1 ? 's' : ''} selected
                </h4>
                <p className="text-sm text-green-600 dark:text-green-300">
                  Click "Analyze Selected" to get AI insights and comparisons
                </p>
              </div>
              <Button
                onClick={onAnalyzeSelected}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analyze Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
