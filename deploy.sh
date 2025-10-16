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
echo "🌍 Your site should be available at: https://deg.github.io/marketbuzzr_landing_page/"
echo ""
echo "📝 Don't forget to:"
echo "   1. Enable GitHub Pages in your repository settings"
echo "   2. Set source to 'gh-pages' branch"
echo "   3. Your site URL: https://deg.github.io/marketbuzzr_landing_page/"
