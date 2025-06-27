"use client";

import React, { useEffect, useState } from 'react';
import { User, Bot, CheckCircle2, AlertCircle, Clock, Wifi } from 'lucide-react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useWebhookStatus, WebhookStatus } from '@/lib/use-webhook-status';
import { formatTime } from "@/lib/utils";
import { TimeDisplay } from "@/components/ui/time-display";

interface AiChatMessageProps {
  message?: {
    role: "user" | "assistant";
    content: string;
  };
  isLoading?: boolean;
}

// Enhanced status indicator component with better styling
const StatusIndicator: React.FC<{ status: WebhookStatus }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-green-500',
          icon: <CheckCircle2 className="h-3 w-3 text-green-600" />,
          text: 'Online',
          textColor: 'text-green-600'
        };
      case 'degraded':
        return {
          color: 'bg-orange-500',
          icon: <AlertCircle className="h-3 w-3 text-orange-600" />,
          text: 'Degraded',
          textColor: 'text-orange-600'
        };
      case 'offline':
        return {
          color: 'bg-red-500',
          icon: <Wifi className="h-3 w-3 text-red-600" />,
          text: 'Offline',
          textColor: 'text-red-600'
        };
      case 'loading':
      default:
        return {
          color: 'bg-gray-500 animate-pulse',
          icon: <Clock className="h-3 w-3 text-gray-600" />,
          text: 'Connecting',
          textColor: 'text-gray-600'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${config.color}`} />
      <span className={`text-xs ${config.textColor} font-medium`}>
        {config.text}
      </span>
    </div>
  );
};

// Enhanced typing indicator with better animation
const TypingIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-lg"
  >
    <div className="flex space-x-1">
      <motion.div
        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.div
        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
    </div>
    <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">
      AI is thinking...
    </span>
  </motion.div>
);

export const AiChatMessage: React.FC<AiChatMessageProps> = ({ message, isLoading }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Safety check for undefined message
  if (!message && !isLoading) {
    return null;
  }
  
  const isUser = message?.role === "user";
  const webhookStatus = useWebhookStatus();

  // Show typing indicator when loading
  if (isLoading && !message) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-4"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bot className="text-white h-5 w-5" />
        </div>
        <div className="flex flex-col items-start">
          <TypingIndicator />
          <div className="mt-2 flex items-center gap-2">
            <StatusIndicator status={webhookStatus} />
          </div>
        </div>
      </motion.div>
    );
  }

  if (!message) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-4 ${isUser ? "justify-end" : ""} group`}
    >
      {!isUser && (
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bot className="text-white h-5 w-5" />
        </motion.div>
      )}
      
      <div className={`max-w-[85%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <motion.div 
          className={`
            rounded-2xl px-4 py-3 shadow-sm border transition-all duration-200
            ${isUser 
              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg hover:shadow-xl hover:shadow-blue-500/25 rounded-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
              : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 hover:shadow-md rounded-xl hover:shadow-slate-500/10 transition-all duration-300 hover:-translate-y-0.5"
            }
          `}
          whileHover={{ scale: 1.01 }}
          layout
        >
          {isUser ? (
            <div className="text-sm leading-relaxed">
              {message.content}
            </div>
          ) : (
            <div className="markdown-content prose prose-sm dark:prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-blue-600 dark:text-blue-400">{children}</strong>,
                  em: ({ children }) => <em className="italic text-slate-600 dark:text-slate-400">{children}</em>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>,
                  li: ({ children }) => <li className="text-sm leading-relaxed">{children}</li>,
                  code: ({ children }) => (
                    <code className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 mt-2 pt-2 border-t border-white/20"
            >
              <div className="flex space-x-1">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-white/70"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </div>
              <span className="text-xs text-white/70">Processing...</span>
            </motion.div>
          )}
        </motion.div>
        
        <motion.div 
          className="mt-2 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {!isUser && <StatusIndicator status={webhookStatus} />}
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {isUser ? "You" : "AI Startup Mentor"}
          </span>
          <span className="text-xs text-slate-400 dark:text-slate-500">
            {mounted ? formatTime(new Date()) : null}
          </span>
        </motion.div>
      </div>
      
      {isUser && (
        <motion.div 
          className="w-10 h-10 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <User className="text-slate-700 dark:text-slate-300 h-5 w-5" />
        </motion.div>
      )}
    </motion.div>
  );
};