# GitHub Pages Deployment Guide

This guide explains how to deploy the MarketBuzzr landing page to GitHub Pages.

## Prerequisites

1. A GitHub repository (e.g., `marketbuzzr_landing_page`)
2. Node.js and Yarn installed
3. Git configured with your GitHub credentials

## Setup Steps

### 1. Install Dependencies

```bash
yarn install
```

### 2. Build and Deploy

```bash
yarn deploy
```

This command will:
- Build the production version of your site
- Deploy it to the `gh-pages` branch
- Make it available at `https://deg.github.io/marketbuzzr_landing_page/`

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch and **/ (root)** folder
6. Click **Save**

## Custom Domain (Optional)

If you have a custom domain:

1. Create a `CNAME` file in the `public` folder:
   ```
   yourdomain.com
   ```

2. Update `vite.config.js` to remove the base path:
   ```javascript
   base: process.env.NODE_ENV === 'production' ? '/' : '/'
   ```

## Manual Deployment

If you prefer manual deployment:

```bash
# Build the project
yarn build

# Deploy to gh-pages
yarn deploy
```

## Troubleshooting

- **404 errors**: Make sure the `base` path in `vite.config.js` matches your repository name
- **Assets not loading**: Check that all asset paths are relative
- **Build fails**: Ensure all dependencies are installed with `yarn install`

## URL Structure

- Development: `http://localhost:5173`
- Production: `https://deg.github.io/marketbuzzr_landing_page/`

## Updating the Site

To update your deployed site:

```bash
# Make your changes
git add .
git commit -m "Update landing page"
git push origin main

# Deploy changes
yarn deploy
```
