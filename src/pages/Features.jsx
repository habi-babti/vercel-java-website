import { motion } from 'framer-motion'
import { useState, useRef } from 'react'

const features = [
  {
    id: 'hybrid',
    icon: '🔄',
    title: 'Hybrid AI Architecture',
    subtitle: 'Best of Both Worlds',
    color: '#6366f1',
    description: 'Seamlessly switch between local and cloud AI models with intelligent routing.',
    details: [
      { label: 'Local Models', value: 'Ollama', icon: '🦙' },
      { label: 'Cloud Models', value: '200+', icon: '☁️' },
      { label: 'Routing', value: 'Smart', icon: '🧠' },
      { label: 'Latency', value: '<100ms', icon: '⚡' },
    ],
    benefits: [
      'Privacy-first with local processing',
      'Scale to cloud when needed',
      'Cost optimization with smart routing',
      'Automatic failover between providers'
    ]
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'Enterprise Security',
    subtitle: 'Production Ready',
    color: '#8b5cf6',
    description: 'Role-based authentication with secure session management.',
    details: [
      { label: 'Auth', value: 'RBAC', icon: '👤' },
      { label: 'Sessions', value: 'Secure', icon: '🔒' },
      { label: 'API Keys', value: 'Encrypted', icon: '🔑' },
      { label: 'Audit', value: 'Full', icon: '📋' },
    ],
    benefits: [
      'Role-based access control (USER/ADMIN)',
      'Secure API key storage and masking',
      'Session persistence with cleanup',
      'User enable/disable functionality'
    ]
  },
  {
    id: 'rag',
    icon: '📚',
    title: 'RAG Pipelines',
    subtitle: 'Knowledge Augmented',
    color: '#a855f7',
    description: 'Ingest documents and query your knowledge base with semantic search.',
    details: [
      { label: 'Formats', value: '10+', icon: '📄' },
      { label: 'Vectors', value: 'ChromaDB', icon: '🗄️' },
      { label: 'Embeddings', value: 'Local', icon: '🧮' },
      { label: 'Search', value: 'Semantic', icon: '🔍' },
    ],
    benefits: [
      'Smart text chunking with overlap',
      'Multiple vector storage backends',
      'Cosine similarity retrieval',
      'Source attribution in responses'
    ]
  },
  {
    id: 'agents',
    icon: '🤖',
    title: 'Multi-Agent System',
    subtitle: 'CrewAI Style',
    color: '#ec4899',
    description: '5 specialized agents working together for complex workflows.',
    details: [
      { label: 'Agents', value: '5', icon: '🤖' },
      { label: 'Modes', value: '3', icon: '⚙️' },
      { label: 'Tools', value: '4+', icon: '🔧' },
      { label: 'Tasks', value: 'Unlimited', icon: '📝' },
    ],
    benefits: [
      'Research, Code, Synthesis agents',
      'Sequential, Parallel, Hierarchical modes',
      'Built-in calculator, search tools',
      'Custom agent registration'
    ]
  },
  {
    id: 'themes',
    icon: '🎨',
    title: '20+ Themes',
    subtitle: 'Beautiful Design',
    color: '#06b6d4',
    description: 'Professional themes with instant real-time switching.',
    details: [
      { label: 'Themes', value: '20+', icon: '🎨' },
      { label: 'Switch', value: 'Instant', icon: '⚡' },
      { label: 'Custom', value: 'JSON', icon: '📝' },
      { label: 'Persist', value: 'Yes', icon: '💾' },
    ],
    benefits: [
      'Material, Brand, Nature, Gaming styles',
      'JSON-based easy customization',
      'Real-time CSS generation',
      'Persistent theme preferences'
    ]
  },
  {
    id: 'monitor',
    icon: '📊',
    title: 'Hardware Monitoring',
    subtitle: 'Real-time Metrics',
    color: '#c084fc',
    description: 'Track CPU, Memory, GPU usage with Ollama process monitoring.',
    details: [
      { label: 'CPU', value: 'Real-time', icon: '💻' },
      { label: 'Memory', value: 'JVM', icon: '🧠' },
      { label: 'GPU', value: 'Multi', icon: '🎮' },
      { label: 'Process', value: 'Ollama', icon: '🦙' },
    ],
    benefits: [
      'Color-coded progress bars',
      'NVIDIA, AMD, Intel GPU support',
      'Configurable update intervals',
      'Cross-platform compatibility'
    ]
  }
]


function FeatureCard({ feature, index, isActive, onClick }) {
  return (
    <motion.div
      className={`feature-showcase-card ${isActive ? 'active' : ''}`}
      style={{ '--feature-color': feature.color }}
      onClick={onClick}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="feature-card-header">
        <motion.span 
          className="feature-big-icon"
          animate={{ rotate: isActive ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {feature.icon}
        </motion.span>
        <div>
          <h3>{feature.title}</h3>
          <span className="feature-subtitle">{feature.subtitle}</span>
        </div>
        <motion.span 
          className="expand-indicator"
          animate={{ rotate: isActive ? 180 : 0 }}
        >
          ▼
        </motion.span>
      </div>
      
      <p className="feature-desc">{feature.description}</p>
      
      <div className="feature-stats">
        {feature.details.map((detail, i) => (
          <motion.div 
            key={i} 
            className="stat-item"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <span className="stat-icon">{detail.icon}</span>
            <span className="stat-value">{detail.value}</span>
            <span className="stat-label">{detail.label}</span>
          </motion.div>
        ))}
      </div>
      
      {isActive && (
        <motion.div 
          className="feature-benefits"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <h4>Key Benefits</h4>
          <ul>
            {feature.benefits.map((benefit, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="check-icon">✓</span>
                {benefit}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
      
      <div className="feature-glow-bg" style={{ background: feature.color }}></div>
    </motion.div>
  )
}

function AnimatedCounter({ value, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => {
        let start = 0
        const end = parseInt(value)
        const duration = 2000
        const increment = end / (duration / 16)
        const timer = setInterval(() => {
          start += increment
          if (start >= end) {
            setCount(end)
            clearInterval(timer)
          } else {
            setCount(Math.floor(start))
          }
        }, 16)
      }}
    >
      {count}{suffix}
    </motion.span>
  )
}


function Features() {
  const [activeFeature, setActiveFeature] = useState(null)
  const containerRef = useRef(null)

  return (
    <div className="features-page" ref={containerRef}>
      {/* Animated background */}
      <div className="page-bg-animation">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>
      </div>

      <div className="container">
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span className="page-badge" whileHover={{ scale: 1.05 }}>
            ✨ Comprehensive Features
          </motion.span>
          <h1>Everything You Need for <span className="gradient-text-animated">AI Development</span></h1>
          <p>Discover the powerful capabilities that make Ollama OpenRouter Manager the ultimate hybrid AI platform</p>
        </motion.div>

        {/* Stats banner */}
        <motion.div 
          className="stats-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="stat-big">
            <AnimatedCounter value="200" suffix="+" />
            <span>Cloud Models</span>
          </div>
          <div className="stat-big">
            <AnimatedCounter value="20" suffix="+" />
            <span>Themes</span>
          </div>
          <div className="stat-big">
            <AnimatedCounter value="5" />
            <span>AI Agents</span>
          </div>
          <div className="stat-big">
            <AnimatedCounter value="3" />
            <span>Vector Backends</span>
          </div>
        </motion.div>

        {/* Feature cards */}
        <section className="features-showcase">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Core Capabilities
          </motion.h2>
          
          <div className="features-showcase-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
                isActive={activeFeature === feature.id}
                onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
              />
            ))}
          </div>
        </section>

        {/* Comparison section */}
        <section className="comparison-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Local vs Cloud: <span className="gradient-text-animated">Why Not Both?</span>
          </motion.h2>
          
          <div className="comparison-grid">
            <motion.div 
              className="comparison-card local"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="comparison-header">
                <span className="comparison-icon">🦙</span>
                <h3>Ollama (Local)</h3>
              </div>
              <ul>
                <li><span className="pro">✓</span> Zero latency</li>
                <li><span className="pro">✓</span> Complete privacy</li>
                <li><span className="pro">✓</span> No API costs</li>
                <li><span className="pro">✓</span> Works offline</li>
                <li><span className="con">○</span> Limited by hardware</li>
                <li><span className="con">○</span> Fewer model options</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="comparison-vs"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
              <span>+</span>
            </motion.div>
            
            <motion.div 
              className="comparison-card cloud"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="comparison-header">
                <span className="comparison-icon">☁️</span>
                <h3>OpenRouter (Cloud)</h3>
              </div>
              <ul>
                <li><span className="pro">✓</span> 200+ models</li>
                <li><span className="pro">✓</span> GPT-4, Claude, etc.</li>
                <li><span className="pro">✓</span> Always updated</li>
                <li><span className="pro">✓</span> Unlimited scale</li>
                <li><span className="con">○</span> Requires internet</li>
                <li><span className="con">○</span> Usage costs</li>
              </ul>
            </motion.div>
          </div>
          
          <motion.div 
            className="comparison-result"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="result-icon">🎯</span>
            <h3>Intelligent Routing = Best of Both</h3>
            <p>Our smart routing automatically chooses the best provider based on your query complexity, cost preferences, and performance needs.</p>
          </motion.div>
        </section>


        {/* Agents showcase */}
        <section className="agents-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Meet the <span className="gradient-text-animated">AI Agents</span>
          </motion.h2>
          
          <div className="agents-showcase">
            {[
              { name: 'Research Agent', model: 'DeepSeek-R1', icon: '🔬', skills: ['Analysis', 'Reasoning', 'Research'], color: '#6366f1' },
              { name: 'Code Agent', model: 'DeepSeek-Coder', icon: '💻', skills: ['Coding', 'Debugging', 'Review'], color: '#8b5cf6' },
              { name: 'Synthesis Agent', model: 'Gemma-2-9B', icon: '✍️', skills: ['Writing', 'Synthesis', 'Summary'], color: '#a855f7' },
              { name: 'RAG Agent', model: 'Gemma-2-9B', icon: '📚', skills: ['RAG', 'Search', 'Context'], color: '#ec4899' },
              { name: 'Embedding Agent', model: 'Llama2', icon: '🧮', skills: ['Embedding', 'Analysis', 'Similarity'], color: '#06b6d4' },
            ].map((agent, index) => (
              <motion.div
                key={agent.name}
                className="agent-card"
                style={{ '--agent-color': agent.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <motion.span 
                  className="agent-icon"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {agent.icon}
                </motion.span>
                <h4>{agent.name}</h4>
                <span className="agent-model">{agent.model}</span>
                <div className="agent-skills">
                  {agent.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Theme gallery */}
        <section className="themes-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Theme <span className="gradient-text-animated">Gallery</span>
          </motion.h2>
          
          <div className="themes-gallery">
            {[
              { name: 'Material Dark', colors: ['#1e1e1e', '#bb86fc', '#03dac6'] },
              { name: 'Google', colors: ['#ffffff', '#4285f4', '#ea4335'] },
              { name: 'Cyberpunk', colors: ['#0d0d0d', '#ff2a6d', '#05d9e8'] },
              { name: 'Forest', colors: ['#1a2f1a', '#4caf50', '#8bc34a'] },
              { name: 'Ocean', colors: ['#0a1929', '#1976d2', '#4fc3f7'] },
              { name: 'Sunset', colors: ['#1a1a2e', '#ff6b6b', '#feca57'] },
            ].map((theme, index) => (
              <motion.div
                key={theme.name}
                className="theme-preview"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="theme-colors">
                  {theme.colors.map((color, i) => (
                    <div key={i} className="color-swatch" style={{ background: color }}></div>
                  ))}
                </div>
                <span className="theme-name">{theme.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <motion.section 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Experience These Features?</h2>
          <p>Download now and unlock the full potential of hybrid AI</p>
          <motion.a 
            href="/download" 
            className="btn btn-primary btn-large btn-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>🚀</span> Get Started Free
          </motion.a>
        </motion.section>
      </div>
    </div>
  )
}

export default Features