#!/bin/bash

# Build script for Vercel deployment
# Handles rollup optional dependencies issue

echo "Starting build process..."

# Clean install with specific flags
echo "Installing dependencies..."
npm ci --legacy-peer-deps --no-optional

# Check if rollup platform packages are installed
echo "Checking rollup platform packages..."
if ! npm ls @rollup/rollup-linux-x64-gnu > /dev/null 2>&1; then
  echo "Installing missing rollup platform package..."
  npm install @rollup/rollup-linux-x64-gnu@^4.40.2 --no-save --legacy-peer-deps
fi

# Run the build
echo "Building application..."
npm run build

echo "Build completed successfully!"
