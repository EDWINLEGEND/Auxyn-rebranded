import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { SceneContainer } from '@/components/scene-container';
import Link from 'next/link';
import { ArrowRight, Lightbulb, MessageSquare, LineChart, Database, Users, BarChart, Globe, Flag, Briefcase, DollarSign, Presentation } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 3D Background Canvas (position absolute) */}
      <div className="fixed inset-0 -z-10 opacity-20">
        <SceneContainer />
      </div>
      
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                All-in-One Startup Toolkit
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Everything you need to take your startup from idea to launch, all in one platform
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <Lightbulb className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Idea Generator</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Brainstorm innovative startup ideas based on your interests, skills, and market trends.
                </p>
                <Link 
                  href="/ai"
                  className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center group"
                >
                  Generate Ideas
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <MessageSquare className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI Startup Mentor</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Get personalized guidance, feedback, and advice from our AI mentor at every stage of your startup journey.
                </p>
                <Link 
                  href="/ai"
                  className="text-purple-600 dark:text-purple-400 font-medium inline-flex items-center group"
                >
                  Chat with Mentor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <LineChart className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Research</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Access industry analyses, competitor insights, and market trends to validate your startup idea.
                </p>
                <Link 
                  href="/ai/market-research"
                  className="text-green-600 dark:text-green-400 font-medium inline-flex items-center group"
                >
                  Explore Markets
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <Database className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Resource Hub</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Find funding opportunities, accelerator programs, and essential tools to grow your startup.
                </p>
                <Link 
                  href="/ai/resources"
                  className="text-amber-600 dark:text-amber-400 font-medium inline-flex items-center group"
                >
                  Find Resources
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-pink-100 dark:bg-pink-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <Users className="h-6 w-6 text-pink-700 dark:text-pink-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Team Development</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Build your dream team with role recommendations, job description templates, and hiring strategies.
                </p>
                <Link 
                  href="/ai/development"
                  className="text-pink-600 dark:text-pink-400 font-medium inline-flex items-center group"
                >
                  Build Your Team
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col">
                <div className="rounded-full bg-cyan-100 dark:bg-cyan-900 p-3 w-12 h-12 flex items-center justify-center mb-5">
                  <BarChart className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  Set milestones, track your progress, and stay on schedule with our startup development roadmap.
                </p>
                <Link 
                  href="/ai/progress"
                  className="text-cyan-600 dark:text-cyan-400 font-medium inline-flex items-center group"
                >
                  Track Progress
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 