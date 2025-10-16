#!/bin/bash

# MarketBuzzr Landing Page - GitHub Pages Deployment Script

echo "🚀 Deploying MarketBuzzr Landing Page to GitHub Pages..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please initialize git first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
yarn install

# Build the project
echo "🔨 Building project..."
yarn build

# Deploy to GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
yarn deploy

echo "✅ Deployment complete!"
echo "🌍 Your site will be available at:"
echo "   - https://marketbuzzr.com (custom domain)"
echo "   - https://deg.github.io/marketbuzzr_landing_page/ (GitHub Pages)"
echo ""
echo "📝 Next steps for custom domain:"
echo "   1. Configure DNS records in GoDaddy (see CUSTOM_DOMAIN_SETUP.md)"
echo "   2. Enable GitHub Pages in your repository settings"
echo "   3. Add custom domain 'marketbuzzr.com' in GitHub Pages settings"
