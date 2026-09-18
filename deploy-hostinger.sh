#!/bin/bash

# Hostinger Deployment Script
# This script prepares the build for Hostinger deployment

echo "🚀 Starting Hostinger Deployment Process..."

# Step 1: Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist/
rm -rf deploy/

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 3: Build the project
echo "🔨 Building project..."
npm run build

# Step 4: Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p deploy

# Step 5: Copy build files to deploy folder
echo "📋 Copying build files..."
cp -r dist/* deploy/

# Step 6: Copy .htaccess to deploy folder
echo "📄 Copying .htaccess..."
cp .htaccess deploy/

# Step 7: Copy public assets (if any)
if [ -d "public" ]; then
    echo "🖼️  Copying public assets..."
    cp -r public/* deploy/ 2>/dev/null || true
fi

# Step 8: Create deployment info file
echo "📝 Creating deployment info..."
cat > deploy/DEPLOYMENT_INFO.txt << EOF
Hostinger Deployment Package
=============================
Generated: $(date)
Domain: sajidafridi.com

Files included:
- index.html (main entry point)
- assets/ (CSS, JS bundles)
- .htaccess (Apache configuration)
- robots.txt (SEO configuration)
- sitemap.xml (Search engine sitemap)
- favicon.svg (Site icon)
- og-image.svg (Social media preview)

Deployment Instructions:
1. Upload all files to public_html/ directory
2. Ensure .htaccess is in the root of public_html/
3. Set file permissions to 644 for files, 755 for directories
4. Visit https://sajidafridi.com to verify

Or use Hostinger Git Integration:
1. Connect your GitHub repository in Hostinger hPanel
2. Set deployment branch to 'main'
3. Set deployment directory to 'deploy/'
4. Auto-deploy will trigger on push to main
EOF

echo ""
echo "✅ Deployment package ready in 'deploy/' folder!"
echo ""
echo "Next steps:"
echo "1. Upload deploy/ contents to Hostinger public_html/"
echo "2. Or configure Hostinger Git Integration to auto-deploy"
echo ""
echo "For Git Integration setup, visit:"
echo "https://hpanel.hostinger.com/hosting/sajidafridi.com/git"
