# Ollama OpenRouter Manager - Project Website

A modern, responsive website showcasing the Ollama OpenRouter JavaFX Manager - the ultimate hybrid AI desktop application.

## About the Project

The **Ollama OpenRouter JavaFX Manager** is a comprehensive desktop application that combines local (Ollama) and cloud (OpenRouter) AI models with advanced features including:

- 🔄 **Hybrid AI Architecture** - Best of both local and cloud AI
- 🔐 **Enterprise Security** - Role-based authentication and session management
- 📚 **RAG Pipelines** - Document ingestion and knowledge base querying
- 🤖 **Multi-Agent System** - CrewAI-style agent coordination with 5 specialized agents
- 🎨 **20+ Professional Themes** - Material, Brand, Nature, and Gaming themes
- 📊 **Hardware Monitoring** - Real-time CPU, Memory, GPU/VRAM tracking

## Website Features

This React-based website provides:

- **Modern Landing Page** - Professional introduction to the project
- **Comprehensive Features Overview** - Detailed feature explanations
- **Technical Architecture** - Deep dive into system design and patterns
- **Download & Installation Guide** - Complete setup instructions
- **Responsive Design** - Works perfectly on desktop and mobile
- **Fast Performance** - Optimized for speed and SEO

## Tech Stack

- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Modern CSS** - Custom styling with CSS variables and gradients
- **Vercel Ready** - Optimized for Vercel deployment

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## Deployment to Vercel

### Method 1: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel dashboard
3. Vercel automatically detects the configuration and deploys

### Method 2: Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation header
│   │   ├── Footer.jsx          # Site footer
│   │   └── Layout.jsx          # Main layout wrapper
│   ├── pages/
│   │   ├── Home.jsx            # Landing page
│   │   ├── Features.jsx        # Features overview
│   │   ├── Architecture.jsx    # Technical architecture
│   │   └── Download.jsx        # Installation guide
│   ├── App.jsx                 # Main app component
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── public/                     # Static assets
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── vercel.json               # Vercel deployment config
```

## Customization

### Update Project Information
Edit the content in the page components (`src/pages/`) to match your project details:
- Update GitHub repository URLs
- Modify feature descriptions
- Adjust installation instructions
- Update contact information

### Styling
The website uses CSS variables for easy theming. Key variables are defined in `src/index.css`:
- `--primary-color` - Main brand color
- `--secondary-color` - Secondary accent color
- `--gradient-primary` - Primary gradient
- Typography and spacing variables

### Add New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Update navigation in `src/components/Header.jsx`

## Performance Features

- **Optimized Images** - Responsive image loading
- **Code Splitting** - Automatic route-based code splitting
- **CSS Optimization** - Minified and optimized CSS
- **Fast Fonts** - System font stack for instant loading
- **SEO Ready** - Proper meta tags and semantic HTML

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - See LICENSE file for details.

---

**Built with ❤️ using React and modern web technologies**