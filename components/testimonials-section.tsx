"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "With Startup Simulator, we went from a rough idea to a fully formed business in just 6 weeks. Their AI market analysis saved us months of research.",
      author: "Jane Cooper",
      role: "Founder, TechFlow",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
      stars: 5
    },
    {
      quote: "The financial modeling tool is incredible. We generated a 5-year projection that our investors said was more detailed than what they see from experienced founders.",
      author: "Michael Foster",
      role: "CEO, InnovateCo",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      stars: 5
    },
    {
      quote: "Our pitch deck and business plan were completely transformed. We secured $1.2M in seed funding after just 3 investor meetings.",
      author: "Sophia Martinez",
      role: "Co-founder, GrowthLabs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      stars: 5
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <section id="testimonials" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-900/10 dark:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-clash font-bold mb-6">
            Trusted by <span className="bg-clip-text text-transparent bg-gradient-primary">Forward-Thinking Founders</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            See how entrepreneurs like you are using our platform to accelerate their startup journeys.
          </p>
        </div>

        <div className="relative">
          {/* Desktop Navigation Arrows */}
          <div className="hidden md:block absolute -left-5 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md hover:shadow-lg"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md hover:shadow-lg"
              onClick={scrollRight}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Testimonials Scroll Container */}
          <div
            ref={containerRef}
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide snap-x"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-full md:w-[400px] bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 snap-start"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-700 dark:text-slate-300 mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-slate-200 dark:ring-slate-700">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {testimonial.author}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <div className="flex-shrink-0 md:w-[200px]"></div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-6 md:hidden space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={scrollLeft}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={scrollRight}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Logo Cloud */}
        <div className="mt-20">
          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">
            AS FEATURED IN
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <Image src="/techcrunch-logo.png" alt="TechCrunch" width={130} height={30} className="h-6 w-auto object-contain" />
            <Image src="/fast-company-logo.png" alt="Fast Company" width={130} height={30} className="h-6 w-auto object-contain" />
            <Image src="/y-combinator-logo.png" alt="Y Combinator" width={130} height={30} className="h-6 w-auto object-contain" />
            <Image src="/venture-beat-logo.png" alt="VentureBeat" width={130} height={30} className="h-6 w-auto object-contain" />
            <Image src="/startup-insider-logo.png" alt="Startup Insider" width={130} height={30} className="h-6 w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}; 