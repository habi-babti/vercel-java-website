import { Link } from 'react-router-dom'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { useRef, Suspense, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'

// Theme colors - synced across the page
const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent1: '#a855f7',
  accent2: '#c084fc',
  cyan: '#06b6d4',
  pink: '#ec4899',
}

// Mouse position store
const mousePosition = { x: 0, y: 0 }

// Smooth Warp Stars - Slower and mouse reactive
function WarpStars({ count = 8000 }) {
  const mesh = useRef()
  const baseSpeed = useRef(30) // Slower base speed
  
  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const colorOptions = [
      [0.39, 0.4, 0.95],
      [0.55, 0.36, 0.96],
      [0.66, 0.33, 0.97],
      [0.02, 0.71, 0.83],
      [0.93, 0.29, 0.6],
      [1, 1, 1],
    ]
    for (let i = 0; i < count; i++) {
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      cols[i * 3] = color[0]
      cols[i * 3 + 1] = color[1]
      cols[i * 3 + 2] = color[2]
    }
    return cols
  }, [count])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 150
      pos[i * 3 + 1] = (Math.random() - 0.5) * 150
      pos[i * 3 + 2] = Math.random() * -200
    }
    return pos
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current) {
      const positions = mesh.current.geometry.attributes.position.array
      
      // Speed varies with mouse position - center is slow, edges are faster
      const mouseDistance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)
      const speedMultiplier = 1 + mouseDistance * 2 // 1x to 3x speed based on mouse
      const speed = baseSpeed.current * speedMultiplier
      
      // Slight direction shift based on mouse
      const dirX = mousePosition.x * 0.5
      const dirY = mousePosition.y * 0.5
      
      for (let i = 0; i < count; i++) {
        positions[i * 3] += delta * dirX * 10
        positions[i * 3 + 1] += delta * dirY * 10
        positions[i * 3 + 2] += delta * speed
        
        if (positions[i * 3 + 2] > 50) {
          positions[i * 3 + 2] = -200
          positions[i * 3] = (Math.random() - 0.5) * 150
          positions[i * 3 + 1] = (Math.random() - 0.5) * 150
        }
        
        // Wrap around X and Y
        if (Math.abs(positions[i * 3]) > 80) {
          positions[i * 3] = -Math.sign(positions[i * 3]) * 75
        }
        if (Math.abs(positions[i * 3 + 1]) > 80) {
          positions[i * 3 + 1] = -Math.sign(positions[i * 3 + 1]) * 75
        }
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.2} vertexColors transparent opacity={0.85} sizeAttenuation />
    </points>
  )
}


// Speed lines - slower and reactive
function SpeedLines({ count = 300 }) {
  const mesh = useRef()
  
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 6)
    const cols = new Float32Array(count * 6)
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 100
      const y = (Math.random() - 0.5) * 100
      const z = Math.random() * -150
      pos[i * 6] = x; pos[i * 6 + 1] = y; pos[i * 6 + 2] = z
      pos[i * 6 + 3] = x; pos[i * 6 + 4] = y; pos[i * 6 + 5] = z + 5
      cols[i * 6] = 0.4; cols[i * 6 + 1] = 0.4; cols[i * 6 + 2] = 1
      cols[i * 6 + 3] = 0.7; cols[i * 6 + 4] = 0.5; cols[i * 6 + 5] = 1
    }
    return { positions: pos, colors: cols }
  }, [count])

  useFrame((state, delta) => {
    if (mesh.current) {
      const pos = mesh.current.geometry.attributes.position.array
      const mouseDistance = Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2)
      const speed = 40 * (1 + mouseDistance * 2)
      
      for (let i = 0; i < count; i++) {
        pos[i * 6 + 2] += delta * speed
        pos[i * 6 + 5] += delta * speed
        if (pos[i * 6 + 2] > 50) {
          const x = (Math.random() - 0.5) * 100
          const y = (Math.random() - 0.5) * 100
          const z = -150
          pos[i * 6] = x; pos[i * 6 + 1] = y; pos[i * 6 + 2] = z
          pos[i * 6 + 3] = x; pos[i * 6 + 4] = y; pos[i * 6 + 5] = z + 5
        }
      }
      mesh.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <lineSegments ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count * 2} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count * 2} array={colors} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.4} />
    </lineSegments>
  )
}

// Nebula clouds
function Nebula({ position, color, scale = 1 }) {
  const mesh = useRef()
  
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.02
    mesh.current.rotation.y = state.clock.elapsedTime * 0.015
  })

  return (
    <Sphere ref={mesh} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial color={color} transparent opacity={0.1} distort={0.4} speed={1} />
    </Sphere>
  )
}

// Glowing orb that follows mouse slightly
function GlowingOrb({ position, color, size = 0.3 }) {
  const mesh = useRef()
  const basePos = useRef(position)
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    mesh.current.position.x = basePos.current[0] + Math.sin(t * 0.5) * 2 + mousePosition.x * 3
    mesh.current.position.y = basePos.current[1] + Math.cos(t * 0.3) * 1.5 + mousePosition.y * 3
    mesh.current.position.z = basePos.current[2] + Math.sin(t * 0.4) * 1
  })

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}


// Central energy core - reactive to mouse
function EnergyCore() {
  const mesh = useRef()
  const ring1 = useRef()
  const ring2 = useRef()
  const group = useRef()
  
  useFrame((state) => {
    const t = state.clock.elapsedTime
    mesh.current.rotation.y = t * 0.3
    mesh.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08)
    ring1.current.rotation.x = t * 0.5
    ring1.current.rotation.y = t * 0.3
    ring2.current.rotation.x = -t * 0.4
    ring2.current.rotation.z = t * 0.3
    
    // Subtle mouse follow
    group.current.rotation.x = mousePosition.y * 0.3
    group.current.rotation.y = mousePosition.x * 0.3
  })

  return (
    <group ref={group}>
      <Sphere ref={mesh} args={[1.5, 64, 64]} position={[0, 0, -8]}>
        <MeshDistortMaterial color={COLORS.primary} distort={0.25} speed={2} metalness={0.8} roughness={0.2} />
      </Sphere>
      <mesh ref={ring1} position={[0, 0, -8]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshBasicMaterial color={COLORS.cyan} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ring2} position={[0, 0, -8]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color={COLORS.pink} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// Camera that follows mouse
function MouseCamera() {
  const { camera } = useThree()
  const targetX = useRef(0)
  const targetY = useRef(0)
  
  useFrame(() => {
    // Smooth follow
    targetX.current += (mousePosition.x * 3 - targetX.current) * 0.05
    targetY.current += (mousePosition.y * 2 - targetY.current) * 0.05
    
    camera.position.x = targetX.current
    camera.position.y = targetY.current
    camera.lookAt(0, 0, -10)
  })
  
  return null
}

function SpaceScene() {
  return (
    <>
      <color attach="background" args={['#030014']} />
      <fog attach="fog" args={['#030014', 40, 120]} />
      
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, -8]} intensity={2} color={COLORS.primary} distance={25} />
      <pointLight position={[10, 5, 0]} intensity={0.8} color={COLORS.cyan} distance={30} />
      <pointLight position={[-10, -5, 0]} intensity={0.8} color={COLORS.pink} distance={30} />
      
      <WarpStars count={10000} />
      <SpeedLines count={400} />
      <Stars radius={150} depth={100} count={2000} factor={5} saturation={0.5} fade speed={1} />
      
      <Nebula position={[-15, 5, -50]} color={COLORS.primary} scale={15} />
      <Nebula position={[20, -8, -60]} color={COLORS.pink} scale={18} />
      <Nebula position={[0, 15, -70]} color={COLORS.cyan} scale={12} />
      <Nebula position={[-25, -10, -55]} color={COLORS.secondary} scale={16} />
      
      <EnergyCore />
      
      <GlowingOrb position={[-8, 3, -20]} color={COLORS.accent1} size={0.35} />
      <GlowingOrb position={[10, -4, -25]} color={COLORS.cyan} size={0.25} />
      <GlowingOrb position={[5, 6, -18]} color={COLORS.pink} size={0.2} />
      <GlowingOrb position={[-12, -6, -22]} color={COLORS.accent2} size={0.3} />
      
      <MouseCamera />
    </>
  )
}


const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
}

const FEATURE_COLORS = [
  COLORS.primary,
  COLORS.secondary,
  COLORS.accent1,
  COLORS.pink,
  COLORS.cyan,
  COLORS.accent2,
]

function Home() {
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -1 to 1
      mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1
      mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home">
      <section className="hero-3d">
        <div className="hero-canvas">
          <Canvas camera={{ position: [0, 0, 15], fov: 70 }}>
            <Suspense fallback={null}>
              <SpaceScene />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="hero-overlay"></div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="badge-icon">🚀</span>
            <span>Production Ready • Open Source</span>
          </motion.div>
          
          <motion.h1 
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            The Ultimate{' '}
            <span className="gradient-text-animated">Hybrid AI</span>
            <br />Desktop Application
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Combine the privacy of local AI (Ollama) with the power of cloud AI (OpenRouter) 
            in a single, elegant JavaFX application with RAG pipelines, multi-agent orchestration, 
            and real-time monitoring.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link to="/download" className="btn btn-primary btn-glow">
              <span className="btn-icon">⬇️</span>
              Download Now
            </Link>
            <a href="https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager" className="btn btn-glass" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View on GitHub
            </a>
          </motion.div>
          
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <div className="stat"><span className="stat-value">20+</span><span className="stat-label">Themes</span></div>
            <div className="stat"><span className="stat-value">5</span><span className="stat-label">AI Agents</span></div>
            <div className="stat"><span className="stat-value">200+</span><span className="stat-label">Cloud Models</span></div>
            <div className="stat"><span className="stat-value">∞</span><span className="stat-label">Local Models</span></div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="scroll-indicator"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span>↓</span>
          <span className="scroll-text">Move mouse to explore • Scroll down</span>
        </motion.div>
      </section>


      <section className="features-preview">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="section-title">
              <span className="title-accent">Why Choose</span><br />Ollama OpenRouter Manager?
            </h2>
            <p className="section-subtitle">A comprehensive solution for AI-powered workflows with enterprise-grade features</p>
          </motion.div>
          
          <motion.div className="features-grid" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {[
              { icon: '🔄', title: 'Hybrid Architecture', desc: 'Seamlessly switch between local Ollama models and cloud OpenRouter models. Best of both worlds with intelligent routing.' },
              { icon: '🔐', title: 'Enterprise Security', desc: 'Role-based authentication, secure session management, and API key protection built-in for production use.' },
              { icon: '📚', title: 'RAG Pipelines', desc: 'Ingest documents and query your knowledge base with retrieval-augmented generation and vector storage.' },
              { icon: '🤖', title: 'Multi-Agent System', desc: 'CrewAI-style agent coordination with 5 specialized agents for complex workflows and task automation.' },
              { icon: '🎨', title: '20+ Themes', desc: 'Professional themes including Material, Brand, Nature, and Gaming styles with instant real-time switching.' },
              { icon: '📊', title: 'Hardware Monitoring', desc: 'Real-time CPU, Memory, GPU/VRAM usage tracking with Ollama process monitoring and alerts.' },
            ].map((feature, index) => (
              <motion.div key={index} className="feature-card-3d" variants={scaleIn} whileHover={{ scale: 1.05, rotateY: 5, boxShadow: `0 25px 50px -12px ${FEATURE_COLORS[index]}40` }} style={{ '--accent-color': FEATURE_COLORS[index] }}>
                <div className="feature-icon-3d">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
                <div className="feature-glow" style={{ background: FEATURE_COLORS[index] }}></div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="cta-section" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Link to="/features" className="btn btn-outline-glow">Explore All Features →</Link>
          </motion.div>
        </div>
      </section>

      <section className="tech-showcase">
        <div className="container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Built with <span className="gradient-text-animated">Modern Technology</span>
          </motion.h2>
          <motion.div className="tech-cards" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            {[
              { name: 'Java 17+', desc: 'Modern Java with records, pattern matching', icon: '☕' },
              { name: 'JavaFX 21', desc: 'Rich desktop UI framework', icon: '🖥️' },
              { name: 'Ollama', desc: 'Local AI models for privacy', icon: '🦙' },
              { name: 'OpenRouter', desc: '200+ cloud AI models', icon: '☁️' },
              { name: 'ChromaDB', desc: 'Vector database storage', icon: '🗄️' },
              { name: 'Maven', desc: 'Build management', icon: '📦' },
            ].map((tech, index) => (
              <motion.div key={index} className="tech-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.02 }}>
                <span className="tech-icon">{tech.icon}</span>
                <h4>{tech.name}</h4>
                <p>{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="architecture-preview">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="section-title"><span className="title-accent">Clean</span> Architecture</h2>
          </motion.div>
          <motion.div className="arch-diagram" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="arch-layer layer-ui"><div className="layer-title">UI Layer</div><div className="layer-items"><span>AuthApp</span><span>MainController</span><span>EnhancedChat</span><span>AdminPanel</span></div></div>
            <div className="arch-connector"><div className="connector-line"></div><div className="connector-arrow">▼</div></div>
            <div className="arch-layer layer-service"><div className="layer-title">Service Layer</div><div className="layer-items"><span>RAGPipeline</span><span>UnifiedModelService</span><span>MultiAgentOrchestrator</span></div></div>
            <div className="arch-connector"><div className="connector-line"></div><div className="connector-arrow">▼</div></div>
            <div className="arch-layer layer-integration"><div className="layer-title">Integration Layer</div><div className="layer-items"><span>Ollama API</span><span>OpenRouter API</span><span>ChromaDB</span><span>VectorStore</span></div></div>
          </motion.div>
          <motion.div className="cta-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Link to="/architecture" className="btn btn-outline-glow">View Full Architecture →</Link>
          </motion.div>
        </div>
      </section>

      <section className="use-cases">
        <div className="container">
          <motion.h2 className="section-title" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Perfect For</motion.h2>
          <motion.div className="use-cases-grid" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            {[
              { icon: '🔬', title: 'AI Researchers', desc: 'Need both local experimentation and cloud model access for comprehensive research and testing.' },
              { icon: '💼', title: 'Enterprise Developers', desc: 'Require secure, role-based AI applications with authentication, monitoring, and audit trails.' },
              { icon: '📊', title: 'Data Scientists', desc: 'Want RAG pipelines for document analysis, knowledge base querying, and semantic search.' },
              { icon: '🎮', title: 'Hobbyists', desc: 'Want a comprehensive AI playground with multiple models, themes, and customization options.' },
            ].map((useCase, index) => (
              <motion.div key={index} className="use-case-card" variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <span className="use-case-icon">{useCase.icon}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-bg-animation"></div>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <h2>Ready to Get Started?</h2>
            <p>Download Ollama OpenRouter Manager and experience the power of hybrid AI</p>
            <div className="cta-buttons">
              <Link to="/download" className="btn btn-primary btn-large btn-glow"><span className="btn-icon">🚀</span>Download Now</Link>
              <Link to="/features" className="btn btn-glass btn-large">Learn More</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home