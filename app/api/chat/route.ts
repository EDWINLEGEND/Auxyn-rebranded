import { NextRequest, NextResponse } from 'next/server';
import { getBotpressService } from '@/lib/botpress-service';
import { getGeminiService } from '@/lib/gemini-service';

// Startup ideas to present to the user
const startupIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Health Assistant",
    description: "App that analyzes health data and provides personalized wellness recommendations",
    marketOpportunity: "Growing health-conscious consumer market, $4.5 trillion wellness industry"
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description: "Platform connecting eco-conscious consumers with sustainable clothing brands",
    marketOpportunity: "Rising demand for sustainable products, $6.35 billion market growing at 9.1% CAGR"
  },
  {
    id: 3,
    title: "Smart Home Energy Management",
    description: "IoT system that optimizes home energy usage and reduces utility bills",
    marketOpportunity: "Increasing energy costs and environmental concerns, $12.8 billion market by 2025"
  },
  {
    id: 4,
    title: "Remote Team Collaboration Tool",
    description: "Platform to enhance productivity and communication for distributed teams",
    marketOpportunity: "Permanent shift to remote and hybrid work models, $16.6 billion market"
  },
  {
    id: 5,
    title: "Food Waste Reduction Platform",
    description: "App connecting restaurants and grocers with consumers to sell surplus food at discounts",
    marketOpportunity: "1.3 billion tons of food wasted annually, growing regulatory pressure"
  },
  {
    id: 6,
    title: "AR Education Content",
    description: "Augmented reality educational content for K-12 schools",
    marketOpportunity: "EdTech market projected to reach $404 billion by 2025, 16.3% CAGR"
  },
  {
    id: 7,
    title: "Elder Care Coordination Platform",
    description: "Service connecting seniors with care providers and family caregivers",
    marketOpportunity: "Aging population, 1.5 billion people over 65 by 2050"
  },
  {
    id: 8,
    title: "Mental Health Support App",
    description: "AI-driven platform providing personalized mental wellness resources and therapy connections",
    marketOpportunity: "Growing mental health awareness, $37.6 billion market"
  },
  {
    id: 9,
    title: "Small Business Financial Management Tool",
    description: "All-in-one financial dashboard for small businesses with AI-powered insights",
    marketOpportunity: "31.7 million small businesses in the US alone, underserved by current solutions"
  },
  {
    id: 10,
    title: "Peer-to-Peer Skill Exchange",
    description: "Platform for people to trade skills and services without monetary exchange",
    marketOpportunity: "Growing interest in alternative economies and skill development"
  },
  {
    id: 11,
    title: "Virtual Reality Fitness",
    description: "VR fitness experiences that make exercise engaging and gamified",
    marketOpportunity: "$16.8 billion fitness app market, increasing home workout trend"
  },
  {
    id: 12,
    title: "Sustainable Travel Planner",
    description: "App to plan eco-friendly travel experiences with carbon offset options",
    marketOpportunity: "83% of travelers consider sustainability important, $683 billion market"
  },
  {
    id: 13,
    title: "On-Demand Home Services Marketplace",
    description: "Platform connecting homeowners with vetted service providers",
    marketOpportunity: "$1.1 trillion home services market, growing consumer preference for convenience"
  },
  {
    id: 14,
    title: "Smart Agriculture Solutions",
    description: "IoT sensors and analytics for small and medium-sized farms",
    marketOpportunity: "Need for 70% increase in food production by 2050, $15.3 billion market"
  },
  {
    id: 15,
    title: "Personalized Learning Platform",
    description: "AI-driven education system adapting to individual learning styles and pace",
    marketOpportunity: "Growing demand for personalized education, $9.2 billion market"
  },
  {
    id: 16,
    title: "Circular Economy Marketplace",
    description: "Platform for businesses to buy, sell, and repurpose industrial waste materials",
    marketOpportunity: "$4.5 trillion opportunity in circular economy business models"
  },
  {
    id: 17,
    title: "Microlearning Content Platform",
    description: "Bite-sized professional development courses for busy professionals",
    marketOpportunity: "$21.6 billion corporate training market, attention economy needs"
  },
  {
    id: 18,
    title: "Digital Identity Verification",
    description: "Secure, privacy-focused identity verification for businesses and consumers",
    marketOpportunity: "Growing online fraud concerns, $17.6 billion market by 2026"
  },
  {
    id: 19,
    title: "Community-Based Childcare Network",
    description: "Platform connecting parents with vetted local childcare providers",
    marketOpportunity: "$54.3 billion childcare market, critical shortage of affordable options"
  },
  {
    id: 20,
    title: "Automated Legal Document Assistant",
    description: "AI tool that helps create and validate common legal documents",
    marketOpportunity: "$11.2 billion legal tech market, 80% of Americans can't afford legal help"
  }
];

// Fallback responses to use when direct ChatGPT integration fails
const fallbackResponses = [
  "I'm analyzing your startup idea. The market opportunity looks promising, especially if you focus on solving a real pain point for your target customers.",
  "That's an interesting approach. Have you considered validating this with potential users? Early feedback can help refine your value proposition.",
  "From a business perspective, you'll want to think about your revenue model and how you'll monetize this solution.",
  "Consider your go-to-market strategy. How will you reach your initial customers and create momentum?",
  "What differentiates your solution from existing alternatives? Identifying your unique value proposition is crucial.",
  "Scaling will be important once you've validated your idea. Think about what resources you'll need as you grow.",
  "The technology stack you choose should align with your business requirements and team expertise.",
  "Have you thought about potential partnerships or integrations that could strengthen your offering?",
  "User experience is critical for adoption. Make sure your solution is intuitive and solves the problem efficiently.",
  "Consider creating a simple prototype or MVP to test with real users before building the full solution."
];

// Track which ideas have been selected by the user
let userSelectedIdeas: number[] = [];

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API: Received request');
    
    // Parse the request body
    const body = await request.json();
    const { message, action, ideaId } = body;

    // Handle selecting an idea
    if (action === 'selectIdea' && ideaId) {
      // Add to selected ideas if not already selected
      if (!userSelectedIdeas.includes(ideaId)) {
        userSelectedIdeas.push(ideaId);
      }
      
      // Find the selected idea
      const selectedIdea = startupIdeas.find(idea => idea.id === ideaId);
      
      if (!selectedIdea) {
        return NextResponse.json({ error: 'Idea not found' }, { status: 404 });
      }
      
      // Extract the problem to solve from the description
      const problemToSolve = selectedIdea.description.split(" ")[0] === "App" || 
                             selectedIdea.description.split(" ")[0] === "Platform" || 
                             selectedIdea.description.split(" ")[0] === "Service" || 
                             selectedIdea.description.split(" ")[0] === "IoT" || 
                             selectedIdea.description.split(" ")[0] === "System" ? 
                             selectedIdea.description.split(" ").slice(2).join(" ") : 
                             selectedIdea.description;
      
      // Try to use Botpress for the roadmap generation
      try {
        const botpressService = getBotpressService();
        const response = await botpressService.generateRoadmap(selectedIdea.title, problemToSolve);
        console.log('Generated roadmap response:', response.substring(0, 100) + '...');
        
        return NextResponse.json({ 
          response, 
          selectedIdea, 
          action: 'developIdea'
        });
      } catch (botpressError) {
        console.error('Chat API: Error from Botpress service while generating roadmap:', botpressError);
        
        // Fallback if Botpress fails
        return NextResponse.json({ 
          response: `# Comprehensive Roadmap for ${selectedIdea.title}

## 1. Validation Phase (1-3 months)
- Conduct market research to validate the problem and solution fit
- Define your target audience and create customer personas
- Interview at least 20 potential customers to gather feedback
- Build a simple MVP focusing only on core functionality
- Set up key metrics to track user engagement and feedback

## 2. Building Phase (3-6 months)
- Assemble your core team (technical, marketing, operations)
- Select appropriate technology stack based on scalability needs
- Develop initial product with prioritized features
- Secure necessary intellectual property protections
- Begin alpha testing with a small group of users

## 3. Launch Phase (6-9 months)
- Finalize your go-to-market strategy
- Implement marketing campaigns across relevant channels
- Establish pricing model and payment infrastructure
- Create a detailed launch timeline with key milestones
- Prepare customer support systems

## 4. Growth Phase (9-18 months)
- Analyze user data to guide product improvements
- Explore funding options (bootstrapping, angel, VC)
- Develop partnerships to expand market reach
- Plan for geographic or product line expansion
- Optimize unit economics and growth metrics

## 5. Key Challenges and Solutions
- Anticipate competitive responses and differentiate your offering
- Address potential regulatory hurdles in your industry
- Plan for technical scaling challenges as user base grows
- Develop contingency plans for various market scenarios

This roadmap should be adjusted based on your specific circumstances, resources, and market conditions.`, 
          selectedIdea,
          action: 'developIdea'
        });
      }
    }
    
    // Handle request for startup ideas
    if (action === 'getIdeas') {
      return NextResponse.json({ 
        ideas: startupIdeas, 
        selectedIdeas: userSelectedIdeas,
        action: 'showIdeas'
      });
    }

    // Regular message handling
    if (!message) {
      console.log('Chat API: Missing message in request');
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    console.log(`Chat API: Processing message: "${message.substring(0, 30)}..."`);
    
    // Check if message is asking for ideas
    const isAskingForIdeas = /idea|startup|business|venture|concept|suggestion/i.test(message);
    
    if (isAskingForIdeas) {
      return NextResponse.json({ 
        response: "I have some startup ideas that might interest you. Would you like to see them?",
        action: 'promptForIdeas'
      });
    }

    // Check if user is confirming they want to see ideas
    const isConfirmingIdeas = /yes|yeah|sure|ok|show|list|tell me|give me/i.test(message);
    
    if (isConfirmingIdeas) {
      return NextResponse.json({ 
        ideas: startupIdeas, 
        selectedIdeas: userSelectedIdeas,
        action: 'showIdeas'
      });
    }

    try {
      // Regular Botpress response
      const botpressService = getBotpressService();
      const response = await botpressService.sendMessage(message);
      
      console.log('Chat API: Received response from Botpress service');
      return NextResponse.json({ response });
    } catch (serviceError) {
      console.error('Chat API: Error from Botpress service, using fallback response:', serviceError);
      
      // Use a fallback response if the Botpress service fails
      // Select a response based on the message content to give some variety
      const responseIndex = Math.floor(Math.abs(hashString(message)) % fallbackResponses.length);
      const fallbackResponse = fallbackResponses[responseIndex];
      
      // Wait a short time to simulate processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error('Chat API: Unexpected error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// Simple hash function to get a consistent number from a string
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}
