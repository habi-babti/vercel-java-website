import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const layers = [
  {
    id: 'ui',
    name: 'UI Layer',
    color: '#6366f1',
    description: 'JavaFX-based user interface with FXML views and controllers',
    components: [
      { name: 'AuthApp', desc: 'Main authentication entry point' },
      { name: 'LoginController', desc: 'User authentication flow' },
      { name: 'AdminController', desc: 'Admin dashboard management' },
      { name: 'EnhancedChatController', desc: 'Advanced chat with agents' },
      { name: 'HardwareMonitorController', desc: 'System monitoring UI' },
    ]
  },
  {
    id: 'service',
    name: 'Service Layer',
    color: '#10b981',
    description: 'Business logic and AI service orchestration',
    components: [
      { name: 'UnifiedModelService', desc: 'Provider abstraction for Ollama/OpenRouter' },
      { name: 'RAGPipeline', desc: 'Document ingestion and retrieval' },
      { name: 'MultiAgentOrchestrator', desc: 'CrewAI-style agent coordination' },
      { name: 'VectorStore', desc: 'Embedding storage backends' },
      { name: 'ThemeManager', desc: 'Dynamic theme system' },
    ]
  },
  {
    id: 'integration',
    name: 'Integration Layer',
    color: '#f59e0b',
    description: 'External API connections and data persistence',
    components: [
      { name: 'OllamaAPI', desc: 'Local model management (localhost:11434)' },
      { name: 'OpenRouterAPI', desc: 'Cloud model access (200+ models)' },
      { name: 'ChromaDB', desc: 'Vector database for RAG' },
      { name: 'EmbeddingService', desc: 'Local embedding generation' },
    ]
  }
]

const patterns = [
  { name: 'MVC Pattern', icon: '🏗️', desc: 'Clear separation of Model, View, Controller for maintainable code', color: '#6366f1' },
  { name: 'Singleton', icon: '1️⃣', desc: 'SessionContext, DatabaseService for global state management', color: '#10b981' },
  { name: 'Factory', icon: '🏭', desc: 'Theme creation and CSS generation with flexible object creation', color: '#f59e0b' },
  { name: 'Observer', icon: '👁️', desc: 'Theme change notifications and hardware monitoring updates', color: '#ec4899' },
  { name: 'Strategy', icon: '♟️', desc: 'Query routing and memory management algorithms', color: '#06b6d4' },
  { name: 'Command', icon: '⚡', desc: 'Agent task execution with encapsulated operations', color: '#8b5cf6' },
]

const dataFlows = [
  {
    name: 'Authentication Flow',
    steps: ['User Login', 'Credential Validation', 'Session Creation', 'Role-based Routing']
  },
  {
    name: 'Chat Flow',
    steps: ['User Input', 'Query Routing', 'AI Processing', 'Streaming Response']
  },
  {
    name: 'RAG Flow',
    steps: ['Document Ingestion', 'Embedding Generation', 'Vector Storage', 'Semantic Retrieval']
  }
]


function Architecture() {
  const [activeLayer, setActiveLayer] = useState(null)
  const [activeFlow, setActiveFlow] = useState(0)

  return (
    <div className="architecture-page">
      <div className="container">
        <motion.div className="page-header" {...fadeInUp}>
          <h1>System <span className="gradient-text-animated">Architecture</span></h1>
          <p>Deep dive into the technical architecture and design patterns powering the application</p>
        </motion.div>

        {/* Interactive Architecture Diagram */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            🏛️ High-Level Architecture
          </motion.h2>
          
          <motion.div 
            className="interactive-arch"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="arch-visual">
              {layers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  className={`arch-layer-card ${activeLayer === layer.id ? 'active' : ''}`}
                  style={{ '--layer-color': layer.color }}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="layer-header">
                    <span className="layer-indicator" style={{ background: layer.color }}></span>
                    <h3>{layer.name}</h3>
                    <span className="expand-icon">{activeLayer === layer.id ? '−' : '+'}</span>
                  </div>
                  <p className="layer-desc">{layer.description}</p>
                  
                  {activeLayer === layer.id && (
                    <motion.div 
                      className="layer-components"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      {layer.components.map((comp, i) => (
                        <div key={i} className="component-item">
                          <span className="comp-name">{comp.name}</span>
                          <span className="comp-desc">{comp.desc}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              ))}
              
              <div className="arch-connections">
                <svg className="connection-lines" viewBox="0 0 100 200">
                  <defs>
                    <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  <line x1="50" y1="30" x2="50" y2="70" stroke="url(#lineGrad1)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                  </line>
                  <line x1="50" y1="130" x2="50" y2="170" stroke="url(#lineGrad2)" strokeWidth="2" strokeDasharray="5,5">
                    <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
                  </line>
                </svg>
              </div>
            </div>
          </motion.div>
        </section>


        {/* Design Patterns */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            🎨 Design Patterns
          </motion.h2>
          
          <div className="patterns-showcase">
            {patterns.map((pattern, index) => (
              <motion.div
                key={pattern.name}
                className="pattern-card"
                style={{ '--pattern-color': pattern.color }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, boxShadow: `0 20px 40px ${pattern.color}30` }}
              >
                <span className="pattern-icon">{pattern.icon}</span>
                <h3>{pattern.name}</h3>
                <p>{pattern.desc}</p>
                <div className="pattern-glow" style={{ background: pattern.color }}></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Data Flow Visualization */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            🔄 Data Flow
          </motion.h2>
          
          <div className="flow-tabs">
            {dataFlows.map((flow, index) => (
              <button
                key={flow.name}
                className={`flow-tab ${activeFlow === index ? 'active' : ''}`}
                onClick={() => setActiveFlow(index)}
              >
                {flow.name}
              </button>
            ))}
          </div>
          
          <motion.div 
            className="flow-visualization"
            key={activeFlow}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {dataFlows[activeFlow].steps.map((step, index) => (
              <div key={index} className="flow-step-card">
                <motion.div 
                  className="step-circle"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.15 }}
                >
                  {index + 1}
                </motion.div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.15 + 0.1 }}
                >
                  {step}
                </motion.span>
                {index < dataFlows[activeFlow].steps.length - 1 && (
                  <motion.div 
                    className="flow-connector"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: index * 0.15 + 0.2 }}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </section>


        {/* Tech Stack */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            🛠️ Technology Stack
          </motion.h2>
          
          <div className="tech-stack-visual">
            {[
              { layer: 'Presentation', items: ['JavaFX 21', 'FXML', 'CSS', 'ControlsFX'], color: '#6366f1' },
              { layer: 'Business Logic', items: ['Java 17+', 'Maven', 'CompletableFuture', 'Reactive Streams'], color: '#10b981' },
              { layer: 'Integration', items: ['Ollama API', 'OpenRouter API', 'ChromaDB', 'HTTP Client'], color: '#f59e0b' },
              { layer: 'Data', items: ['File System', 'JSON', 'Vector Embeddings', 'Session Storage'], color: '#ec4899' },
            ].map((stack, index) => (
              <motion.div
                key={stack.layer}
                className="stack-layer"
                style={{ '--stack-color': stack.color }}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <h4>{stack.layer}</h4>
                <div className="stack-items">
                  {stack.items.map((item, i) => (
                    <motion.span 
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      style={{ background: stack.color }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Performance & Scalability */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            ⚡ Performance & Scalability
          </motion.h2>
          
          <div className="perf-grid">
            {[
              { title: 'Memory Management', icon: '🧠', items: ['Weak references for listeners', 'Resource cleanup on shutdown', 'Lazy loading of resources', 'Configurable vector backends'] },
              { title: 'Async Operations', icon: '⚡', items: ['CompletableFuture for non-blocking', 'Platform.runLater() for UI', 'Background thread pools', 'Streaming responses'] },
              { title: 'Caching Strategy', icon: '💾', items: ['Theme CSS caching', 'Model metadata caching', 'Embedding result caching', 'Session state persistence'] },
              { title: 'Resource Optimization', icon: '🎯', items: ['Configurable chunk sizes', 'Adjustable monitoring intervals', 'Provider-specific optimizations', 'Graceful degradation'] },
            ].map((perf, index) => (
              <motion.div
                key={perf.title}
                className="perf-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className="perf-icon">{perf.icon}</span>
                <h3>{perf.title}</h3>
                <ul>
                  {perf.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Code Example */}
        <section className="arch-section">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            💻 Code Example
          </motion.h2>
          
          <motion.div 
            className="code-showcase"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="code-header">
              <span className="code-dot red"></span>
              <span className="code-dot yellow"></span>
              <span className="code-dot green"></span>
              <span className="code-title">UnifiedModelService.java</span>
            </div>
            <pre className="code-content">
{`// Unified API for both local and cloud AI models
UnifiedModelService service = new UnifiedModelService(ollamaAPI, openRouterAPI);

// Configure provider and routing
service.setActiveProvider(Provider.OPENROUTER);
service.setRoutingStrategy(RoutingStrategy.AUTO_COMPLEXITY);

// Enable advanced features
service.setAgenticMode(true);
service.setChainOfThought(true);

// Chat with streaming response
service.chat("Explain quantum computing", new ChatCallback() {
    @Override
    public void onToken(String token) {
        Platform.runLater(() -> appendToChat(token));
    }
    
    @Override
    public void onComplete(String response, Provider provider) {
        System.out.println("Response from: " + provider);
    }
});`}
            </pre>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

export default Architecture