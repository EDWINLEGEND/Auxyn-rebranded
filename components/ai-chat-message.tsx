"use client";

import React from 'react';
import { User, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useWebhookStatus, WebhookStatus } from '@/lib/use-webhook-status';

interface AiChatMessageProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

// Status indicator component
const StatusIndicator: React.FC<{ status: WebhookStatus }> = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-orange-500';
      case 'offline':
        return 'bg-red-500';
      case 'loading':
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`h-2 w-2 rounded-full ${getStatusColor()} inline-block mr-1.5`} />
  );
};

export const AiChatMessage: React.FC<AiChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.role === "user";
  const webhookStatus = useWebhookStatus();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? "justify-end" : ""}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
          <Bot className="text-white h-5 w-5" />
        </div>
      )}
      
      <div className={`max-w-[85%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div className={`
          rounded-lg px-4 py-3 
          ${isUser 
            ? "bg-gradient-primary text-white" 
            : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
          }
        `}>
          {isUser ? (
            message.content
          ) : (
            <div className="markdown-content">
              <ReactMarkdown>
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {isLoading && (
            <div className="flex space-x-1 mt-2 justify-center">
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          )}
        </div>
        
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center">
          {!isUser && <StatusIndicator status={webhookStatus} />}
          {isUser ? "You" : "Startup Mentor"}
        </div>
      </div>
      
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
          <User className="text-slate-700 dark:text-slate-300 h-5 w-5" />
        </div>
      )}
    </motion.div>
  );
};