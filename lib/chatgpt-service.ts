import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as os from 'os';

// URL for your specific ChatGPT conversation - must be a valid shared link
const CHATGPT_URL = 'https://chat.openai.com/share/67e8dab3-a758-800b-a881-cef338991b9d';

// Class to handle ChatGPT interactions using Puppeteer
export class ChatGPTService {
  private browser: puppeteer.Browser | null = null;
  private page: puppeteer.Page | null = null;
  private isInitialized = false;
  private isInitializing = false;

  // Initialize the browser and page
  async initialize() {
    if (this.isInitialized) return;
    if (this.isInitializing) {
      // Wait for initialization to complete if already in progress
      while (this.isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      return;
    }

    this.isInitializing = true;

    try {
      console.log('Launching browser...');
      
      // Launch browser with headless mode false to help with CAPTCHA and login challenges
      this.browser = await puppeteer.launch({
        headless: false, // Set to false to make the browser visible for debugging and authentication
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
        ],
        defaultViewport: { width: 1280, height: 800 }
      });

      console.log('Browser launched, creating page...');
      
      // Create a new page
      this.page = await this.browser.newPage();
      
      // Set user agent to appear as a regular browser
      await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Add extra headers to appear more like a legitimate browser
      await this.page.setExtraHTTPHeaders({
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      });
      
      // Enable request interception for login flow if needed
      await this.page.setRequestInterception(true);
      this.page.on('request', (request) => {
        // Optimize page loading by blocking unnecessary resources
        const resourceType = request.resourceType();
        if (resourceType === 'image' || resourceType === 'font' || resourceType === 'media') {
          request.abort();
        } else {
          request.continue();
        }
      });
      
      console.log(`Navigating to ChatGPT URL: ${CHATGPT_URL}`);
      
      // Navigate to the ChatGPT URL with longer timeout
      await this.page.goto(CHATGPT_URL, { 
        waitUntil: 'networkidle2',
        timeout: 60000 // 60 second timeout
      });
      
      // Take a screenshot to see what the page looks like
      await this.page.screenshot({ path: 'public/images/debug-screenshots/chatgpt-loaded.png' });
      
      // Wait for the page to be fully loaded
      await this.page.waitForSelector('body', { timeout: 10000 });
      
      // Save a screenshot after initial loading
      await this.page.screenshot({ path: 'public/images/debug-screenshots/initial-page-load.png' });
      
      // Check if login is required
      const needsLogin = await this.checkIfLoginRequired();
      
      if (needsLogin) {
        console.log('Login required. Please log in manually in the browser window.');
        await this.page.screenshot({ path: 'public/images/debug-screenshots/login-required.png' });
        
        // Wait for login to complete (either manually or automatically)
        await this.waitForLoginToComplete();
      }
      
      console.log('Waiting for chat interface to be accessible...');
      
      // Give time for the page to fully render and be interactive
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Take a screenshot of the final state
      await this.page.screenshot({ path: 'chat-ready.png' });
      
      this.isInitialized = true;
      console.log('ChatGPT service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize ChatGPT service:', error);
      if (this.page) {
        await this.page.screenshot({ path: 'public/images/debug-screenshots/initialization-error.png' });
      }
      await this.cleanup();
      throw error;
    } finally {
      this.isInitializing = false;
    }
  }

  // Check if login is required
  private async checkIfLoginRequired(): Promise<boolean> {
    if (!this.page) return true;
    
    // Take screenshot before searching
            await this.page.screenshot({ path: 'public/images/debug-screenshots/checking-login.png' });
    
    return await this.page.evaluate(() => {
      // Check for common login elements
      const loginElements = document.querySelectorAll(
        'button[data-testid="login-button"], .login-button, ' +
        'button:has-text("Log in"), a:has-text("Log in"), ' +
        'a:has-text("Sign in"), form[action*="login"], ' +
        'input[name="username"], input[name="password"], ' +
        'input[placeholder*="email"], input[placeholder*="password"]'
      );
      
      // Check for CAPTCHA elements
      const captchaElements = document.querySelectorAll(
        'iframe[src*="recaptcha"], iframe[src*="captcha"], ' +
        'div[class*="captcha"], div[id*="captcha"]'
      );
      
      return loginElements.length > 0 || captchaElements.length > 0;
    });
  }
  
  // Wait for login to complete
  private async waitForLoginToComplete(): Promise<void> {
    if (!this.page) return;
    
    console.log('Waiting for the user to complete login...');
    
    // Wait for navigation after login
    try {
      // Wait up to 2 minutes for the user to log in
      await this.page.waitForNavigation({ 
        timeout: 120000,
        waitUntil: 'networkidle2'
      });
      
      console.log('Navigation detected after login');
    } catch (e) {
      console.log('No navigation occurred, continuing anyway');
    }
    
    // Additionally wait for certain elements to appear that indicate we're logged in
    try {
      await this.page.waitForSelector(
        'textarea, div[contenteditable="true"], ' +
        '.message-content, .conversation, [data-testid*="conversation"]',
        { timeout: 10000 }
      );
      
      console.log('Chat interface elements detected');
    } catch (e) {
      console.log('Could not detect chat interface elements, but continuing');
    }
    
    // Take a screenshot after login attempt
    await this.page.screenshot({ path: 'after-login-attempt.png' });
  }

  // Send a message to ChatGPT and get the response
  async sendMessage(message: string): Promise<string> {
    console.log(`Sending message: "${message.substring(0, 30)}..."`);
    
    try {
      if (!this.isInitialized || !this.page) {
        console.log('Service not initialized, initializing now...');
        await this.initialize();
      }

      if (!this.page) {
        throw new Error('Page not initialized');
      }

      // Take a screenshot before interaction
      await this.page.screenshot({ path: 'public/images/debug-screenshots/before-sending.png' });
      
      // Look for the Continue this conversation button and click it if found
      try {
        const continueButton = await this.page.$('button:has-text("Continue this conversation")');
        if (continueButton) {
          console.log('Found "Continue this conversation" button, clicking it');
          await continueButton.click();
          await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for the click to take effect
          await this.page.screenshot({ path: 'after-continue-button.png' });
        }
      } catch (e) {
        console.log('No continue button found or error clicking it:', e);
      }
      
      // Find the input element
      const inputSelector = await this.findInputElement();
      if (!inputSelector) {
        console.error('Could not find input element');
        await this.page.screenshot({ path: 'no-input-found.png' });
        throw new Error('Could not find input element on the page');
      }
      
      console.log(`Found input element with selector: ${inputSelector}`);
      
      // Click on the input field
      await this.page.click(inputSelector);
      
      // Clear any existing text
      await this.page.evaluate((selector) => {
        const element = document.querySelector(selector) as HTMLTextAreaElement | HTMLInputElement;
        if (element) {
          element.value = '';
        }
      }, inputSelector);
      
      // Type the message
      await this.page.type(inputSelector, message);
      await this.page.screenshot({ path: 'after-typing.png' });
      
      // Find and click the send button
      const sendButtonSelector = await this.findSendButton();
      if (sendButtonSelector) {
        console.log(`Clicking send button: ${sendButtonSelector}`);
        await this.page.click(sendButtonSelector);
      } else {
        console.log('No send button found, pressing Enter');
        await this.page.keyboard.press('Enter');
      }
      
      console.log('Message sent, waiting for response...');
      await this.page.screenshot({ path: 'after-sending.png' });
      
      // Wait for the response to be generated
      await this.waitForResponseGeneration();
      
      // Take screenshot after response
      await this.page.screenshot({ path: 'response-received.png' });
      
      // Extract the latest response from the chat
      const responseText = await this.extractLatestResponse();
      
      if (!responseText || responseText.trim() === '') {
        console.warn('Extracted empty response, trying alternate extraction method...');
        const alternateResponse = await this.tryAlternateExtractionMethods();
        
        if (alternateResponse && alternateResponse.trim() !== '') {
          console.log('Found response using alternate method');
          return alternateResponse.trim();
        }
        
        console.error('Failed to extract any response text');
        throw new Error('Could not extract response from ChatGPT');
      }
      
      console.log(`Got response: "${responseText.substring(0, 30)}..."`);
      return responseText.trim();
    } catch (error) {
      console.error('Error sending message to ChatGPT:', error);
      
      // Take a screenshot for debugging
      if (this.page) {
        await this.page.screenshot({ path: 'public/images/debug-screenshots/error-screenshot.png' });
      }
      
      // Try to restart browser on error
      await this.cleanup();
      this.isInitialized = false;
      
      throw error;
    }
  }
  
  // Find the input element on the page
  private async findInputElement(): Promise<string | null> {
    if (!this.page) return null;
    
    // Take screenshot before searching
    await this.page.screenshot({ path: 'searching-for-input.png' });
    
    // Common input selectors for ChatGPT
    const inputSelectors = [
      'textarea',
      'div[contenteditable="true"]',
      '[data-testid="chat-input"]',
      '.chat-input textarea',
      'textarea[placeholder*="message"]',
      'textarea[placeholder*="Send"]',
      '[role="textbox"]'
    ];
    
    // Try each selector
    for (const selector of inputSelectors) {
      const element = await this.page.$(selector);
      if (element) {
        const isVisible = await this.isElementVisible(element);
        if (isVisible) {
          return selector;
        }
      }
    }
    
    // If no selector works, try to find by attributes
    return await this.page.evaluate(() => {
      // Look for textarea or contenteditable elements
      const elements = [
        ...Array.from(document.querySelectorAll('textarea')),
        ...Array.from(document.querySelectorAll('div[contenteditable="true"]')),
        ...Array.from(document.querySelectorAll('[role="textbox"]'))
      ];
      
      // Filter for visible elements
      const visibleElements = elements.filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
               rect.bottom > 0 && rect.bottom <= window.innerHeight &&
               rect.right > 0 && rect.right <= window.innerWidth;
      });
      
      // Return the selector for the first visible element
      if (visibleElements.length > 0) {
        const el = visibleElements[0];
        if (el.id) return `#${el.id}`;
        if (el.className) return `.${el.className.split(' ').join('.')}`;
        return el.tagName.toLowerCase();
      }
      
      return null;
    });
  }
  
  // Find the send button
  private async findSendButton(): Promise<string | null> {
    if (!this.page) return null;
    
    // Common send button selectors
    const sendButtonSelectors = [
      'button[data-testid*="send"]',
      'button[aria-label*="Send"]',
      'button.send',
      'button[type="submit"]',
      'button:has-text("Send")'
    ];
    
    // Try each selector
    for (const selector of sendButtonSelectors) {
      const element = await this.page.$(selector);
      if (element) {
        const isVisible = await this.isElementVisible(element);
        if (isVisible) {
          return selector;
        }
      }
    }
    
    // If no button found, look for buttons with send icons
    return await this.page.evaluate(() => {
      // Find buttons with SVG icons
      const buttons = Array.from(document.querySelectorAll('button'));
      
      // Filter for visible buttons
      const visibleButtons = buttons.filter(button => {
        const rect = button.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 &&
               rect.bottom > 0 && rect.bottom <= window.innerHeight &&
               rect.right > 0 && rect.right <= window.innerWidth;
      });
      
      // Look for buttons near the textarea
      const textarea = document.querySelector('textarea');
      if (textarea) {
        const textareaRect = textarea.getBoundingClientRect();
        
        // Find buttons close to the textarea
        const nearbyButtons = visibleButtons.filter(button => {
          const rect = button.getBoundingClientRect();
          return Math.abs(rect.top - textareaRect.top) < 100 && 
                 Math.abs(rect.left - textareaRect.right) < 100;
        });
        
        if (nearbyButtons.length > 0) {
          const button = nearbyButtons[0];
          if (button.id) return `#${button.id}`;
          if (button.className) return `.${button.className.split(' ').join('.')}`;
          return button.tagName.toLowerCase();
        }
      }
      
      return null;
    });
  }
  
  // Check if an element is visible
  private async isElementVisible(element: puppeteer.ElementHandle): Promise<boolean> {
    return await this.page!.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 &&
             rect.bottom > 0 && rect.bottom <= window.innerHeight &&
             rect.right > 0 && rect.right <= window.innerWidth;
    }, element);
  }
  
  // Wait for the response to be generated
  private async waitForResponseGeneration(): Promise<void> {
    if (!this.page) throw new Error('Page not initialized');
    
    // First, wait a bit for any response to start appearing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check if there's any loading/typing indicator and wait for it to disappear
    const hasLoadingIndicator = await this.page.evaluate(() => {
      const indicators = document.querySelectorAll(
        '.result-streaming, .loading, .typing-indicator, ' +
        '[data-testid*="loading"], [aria-label*="Loading"]'
      );
      return indicators.length > 0;
    });
    
    if (hasLoadingIndicator) {
      console.log('Found loading indicator, waiting for it to disappear...');
      try {
        await this.page.waitForFunction(
          () => !document.querySelector(
            '.result-streaming, .loading, .typing-indicator, ' +
            '[data-testid*="loading"], [aria-label*="Loading"]'
          ),
          { timeout: 60000 }
        );
      } catch (e) {
        console.log('Timed out waiting for loading indicator to disappear');
      }
    } else {
      // If no loading indicator found, wait a reasonable time for the response
      console.log('No loading indicator found, waiting for general response time...');
      await new Promise(resolve => setTimeout(resolve, 15000));
    }
    
    // Wait an additional moment for the response to fully render
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  // Try alternate methods to extract response text
  private async tryAlternateExtractionMethods(): Promise<string> {
    if (!this.page) throw new Error('Page not initialized');
    
    return await this.page.evaluate(() => {
      // Method 1: Get paragraphs
      const paragraphs = document.querySelectorAll('p');
      if (paragraphs.length > 0) {
        const lastParagraphs = Array.from(paragraphs).slice(-5);
        return lastParagraphs.map(p => p.textContent || '').join('\n');
      }
      
      // Method 2: Get all visible text in the document
      return document.body.innerText;
    });
  }
  
  // Extract the latest response from the chat
  private async extractLatestResponse(): Promise<string> {
    if (!this.page) throw new Error('Page not initialized');
    
    // Try different selectors and methods to extract the response
    return await this.page.evaluate(() => {
      // Method 1: Look for response role messages
      const responseElements = document.querySelectorAll(
        '[data-message-author-role="assistant"], ' +
        '[data-testid*="conversation-turn-"], ' +
        '.message-content, .assistant-message, .response, .markdown-content'
      );
      
      if (responseElements.length > 0) {
        const lastElement = responseElements[responseElements.length - 1];
        return lastElement.textContent || '';
      }
      
      // Method 2: Look for chat message containers
      const messageContainers = document.querySelectorAll(
        '.conversation-turn, .chat-message, .message-container'
      );
      
      if (messageContainers.length > 0) {
        // Get the last few containers (in case the last one is the user's message)
        const lastContainers = Array.from(messageContainers).slice(-3);
        
        // Find the assistant's message
        for (let i = lastContainers.length - 1; i >= 0; i--) {
          const container = lastContainers[i];
          // Check if this is not the user's message
          if (!container.classList.contains('user') && 
              !container.querySelector('[data-message-author-role="user"]')) {
            return container.textContent || '';
          }
        }
      }
      
      // Method 3: Look for paragraphs within chat containers
      const chatContainer = document.querySelector('.conversation, .chat, .messages');
      if (chatContainer) {
        const paragraphs = chatContainer.querySelectorAll('p');
        if (paragraphs.length > 0) {
          // Get the text from the last few paragraphs
          const lastFewParagraphs = Array.from(paragraphs).slice(-3);
          const paragraphTexts: string[] = [];
          lastFewParagraphs.forEach(p => {
            paragraphTexts.push(p.textContent || '');
          });
          return paragraphTexts.join('\n');
        }
      }
      
      // Method 4: Just get all paragraphs
      const paragraphs = document.querySelectorAll('p');
      if (paragraphs.length > 0) {
        // Get the last few paragraphs
        const lastParagraphs = Array.from(paragraphs).slice(-3);
        const paragraphTexts: string[] = [];
        lastParagraphs.forEach(p => {
            paragraphTexts.push(p.textContent || '');
        });
        return paragraphTexts.join('\n');
      }
      
      // Method 5: Fallback - get content from div elements
      const divElements = document.querySelectorAll('div');
      const textContentDivs = Array.from(divElements)
        .filter(div => {
          const text = div.textContent || '';
          return text.length > 50 && // Reasonable length for a reply
                 !div.querySelector('input, button, textarea'); // Not an interactive element
        })
        .sort((a, b) => 
          (b.textContent?.length || 0) - (a.textContent?.length || 0)
        );
      
      if (textContentDivs.length > 0) {
        return textContentDivs[0].textContent || '';
      }
      
      return '';
    });
  }

  // Clean up resources
  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      this.isInitialized = false;
    }
  }
}

// Create a singleton instance
let chatGPTServiceInstance: ChatGPTService | null = null;

export function getChatGPTService(): ChatGPTService {
  if (!chatGPTServiceInstance) {
    chatGPTServiceInstance = new ChatGPTService();
  }
  return chatGPTServiceInstance;
}