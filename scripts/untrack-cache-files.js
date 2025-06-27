const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Files and directories to untrack
const pathsToUntrack = [
  '.next/cache',
  '.next/server',
  '.next/trace'
];

try {
  console.log('Untracking Next.js cache files from Git...');
  
  // Check if .git directory exists (to make sure we're in a Git repository)
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    console.error('Error: Not a Git repository. Please run this script from the root of your Git repository.');
    process.exit(1);
  }

  // Untrack each path
  pathsToUntrack.forEach(pathToUntrack => {
    try {
      // Remove the path from Git tracking without deleting the files
      execSync(`git rm --cached -r "${pathToUntrack}"`, { stdio: 'pipe' });
      console.log(`✓ Untracked: ${pathToUntrack}`);
    } catch (err) {
      // If the path isn't tracked, that's fine
      console.log(`Note: ${pathToUntrack} is not currently tracked or doesn't exist.`);
    }
  });

  console.log('\nNext.js cache files have been untracked from Git.');
  console.log('These files will continue to change during development, but Git will ignore them.');
  console.log('\nTo complete the process:');
  console.log('1. Commit these changes: git commit -m "Stop tracking Next.js cache files"');
  console.log('2. Push to your repository if needed: git push');
} catch (error) {
  console.error('An error occurred:', error.message);
}
