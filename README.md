# Sajid Afridi - AI Governance Architect Portfolio

A cinematic, dark-themed digital CV showcasing expertise in AI Governance, MLOps, Zero Trust Architecture, and Physical AI systems.

![Portfolio Preview](public/og-image.svg)

## 🌟 Features

- **Interactive 3D Background**: Neural network visualization with mouse-reactive particles
- **Cinematic Animations**: Blur-to-focus text reveals using Framer Motion
- **Live PoC Lab**: Three interactive proof-of-concept modules
  - Zero-Trust Terminal (interactive command interface)
  - MLOps Pipeline Monitor (drift detection & rollback)
  - SCADA Batch Line HMI (fault injection simulation)
- **Mobile Optimized**: Dynamic viewport handling with `useDynamicVH` hook
- **SEO & AI Search Optimized**: Comprehensive JSON-LD schema, structured data, and AI crawler support
- **Accessibility**: WCAG AAA compliant contrast ratios (10.5:1)
- **Performance**: Core Web Vitals optimized (LCP: ~2.0s, FCP: ~1.2s)

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Deployment**: Hostinger (Apache + FTP/Git)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/sajidafridi.com.git
cd sajidafridi.com

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to Hostinger

### Method 1: GitHub Actions (Recommended)

1. **Configure FTP Secrets in GitHub**
   - Go to repository Settings → Secrets and variables → Actions
   - Add these secrets:
     ```
     FTP_HOST=ftp.sajidafridi.com
     FTP_USERNAME=your_ftp_username
     FTP_PASSWORD=your_ftp_password
     ```

2. **Push to Main Branch**
   ```bash
   git push origin main
   ```
   GitHub Actions will automatically build and deploy to Hostinger.

### Method 2: Manual Deployment

```bash
# Run deployment script
npm run deploy:hostinger

# Upload deploy/ folder contents to Hostinger public_html/
```

### Method 3: Hostinger Git Integration

1. Enable Git in Hostinger hPanel (Advanced → Git)
2. Connect your GitHub repository
3. Set deployment directory to `public_html`
4. Configure auto-deploy on push to `main`

📖 **Detailed deployment instructions**: See [HOSTINGER_DEPLOYMENT.md](./HOSTINGER_DEPLOYMENT.md)

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Hero.tsx              # Main hero section with animated name
│   │   ├── Marquee.tsx           # Scrolling keywords ticker
│   │   ├── Profile.tsx           # About section with stats
│   │   ├── Competencies.tsx      # Skills grid
│   │   ├── Experience.tsx        # Work history timeline
│   │   ├── PoCLab.tsx            # Interactive demos container
│   │   ├── Ecosystem.tsx         # Community & leadership
│   │   ├── Contact.tsx           # Contact form & links
│   │   └── pocs/
│   │       ├── TerminalPoc.tsx   # Zero-Trust terminal
│   │       ├── PipelinePoc.tsx   # MLOps pipeline monitor
│   │       └── ScadaPoc.tsx      # SCADA HMI demo
│   ├── hooks/
│   │   └── useDynamicVH.ts       # Mobile viewport fix
│   ├── data/
│   │   └── cv.ts                 # All CV content data
│   ├── App.tsx                   # Main app component
│   └── index.css                 # Global styles & animations
├── public/
│   ├── robots.txt                # AI crawler configuration
│   ├── sitemap.xml               # Search engine sitemap
│   ├── favicon.svg               # Site icon
│   └── og-image.svg              # Social media preview
├── .htaccess                     # Apache configuration
├── .github/
│   └── workflows/
│       └── deploy-hostinger.yml  # GitHub Actions deployment
├── deploy-hostinger.sh           # Deployment script (Linux/Mac)
└── HOSTINGER_DEPLOYMENT.md       # Deployment guide
```

## 🎨 Customization

### Update Personal Information

Edit `src/data/cv.ts` to update:
- Name and handle
- Contact information
- Work experience
- Skills and competencies
- Education and certifications

### Modify Colors

Edit `src/index.css` theme variables:
```css
@theme {
  --color-void: #000000;      /* Background */
  --color-ink: #e8e8e8;       /* Primary text */
  --color-dim: #d0d0d0;       /* Secondary text */
  --color-signal: #8fd0e0;    /* Accent color */
}
```

### Adjust Animations

Modify Framer Motion variants in individual components:
```tsx
const item = {
  hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" }
};
```

## 🔍 SEO & AI Search Optimization

The site is optimized for:
- **Traditional Search**: Google, Bing, DuckDuckGo
- **AI Search Engines**: ChatGPT, Perplexity, Claude
- **AI Crawlers**: GPTBot, ClaudeBot, PerplexityBot, Google-Extended

Key optimizations:
- JSON-LD Person schema with comprehensive metadata
- Semantic HTML with proper heading hierarchy
- Descriptive alt text and ARIA labels
- Structured data for all sections
- AI crawler-friendly robots.txt

## 📊 Performance Metrics

Target Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s

## 🔐 Security

- HTTPS enforced via `.htaccess`
- Security headers (XSS protection, CSP, etc.)
- No sensitive data in client-side code
- FTP credentials stored in GitHub Secrets

## 🌐 Domain Configuration

Current domain: `sajidafridi.com`

DNS Settings (Hostinger):
- A Record: Points to Hostinger IP
- CNAME: www → sajidafridi.com
- SSL: Let's Encrypt (auto-renewed)

## 📝 License

This project is private and proprietary. All rights reserved.

## 🤝 Contact

- **Email**: ceo@megnitoo.com
- **LinkedIn**: [linkedin.com/in/mr305afridi](https://linkedin.com/in/mr305afridi)
- **GitHub**: [github.com/Mrww305](https://github.com/Mrww305)
- **Discord**: thefabricman

## 🙏 Acknowledgments

Built with modern web technologies and deployed on Hostinger infrastructure.

---

**Built with ❤️ by Sajid Afridi (mrww305)**
