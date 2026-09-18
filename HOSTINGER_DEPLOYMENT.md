# Hostinger Deployment Guide

## 🚀 Deployment Options

This project supports three deployment methods to Hostinger:

1. **GitHub Actions (Recommended)** - Automated deployment on every push
2. **Manual FTP Upload** - Direct file upload via FileZilla or Hostinger File Manager
3. **Hostinger Git Integration** - Native Git deployment from Hostinger hPanel

---

## 📋 Prerequisites

- Hostinger hosting plan (Premium, Business, or Cloud)
- Domain configured (sajidafridi.com)
- GitHub repository connected to Hostinger
- FTP credentials (for manual deployment)

---

## 🎯 Method 1: GitHub Actions (Recommended)

### Setup Steps

1. **Get FTP Credentials from Hostinger**
   - Login to [hPanel](https://hpanel.hostinger.com)
   - Go to **Files → FTP Accounts**
   - Note down:
     - FTP Host (e.g., `ftp.sajidafridi.com`)
     - FTP Username (e.g., `u123456789`)
     - FTP Password (create new if needed)

2. **Add Secrets to GitHub**
   - Go to your GitHub repository
   - Navigate to **Settings → Secrets and variables → Actions**
   - Add these secrets:
     ```
     FTP_HOST=ftp.sajidafridi.com
     FTP_USERNAME=u123456789
     FTP_PASSWORD=your_ftp_password
     ```

3. **Push to Main Branch**
   ```bash
   git add .
   git commit -m "Setup Hostinger deployment"
   git push origin main
   ```

4. **Monitor Deployment**
   - Go to **Actions** tab in GitHub
   - Watch the "Deploy to Hostinger" workflow
   - Visit https://sajidafridi.com after completion

### Advantages
- ✅ Automatic deployment on every push
- ✅ Version control with rollback capability
- ✅ No manual file management
- ✅ Build happens on GitHub's servers (faster)

---

## 📤 Method 2: Manual FTP Upload

### Using FileZilla

1. **Build the Project**
   ```bash
   npm run build
   ```

2. **Connect to Hostinger**
   - Open FileZilla
   - Enter credentials:
     - Host: `ftp.sajidafridi.com`
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: 21

3. **Upload Files**
   - Navigate to local `dist/` folder
   - Navigate to remote `public_html/` folder
   - Upload all files from `dist/` to `public_html/`
   - Upload `.htaccess` to `public_html/` root

4. **Verify Deployment**
   - Visit https://sajidafridi.com
   - Check browser console for errors

### Using Hostinger File Manager

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Create ZIP Archive**
   ```bash
   cd dist
   zip -r ../deploy.zip .
   cd ..
   ```

3. **Upload via hPanel**
   - Go to **Files → File Manager**
   - Navigate to `public_html/`
   - Delete old files (backup first if needed)
   - Upload `deploy.zip`
   - Extract the ZIP file

4. **Upload .htaccess**
   - Upload `.htaccess` to `public_html/` root

---

## 🔗 Method 3: Hostinger Git Integration

### Setup Steps

1. **Enable Git in hPanel**
   - Go to **Advanced → Git**
   - Click **Enable Git**
   - Select your repository: `sajidafridi.com`

2. **Configure Deployment**
   - Repository URL: Your GitHub repo URL
   - Branch: `main`
   - Deployment directory: `public_html`
   - Build command: `npm install && npm run build`
   - Post-build command: `cp .htaccess dist/ && cp -r dist/* public_html/`

3. **Set Webhook (Optional)**
   - Copy the webhook URL
   - Add to GitHub repository settings
   - Enable auto-deploy on push

4. **Test Deployment**
   ```bash
   git push origin main
   ```

### Advantages
- ✅ Native Hostinger integration
- ✅ No external services needed
- ✅ Direct server access

---

## 🔐 Required Environment Variables

### For GitHub Actions
```env
FTP_HOST=ftp.sajidafridi.com
FTP_USERNAME=u123456789
FTP_PASSWORD=your_password
```

### For Local Development
```env
VITE_APP_URL=https://sajidafridi.com
VITE_ANALYTICS_ID=your_ga_id
```

---

## 📁 File Structure After Deployment

```
public_html/
├── index.html
├── .htaccess
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── og-image.svg
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [other chunks]
```

---

## ⚙️ .htaccess Configuration

The `.htaccess` file handles:

1. **SPA Routing** - All routes redirect to `index.html`
2. **Security Headers** - XSS protection, clickjacking prevention
3. **Compression** - Gzip for faster loading
4. **Caching** - Browser caching for static assets
5. **HTTPS Redirect** - Force secure connections (optional)

### Custom .htaccess Rules

To force HTTPS, uncomment these lines in `.htaccess`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🐛 Troubleshooting

### Issue: 404 on Page Refresh
**Solution:** Ensure `.htaccess` is uploaded to `public_html/` root

### Issue: White Screen
**Solution:** Check browser console for JavaScript errors. Verify all assets are uploaded.

### Issue: CSS/JS Not Loading
**Solution:** Check file paths in `index.html`. Ensure `base` path in `vite.config.ts` is correct.

### Issue: FTP Connection Failed
**Solution:** 
- Verify FTP credentials
- Check if FTP is enabled in hPanel
- Try passive mode in FileZilla

### Issue: Build Fails on GitHub
**Solution:**
- Check Node.js version (should be 20+)
- Verify all dependencies are in `package.json`
- Check GitHub Actions logs for specific errors

---

## 📊 Performance Optimization

### Enable Brotli Compression
Add to `.htaccess`:
```apache
<IfModule mod_brotli.c>
    AddOutputFilterByType BROTLI text/html text/css application/javascript
</IfModule>
```

### Enable HTTP/2
Contact Hostinger support to enable HTTP/2 for better performance.

### Optimize Images
- Use WebP format for images
- Add to `.htaccess`:
```apache
<IfModule mod_rewrite.c>
    RewriteCond %{HTTP_ACCEPT} image/webp
    RewriteCond %{REQUEST_FILENAME} (.*)\.(jpg|jpeg|png)$
    RewriteRule ^ %1.webp [L,T=image/webp]
</IfModule>
```

---

## 🔄 Rollback Procedure

### GitHub Actions Rollback
1. Go to **Actions** tab
2. Find the previous successful deployment
3. Click **Re-run jobs**

### Manual Rollback
1. Download previous build from GitHub releases
2. Upload via FTP/File Manager
3. Clear browser cache

---

## 📈 Monitoring

### Uptime Monitoring
- Use [UptimeRobot](https://uptimerobot.com) (free)
- Monitor https://sajidafridi.com

### Performance Monitoring
- Use [Google PageSpeed Insights](https://pagespeed.web.dev)
- Use [GTmetrix](https://gtmetrix.com)

### Error Tracking
- Check Hostinger error logs: **Advanced → Error Logs**
- Monitor browser console for client-side errors

---

## 🎓 Additional Resources

- [Hostinger Documentation](https://docs.hostinger.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## ✅ Deployment Checklist

- [ ] FTP credentials added to GitHub secrets
- [ ] `.htaccess` file created and tested
- [ ] Build process verified locally
- [ ] GitHub Actions workflow configured
- [ ] Domain DNS pointing to Hostinger
- [ ] SSL certificate installed
- [ ] robots.txt and sitemap.xml present
- [ ] Performance tested with PageSpeed Insights
- [ ] Mobile responsiveness verified
- [ ] All links and forms working

---

## 🆘 Support

If you encounter issues:
1. Check Hostinger error logs
2. Review GitHub Actions logs
3. Verify file permissions (644 for files, 755 for directories)
4. Contact Hostinger support: support@hostinger.com

---

**Last Updated:** 2026-01-XX  
**Deployment Method:** GitHub Actions + Hostinger FTP  
**Status:** ✅ Production Ready
