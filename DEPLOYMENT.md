# UrbanNest Deployment Guide

## Universal Hosting Configuration

This project is now configured to work on any hosting platform. The base path is automatically determined based on the environment.

### Hosting Platforms Supported:

#### 1. GitHub Pages (Current)
- **URL**: https://div0982.github.io/UrbanNest/
- **Configuration**: Automatically uses `/UrbanNest/` base path
- **Deployment**: Automatic via GitHub Actions

#### 2. Netlify
- **Configuration**: Uses `/` base path (root domain)
- **Deployment**: Connect GitHub repo or drag & drop `dist` folder
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

#### 3. Vercel
- **Configuration**: Uses `/` base path (root domain)
- **Deployment**: Connect GitHub repo
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

#### 4. Firebase Hosting
- **Configuration**: Uses `/` base path (root domain)
- **Deployment**: `firebase deploy`
- **Build Command**: `npm run build`

#### 5. Custom Domain/Server
- **Configuration**: Uses `/` base path
- **Deployment**: Upload `dist` folder contents to web server

### Environment Variables

You can override the base path by setting `VITE_BASE_PATH`:

```bash
# For root domain hosting
VITE_BASE_PATH=/

# For subdirectory hosting
VITE_BASE_PATH=/my-app/

# For GitHub Pages
VITE_BASE_PATH=/UrbanNest/
```

### Build Commands

```bash
# Development
npm run dev

# Production build (universal)
npm run build

# Production build for specific platform
VITE_BASE_PATH=/my-app/ npm run build
```

### File Structure After Build

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── images/
└── favicon.ico
```

All asset paths are automatically resolved based on the base path configuration.
