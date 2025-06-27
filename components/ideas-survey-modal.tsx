"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Lightbulb, Check, ArrowRight, X, Loader2, Users, DollarSign } from 'lucide-react';
import Image from "next/image";

interface Question {
  id: number;
  text: string;
  options?: string[];
  type: 'multiple-choice' | 'yes-no' | 'scale' | 'text' | 'result';
  condition?: {
    questionId: number;
    value: any;
  };
}

interface StartupIdea {
  name: string;
  description: string;
  audience: string;
  monetization: string;
  techLevel: string;
}

interface IdeasSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (generatedPrompt: string) => void;
  onGeneratePrompt?: (prompt: string) => void;
}

export const IdeasSurveyModal: React.FC<IdeasSurveyModalProps> = ({ isOpen, onClose, onComplete, onGeneratePrompt }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [hasIdea, setHasIdea] = useState<boolean | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<StartupIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);

  // Separate question sets based on whether user has an idea or not
  const hasIdeaQuestions: Question[] = [
    {
      id: 1,
      text: "Do you already have a startup idea?",
      type: 'yes-no',
    },
    {
      id: 2,
      text: "What category does your idea fall under?",
      options: [
        "SaaS (Software as a Service)",
        "Mobile App",
        "Marketplace",
        "E-commerce",
        "Hardware/IoT",
        "AI/ML",
        "FinTech",
        "HealthTech",
        "EdTech",
        "Other"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: true }
    },
    {
      id: 3,
      text: "What domain or industry is your startup in?",
      options: [
        "Technology",
        "Healthcare",
        "Education",
        "Finance",
        "Retail/E-commerce",
        "Food & Beverage",
        "Entertainment",
        "Travel",
        "Real Estate",
        "Other"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: true }
    },
    {
      id: 4,
      text: "What phase are you currently in?",
      options: [
        "Ideation/Concept",
        "Validation/Research",
        "Building MVP",
        "Beta Testing",
        "Early Customers",
        "Growth/Scaling"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: true }
    },
    {
      id: 5,
      text: "Have you secured any funding?",
      options: [
        "No funding yet",
        "Self-funded/Bootstrapped",
        "Friends & Family",
        "Angel Investment",
        "Pre-seed/Seed Round",
        "Series A or beyond"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: true }
    },
    {
      id: 6,
      text: "What's your biggest challenge right now?",
      options: [
        "Validating the idea",
        "Building the product",
        "Finding customers",
        "Raising investment",
        "Marketing/Growth",
        "Team building",
        "Revenue model"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: true }
    },
    {
      id: 7,
      text: "We'll use this information to provide tailored guidance",
      type: 'result',
      condition: { questionId: 1, value: true }
    }
  ];

  const noIdeaQuestions: Question[] = [
    {
      id: 1,
      text: "Do you already have a startup idea?",
      type: 'yes-no',
    },
    {
      id: 8,
      text: "What industries are you most interested in?",
      options: [
        "Technology",
        "Healthcare",
        "Education",
        "Finance",
        "Retail/E-commerce",
        "Food & Beverage",
        "Entertainment",
        "Travel",
        "Real Estate",
        "Sustainability",
        "Social Impact"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: false }
    },
    {
      id: 9,
      text: "What skills or expertise do you have?",
      options: [
        "Software Development",
        "Design",
        "Marketing",
        "Finance",
        "Sales",
        "Operations",
        "Healthcare",
        "Education",
        "Data Analysis",
        "AI/Machine Learning"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: false }
    },
    {
      id: 10,
      text: "What's your level of technical expertise?",
      options: [
        "No technical background",
        "Some technical knowledge",
        "Technical but not a developer",
        "I'm a developer/engineer",
        "Technical team already in place"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: false }
    },
    {
      id: 11,
      text: "What kind of problems are you passionate about solving?",
      options: [
        "Efficiency/Productivity",
        "Access to Information",
        "Connections between People",
        "Health & Wellness",
        "Environmental Issues",
        "Education & Learning",
        "Financial Security",
        "Entertainment & Joy"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: false }
    },
    {
      id: 12,
      text: "What type of business model interests you?",
      options: [
        "Subscription/SaaS",
        "Marketplace",
        "E-commerce",
        "Freemium",
        "Ad-supported",
        "Transaction fees",
        "Service-based",
        "Hardware/product sales"
      ],
      type: 'multiple-choice',
      condition: { questionId: 1, value: false }
    },
    {
      id: 13,
      text: "Here are some startup ideas based on your answers",
      type: 'result',
      condition: { questionId: 1, value: false }
    }
  ];

  // Combine all questions
  const allQuestions = [...hasIdeaQuestions, ...noIdeaQuestions.filter(q => q.id !== 1)];
  
  // Get current question based on the path user is taking
  const getCurrentQuestion = () => {
    if (currentQuestionIndex === 0) {
      return allQuestions[0]; // First question is always "Do you have an idea?"
    }
    
    const filteredQuestions = allQuestions.filter(question => {
      // If no condition, or condition matches the answer to the referenced question
      if (!question.condition) return true;
      
      const { questionId, value } = question.condition;
      return answers[questionId] === value;
    });
    
    // Find the question at current index
    return allQuestions[currentQuestionIndex];
  };

  const getNextQuestionIndex = (currentQuestionId: number, answer: string) => {
    // If we're on first question, branch based on whether they have an idea
    if (currentQuestionId === 1) {
      const hasIdea = answer === "Yes";
      setHasIdea(hasIdea);
      
      // When they answer Yes (true), we want question id 2
      // When they answer No (false), we want question id 8
      const nextId = hasIdea ? 2 : 8;
      
      // Find index of that question in our allQuestions array
      return allQuestions.findIndex(q => q.id === nextId);
    }
    
    // Get the current path questions based on whether user has an idea
    const relevantQuestions = hasIdea ? hasIdeaQuestions : noIdeaQuestions;
    
    // Find the current question in the relevant questions array
    const currentQuestionIndex = relevantQuestions.findIndex(q => q.id === currentQuestionId);
    
    // If we're at the last question, return the index of the result question
    if (currentQuestionIndex === relevantQuestions.length - 2) {
      return allQuestions.findIndex(q => 
        q.type === 'result' && 
        q.condition?.questionId === 1 && 
        q.condition?.value === hasIdea
      );
    }
    
    // Otherwise, get the next question in the sequence
    const nextQuestion = relevantQuestions[currentQuestionIndex + 1];
    return allQuestions.findIndex(q => q.id === nextQuestion.id);
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion) return;
    
    // Update answers - ensure multiple-choice answers are always arrays
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: currentQuestion.type === 'multiple-choice' ? [answer] : answer
    }));
    
    // Get next question index
    const nextIndex = getNextQuestionIndex(currentQuestion.id, answer);
    
    if (nextIndex === -1) {
      // If there's no next question, show completion screen
      setShowCompletionScreen(true);
      if (!hasIdea) {
        generateIdeas();
      }
      return;
    }
    
    // Move to next question
    setCurrentQuestionIndex(nextIndex);
  };

  const handleIdeaSelection = (idea: string) => {
    setSelectedIdea(idea);
  };

  const goToNextQuestion = () => {
    const nextIndex = getNextQuestionIndex(currentQuestionIndex, "Yes");
    
    if (nextIndex >= 0) {
      setCurrentQuestionIndex(nextIndex);
      
      // If we're moving to the result screen and they don't have an idea, generate ideas
      if (allQuestions[nextIndex].type === 'result' && answers[1] === false) {
        generateIdeas();
      }
    }
  };

  const generateIdeas = () => {
    setIsGeneratingIdeas(true);
    
    // Extract key information from survey answers
    const hasIdea = answers["1"] === "Yes";
    const industry = hasIdea ? answers["2"] || "" : answers["8"] || "";
    const problem = hasIdea ? answers["3"] || "" : "";
    const audience = hasIdea ? answers["4"] || "" : answers["9"] || "";
    const differentiator = hasIdea ? answers["5"] || "" : "";
    const monetizationPreference = hasIdea ? answers["6"] || "" : answers["10"] || "";
    const techPreference = hasIdea ? "" : answers["11"] || "";
    
    // Sample ideas that could be generated based on user preferences
    const ideaPool: StartupIdea[] = [
      {
        name: "Tech Analytics Pro",
        description: `A ${industry} analytics platform that helps businesses ${problem ? `solve ${problem}` : "gain actionable insights"} for ${audience}.`,
        audience: audience || "Small to medium-sized businesses",
        monetization: monetizationPreference || "Subscription-based service with tiered pricing",
        techLevel: "Medium"
      },
      {
        name: "Health Assistant AI",
        description: `An AI-powered health monitoring system that ${problem ? `addresses ${problem}` : "tracks vital health metrics"} for ${audience}.`,
        audience: audience || "Health-conscious individuals",
        monetization: monetizationPreference || "Freemium model with premium features",
        techLevel: "High"
      },
      {
        name: "Smart Connect",
        description: `A ${industry} networking platform connecting ${audience} to ${differentiator ? differentiator : "resources and opportunities"}.`,
        audience: audience || "Professionals in specialized fields",
        monetization: monetizationPreference || "Commission on successful connections",
        techLevel: "Medium"
      },
      {
        name: "Eco Solutions",
        description: `Sustainable ${industry} solutions that help ${audience} ${problem ? `overcome ${problem}` : "reduce environmental impact"}.`,
        audience: audience || "Environmentally conscious consumers",
        monetization: monetizationPreference || "Product sales with service subscriptions",
        techLevel: "Low"
      },
      {
        name: "Quick Flow",
        description: `A streamlined ${industry} workflow tool for ${audience} that ${differentiator ? `features ${differentiator}` : "increases productivity"}.`,
        audience: audience || "Remote teams and freelancers",
        monetization: monetizationPreference || "Monthly subscription with team discounts",
        techLevel: "Medium"
      },
      {
        name: "Smart Tracker",
        description: `An IoT-based tracking solution for ${industry} that helps ${audience} ${problem ? `solve ${problem}` : "monitor assets efficiently"}.`,
        audience: audience || "Logistics companies and supply chain managers",
        monetization: monetizationPreference || "Hardware sales with software subscription",
        techLevel: "High"
      },
      {
        name: "Data Simplify",
        description: `A ${industry} data visualization tool that makes complex information accessible for ${audience}.`,
        audience: audience || "Non-technical professionals",
        monetization: monetizationPreference || "Freemium with enterprise licensing",
        techLevel: "Medium"
      },
      {
        name: "Community Hub",
        description: `An online community platform for ${audience} in the ${industry} space with ${differentiator ? differentiator : "exclusive content and networking"}.`,
        audience: audience || "Industry enthusiasts and professionals",
        monetization: monetizationPreference || "Advertising and premium memberships",
        techLevel: "Low"
      },
    ];
    
    // Filter ideas based on user preferences
    let filteredIdeas = [...ideaPool];
    
    if (techPreference) {
      const techLevelMap = {
        "I'm comfortable with advanced technology": "High",
        "I prefer a balance of tech and non-tech elements": "Medium",
        "I prefer less technical solutions": "Low"
      };
      filteredIdeas = filteredIdeas.filter(idea => 
        idea.techLevel === techLevelMap[techPreference as keyof typeof techLevelMap]
      );
    }
    
    // Ensure we have at least 3 ideas
    if (filteredIdeas.length < 3) {
      filteredIdeas = ideaPool;
    }
    
    // Randomly select 4 ideas
    const selectedIdeas: StartupIdea[] = [];
    while (selectedIdeas.length < 4 && filteredIdeas.length > 0) {
      const randomIndex = Math.floor(Math.random() * filteredIdeas.length);
      selectedIdeas.push(filteredIdeas[randomIndex]);
      filteredIdeas.splice(randomIndex, 1);
    }
    
    // Add detailed prompt generation
    const prompt = `Based on your responses, here are some startup ideas for the ${industry} industry targeting ${audience}. ${
      hasIdea ? `Your idea focusing on ${problem} with ${differentiator} as a differentiator is promising.` : 
      `You're interested in ${techPreference.toLowerCase().replace("I prefer ", "")} solutions.`
    } The monetization strategy of ${monetizationPreference} aligns well with these concepts.`;
    
    setTimeout(() => {
      setGeneratedIdeas(selectedIdeas);
      setIsGeneratingIdeas(false);
      if (onGeneratePrompt) {
        onGeneratePrompt(prompt);
      }
    }, 2000);
  };

  const generatePrompt = () => {
    let prompt = "";
    
    // Helper function to ensure value is an array
    const ensureArray = (value: any): string[] => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    };
    
    if (answers[1] === true) {
      // They have an idea
      const categories = ensureArray(answers[2]);
      const domains = ensureArray(answers[3]);
      const phase = ensureArray(answers[4]);
      const funding = ensureArray(answers[5]);
      const challenges = ensureArray(answers[6]);
      
      prompt = `I have a startup idea in the ${categories.join(", ")} category within the ${domains.join(", ")} industry. 
      I'm currently in the ${phase.join(", ")} phase and have ${funding.join(", ")} funding. 
      My biggest challenges right now are ${challenges.join(", ")}. 

      Please provide strategic guidance on how to move forward with my startup, focusing on addressing my main challenges and taking into account my current phase and funding situation.`;
    } else {
      // They don't have an idea but selected one from generated ideas
      if (selectedIdea) {
        const industries = ensureArray(answers[8]);
        const skills = ensureArray(answers[9]);
        const techLevel = ensureArray(answers[10]);
        const problems = ensureArray(answers[11]);
        const businessModels = ensureArray(answers[12]);
        
        prompt = `I'm interested in this startup idea: "${selectedIdea}"

        My background includes skills in ${skills.join(", ")} with ${techLevel.join(", ")} technical expertise. 
        I'm interested in the ${industries.join(", ")} industries and passionate about solving problems related to ${problems.join(", ")}.
        I'm considering a ${businessModels.join(", ")} business model.
        
        Please help me validate and develop this idea. Provide insights on market potential, possible challenges, and next steps for validating this concept.`;
      } else {
        // They didn't select an idea from the list
        const industries = ensureArray(answers[8]);
        const skills = ensureArray(answers[9]);
        const techLevel = ensureArray(answers[10]);
        const problems = ensureArray(answers[11]);
        const businessModels = ensureArray(answers[12]);
        
        prompt = `I'm looking for startup ideas that match my background and interests.
        
        I have skills in ${skills.join(", ")} with ${techLevel.join(", ")} technical expertise.
        I'm interested in the ${industries.join(", ")} industries and passionate about solving problems related to ${problems.join(", ")}.
        I'm considering a ${businessModels.join(", ")} business model.
        
        Please suggest 3-5 startup ideas that match my profile, with a brief explanation of the market opportunity for each.`;
      }
    }
    
    return prompt;
  };

  const handleFinish = () => {
    const generatedPrompt = generatePrompt();
    if (onComplete) {
      onComplete(generatedPrompt);
    }
    if (onGeneratePrompt) {
      onGeneratePrompt(generatedPrompt);
    }
    onClose();
  };

  const renderQuestion = () => {
    const question = getCurrentQuestion();
    if (!question) return null;
    
    switch (question.type) {
      case 'yes-no':
        return (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-clash font-bold mb-6">{question.text}</h2>
            <div className="flex gap-4">
              <Button 
                onClick={() => handleAnswer("Yes")}
                className="bg-gradient-primary text-white px-8 py-6 h-auto"
              >
                Yes, I do
              </Button>
              <Button 
                onClick={() => handleAnswer("No")}
                variant="outline"
                className="border-slate-300 hover:border-slate-400 px-8 py-6 h-auto"
              >
                No, I need ideas
              </Button>
            </div>
          </div>
        );
        
      case 'multiple-choice':
        const selectedOptions = answers[question.id] || [];
        
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-clash font-bold mb-6 text-center">{question.text}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md mb-6">
              {question.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-lg border transition-all
                    ${selectedOptions.includes(option) 
                      ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-600' 
                      : 'border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-800'
                    }
                  `}
                >
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                    ${selectedOptions.includes(option) 
                      ? 'bg-gradient-primary' 
                      : 'border border-slate-300 dark:border-slate-600'
                    }
                  `}>
                    {selectedOptions.includes(option) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-left">{option}</span>
                </button>
              ))}
            </div>
            <Button 
              onClick={goToNextQuestion}
              disabled={!selectedOptions.length}
              className="bg-gradient-primary text-white px-8 py-2 h-auto"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case 'result':
        // Different UI based on whether they have an idea
        if (answers[1] === true) {
          return (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl font-clash font-bold mb-2 text-center">
                Thanks for sharing details about your startup
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                We'll use this information to provide tailored guidance to help you move forward
              </p>
              <Button 
                onClick={handleFinish}
                className="mt-6 bg-gradient-primary text-white px-8 py-2 h-auto"
              >
                Start getting AI guidance
              </Button>
            </div>
          );
        } else {
          // No idea, showing generated ideas
          return (
            <div className="flex flex-col items-center w-full">
              <h2 className="text-xl font-clash font-bold mb-2 text-center">
                {isGeneratingIdeas ? "Generating startup ideas for you..." : "Here are startup ideas based on your preferences"}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
                {isGeneratingIdeas 
                  ? "Our AI is analyzing your responses to generate personalized startup ideas" 
                  : "Select an idea that interests you to explore further, or choose none to get general guidance"
                }
              </p>
              
              {isGeneratingIdeas ? (
                <div className="flex flex-col items-center gap-4 py-8">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-25 animate-ping"></div>
                    <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-primary rounded-full">
                      <Lightbulb className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400">This may take a moment...</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 gap-3 w-full max-h-[400px] overflow-y-auto py-2">
                    {generatedIdeas.map((idea, index) => (
                      <div 
                        key={index}
                        onClick={() => handleIdeaSelection(idea.name)}
                        className={`p-4 rounded-lg border transition-all cursor-pointer
                          ${selectedIdea === idea.name 
                            ? 'border-sky-500 bg-sky-50 dark:bg-sky-900/20 dark:border-sky-600' 
                            : 'border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-700'
                          }
                        `}
                      >
                        <p>{idea.name}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={handleFinish}
                    className="mt-6 bg-gradient-primary text-white px-8 py-2 h-auto"
                  >
                    {selectedIdea ? "Explore this idea with AI" : "Get general startup guidance"}
                  </Button>
                </>
              )}
            </div>
          );
        }
        
      default:
        return null;
    }
  };

  // Calculate progress
  const calculateProgress = () => {
    if (currentQuestionIndex === 0) return 0;
    
    // Determine which path we're on based on whether the user has an idea
    const hasIdeaValue = answers[1] === true;
    
    // Get relevant questions for this path
    const relevantQuestions = allQuestions.filter(q => 
      q.id === 1 || // Always include first question
      !q.condition || // Include questions with no condition
      (q.condition.questionId === 1 && q.condition.value === hasIdeaValue) // Include path-specific questions
    );
    
    // Find index of current question in relevant questions
    const currentQuestion = allQuestions[currentQuestionIndex];
    const questionIndex = relevantQuestions.findIndex(q => q.id === currentQuestion.id);
    
    // Calculate progress as percentage
    return Math.min(100, Math.max(0, ((questionIndex + 1) / relevantQuestions.length) * 100));
  };

  // Add idea images
  const ideaImages = {
    "Tech Analytics Pro": "/images/ideas/analytics-pro.jpg",
    "Health Assistant AI": "/images/ideas/health-assistant.jpg",
    "Smart Connect": "/images/ideas/smart-connect.jpg",
    "Eco Solutions": "/images/ideas/eco-solutions.jpg",
    "Quick Flow": "/images/ideas/quick-flow.jpg",
    "Smart Tracker": "/images/ideas/smart-tracker.jpg",
    "Data Simplify": "/images/ideas/data-simplify.jpg",
    "Community Hub": "/images/ideas/community-hub.jpg",
    "Pro Insight": "/images/ideas/pro-insight.jpg",
    "Expert Network": "/images/ideas/expert-network.jpg"
  };

  // Update completion screen
  {showCompletionScreen && (
    <div className="p-6">
      <h2 className="text-lg font-medium text-center mb-6">
        {isGeneratingIdeas ? (
          <span className="flex items-center gap-2 justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
            Generating startup ideas based on your preferences...
          </span>
        ) : (
          "Generated Startup Ideas"
        )}
      </h2>
      
      {!isGeneratingIdeas && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {generatedIdeas.map((idea, index) => (
              <div 
                key={index} 
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow dark:border-slate-700"
              >
                <div className="relative h-40 w-full">
                  <Image 
                    src={ideaImages[idea.name as keyof typeof ideaImages] || "/images/ideas/default-idea.jpg"}
                    alt={idea.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-medium text-xl">{idea.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{idea.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium">Target audience:</span> {idea.audience}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-slate-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600 dark:text-slate-400">
                        <span className="font-medium">Monetization:</span> {idea.monetization}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              These ideas are tailored to your preferences. You can explore them further with our AI startup mentor.
            </div>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      )}
    </div>
  )}

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6 max-w-xl w-full m-4 overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* Progress bar */}
            <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mb-6">
              <div 
                className="h-full bg-gradient-primary rounded-full"
                style={{ 
                  width: `${calculateProgress()}%`,
                  transition: 'width 0.5s ease'
                }}
              />
            </div>
            
            {renderQuestion()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 