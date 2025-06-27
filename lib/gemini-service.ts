import { GoogleGenerativeAI } from '@google/generative-ai';

// Class to handle Gemini API interactions
export class GeminiService {
  private apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: string;

  constructor(apiKey: string, model: string = 'gemini-1.5-flash') {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = model;
    console.log(`Initialized Gemini service with model: ${model}`);
  }

  // Send a message to Gemini and get the response
  async generateRoadmap(startupIdea: string, problemToSolve: string): Promise<string> {
    try {
      console.log(`Generating roadmap for: "${startupIdea}"`);
      
      // Create the prompt with the startup idea
      const prompt = `Create a detailed startup roadmap for ${startupIdea} from ideation to scaling. Include key phases:

Ideation – Validate ${problemToSolve}, conduct market research, and analyze competitors.

Planning – Develop a business model, secure funding, and handle legal setup.

Development – Build the product/service, assemble a team, and achieve product-market fit.

Launch – Implement marketing strategies, acquire customers, and iterate based on feedback.

Growth – Scale operations, expand teams, and form strategic partnerships.

Sustainability – Ensure profitability, continuous innovation, and long-term success.

Format your response in markdown with clear headings, bullet points, and proper spacing between sections.`;

      // Get the Gemini model
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        }
      });
      
      // Generate content
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      
      // Format the response with proper markdown
      const formattedResponse = `# Comprehensive Roadmap for ${startupIdea}\n\n${text}`;
      
      return formattedResponse;
    } catch (error) {
      console.error('Error generating roadmap with Gemini:', error);
      
      // Return a fallback response if the API call fails
      return this.getFallbackRoadmap(startupIdea, problemToSolve);
    }
  }

  // Send a general message to Gemini and get the response
  async sendMessage(message: string): Promise<string> {
    try {
      console.log(`Sending message to Gemini: "${message.substring(0, 30)}..."`);
      
      // Get the Gemini model
      const model = this.genAI.getGenerativeModel({ 
        model: this.model,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        }
      });
      
      // Generate content
      const result = await model.generateContent(message);
      const response = result.response;
      const text = response.text();
      
      return text;
    } catch (error) {
      console.error('Error sending message to Gemini:', error);
      
      // Return a fallback response if the API call fails
      return "I'm your AI startup mentor. I'm here to help you validate and develop your startup ideas. What specific aspect of your startup would you like guidance on?";
    }
  }

  // Get a fallback roadmap response when the API fails
  private getFallbackRoadmap(startupIdea: string, problemToSolve: string): string {
    return `# Comprehensive Roadmap for ${startupIdea}

## 1. Validation Phase (1-3 months)
- Conduct market research to validate the problem and solution fit for ${problemToSolve}
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

This roadmap should be adjusted based on your specific circumstances, resources, and market conditions.`;
  }
}

// Create a singleton instance
let geminiServiceInstance: GeminiService | null = null;

// Get the Gemini service instance
export function getGeminiService(): GeminiService {
  if (!geminiServiceInstance) {
    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log('Using Gemini API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'undefined');
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not set');
    }
    
    geminiServiceInstance = new GeminiService(apiKey);
  }
  
  return geminiServiceInstance;
}
