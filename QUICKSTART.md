# Quick Start Guide - Hostinger Deployment

Get your portfolio live on sajidafridi.com in 10 minutes!

## 🚀 Fast Track Deployment (GitHub Actions)

### Step 1: Get FTP Credentials (2 minutes)
1. Login to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Files → FTP Accounts**
3. Copy these details:
   - FTP Host: `ftp.sajidafridi.com`
   - FTP Username: `u123456789` (your actual username)
   - FTP Password: Create new or use existing

### Step 2: Add Secrets to GitHub (1 minute)
1. Go to your GitHub repository
2. Click **Settings → Secrets and variables → Actions**
3. Click **New repository secret** and add:
   ```
   Name: FTP_HOST
   Value: ftp.sajidafridi.com
   ```
   ```
   Name: FTP_USERNAME
   Value: u123456789
   ```
   ```
   Name: FTP_PASSWORD
   Value: your_password_here
   ```

### Step 3: Deploy (1 minute)
```bash
git add .
git commit -m "Deploy to Hostinger"
git push origin main
```

### Step 4: Monitor (2 minutes)
1. Go to **Actions** tab in GitHub
2. Watch "Deploy to Hostinger" workflow
3. Wait for ✅ green checkmark
4. Visit https://sajidafridi.com 🎉

---

## 📤 Alternative: Manual Upload (5 minutes)

If you prefer manual control:

### Windows Users
```powershell
# Run deployment script
npm run deploy:hostinger:win

# Upload deploy/ folder to Hostinger via FileZilla
```

### Mac/Linux Users
```bash
# Run deployment script
npm run deploy:hostinger

# Upload deploy/ folder to Hostinger via FileZilla
```

### Using Hostinger File Manager
1. Build: `npm run build`
2. Zip: `cd dist && zip -r ../deploy.zip . && cd ..`
3. Upload `deploy.zip` to `public_html/` via hPanel
4. Extract and upload `.htaccess`

---

## ✅ Verify Deployment

Check these URLs:
- ✅ https://sajidafridi.com (main site)
- ✅ https://sajidafridi.com/robots.txt (SEO config)
- ✅ https://sajidafridi.com/sitemap.xml (sitemap)
- ✅ https://sajidafridi.com/favicon.svg (icon)

---

## 🐛 Common Issues

### "404 Not Found" on page refresh
**Fix:** Upload `.htaccess` to `public_html/` root

### "White screen"
**Fix:** Check browser console, verify all files uploaded

### "FTP connection failed"
**Fix:** Verify credentials, check FTP is enabled in hPanel

---

## 📞 Need Help?

- **Hostinger Support**: support@hostinger.com
- **Deployment Guide**: [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md)
- **GitHub Actions Logs**: Repository → Actions tab

---

**That's it! Your portfolio is now live on Hostinger! 🚀**
