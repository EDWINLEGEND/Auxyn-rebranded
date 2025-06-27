"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-50 dark:bg-slate-900/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* First column - Logo and description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/images/Vector1.svg" alt="Auxyn Logo" className="w-8 h-8" />
              <span className="font-clash font-bold text-xl bg-clip-text text-transparent bg-gradient-primary">
                Auxyn
              </span>
            </Link>
            
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              AI-powered guidance to take your startup from idea to investor meetings in record time.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>
          
          {/* Second column - Quick Links */}
          <div>
            <h3 className="font-clash font-bold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  API Documentation
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Third column - Support */}
          <div>
            <h3 className="font-clash font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Fourth column - Newsletter */}
          <div>
            <h3 className="font-clash font-bold text-lg mb-4">Subscribe</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Get the latest startup tips and resources delivered directly to your inbox.
            </p>
            
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white dark:bg-slate-800"
              />
              <Button className="bg-gradient-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; 2024 Auxyn. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}; 