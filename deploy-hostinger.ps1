# Hostinger Deployment Script for Windows
# This script prepares the build for Hostinger deployment

Write-Host "🚀 Starting Hostinger Deployment Process..." -ForegroundColor Cyan

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
if (Test-Path "deploy") { Remove-Item -Recurse -Force "deploy" }

# Step 2: Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Step 3: Build the project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Step 4: Create deployment directory
Write-Host "📁 Creating deployment directory..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "deploy" | Out-Null

# Step 5: Copy build files to deploy folder
Write-Host "📋 Copying build files..." -ForegroundColor Yellow
Copy-Item -Path "dist\*" -Destination "deploy\" -Recurse -Force

# Step 6: Copy .htaccess to deploy folder
Write-Host "📄 Copying .htaccess..." -ForegroundColor Yellow
Copy-Item -Path ".htaccess" -Destination "deploy\.htaccess" -Force

# Step 7: Copy public assets (if any)
if (Test-Path "public") {
    Write-Host "🖼️  Copying public assets..." -ForegroundColor Yellow
    Copy-Item -Path "public\*" -Destination "deploy\" -Recurse -Force -ErrorAction SilentlyContinue
}

# Step 8: Create deployment info file
Write-Host "📝 Creating deployment info..." -ForegroundColor Yellow
$deploymentInfo = @"
Hostinger Deployment Package
=============================
Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
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
"@

$deploymentInfo | Out-File -FilePath "deploy\DEPLOYMENT_INFO.txt" -Encoding UTF8

Write-Host ""
Write-Host "✅ Deployment package ready in 'deploy/' folder!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Upload deploy/ contents to Hostinger public_html/" -ForegroundColor White
Write-Host "2. Or configure Hostinger Git Integration to auto-deploy" -ForegroundColor White
Write-Host ""
Write-Host "For Git Integration setup, visit:" -ForegroundColor Cyan
Write-Host "https://hpanel.hostinger.com/hosting/sajidafridi.com/git" -ForegroundColor White
