// This script generates placeholder images with descriptive text for missing images
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Image categories and paths
const imageCategories = {
  root: [
    'default-segment.jpg',
    'healthcare-providers.jpg',
    'remote-professionals.jpg',
    'small-business-owners.jpg',
    'tech-startups.jpg'
  ],
  ideas: [
    'analytics-pro.jpg',
    'community-hub.jpg',
    'data-simplify.jpg',
    'default-idea.jpg',
    'eco-solutions.jpg',
    'expert-network.jpg',
    'health-assistant.jpg',
    'pro-insight.jpg',
    'quick-flow.jpg',
    'smart-connect.jpg',
    'smart-tracker.jpg'
  ],
  mentors: [
    'sarah-johnson.jpg',
    'michael-chen.jpg',
    'priya-patel.jpg',
    'david-rodriguez.jpg',
    'elena-kim.jpg'
  ],
  resources: [
    'founders-playbook.jpg',
    'pitch-deck.jpg',
    'metrics-dashboard.jpg',
    'legal-docs.jpg',
    'growth-hacking.jpg'
  ],
  logos: [
    'techcrunch-logo.png',
    'fast-company-logo.png',
    'y-combinator-logo.png',
    'venture-beat-logo.png',
    'startup-insider-logo.png',
    'default-logo.png'
  ]
};

// Colors for different categories
const categoryColors = {
  root: '#3498db',
  ideas: '#2ecc71',
  mentors: '#9b59b6',
  resources: '#e74c3c',
  logos: '#f39c12'
};

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Generate a placeholder image with text
function generatePlaceholderImage(text, color, width, height, filePath) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Wrap text if needed
  const words = text.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < canvas.width - 40) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Draw lines
  const lineHeight = 30;
  const startY = canvas.height / 2 - (lines.length - 1) * lineHeight / 2;
  
  lines.forEach((line, i) => {
    ctx.fillText(line, canvas.width / 2, startY + i * lineHeight);
  });

  // Save to file
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath}`);
}

// Generate a simple logo
function generateLogo(text, filePath) {
  const canvas = createCanvas(400, 100);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 400, 100);

  // Add text
  ctx.fillStyle = '#333333';
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 200, 50);

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
  console.log(`Generated: ${filePath}`);
}

// Create all placeholder images
function createAllPlaceholderImages() {
  const baseDirectory = path.join(__dirname, 'public', 'images');
  ensureDirectoryExists(baseDirectory);

  // Process each category
  for (const [category, images] of Object.entries(imageCategories)) {
    const categoryDir = path.join(baseDirectory, category);
    
    if (category !== 'root') {
      ensureDirectoryExists(categoryDir);
    }

    const color = categoryColors[category];
    
    // Generate images
    for (const image of images) {
      const imageName = path.basename(image);
      const nameWithoutExt = imageName.replace(/\.(jpg|png)$/, '');
      
      let destinationPath;
      if (category === 'root') {
        destinationPath = path.join(baseDirectory, image);
      } else {
        destinationPath = path.join(categoryDir, image);
      }

      // Generate appropriate placeholder
      if (category === 'logos') {
        generateLogo(nameWithoutExt.replace(/-/g, ' '), destinationPath);
      } else {
        const displayName = nameWithoutExt.replace(/-/g, ' ');
        generatePlaceholderImage(displayName, color, 800, 600, destinationPath);
      }
    }
  }

  console.log('All placeholder images generated successfully!');
}

// Check if canvas is available, if not provide instructions
try {
  createAllPlaceholderImages();
} catch (error) {
  console.error('Error generating images:', error.message);
  console.log('\nTo install the required dependencies for this script:');
  console.log('1. Run: npm install canvas');
  console.log('2. Then run this script again: node scripts/fix-images.js');
}
