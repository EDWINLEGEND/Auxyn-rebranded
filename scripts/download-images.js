const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const imageCategories = {
  segments: [
    { name: 'default-segment.jpg', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
    { name: 'healthcare-providers.jpg', url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80' },
    { name: 'remote-professionals.jpg', url: 'https://images.unsplash.com/photo-1627662168223-7df99068099a?auto=format&fit=crop&w=800&q=80' },
    { name: 'small-business-owners.jpg', url: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80' },
    { name: 'tech-startups.jpg', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' }
  ],
  ideas: [
    { name: 'analytics-pro.jpg', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
    { name: 'community-hub.jpg', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80' },
    { name: 'data-simplify.jpg', url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80' },
    { name: 'default-idea.jpg', url: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&q=80' },
    { name: 'eco-solutions.jpg', url: 'https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80' },
    { name: 'expert-network.jpg', url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80' },
    { name: 'health-assistant.jpg', url: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=800&q=80' },
    { name: 'pro-insight.jpg', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80' },
    { name: 'quick-flow.jpg', url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80' },
    { name: 'smart-connect.jpg', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80' },
    { name: 'smart-tracker.jpg', url: 'https://images.unsplash.com/photo-1510019001271-6a13c6487a1e?auto=format&fit=crop&w=800&q=80' }
  ],
  mentors: [
    { name: 'sarah-johnson.jpg', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80' },
    { name: 'michael-chen.jpg', url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=800&q=80' },
    { name: 'priya-patel.jpg', url: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80' },
    { name: 'david-rodriguez.jpg', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80' },
    { name: 'elena-kim.jpg', url: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&w=800&q=80' }
  ],
  resources: [
    { name: 'founders-playbook.jpg', url: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=800&q=80' },
    { name: 'pitch-deck.jpg', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
    { name: 'metrics-dashboard.jpg', url: 'https://images.unsplash.com/photo-1548094990-c16ca90f1f0d?auto=format&fit=crop&w=800&q=80' },
    { name: 'legal-docs.jpg', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80' },
    { name: 'growth-hacking.jpg', url: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec?auto=format&fit=crop&w=800&q=80' }
  ],
  logos: [
    { name: 'logos/techcrunch-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' },
    { name: 'logos/fast-company-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' },
    { name: 'logos/y-combinator-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' },
    { name: 'logos/venture-beat-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' },
    { name: 'logos/startup-insider-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' },
    { name: 'logos/default-logo.png', url: 'https://cdn.logo.com/hotlink-ok/logo-social.png' }
  ]
};

// Create directories if they don't exist
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Creating directory: ${directory}`);
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Download an image from URL
function downloadImage(url, destinationPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destinationPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image, status code: ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${destinationPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destinationPath, () => {}); // Delete the file if there was an error
      reject(err);
    });
    
    file.on('error', (err) => {
      fs.unlink(destinationPath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
}

async function downloadAllImages() {
  const baseDirectory = path.join(__dirname, 'public', 'images');
  
  // Process each category
  for (const [category, images] of Object.entries(imageCategories)) {
    const categoryDir = path.join(baseDirectory, category);
    
    // Skip logos directory which has a different structure
    if (category !== 'logos') {
      ensureDirectoryExists(categoryDir);
    }
    
    // Download images
    for (const image of images) {
      let destinationPath;
      
      if (category === 'logos' || image.name.includes('/')) {
        // Handle logos or paths with subdirectories
        destinationPath = path.join(baseDirectory, image.name);
        ensureDirectoryExists(path.dirname(destinationPath));
      } else {
        destinationPath = path.join(categoryDir, image.name);
      }
      
      try {
        await downloadImage(image.url, destinationPath);
      } catch (error) {
        console.error(`Error downloading ${image.name}: ${error.message}`);
      }
    }
  }
  
  console.log('All images downloaded successfully!');
}

// Start the download process
downloadAllImages().catch(err => {
  console.error('Error in download process:', err);
});
