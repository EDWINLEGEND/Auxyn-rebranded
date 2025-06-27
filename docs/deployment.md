# Deployment Guide for Startup Simulator

This guide provides instructions for deploying the Startup Simulator application to Vercel or Netlify.

## Pre-Deployment Checklist

1. Ensure all code changes are committed
2. Check that all environment variables are properly set
3. Verify the application builds successfully locally with `npm run build`

## Deploying to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications, as it offers optimized builds and zero configuration.

### Option 1: Using the Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign up or log in
2. Click "New Project" and import your GitHub repository
3. Select the Startup Simulator repository
4. Vercel will automatically detect Next.js settings
5. Click "Deploy"

### Option 2: Using the Vercel CLI

1. Install the Vercel CLI: `npm install -g vercel`
2. Log in to Vercel: `vercel login`
3. Navigate to your project directory and run: `npm run deploy:vercel`
4. Follow the prompts to complete the deployment

## Deploying to Netlify

### Option 1: Using the Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign up or log in
2. Click "New site from Git" and select your repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add this environment variable:
   - Key: `NETLIFY_NEXT_PLUGIN_SKIP`
   - Value: `true`
5. Click "Deploy site"

### Option 2: Using the Netlify CLI

1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Log in to Netlify: `netlify login`
3. Link your site: `netlify link`
4. Deploy the site: `npm run deploy:netlify`

## Environment Variables

If your application requires environment variables, add them to the respective platform:

- Vercel: Project Settings > Environment Variables
- Netlify: Site Settings > Build & Deploy > Environment Variables

## Troubleshooting

### Common Issues with Vercel Deployment

- **Build Failures**: Check build logs for specific errors.
- **Image Optimization**: If images aren't displaying correctly, verify your `next.config.js` settings.
- **API Routes Not Working**: Ensure your API routes follow the Next.js pattern.

### Common Issues with Netlify Deployment

- **Functions not working**: Check that the Netlify Next.js plugin is properly installed.
- **CSS/JS not loading**: Verify that your asset paths are correct.
- **Redirect issues**: Check your `netlify.toml` configuration.

## Post-Deployment

After successful deployment:

1. Verify all pages are working correctly
2. Check that images are loading properly
3. Test all interactive features
4. Verify mobile responsiveness
5. Run performance tests through Lighthouse

For any issues, refer to the respective platform's documentation:
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
