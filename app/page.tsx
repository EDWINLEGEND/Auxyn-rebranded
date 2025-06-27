import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import { SceneContainer } from '@/components/scene-container';
import Link from 'next/link';
import { ArrowRight, Lightbulb, MessageSquare, LineChart, Database, Users, BarChart, Globe, Flag, Briefcase, DollarSign, Presentation, Sparkles, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Enhanced 3D Background Canvas */}
      <div className="fixed inset-0 -z-10 opacity-30">
        <SceneContainer />
      </div>
      
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full mix-blend-multiply blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full mix-blend-multiply blur-3xl animate-float animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full mix-blend-multiply blur-3xl animate-float animation-delay-4000"></div>
      </div>
      
      <Navbar />
      <main className="pt-16 relative">
        <HeroSection />
        
        {/* Enhanced Features Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/50 to-transparent dark:via-slate-800/50"></div>
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-700" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid-pattern)" />
              </svg>
            </div>
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
                All-in-One Startup Toolkit
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-clash font-bold tracking-tight mb-6">
                Everything You Need to{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 animate-gradient-x">
                  Launch & Scale
                </span>
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                From idea validation to investor pitch, our AI-powered platform guides you through every step of your startup journey
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* AI Idea Generator */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-3 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    AI Idea Generator
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Brainstorm innovative startup ideas based on your interests, skills, and market trends with our advanced AI engine.
                  </p>
                  <Link 
                    href="/ai"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    Generate Ideas
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* AI Startup Mentor */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-3 shadow-lg group-hover:shadow-green-500/25 transition-all duration-300 group-hover:scale-110">
                      <MessageSquare className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    AI Startup Mentor
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Get personalized guidance, feedback, and strategic advice from our AI mentor at every stage of your startup journey.
                  </p>
                  <Link 
                    href="/ai"
                    className="inline-flex items-center text-green-600 dark:text-green-400 font-semibold group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors"
                  >
                    Chat with Mentor
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Market Research */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-3 shadow-lg group-hover:shadow-teal-500/25 transition-all duration-300 group-hover:scale-110">
                      <LineChart className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    Market Research
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Access comprehensive industry analyses, competitor insights, and market trends to validate your startup idea.
                  </p>
                  <Link 
                    href="/ai/market-research"
                    className="inline-flex items-center text-teal-600 dark:text-teal-400 font-semibold group-hover:text-teal-700 dark:group-hover:text-teal-300 transition-colors"
                  >
                    Explore Markets
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Resource Hub */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 p-3 shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-110">
                      <Database className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    Resource Hub
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Discover funding opportunities, accelerator programs, and essential tools to grow your startup ecosystem.
                  </p>
                  <Link 
                    href="/ai/resources"
                    className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-semibold group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                  >
                    Find Resources
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Team Development */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 p-3 shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-110">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    Team Development
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Build your dream team with role recommendations, job description templates, and strategic hiring plans.
                  </p>
                  <Link 
                    href="/ai/development"
                    className="inline-flex items-center text-cyan-600 dark:text-cyan-400 font-semibold group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors"
                  >
                    Build Your Team
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
              
              {/* Progress Tracking */}
              <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-slate-200/50 dark:border-slate-700/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 p-3 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse"></div>
                  </div>
                  <h3 className="text-2xl font-clash font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Progress Tracking
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    Set milestones, track your progress, and stay on schedule with our comprehensive startup development roadmap.
                  </p>
                  <Link 
                    href="/ai/progress"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    Track Progress
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
} 