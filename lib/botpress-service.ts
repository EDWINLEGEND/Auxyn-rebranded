// Service to handle Botpress webhook interactions
export class BotpressService {
  private webhookUrl: string;

  constructor(webhookUrl: string) {
    this.webhookUrl = webhookUrl;
    console.log('Initialized Botpress service');
  }

  async sendMessage(message: string): Promise<string> {
    try {
      console.log(`Sending message to Botpress: "${message.substring(0, 30)}..."`);

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'text',
          text: message,
          // Add conversation ID to maintain context
          conversationId: 'startup-simulator',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Handle different response formats
      if (Array.isArray(data)) {
        return data[0]?.text || 'No response received';
      } else if (data.responses && Array.isArray(data.responses)) {
        return data.responses[0]?.text || 'No response received';
      } else if (typeof data === 'string') {
        return data;
      }
      return 'No response received';
    } catch (error) {
      console.error('Error sending message to Botpress:', error);
      throw error;
    }
  }

  async generateRoadmap(ideaTitle: string, problemToSolve: string): Promise<string> {
    const prompt = `Generate a detailed startup roadmap for "${ideaTitle}" that solves: "${problemToSolve}"

Please provide a comprehensive roadmap covering these essential aspects:

1. Market Research & Validation (2-3 months)
- Target market analysis
- Competitor research
- Customer interviews
- MVP definition

2. Product Development (4-6 months)
- Core features
- Technology stack
- Development milestones
- Testing strategy

3. Go-to-Market Strategy (2-3 months)
- Marketing channels
- User acquisition plan
- Pricing strategy
- Launch timeline

4. Growth & Scale (6-12 months)
- Revenue targets
- Team expansion
- Feature roadmap
- Partnership strategy

5. Key Metrics & Goals
- Success metrics
- Growth targets
- Revenue projections
- Market share goals

Format the response in clear Markdown with bullet points and specific timelines for each phase.`;

    return this.sendMessage(prompt);
  }
}

// Singleton instance
let botpressServiceInstance: BotpressService | null = null;

export function getBotpressService(): BotpressService {
  if (!botpressServiceInstance) {
    const webhookUrl = 'https://webhook.botpress.cloud/10bd40c2-2f13-4bec-a0b2-7484aa343081';
    botpressServiceInstance = new BotpressService(webhookUrl);
  }
  return botpressServiceInstance;
}
