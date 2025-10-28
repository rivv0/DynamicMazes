#!/bin/bash

echo "🚀 React Maze Game Deployment Script"
echo "======================================"

# Build the project
echo "📦 Building production version..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    echo ""
    echo "🌐 Deployment Options:"
    echo "1. Netlify Drop - Go to https://app.netlify.com/drop and drag the 'build' folder"
    echo "2. Surge.sh - Run: cd build && surge"
    echo "3. Vercel - Connect your GitHub repo to vercel.com"
    echo "4. GitHub Pages - Run: npm run deploy"
    echo ""
    echo "📁 Build folder is ready at: ./build"
    echo "📊 Bundle size: $(du -sh build | cut -f1)"
    echo ""
    echo "🎮 Your maze game is ready to deploy!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi