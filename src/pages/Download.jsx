import { motion } from 'framer-motion'
import { useState } from 'react'

const platforms = [
  { id: 'windows', name: 'Windows', icon: '🪟', version: '10/11', size: '~150MB' },
  { id: 'macos', name: 'macOS', icon: '🍎', version: '12+', size: '~145MB' },
  { id: 'linux', name: 'Linux', icon: '🐧', version: 'Ubuntu 20+', size: '~140MB' },
]

const steps = [
  {
    number: 1,
    title: 'Install Prerequisites',
    icon: '📦',
    content: `# Install Java 17+ (required)
# Windows: Download from Oracle or use winget
winget install Oracle.JDK.17

# macOS: Use Homebrew
brew install openjdk@17

# Linux: Use apt
sudo apt install openjdk-17-jdk`,
    note: 'Java 17 or higher is required to run the application.'
  },
  {
    number: 2,
    title: 'Clone Repository',
    icon: '📥',
    content: `# Clone the repository
git clone https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager.git

# Navigate to project directory
cd Ollama-OpenRouter-javafx-manager`,
    note: 'Or download the ZIP from GitHub releases.'
  },
  {
    number: 3,
    title: 'Build & Run',
    icon: '🚀',
    content: `# Build the project
./mvnw clean compile

# Run the application
./mvnw javafx:run

# Or use the provided scripts
# Windows: run-auth-app.bat
# Linux/Mac: ./run-auth-app.sh`,
    note: 'Maven wrapper is included, no separate Maven installation needed.'
  },
  {
    number: 4,
    title: 'First Login',
    icon: '🔐',
    content: `# Default credentials:
┌──────────┬───────────┬───────┐
│ Username │ Password  │ Role  │
├──────────┼───────────┼───────┤
│ admin    │ admin123  │ ADMIN │
│ user     │ user123   │ USER  │
│ testuser │ test123   │ USER  │
└──────────┴───────────┴───────┘`,
    note: 'Change default passwords after first login for security.'
  }
]

const optionalSetup = [
  {
    name: 'Ollama',
    icon: '🦙',
    description: 'Local AI models for privacy and speed',
    commands: `# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull recommended models
ollama pull llama2
ollama pull nomic-embed-text
ollama pull deepseek-coder

# Start server (usually auto-starts)
ollama serve`,
    link: 'https://ollama.ai'
  },
  {
    name: 'OpenRouter',
    icon: '☁️',
    description: 'Access 200+ cloud AI models',
    commands: `# 1. Sign up at openrouter.ai
# 2. Get your API key from dashboard
# 3. Save to project root:

echo "your-api-key-here" > api.txt

# Or configure in Admin panel after login`,
    link: 'https://openrouter.ai'
  },
  {
    name: 'ChromaDB',
    icon: '🗄️',
    description: 'Persistent vector storage for RAG',
    commands: `# Install ChromaDB
pip install chromadb

# Run server
chroma run --host localhost --port 8000

# Or use Docker
docker run -p 8000:8000 chromadb/chroma`,
    link: 'https://www.trychroma.com'
  }
]


function Download() {
  const [activeStep, setActiveStep] = useState(0)
  const [selectedPlatform, setSelectedPlatform] = useState('windows')
  const [copiedIndex, setCopiedIndex] = useState(null)

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="download-page">
      {/* Animated background */}
      <div className="page-bg-animation">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
      </div>

      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.span className="page-badge" whileHover={{ scale: 1.05 }}>
            ⬇️ Free & Open Source
          </motion.span>
          <h1>Download <span className="gradient-text-animated">Ollama OpenRouter Manager</span></h1>
          <p>Get started in minutes with our easy installation process</p>
        </motion.div>

        {/* Platform selector */}
        <motion.section 
          className="platform-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Choose Your Platform</h2>
          <div className="platform-cards">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.id}
                className={`platform-card ${selectedPlatform === platform.id ? 'active' : ''}`}
                onClick={() => setSelectedPlatform(platform.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="platform-icon">{platform.icon}</span>
                <h3>{platform.name}</h3>
                <span className="platform-version">{platform.version}</span>
                <span className="platform-size">{platform.size}</span>
                {selectedPlatform === platform.id && (
                  <motion.div 
                    className="selected-indicator"
                    layoutId="platformIndicator"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Quick download */}
        <motion.section 
          className="quick-download"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className="download-box">
            <div className="download-info">
              <h3>Quick Start</h3>
              <p>Clone and run with a single command</p>
            </div>
            <div className="download-command">
              <code>git clone https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager.git && cd Ollama-OpenRouter-javafx-manager && ./mvnw javafx:run</code>
              <motion.button 
                className="copy-btn"
                onClick={() => copyToClipboard('git clone https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager.git && cd Ollama-OpenRouter-javafx-manager && ./mvnw javafx:run', -1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copiedIndex === -1 ? '✓' : '📋'}
              </motion.button>
            </div>
          </div>
        </motion.section>


        {/* Installation steps */}
        <section className="installation-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Step-by-Step Installation
          </motion.h2>
          
          <div className="steps-container">
            <div className="steps-nav">
              {steps.map((step, index) => (
                <motion.button
                  key={index}
                  className={`step-nav-item ${activeStep === index ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                  onClick={() => setActiveStep(index)}
                  whileHover={{ x: 5 }}
                >
                  <span className="step-nav-number">
                    {index < activeStep ? '✓' : step.number}
                  </span>
                  <span className="step-nav-icon">{step.icon}</span>
                  <span className="step-nav-title">{step.title}</span>
                </motion.button>
              ))}
            </div>
            
            <motion.div 
              className="step-content"
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="step-header">
                <span className="step-icon">{steps[activeStep].icon}</span>
                <h3>{steps[activeStep].title}</h3>
              </div>
              
              <div className="code-block-enhanced">
                <div className="code-header">
                  <span className="code-dot"></span>
                  <span className="code-dot"></span>
                  <span className="code-dot"></span>
                  <span className="code-title">Terminal</span>
                  <motion.button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(steps[activeStep].content, activeStep)}
                    whileHover={{ scale: 1.1 }}
                  >
                    {copiedIndex === activeStep ? '✓ Copied!' : '📋 Copy'}
                  </motion.button>
                </div>
                <pre><code>{steps[activeStep].content}</code></pre>
              </div>
              
              <div className="step-note">
                <span className="note-icon">💡</span>
                <p>{steps[activeStep].note}</p>
              </div>
              
              <div className="step-navigation">
                <motion.button
                  className="btn btn-secondary"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  whileHover={{ scale: 1.02 }}
                >
                  ← Previous
                </motion.button>
                <motion.button
                  className="btn btn-primary"
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                  whileHover={{ scale: 1.02 }}
                >
                  Next →
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Optional setup */}
        <section className="optional-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Optional Setup
          </motion.h2>
          <p className="section-desc">Enhance your experience with these optional integrations</p>
          
          <div className="optional-grid">
            {optionalSetup.map((item, index) => (
              <motion.div
                key={item.name}
                className="optional-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="optional-header">
                  <span className="optional-icon">{item.icon}</span>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
                
                <div className="code-block-small">
                  <pre><code>{item.commands}</code></pre>
                </div>
                
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="optional-link">
                  Learn more →
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <section className="troubleshooting-section">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Troubleshooting
          </motion.h2>
          
          <div className="troubleshooting-grid">
            {[
              { issue: 'Java not found', icon: '☕', solution: 'Ensure JAVA_HOME is set and Java 17+ is in your PATH' },
              { issue: 'Port already in use', icon: '🔌', solution: 'Check if Ollama is already running, or change the port in settings' },
              { issue: 'GPU not detected', icon: '🎮', solution: 'Update GPU drivers and ensure CUDA/ROCm is properly installed' },
              { issue: 'Build fails', icon: '🔨', solution: 'Run ./mvnw clean first, then try building again' },
            ].map((item, index) => (
              <motion.div
                key={item.issue}
                className="troubleshoot-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <span className="troubleshoot-icon">{item.icon}</span>
                <div>
                  <h4>{item.issue}</h4>
                  <p>{item.solution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <motion.section 
          className="download-cta-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="cta-content">
            <span className="cta-icon">🚀</span>
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of developers using Ollama OpenRouter Manager</p>
            <div className="cta-buttons">
              <motion.a 
                href="https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager" 
                className="btn btn-primary btn-large btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>⭐</span> Star on GitHub
              </motion.a>
              <motion.a 
                href="/features" 
                className="btn btn-glass btn-large"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>✨</span> Explore Features
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default Download