# Ollama OpenRouter JavaFX Manager - Complete Project Documentation

> **The Ultimate Hybrid AI Desktop Application**  
> A comprehensive JavaFX application combining local (Ollama) and cloud (OpenRouter) AI models with advanced authentication, RAG pipelines, multi-agent orchestration, and real-time system monitoring.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design](#architecture--design)
3. [Core Features](#core-features)
4. [Technical Stack](#technical-stack)
5. [Project Structure](#project-structure)
6. [Installation & Setup](#installation--setup)
7. [User Guide](#user-guide)
8. [Developer Guide](#developer-guide)
9. [API Documentation](#api-documentation)
10. [Deployment](#deployment)
11. [Troubleshooting](#troubleshooting)
12. [Contributing](#contributing)

---

## 🎯 Project Overview

### What is Ollama OpenRouter JavaFX Manager?

This is a **production-ready desktop application** that provides a unified interface for managing both local and cloud-based AI models. It combines the privacy and speed of local AI (Ollama) with the power and capabilities of cloud AI (OpenRouter) in a single, elegant JavaFX application.

### Key Value Propositions

- **🔄 Hybrid Architecture**: Best of both worlds - local privacy + cloud power
- **🔐 Enterprise Security**: Role-based authentication with session management
- **🎨 Professional UI**: 20+ themes with dynamic switching
- **📚 RAG Capabilities**: Document ingestion and knowledge base querying
- **🤖 Multi-Agent System**: CrewAI-style agent coordination
- **📊 System Monitoring**: Real-time hardware and process monitoring
- **🚀 Production Ready**: Clean architecture, comprehensive error handling

### Target Users

- **AI Researchers**: Need both local experimentation and cloud model access
- **Enterprise Developers**: Require secure, role-based AI applications
- **Data Scientists**: Want RAG pipelines for document analysis
- **System Administrators**: Need monitoring and management capabilities
- **Hobbyists**: Want a comprehensive AI playground

---

## 🏗️ Architecture & Design

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         JavaFX Application Layer                         │
│  AuthApp | MainController | EnhancedChatController | AdminController    │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  RAGPipeline  │         │ UnifiedModel    │         │ MultiAgent      │
│               │         │ Service         │         │ Orchestrator    │
│ • Ingest docs │         │ • Ollama/OR     │         │ • 5 agents      │
│ • Retrieve    │         │ • Routing       │         │ • 3 exec modes  │
│ • Generate    │         │ • Context       │         │ • Task coord    │
└───────────────┘         └─────────────────┘         └─────────────────┘
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ VectorStore   │         │   OllamaAPI     │         │ HardwareMonitor │
│ • ChromaDB    │         │   (Local)       │         │ • CPU/Memory    │
│ • In-memory   │         │                 │         │ • GPU/VRAM      │
│ • File-based  │         │   OpenRouterAPI │         │ • Ollama proc   │
└───────────────┘         │   (Cloud)       │         └─────────────────┘
        │                 └─────────────────┘
        ▼
┌───────────────┐
│ Embedding     │
│ Service       │
│ (Ollama)      │
│ nomic-embed   │
└───────────────┘
```

### Design Patterns Used

- **MVC Pattern**: Clear separation of Model, View, Controller
- **Singleton Pattern**: SessionContext, DatabaseService, UserService
- **Factory Pattern**: Theme creation and CSS generation
- **Observer Pattern**: Theme change notifications, hardware monitoring
- **Strategy Pattern**: Query routing, memory management
- **Command Pattern**: Agent task execution
- **Adapter Pattern**: Session bridge between JavaFX and Swing

### Core Principles

1. **Modularity**: Each component has a single responsibility
2. **Extensibility**: Easy to add new providers, agents, or features
3. **Testability**: Services are easily unit testable
4. **Maintainability**: Clean code structure with comprehensive documentation
5. **Performance**: Efficient resource usage and async operations
6. **Security**: Role-based access control and secure session management

---
## ✨ Core Features

### 🔐 Authentication & User Management

#### Role-Based Access Control
- **USER Role**: Access to chat interface, theme selection, personal settings
- **ADMIN Role**: Full system access, user management, API key configuration
- **Session Management**: Persistent sessions with secure API key storage
- **Database Integration**: User data and settings managed through database service

#### Security Features
- Password validation and secure storage (ready for hashing implementation)
- API key masking in UI (shows first 4 + last 4 characters)
- Session cleanup on logout
- User enable/disable functionality
- Role verification and access control

#### Default Test Credentials
| Username | Password | Role  | API Key |
|----------|----------|-------|---------|
| admin    | admin123 | ADMIN | sk-admin-1234567890abcdef |
| user     | user123  | USER  | sk-user-abcdef1234567890 |
| testuser | test123  | USER  | sk-test-fedcba0987654321 |

### 🎨 Dynamic Theme System

#### 20+ Professional Themes
- **Material Themes**: Light, Dark
- **Brand Themes**: Google, Apple, Samsung, Xiaomi, Microsoft, Mistral AI, Gemini
- **Nature Themes**: Forest Green, Ocean Blue, Deep Ocean, Sunrise, Moon, Night, Mars
- **Style Themes**: Lavender Dreams, Slate Minimalist
- **Gaming Themes**: Cyberpunk 2077, GTA Vice City

#### Theme Features
- **JSON-Based Configuration**: Easy customization through JSON files
- **Real-time Application**: Instant theme switching without restart
- **CSS Generation**: Automatic CSS generation for all JavaFX controls
- **Persistent Settings**: Theme preferences saved across sessions

### 🤖 Hybrid AI Architecture

#### Dual Provider Support
- **Ollama (Local)**:
  - ✅ Fast - No network latency
  - ✅ Private - Data stays local
  - ✅ Free - No API costs
  - ⚠️ Limited model capabilities

- **OpenRouter (Cloud)**:
  - ✅ Advanced models (GPT-4, Claude, DeepSeek-R1)
  - ✅ Scalable - No local resource constraints
  - ✅ Updated - Latest model versions
  - ⚠️ API usage fees
  - ⚠️ Network dependent

#### Intelligent Query Routing
- **Manual**: User selects provider
- **Auto-Complexity**: Route based on query complexity
- **Cost-Optimized**: Prefer free/local models
- **Performance**: Prefer cloud models for quality

#### Unified API Interface
Single interface for all AI interactions regardless of provider:
```java
UnifiedModelService service = new UnifiedModelService(ollamaAPI, openRouterAPI);
service.setActiveProvider(Provider.OPENROUTER);
service.chat("Your query", callback);
```

### 📚 RAG (Retrieval-Augmented Generation) Pipeline

#### Document Processing
- **Smart Chunking**: Configurable chunk size with overlap
- **Multi-Format Support**: .txt, .md, .java, and more
- **Batch Ingestion**: Process entire directories
- **Metadata Support**: Rich document metadata

#### Vector Storage Backends
- **In-Memory**: Fast, no persistence (development)
- **ChromaDB**: Persistent, scalable (production)
- **File-Based**: Simple file persistence

#### Embedding Models (via Ollama)
- `nomic-embed-text` (768 dimensions, recommended)
- `all-minilm` (384 dimensions, faster)
- `mxbai-embed-large` (1024 dimensions, highest quality)

#### RAG Features
- Semantic search with cosine similarity
- Context-aware generation
- Source attribution
- Configurable retrieval parameters

### 🤝 Multi-Agent System (CrewAI-Style)

#### Available Agents
| Agent | Provider | Model | Capabilities |
|-------|----------|-------|--------------|
| embedding_agent | Ollama | llama2 | Embedding, Analysis |
| research_agent | OpenRouter | deepseek-r1 | Research, Analysis, Reasoning |
| synthesis_agent | OpenRouter | gemma-2-9b | Synthesis, Writing |
| code_agent | OpenRouter | deepseek-coder | Coding, Debugging, Review |
| rag_agent | OpenRouter | gemma-2-9b | RAG, Research |

#### Execution Modes
- **Sequential**: Tasks run one after another
- **Parallel**: Tasks run concurrently
- **Hierarchical**: Manager agent delegates to workers

#### Built-in Tools
- `calculator` - Mathematical calculations
- `current_time` - Current date/time
- `text_stats` - Text analysis (word count, etc.)
- `search` - Simulated search (extensible to real APIs)

### 📊 Hardware Monitoring

#### Real-time Metrics
- **CPU Usage**: System CPU load via JMX
- **Memory Usage**: JVM heap usage tracking
- **GPU/VRAM**: Multi-vendor support (NVIDIA, AMD, Intel)
- **Ollama Process**: Process detection with PID and uptime

#### Monitoring Features
- Color-coded progress bars (Green/Yellow/Red)
- Configurable update intervals
- Cross-platform compatibility
- JavaFX reactive UI integration

### 🎮 User Interface Features

#### Main Application Modes
1. **Authentication Flow**: Login → Loading → App Selection
2. **Admin Dashboard**: User management, API key configuration
3. **User Chat Interface**: AI interaction with provider selection
4. **Enhanced Chat**: Advanced features with agentic capabilities
5. **Hardware Monitor**: Real-time system status

#### Navigation Features
- **App Selection**: Choose between JavaFX or Swing interface
- **Theme Switching**: Real-time theme application
- **Session Persistence**: Maintain state across app switches
- **Proper Window Management**: Clean transitions and resource cleanup

---

## 🛠️ Technical Stack

### Core Technologies
- **Java 17+**: Modern Java with records, pattern matching, text blocks
- **JavaFX 21**: Rich desktop UI framework
- **Maven**: Build management and dependency resolution

### Key Dependencies
- **ControlsFX**: Enhanced JavaFX controls and dialogs
- **FormsFX**: Advanced form handling and validation
- **ValidatorFX**: Input validation framework
- **Ikonli**: Icon fonts (FontAwesome, Material Design)
- **BootstrapFX**: Bootstrap-style CSS framework
- **TilesFX**: Dashboard tiles and gauges
- **FXGL**: Game library components for enhanced UI

### External APIs
- **Ollama API**: Local model management (localhost:11434)
- **OpenRouter API**: Cloud model access with 200+ models
- **ChromaDB API**: Vector database for document storage (optional)

### Development Tools
- **Maven Wrapper**: Consistent build environment
- **JavaFX Maven Plugin**: Easy application running and packaging
- **JPackage**: Native executable generation

---
## 📁 Project Structure

### Source Code Organization

```
src/main/java/com/ollama/ollamaopenrouterjavafxmanager/
├── 📁 controllers/              # JavaFX Controllers (MVC Pattern)
│   ├── AdminController.java         # Admin dashboard and user management
│   ├── AppSelectionController.java  # JavaFX/Swing app selection
│   ├── EnhancedChatController.java  # Advanced chat with agentic features
│   ├── HardwareMonitorController.java # System monitoring UI
│   ├── LoadingController.java       # Loading screen with progress
│   ├── LoginController.java         # Authentication and login
│   ├── MainController.java          # Main application controller
│   └── UserController.java          # User chat interface
│
├── 📁 models/                   # Data Models and Entities
│   ├── ChatMessage.java             # Individual chat message
│   ├── ChatSession.java             # Chat conversation data
│   ├── ModelInfo.java               # AI model metadata
│   ├── SessionContext.java          # Singleton session management
│   └── User.java                    # User entity with Role enum
│
├── 📁 services/                 # Business Logic and APIs
│   ├── AgentService.java             # Tool registration and execution
│   ├── ChatProfile.java             # Chat configuration profiles
│   ├── ChatStorageAdapter.java      # Chat persistence adapter
│   ├── ConversationMemory.java      # Context management strategies
│   ├── DatabaseService.java         # User data and API key management
│   ├── DocumentParser.java          # Document processing utilities
│   ├── EmbeddingService.java        # Local embedding generation
│   ├── EnhancedQueryRouter.java     # Advanced query routing
│   ├── HardwareMonitorService.java  # System monitoring service
│   ├── KnowledgeSpace.java          # Knowledge base management
│   ├── LoginManager.java            # Authentication flow management
│   ├── MultiAgentOrchestrator.java  # CrewAI-style agent coordination
│   ├── OllamaAPI.java               # Ollama local API client
│   ├── OpenRouterAPI.java           # OpenRouter cloud API client
│   ├── ProfileManager.java          # User profile management
│   ├── QueryRouter.java             # Basic query routing
│   ├── RAGPipeline.java             # Retrieval-augmented generation
│   ├── SessionBridge.java           # JavaFX/Swing session sharing
│   ├── SessionSerializer.java       # Session persistence
│   ├── UnifiedModelService.java     # Provider abstraction layer
│   ├── UserService.java             # User authentication service
│   └── VectorStore.java             # Vector storage backends
│
├── 📁 theme/                    # Dynamic Theme System
│   ├── Theme.java                   # Theme data model
│   ├── ThemeCssGenerator.java       # CSS generation from themes
│   ├── ThemeLoader.java             # Theme loading from JSON
│   └── ThemeManager.java            # Theme management service
│
├── 📁 utils/                    # Utility Classes
│   ├── ConfigManager.java           # Configuration management
│   └── ThemeManager.java            # Theme utility functions
│
└── 📁 Main Applications         # Entry Points
    ├── AuthApp.java                 # Main authentication application
    ├── ComprehensiveDemo.java       # Full-featured demo application
    ├── EnhancedChatDemo.java        # Enhanced chat demo
    ├── EnhancedRoutingDemo.java     # Query routing demo
    ├── Main.java                    # Main JavaFX application
    ├── QuickTest.java               # System verification utility
    ├── SwingMainApp.java            # Swing version of main app
    └── ThemeDemo.java               # Theme system demonstration
```

### Resources Organization

```
src/main/resources/com/ollama/ollamaopenrouterjavafxmanager/
├── 📁 themes/                   # Theme JSON Configurations
│   ├── material-light.json          # Material Design Light
│   ├── material-dark.json           # Material Design Dark
│   ├── google.json                  # Google brand theme
│   ├── apple.json                   # Apple brand theme
│   ├── cyberpunk.json               # Cyberpunk 2077 gaming theme
│   └── ... (20+ theme files)
│
├── 📁 fxml/                     # JavaFX View Definitions
│   ├── admin-view.fxml              # Admin dashboard UI
│   ├── app-selection-view.fxml      # App selection UI
│   ├── enhanced-chat-view.fxml      # Enhanced chat UI
│   ├── hardware-monitor-view.fxml   # Hardware monitoring UI
│   ├── loading-view.fxml            # Loading screen UI
│   ├── login-view.fxml              # Login form UI
│   ├── main-view.fxml               # Main application UI
│   └── user-view.fxml               # User chat UI
│
├── 📁 css/                      # Stylesheets
│   ├── base-styles.css              # Base application styles
│   ├── theme-overrides.css          # Theme-specific overrides
│   └── component-styles.css         # Component-specific styles
│
├── 📁 img/                      # Images and Icons
│   ├── app-icon.png                 # Application icon
│   ├── logo.png                     # Application logo
│   └── theme-previews/              # Theme preview images
│
├── 📁 svg/                      # Vector Graphics
│   ├── icons/                       # SVG icons
│   └── illustrations/               # SVG illustrations
│
└── 📁 loadingscreen/            # Loading Screen Assets
    ├── background.png               # Loading background
    └── spinner.gif                  # Loading animation
```

### Configuration Files

```
📁 Root Directory
├── pom.xml                      # Maven project configuration
├── module-info.java             # Java module definition
├── .gitignore                   # Git ignore patterns
├── README.md                    # Project overview
├── run-auth-app.bat            # Windows run script
├── run-auth-app.sh             # Unix/Linux run script
├── test-navigation.bat         # Navigation testing script
├── test-ollama-runner.bat      # Ollama testing script
├── api.txt                     # OpenRouter API key storage
├── session.txt                 # Session persistence file
└── chat_sessions.txt           # Chat history storage
```

### Documentation Structure

```
📁 documentation/               # Comprehensive Documentation
├── COMPLETE_PROJECT_DOCUMENTATION.md    # This file - complete overview
├── AUTH_SYSTEM_DELIVERABLES.md         # Authentication system details
├── ENHANCED_FEATURES.md                # Advanced features documentation
├── IMPLEMENTATION_SUMMARY.md           # Technical implementation summary
├── NAVIGATION_IMPROVEMENTS.md          # UI navigation enhancements
├── OLLAMA_COMMAND_RUNNER.md            # Ollama command interface
├── PROJECT_DOCUMENTATION.md            # Original project documentation
├── README.md                           # Main project README
├── README_AUTH.md                      # Authentication system README
└── README_UPDATED_AUTH.md              # Updated authentication README
```

### Build and Deployment

```
📁 Build System
├── 📁 .mvn/                     # Maven wrapper configuration
├── mvnw                        # Maven wrapper (Unix/Linux)
├── mvnw.cmd                    # Maven wrapper (Windows)
├── 📁 target/                  # Build output directory
│   ├── classes/                    # Compiled Java classes
│   ├── generated-sources/          # Generated source files
│   └── ollama-manager-1.0.jar     # Built JAR file
└── 📁 old_src/                 # Legacy Swing implementation
```

---

## 🚀 Installation & Setup

### Prerequisites

#### Required Software
- **Java 17 or higher** - Download from [Oracle](https://www.oracle.com/java/technologies/downloads/) or [OpenJDK](https://openjdk.org/)
- **Maven 3.6+** - Download from [Apache Maven](https://maven.apache.org/download.cgi) (or use included wrapper)

#### Optional Software
- **Ollama** - Download from [ollama.ai](https://ollama.ai) for local AI models
- **ChromaDB** - Install via `pip install chromadb` for persistent vector storage
- **OpenRouter Account** - Sign up at [openrouter.ai](https://openrouter.ai) for cloud AI models

### Quick Start

#### 1. Clone and Build
```bash
# Clone the repository
git clone <repository-url>
cd Ollama-OpenRouter-javafx-manager

# Build the project
./mvnw clean compile
```

#### 2. Run the Application
```bash
# Main authentication application
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp

# Or use provided scripts
# Windows:
run-auth-app.bat

# Unix/Linux:
./run-auth-app.sh
```

#### 3. First Login
Use any of the default credentials:
- Username: `admin`, Password: `admin123` (Admin access)
- Username: `user`, Password: `user123` (User access)

### Detailed Setup

#### Setting up Ollama (Local AI)
```bash
# Install Ollama (visit ollama.ai for platform-specific instructions)

# Pull recommended models
ollama pull llama2                # General chat model
ollama pull nomic-embed-text      # Embedding model for RAG
ollama pull deepseek-coder        # Code generation model

# Start Ollama server (usually starts automatically)
ollama serve
```

#### Setting up OpenRouter (Cloud AI)
1. Sign up at [openrouter.ai](https://openrouter.ai)
2. Get your API key from the dashboard
3. Save it to `api.txt` in the project root:
   ```bash
   echo "your-openrouter-api-key-here" > api.txt
   ```

#### Setting up ChromaDB (Optional - for RAG)
```bash
# Install ChromaDB
pip install chromadb

# Run ChromaDB server
chroma run --host localhost --port 8000

# Or with Docker
docker run -p 8000:8000 chromadb/chroma
```

### Verification

#### Quick System Test
```bash
# Run system verification
./mvnw compile exec:java -Dexec.mainClass="com.ollama.ollamaopenrouterjavafxmanager.QuickTest"
```

This will test:
- Java and JavaFX setup
- Ollama connectivity
- OpenRouter API key
- ChromaDB connection (if configured)
- Hardware monitoring capabilities

#### Demo Applications
```bash
# Comprehensive demo with all features
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.ComprehensiveDemo

# Enhanced chat demo
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.EnhancedChatDemo

# Theme system demo
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.ThemeDemo
```

---
## 👥 User Guide

### Getting Started

#### First Time Login
1. **Launch the Application**: Run `./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp`
2. **Login Screen**: Enter credentials (use `admin`/`admin123` for admin access)
3. **Loading Screen**: Watch as the system initializes and loads your configuration
4. **App Selection**: Choose between JavaFX (modern) or Swing (classic) interface

#### User Roles and Capabilities

##### USER Role Capabilities
- **Chat Interface**: Interact with AI models through intuitive chat interface
- **Provider Selection**: Choose between Ollama (local) and OpenRouter (cloud) models
- **Theme Customization**: Select from 20+ professional themes
- **RAG Queries**: Ask questions about ingested documents
- **Agentic Mode**: Enable multi-step reasoning and tool use
- **Session Management**: Persistent chat history and preferences

##### ADMIN Role Capabilities
- **All User Capabilities** plus:
- **User Management**: View, enable/disable users, reset passwords
- **API Key Management**: Configure individual user API keys
- **System Settings**: Configure general API keys and system preferences
- **Chat History Access**: View user chat sessions and history
- **Hardware Monitoring**: Access to system performance metrics
- **Bulk Operations**: Assign API keys to multiple users

### Using the Chat Interface

#### Basic Chat
1. **Select Provider**: Choose Ollama (local) or OpenRouter (cloud)
2. **Select Model**: Pick from available models in the dropdown
3. **Type Message**: Enter your question or request
4. **Send**: Press Enter or click Send button
5. **View Response**: Watch as the AI responds in real-time

#### Advanced Features

##### Agentic Mode
Enable advanced AI capabilities:
1. **Menu**: Agentic → Enable Agentic Mode
2. **Chain of Thought**: See step-by-step reasoning
3. **Tool Use**: AI can use calculator, search, and other tools
4. **Task Decomposition**: Complex tasks broken into steps

##### RAG (Document Q&A)
Query your documents:
1. **Ingest Documents**: Use ComprehensiveDemo to add documents
2. **Enable RAG**: Select RAG-enabled models or use RAG agent
3. **Ask Questions**: Query about document content
4. **View Sources**: See which documents informed the answer

##### Query Routing
Let the system choose the best model:
1. **Auto-Route**: Enable automatic provider selection
2. **Routing Strategy**: Choose cost-optimized, performance, or balanced
3. **Query Classification**: System analyzes query complexity
4. **Smart Routing**: Automatically uses best provider for each query

### Theme Customization

#### Applying Themes
1. **Access Themes**: From app selection screen or main menu
2. **Browse Categories**: Material, Brand, Nature, Style, Gaming
3. **Preview**: See theme colors and style
4. **Apply**: Instant application without restart
5. **Persistence**: Theme saved for future sessions

#### Available Theme Categories

##### Material Themes
- **Material Light**: Clean, bright Google Material Design
- **Material Dark**: Dark mode with Material Design principles

##### Brand Themes
- **Google**: Google's signature colors and style
- **Apple**: Apple's clean, minimalist aesthetic
- **Samsung**: Samsung's modern blue palette
- **Microsoft**: Microsoft's Fluent Design colors
- **Mistral AI**: AI-focused purple and blue theme

##### Nature Themes
- **Forest Green**: Calming green forest colors
- **Ocean Blue**: Deep blue ocean-inspired palette
- **Sunrise**: Warm orange and yellow sunrise colors
- **Night**: Dark theme with subtle blue accents

##### Gaming Themes
- **Cyberpunk 2077**: Neon pink and blue cyberpunk aesthetic
- **GTA Vice City**: Retro 80s pink and purple theme

### Hardware Monitoring

#### Accessing System Metrics
1. **Main Menu**: Options → Hardware Monitor
2. **Real-time Data**: CPU, Memory, GPU usage
3. **Process Monitoring**: Ollama server status
4. **Color Coding**: Green (good), Yellow (warning), Red (critical)

#### Understanding Metrics
- **CPU Usage**: System-wide CPU utilization
- **Memory Usage**: JVM heap memory consumption
- **GPU/VRAM**: Graphics card memory usage (if available)
- **Ollama Process**: Local AI server status and uptime

### Multi-Agent Workflows

#### Using Specialized Agents
1. **Research Agent**: For in-depth analysis and research
2. **Code Agent**: For programming tasks and code review
3. **Synthesis Agent**: For writing and content creation
4. **RAG Agent**: For document-based question answering
5. **Embedding Agent**: For similarity and analysis tasks

#### Creating Agent Workflows
1. **Sequential Mode**: Agents work one after another
2. **Parallel Mode**: Multiple agents work simultaneously
3. **Hierarchical Mode**: Manager agent coordinates workers

### Troubleshooting Common Issues

#### Login Issues
- **Wrong Credentials**: Use default credentials from documentation
- **API Key Problems**: Leave API key blank - it loads from database
- **Role Mismatch**: Ensure selected role matches user's assigned role

#### Connection Issues
- **Ollama Not Running**: Start with `ollama serve`
- **OpenRouter API**: Check API key in `api.txt`
- **ChromaDB Offline**: Start with `chroma run`

#### Performance Issues
- **Slow Responses**: Try local Ollama models for faster responses
- **High Memory**: Restart application or use smaller models
- **GPU Not Detected**: Install appropriate drivers (NVIDIA/AMD)

---

## 👨‍💻 Developer Guide

### Development Environment Setup

#### IDE Configuration
**Recommended IDEs:**
- **IntelliJ IDEA**: Excellent JavaFX support with Scene Builder integration
- **Eclipse**: With e(fx)clipse plugin for JavaFX development
- **VS Code**: With Java Extension Pack and JavaFX support

#### JavaFX Scene Builder
Download from [Gluon](https://gluonhq.com/products/scene-builder/) for visual FXML editing.

#### Development Dependencies
```xml
<!-- Already included in pom.xml -->
<dependency>
    <groupId>org.openjfx</groupId>
    <artifactId>javafx-controls</artifactId>
    <version>21</version>
</dependency>
<dependency>
    <groupId>org.controlsfx</groupId>
    <artifactId>controlsfx</artifactId>
    <version>11.1.2</version>
</dependency>
```

### Architecture Deep Dive

#### MVC Pattern Implementation
```java
// Model - Data and business logic
public class User {
    private String username;
    private Role role;
    // ... business logic
}

// View - FXML files define UI structure
// login-view.fxml, admin-view.fxml, etc.

// Controller - Handles user interactions
@FXML
public class LoginController {
    @FXML private TextField usernameField;
    
    @FXML
    private void handleLogin() {
        // Handle user interaction
    }
}
```

#### Service Layer Pattern
```java
// Service interfaces for business logic
public class UserService {
    private static UserService instance;
    
    public static UserService getInstance() {
        if (instance == null) {
            instance = new UserService();
        }
        return instance;
    }
    
    public boolean authenticate(String username, String password) {
        // Authentication logic
    }
}
```

#### Dependency Injection
```java
// Constructor injection for testability
public class LoginController {
    private final UserService userService;
    private final LoginManager loginManager;
    
    public LoginController(UserService userService, LoginManager loginManager) {
        this.userService = userService;
        this.loginManager = loginManager;
    }
}
```

### Adding New Features

#### Creating a New Service
1. **Define Interface** (optional but recommended):
```java
public interface NewService {
    void performOperation();
}
```

2. **Implement Service**:
```java
public class NewServiceImpl implements NewService {
    @Override
    public void performOperation() {
        // Implementation
    }
}
```

3. **Register in ServiceLocator** (if using):
```java
ServiceLocator.register(NewService.class, new NewServiceImpl());
```

#### Adding a New Controller
1. **Create FXML File**:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<VBox xmlns="http://javafx.com/javafx/11.0.1" xmlns:fx="http://javafx.com/fxml/1" 
      fx:controller="com.ollama.ollamaopenrouterjavafxmanager.controllers.NewController">
   <Button fx:id="actionButton" onAction="#handleAction" text="Action" />
</VBox>
```

2. **Create Controller Class**:
```java
public class NewController {
    @FXML private Button actionButton;
    
    @FXML
    private void initialize() {
        // Initialize controller
    }
    
    @FXML
    private void handleAction() {
        // Handle button click
    }
}
```

3. **Load in Application**:
```java
FXMLLoader loader = new FXMLLoader(getClass().getResource("new-view.fxml"));
Parent root = loader.load();
Scene scene = new Scene(root);
stage.setScene(scene);
```

#### Adding a New Theme
1. **Create Theme JSON**:
```json
{
  "name": "Custom Theme",
  "primaryColor": "#2196F3",
  "secondaryColor": "#FFC107",
  "backgroundColor": "#FFFFFF",
  "foregroundColor": "#212121",
  "textColor": "#212121",
  "buttonColor": "#E0E0E0",
  "borderColor": "#BDBDBD",
  "hoverColor": "#1976D2",
  "accentColor": "#FF4081"
}
```

2. **Place in Resources**:
```
src/main/resources/com/ollama/ollamaopenrouterjavafxmanager/themes/custom-theme.json
```

3. **Register in ThemeManager**:
```java
ThemeManager.getInstance().loadTheme("custom-theme.json");
```

### Testing

#### Unit Testing
```java
@Test
public void testUserAuthentication() {
    UserService userService = new UserService();
    boolean result = userService.authenticate("admin", "admin123");
    assertTrue(result);
}
```

#### Integration Testing
```java
@Test
public void testLoginFlow() {
    // Test complete login workflow
    LoginController controller = new LoginController();
    // ... test implementation
}
```

#### UI Testing with TestFX
```java
public class LoginControllerTest extends ApplicationTest {
    @Override
    public void start(Stage stage) {
        // Setup test stage
    }
    
    @Test
    public void testLoginButton() {
        clickOn("#loginButton");
        // Verify expected behavior
    }
}
```

### Performance Optimization

#### Memory Management
```java
// Use weak references for listeners
WeakReference<EventHandler<ActionEvent>> handlerRef = 
    new WeakReference<>(handler);

// Clean up resources
@Override
public void stop() {
    // Clean up background threads
    executorService.shutdown();
    
    // Clean up listeners
    observable.removeListener(listener);
}
```

#### Async Operations
```java
// Use CompletableFuture for async operations
CompletableFuture.supplyAsync(() -> {
    // Background operation
    return heavyComputation();
}).thenAcceptAsync(result -> {
    // Update UI on JavaFX thread
    Platform.runLater(() -> updateUI(result));
});
```

#### Resource Loading
```java
// Lazy loading of resources
private Image loadImageLazily(String path) {
    return imageCache.computeIfAbsent(path, 
        p -> new Image(getClass().getResourceAsStream(p)));
}
```

### Debugging and Logging

#### Enable Debug Mode
```bash
./mvnw javafx:run -Dcom.ollama.debug=true -Djavafx.verbose=true
```

#### Logging Configuration
```java
// Use java.util.logging or SLF4J
private static final Logger logger = 
    Logger.getLogger(MyClass.class.getName());

logger.info("Operation completed successfully");
logger.warning("Potential issue detected");
logger.severe("Critical error occurred");
```

#### JavaFX Debugging
```java
// Debug FXML loading
try {
    FXMLLoader loader = new FXMLLoader(getClass().getResource("view.fxml"));
    Parent root = loader.load();
} catch (IOException e) {
    logger.severe("Failed to load FXML: " + e.getMessage());
    e.printStackTrace();
}
```

---
## 🔌 API Documentation

### Core APIs

#### UnifiedModelService API
Central service for AI model interactions.

```java
// Initialize service
UnifiedModelService service = new UnifiedModelService(ollamaAPI, openRouterAPI);

// Configure provider
service.setActiveProvider(Provider.OPENROUTER);
service.setRoutingStrategy(RoutingStrategy.AUTO_COMPLEXITY);

// Enable advanced features
service.setAgenticMode(true);
service.setChainOfThought(true);

// Chat with streaming
service.chat("Explain quantum computing", new ChatCallback() {
    @Override
    public void onToken(String token) {
        // Handle streaming tokens
        Platform.runLater(() -> appendToChat(token));
    }
    
    @Override
    public void onComplete(String response, Provider provider) {
        // Handle completion
        System.out.println("Response from: " + provider);
    }
    
    @Override
    public void onError(String error) {
        // Handle errors
        showErrorDialog(error);
    }
});

// Get available models
service.getAvailableModels(Provider.OLLAMA, models -> {
    // Handle model list
    updateModelDropdown(models);
});
```

#### RAGPipeline API
Document ingestion and retrieval-augmented generation.

```java
// Initialize RAG pipeline
EmbeddingService embeddings = new EmbeddingService("nomic-embed-text");
VectorStore vectorStore = new VectorStore(embeddings, Backend.CHROMA_DB);
RAGPipeline rag = new RAGPipeline(embeddings, vectorStore, modelService);

// Configure parameters
rag.setTopK(5);                    // Retrieve top 5 documents
rag.setSimilarityThreshold(0.5);   // Minimum similarity score
rag.setChunkSize(500);             // Characters per chunk
rag.setChunkOverlap(50);           // Overlap between chunks

// Ingest documents
rag.ingestText("doc1", "Document content...", 
    Map.of("source", "manual", "category", "tech"));

rag.ingestFile(Path.of("document.txt"));

rag.ingestDirectory(Path.of("docs/"), "txt", "md", "java");

// Query with RAG
rag.query("What are the main features?", new RAGPipeline.RAGCallback() {
    @Override
    public void onContextRetrieved(List<SearchResult> results) {
        System.out.println("Found " + results.size() + " relevant documents");
        results.forEach(r -> System.out.println("- " + r.document.id + ": " + r.score));
    }
    
    @Override
    public void onToken(String token) {
        Platform.runLater(() -> appendToChat(token));
    }
    
    @Override
    public void onComplete(String response, List<SearchResult> sources) {
        System.out.println("Response generated with " + sources.size() + " sources");
    }
    
    @Override
    public void onError(String error) {
        System.err.println("RAG error: " + error);
    }
});
```

#### MultiAgentOrchestrator API
CrewAI-style multi-agent coordination.

```java
// Initialize orchestrator
MultiAgentOrchestrator orchestrator = new MultiAgentOrchestrator(
    modelService, embeddingService, ragPipeline);

// Quick operations
orchestrator.research("quantum computing applications", 
    result -> System.out.println("Research: " + result),
    error -> System.err.println("Error: " + error));

orchestrator.generateCode("Python function to merge sorted lists",
    code -> System.out.println("Generated code:\n" + code),
    error -> System.err.println("Error: " + error));

// Complex crew task
List<AgentTask> tasks = List.of(
    new AgentTask("research", "research_agent", 
        "Research REST API best practices", 
        "Comprehensive best practices list", null),
    new AgentTask("implement", "code_agent",
        "Implement REST API using researched practices",
        "Working Java Spring Boot code", null),
    new AgentTask("review", "code_agent",
        "Review the implementation for issues",
        "Code review with suggestions", null)
);

CrewTask crew = new CrewTask("Build production REST API", tasks);
orchestrator.setExecutionMode(ExecutionMode.SEQUENTIAL);

orchestrator.executeCrew(crew, new CrewCallback() {
    @Override
    public void onAgentStart(Agent agent, AgentTask task) {
        System.out.println(agent.name + " starting: " + task.description);
    }
    
    @Override
    public void onAgentComplete(Agent agent, AgentTask task, String result) {
        System.out.println(agent.name + " completed task");
    }
    
    @Override
    public void onComplete(String finalResult, List<TaskResult> history) {
        System.out.println("Crew completed!\nResult: " + finalResult);
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Crew failed: " + error);
    }
});

// Register custom agent
orchestrator.registerAgent(new Agent(
    "translator_agent",
    "Translation Expert", 
    "Expert at accurate language translation",
    UnifiedModelService.Provider.OPENROUTER,
    "google/gemma-2-9b-it:free",
    AgentCapability.WRITING, AgentCapability.ANALYSIS
));
```

#### VectorStore API
Vector storage with multiple backends.

```java
// Initialize vector store
EmbeddingService embeddings = new EmbeddingService("nomic-embed-text");
VectorStore store = new VectorStore(embeddings, Backend.CHROMA_DB);

// Configure ChromaDB
store.setChromaUrl("http://localhost:8000");
store.setCollectionName("knowledge_base");
store.initializeChroma();

// Add documents
Map<String, String> metadata = Map.of(
    "source", "manual",
    "category", "technical",
    "author", "system"
);

store.addDocument("doc1", "Document content here", metadata)
    .thenRun(() -> System.out.println("Document added"));

// Batch add documents
List<VectorStore.Document> docs = List.of(
    new VectorStore.Document("doc2", "Content 2", metadata),
    new VectorStore.Document("doc3", "Content 3", metadata)
);

store.addDocuments(docs)
    .thenRun(() -> System.out.println("Batch added"));

// Search documents
store.search("query text", 5)
    .thenAccept(results -> {
        System.out.println("Found " + results.size() + " results:");
        for (VectorStore.SearchResult result : results) {
            System.out.println("- " + result.document.id + 
                " (score: " + result.score + ")");
        }
    });

// Search with metadata filter
Map<String, String> filter = Map.of("category", "technical");
store.searchWithFilter("query", 5, filter)
    .thenAccept(results -> {
        // Handle filtered results
    });
```

#### HardwareMonitorService API
Real-time system monitoring.

```java
// Initialize hardware monitor
HardwareMonitorService monitor = new HardwareMonitorService();

// Configure update intervals
monitor.setCpuUpdateInterval(1000);    // 1 second
monitor.setMemoryUpdateInterval(2000); // 2 seconds
monitor.setGpuUpdateInterval(5000);    // 5 seconds

// Bind to JavaFX properties
ProgressBar cpuBar = new ProgressBar();
cpuBar.progressProperty().bind(monitor.cpuUsageProperty());

Label memoryLabel = new Label();
memoryLabel.textProperty().bind(monitor.memoryUsageProperty().asString("Memory: %.1f%%"));

// Add listeners
monitor.cpuUsageProperty().addListener((obs, oldVal, newVal) -> {
    if (newVal.doubleValue() > 0.8) {
        System.out.println("High CPU usage detected: " + newVal);
    }
});

// Start monitoring
monitor.startMonitoring();

// Stop monitoring (important for cleanup)
monitor.stopMonitoring();
```

### Authentication APIs

#### UserService API
User management and authentication.

```java
// Get service instance
UserService userService = UserService.getInstance();

// Authenticate user
boolean authenticated = userService.authenticate("username", "password", "api-key");

// Get user by username
User user = userService.getUserByUsername("admin");

// Update user API key
userService.updateUserApiKey("username", "new-api-key");

// Enable/disable user
userService.setUserEnabled("username", false);

// Reset password
userService.resetPassword("username", "new-password");

// Get all users
List<User> users = userService.getAllUsers();
```

#### SessionContext API
Session management.

```java
// Get current session
SessionContext session = SessionContext.getInstance();

// Check if logged in
if (session.isLoggedIn()) {
    String username = session.getUsername();
    User.Role role = session.getRole();
    String apiKey = session.getApiKey();
}

// Login user
session.login("username", User.Role.ADMIN, "api-key", "user-id");

// Logout
session.logout();

// Update API key
session.updateApiKey("new-api-key");
```

### Theme System APIs

#### ThemeManager API
Dynamic theme management.

```java
// Get theme manager
ThemeManager themeManager = ThemeManager.getInstance();

// Load available themes
List<Theme> themes = themeManager.getAvailableThemes();

// Apply theme
themeManager.applyTheme("material-dark", scene);

// Get current theme
Theme currentTheme = themeManager.getCurrentTheme();

// Create custom theme
Theme customTheme = new Theme(
    "Custom Theme",
    "#2196F3",  // primary
    "#FFC107",  // secondary
    "#FFFFFF",  // background
    "#212121",  // foreground
    "#212121",  // text
    "#E0E0E0",  // button
    "#BDBDBD",  // border
    "#1976D2",  // hover
    "#FF4081"   // accent
);

// Register custom theme
themeManager.registerTheme(customTheme);
```

### Configuration APIs

#### ConfigManager API
Application configuration management.

```java
// Get config manager
ConfigManager config = ConfigManager.getInstance();

// Get configuration values
String apiKey = config.getProperty("openrouter.api.key");
int maxTokens = config.getIntProperty("model.max.tokens", 2048);
boolean debugMode = config.getBooleanProperty("debug.enabled", false);

// Set configuration values
config.setProperty("theme.current", "material-dark");
config.setProperty("window.width", "1200");
config.setProperty("window.height", "800");

// Save configuration
config.saveConfig();

// Load configuration
config.loadConfig();
```

### Error Handling

#### Standard Error Patterns
```java
// Service-level error handling
public class ServiceException extends Exception {
    public ServiceException(String message) {
        super(message);
    }
    
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Async error handling
CompletableFuture<String> future = service.performAsyncOperation();
future.handle((result, throwable) -> {
    if (throwable != null) {
        Platform.runLater(() -> showErrorDialog(throwable.getMessage()));
        return null;
    }
    Platform.runLater(() -> updateUI(result));
    return result;
});

// UI error handling
try {
    service.performOperation();
} catch (ServiceException e) {
    showErrorAlert("Operation Failed", e.getMessage());
} catch (Exception e) {
    showErrorAlert("Unexpected Error", "An unexpected error occurred: " + e.getMessage());
}
```

---

## 🚀 Deployment

### Development Deployment

#### Running from Source
```bash
# Clean build and run
./mvnw clean javafx:run

# Run specific application
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp

# Run with debug flags
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp -Dcom.ollama.debug=true
```

#### IDE Deployment
**IntelliJ IDEA:**
1. Import Maven project
2. Configure JavaFX SDK in Project Structure
3. Add VM options: `--module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml`
4. Run main class

**Eclipse:**
1. Import as Maven project
2. Install e(fx)clipse plugin
3. Configure JavaFX runtime
4. Run as JavaFX Application

### Production Deployment

#### Creating Executable JAR
```bash
# Build JAR with dependencies
./mvnw clean package

# Run JAR (requires JavaFX on classpath)
java --module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml -jar target/ollama-manager-1.0.jar
```

#### Native Executable with jpackage
```bash
# Create native installer
./mvnw javafx:jpackage

# Or manually
jpackage --input target/ \
         --name "Ollama Manager" \
         --main-jar ollama-manager-1.0.jar \
         --main-class com.ollama.ollamaopenrouterjavafxmanager.AuthApp \
         --type msi \
         --icon src/main/resources/img/app-icon.ico
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM openjdk:17-jdk-slim

# Install JavaFX
RUN apt-get update && apt-get install -y openjfx

# Copy application
COPY target/ollama-manager-1.0.jar app.jar

# Run application
ENTRYPOINT ["java", "--module-path", "/usr/share/openjfx/lib", "--add-modules", "javafx.controls,javafx.fxml", "-jar", "/app.jar"]
```

```bash
# Build and run Docker container
docker build -t ollama-manager .
docker run -p 8080:8080 ollama-manager
```

### Cloud Deployment

#### AWS Deployment
```yaml
# docker-compose.yml for AWS ECS
version: '3.8'
services:
  ollama-manager:
    image: ollama-manager:latest
    ports:
      - "8080:8080"
    environment:
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - CHROMA_URL=http://chromadb:8000
    depends_on:
      - chromadb
  
  chromadb:
    image: chromadb/chroma:latest
    ports:
      - "8000:8000"
    volumes:
      - chroma_data:/chroma/chroma
      
volumes:
  chroma_data:
```

#### Kubernetes Deployment
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama-manager
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ollama-manager
  template:
    metadata:
      labels:
        app: ollama-manager
    spec:
      containers:
      - name: ollama-manager
        image: ollama-manager:latest
        ports:
        - containerPort: 8080
        env:
        - name: OPENROUTER_API_KEY
          valueFrom:
            secretKeyRef:
              name: api-keys
              key: openrouter-key
---
apiVersion: v1
kind: Service
metadata:
  name: ollama-manager-service
spec:
  selector:
    app: ollama-manager
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

### Configuration Management

#### Environment-Specific Configs
```properties
# application-dev.properties
debug.enabled=true
ollama.url=http://localhost:11434
chroma.url=http://localhost:8000
openrouter.api.key=${OPENROUTER_API_KEY}

# application-prod.properties
debug.enabled=false
ollama.url=http://ollama-service:11434
chroma.url=http://chroma-service:8000
openrouter.api.key=${OPENROUTER_API_KEY}
```

#### Secrets Management
```bash
# Using environment variables
export OPENROUTER_API_KEY="your-api-key"
export DATABASE_PASSWORD="your-db-password"

# Using Docker secrets
echo "your-api-key" | docker secret create openrouter_key -

# Using Kubernetes secrets
kubectl create secret generic api-keys \
  --from-literal=openrouter-key=your-api-key
```

### Monitoring and Logging

#### Application Monitoring
```java
// Add monitoring endpoints
@RestController
public class HealthController {
    
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of(
            "status", "UP",
            "timestamp", Instant.now().toString(),
            "version", getClass().getPackage().getImplementationVersion()
        );
    }
    
    @GetMapping("/metrics")
    public Map<String, Object> metrics() {
        return Map.of(
            "memory", Runtime.getRuntime().totalMemory(),
            "cpu", ManagementFactory.getOperatingSystemMXBean().getProcessCpuLoad(),
            "uptime", ManagementFactory.getRuntimeMXBean().getUptime()
        );
    }
}
```

#### Logging Configuration
```xml
<!-- logback-spring.xml -->
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logs/ollama-manager.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>logs/ollama-manager.%d{yyyy-MM-dd}.log</fileNamePattern>
            <maxHistory>30</maxHistory>
        </rollingPolicy>
        <encoder>
            <pattern>%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    
    <root level="INFO">
        <appender-ref ref="STDOUT" />
        <appender-ref ref="FILE" />
    </root>
</configuration>
```

---
## 🔧 Troubleshooting

### Common Issues and Solutions

#### Installation and Setup Issues

##### Java/JavaFX Issues
**Problem**: `Error: JavaFX runtime components are missing`
```bash
# Solution 1: Use Maven wrapper (recommended)
./mvnw javafx:run

# Solution 2: Add JavaFX to module path
java --module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml -cp target/classes com.ollama.ollamaopenrouterjavafxmanager.AuthApp

# Solution 3: Install JavaFX SDK
# Download from https://openjfx.io/
```

**Problem**: `Module not found` errors
```bash
# Check module-info.java is present
cat src/main/java/module-info.java

# Rebuild project
./mvnw clean compile
```

##### Maven Issues
**Problem**: `mvnw: command not found`
```bash
# Make executable (Unix/Linux)
chmod +x mvnw

# Use full path (Windows)
.\mvnw.cmd clean compile
```

**Problem**: Maven dependency resolution fails
```bash
# Clear local repository
rm -rf ~/.m2/repository

# Force update dependencies
./mvnw clean compile -U
```

#### Authentication Issues

##### Login Problems
**Problem**: Cannot login with default credentials
- **Solution**: Ensure you're using exact credentials:
  - Username: `admin`, Password: `admin123`
  - Username: `user`, Password: `user123`
  - Case-sensitive!

**Problem**: API key validation fails
- **Solution**: Leave API key field blank - it loads from database automatically
- **Alternative**: Use exact API key from documentation

**Problem**: Role mismatch error
- **Solution**: Ensure selected role matches user's assigned role
- Admin users must select "Admin" role
- Regular users must select "User" role

##### Session Issues
**Problem**: Session not persisting
- **Solution**: Check `session.txt` file is writable
- **Solution**: Restart application to reset session

**Problem**: API key not loading from database
- **Solution**: Check `DatabaseService` initialization
- **Solution**: Verify user exists in default user list

#### Connection Issues

##### Ollama Connection
**Problem**: `Connection refused to localhost:11434`
```bash
# Check if Ollama is running
curl http://localhost:11434/api/tags

# Start Ollama server
ollama serve

# Check Ollama installation
ollama --version
```

**Problem**: Models not loading
```bash
# Pull required models
ollama pull llama2
ollama pull nomic-embed-text

# List available models
ollama list
```

##### OpenRouter Connection
**Problem**: `Invalid API key` error
- **Solution**: Check `api.txt` file contains valid key
- **Solution**: Verify API key at [openrouter.ai](https://openrouter.ai)
- **Solution**: Ensure no extra spaces or newlines in `api.txt`

**Problem**: Rate limiting or quota exceeded
- **Solution**: Check OpenRouter dashboard for usage
- **Solution**: Switch to free models or Ollama
- **Solution**: Wait for rate limit reset

##### ChromaDB Connection
**Problem**: `Connection refused to localhost:8000`
```bash
# Start ChromaDB server
chroma run --host localhost --port 8000

# Or with Docker
docker run -p 8000:8000 chromadb/chroma

# Check ChromaDB installation
pip install chromadb
```

**Problem**: Collection not found
- **Solution**: Initialize ChromaDB collection in VectorStore
- **Solution**: Check collection name matches configuration

#### Performance Issues

##### High Memory Usage
**Problem**: Application consuming too much memory
- **Solution**: Restart application periodically
- **Solution**: Use smaller embedding models (all-minilm vs nomic-embed-text)
- **Solution**: Reduce context window size
- **Solution**: Clear chat history regularly

**Problem**: Slow response times
- **Solution**: Use local Ollama models for faster responses
- **Solution**: Check network connection for OpenRouter
- **Solution**: Reduce hardware monitoring frequency
- **Solution**: Use smaller models for testing

##### GPU Issues
**Problem**: GPU not detected
```bash
# NVIDIA: Install CUDA toolkit and drivers
nvidia-smi

# AMD: Install ROCm
rocm-smi

# Intel: Check Windows Device Manager
```

**Problem**: VRAM monitoring not working
- **Solution**: Install appropriate GPU drivers
- **Solution**: Run as administrator (Windows)
- **Solution**: Check GPU vendor detection logic

#### UI and Theme Issues

##### Theme Loading Problems
**Problem**: Theme not applying
- **Solution**: Check JSON syntax in theme files
- **Solution**: Restart application
- **Solution**: Clear theme cache

**Problem**: UI elements not styled correctly
- **Solution**: Check CSS generation in ThemeCssGenerator
- **Solution**: Verify FXML files have correct style classes
- **Solution**: Clear JavaFX CSS cache

##### FXML Loading Issues
**Problem**: `FXMLLoadException`
- **Solution**: Check FXML file path and spelling
- **Solution**: Verify controller class name in FXML
- **Solution**: Ensure all @FXML fields match FXML fx:id

**Problem**: Controller injection fails
- **Solution**: Check @FXML annotations
- **Solution**: Verify initialize() method signature
- **Solution**: Ensure controller has no-arg constructor

#### RAG and Vector Store Issues

##### Document Ingestion Problems
**Problem**: Documents not being indexed
- **Solution**: Check file permissions and paths
- **Solution**: Verify supported file formats
- **Solution**: Check embedding service is running

**Problem**: Search returns no results
- **Solution**: Lower similarity threshold
- **Solution**: Check document chunking parameters
- **Solution**: Verify embeddings are generated correctly

##### ChromaDB Issues
**Problem**: ChromaDB server not starting
```bash
# Check port availability
netstat -an | grep 8000

# Kill existing processes
pkill -f chroma

# Start with different port
chroma run --host localhost --port 8001
```

**Problem**: Collection operations fail
- **Solution**: Check ChromaDB server logs
- **Solution**: Verify collection name is valid
- **Solution**: Restart ChromaDB server

#### Multi-Agent Issues

##### Agent Execution Problems
**Problem**: Agents not responding
- **Solution**: Check model availability
- **Solution**: Verify API keys for cloud models
- **Solution**: Check agent configuration

**Problem**: Tool execution fails
- **Solution**: Verify tool registration
- **Solution**: Check tool implementation
- **Solution**: Review tool input/output format

### Debug Mode

#### Enabling Debug Logging
```bash
# Enable comprehensive debugging
./mvnw javafx:run -Dcom.ollama.debug=true -Djavafx.verbose=true -Dprism.verbose=true

# Enable specific component debugging
./mvnw javafx:run -Dcom.ollama.rag.debug=true -Dcom.ollama.agent.debug=true
```

#### Debug Output Locations
- **Console**: Real-time debug output
- **Log Files**: `logs/ollama-manager.log` (if configured)
- **System Properties**: Check with `System.getProperty("java.version")`

#### Useful Debug Commands
```java
// In code - add temporary debug output
System.out.println("Debug: " + variableName);
Logger.getLogger(getClass().getName()).info("Debug info: " + details);

// Check JavaFX properties
System.out.println("JavaFX version: " + System.getProperty("javafx.version"));
System.out.println("Java version: " + System.getProperty("java.version"));
```

### System Requirements Verification

#### Minimum Requirements Check
```bash
# Java version
java -version
# Should be 17 or higher

# JavaFX availability
java --list-modules | grep javafx
# Should show javafx modules

# Memory available
java -XX:+PrintFlagsFinal -version | grep MaxHeapSize
# Should be at least 1GB

# Disk space
df -h .
# Should have at least 2GB free
```

#### Performance Benchmarking
```java
// Add to QuickTest.java for system benchmarking
public void benchmarkSystem() {
    // CPU benchmark
    long start = System.currentTimeMillis();
    for (int i = 0; i < 1000000; i++) {
        Math.sqrt(i);
    }
    long cpuTime = System.currentTimeMillis() - start;
    
    // Memory benchmark
    Runtime runtime = Runtime.getRuntime();
    long maxMemory = runtime.maxMemory();
    long totalMemory = runtime.totalMemory();
    long freeMemory = runtime.freeMemory();
    
    System.out.println("CPU benchmark: " + cpuTime + "ms");
    System.out.println("Max memory: " + (maxMemory / 1024 / 1024) + "MB");
    System.out.println("Available memory: " + (freeMemory / 1024 / 1024) + "MB");
}
```

### Getting Help

#### Community Resources
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check all .md files in documentation folder
- **Code Examples**: Review demo applications and test classes

#### Professional Support
- **Enterprise Support**: Available for production deployments
- **Custom Development**: Modifications and extensions
- **Training**: Team training on architecture and usage

#### Self-Help Tools
```bash
# System verification
./mvnw compile exec:java -Dexec.mainClass="com.ollama.ollamaopenrouterjavafxmanager.QuickTest"

# View test credentials
java -cp target/classes com.ollama.ollamaopenrouterjavafxmanager.AuthDemo

# Run comprehensive demo
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.ComprehensiveDemo
```

---

## 🤝 Contributing

### Development Workflow

#### Setting Up Development Environment
1. **Fork the Repository**
   ```bash
   git clone https://github.com/habi-babti/Ollama-OpenRouter-javafx-manager.git
   cd Ollama-OpenRouter-javafx-manager
   ```

2. **Install Prerequisites**
   - Java 17+ JDK
   - Maven 3.6+
   - JavaFX SDK (optional, included in dependencies)
   - IDE with JavaFX support (IntelliJ IDEA recommended)

3. **Build and Test**
   ```bash
   ./mvnw clean compile
   ./mvnw test
   ./mvnw javafx:run
   ```

#### Code Style Guidelines

##### Java Code Style
- **Indentation**: 4 spaces (no tabs)
- **Line Length**: 120 characters maximum
- **Naming**: camelCase for variables/methods, PascalCase for classes
- **Documentation**: JavaDoc for public APIs

```java
/**
 * Service for managing AI model interactions.
 * 
 * @author Your Name
 * @since 1.0
 */
public class UnifiedModelService {
    
    /**
     * Sends a chat message to the specified provider.
     * 
     * @param message the message to send
     * @param callback callback for handling responses
     * @throws ServiceException if the operation fails
     */
    public void chat(String message, ChatCallback callback) throws ServiceException {
        // Implementation
    }
}
```

##### FXML Style
- **Indentation**: 2 spaces
- **Attributes**: One per line for complex elements
- **IDs**: kebab-case (e.g., `fx:id="user-name-field"`)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?import javafx.scene.control.*?>
<?import javafx.scene.layout.*?>

<VBox xmlns="http://javafx.com/javafx/11.0.1" 
      xmlns:fx="http://javafx.com/fxml/1" 
      fx:controller="com.ollama.controllers.NewController">
  
  <TextField fx:id="input-field" 
             promptText="Enter your message" />
  
  <Button fx:id="send-button" 
          text="Send" 
          onAction="#handleSend" />
          
</VBox>
```

#### Contribution Types

##### Bug Fixes
1. **Create Issue**: Describe the bug with reproduction steps
2. **Create Branch**: `git checkout -b fix/issue-description`
3. **Fix Bug**: Make minimal changes to fix the issue
4. **Add Tests**: Ensure the bug doesn't regress
5. **Submit PR**: Include issue reference and test results

##### New Features
1. **Discuss First**: Create issue to discuss the feature
2. **Design Document**: For large features, create design doc
3. **Create Branch**: `git checkout -b feature/feature-name`
4. **Implement**: Follow existing patterns and architecture
5. **Documentation**: Update relevant documentation
6. **Tests**: Add comprehensive tests
7. **Submit PR**: Include feature description and usage examples

##### Documentation Improvements
1. **Identify Gap**: Find missing or unclear documentation
2. **Create Branch**: `git checkout -b docs/improvement-description`
3. **Update Docs**: Improve clarity, add examples, fix errors
4. **Test Examples**: Ensure code examples work
5. **Submit PR**: Explain what was improved and why

#### Pull Request Process

##### Before Submitting
```bash
# Ensure code compiles
./mvnw clean compile

# Run tests
./mvnw test

# Check code style
./mvnw checkstyle:check

# Test application
./mvnw javafx:run
```

##### PR Template
```markdown
## Description
Brief description of changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed
- [ ] All existing tests pass

## Screenshots (if applicable)
Add screenshots for UI changes.

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or clearly documented)
```

#### Architecture Guidelines

##### Adding New Services
1. **Interface First**: Define clear interface
2. **Singleton Pattern**: Use for stateful services
3. **Dependency Injection**: Constructor injection preferred
4. **Error Handling**: Consistent exception handling
5. **Async Operations**: Use CompletableFuture for long operations

```java
public interface NewService {
    CompletableFuture<String> performOperation(String input);
}

public class NewServiceImpl implements NewService {
    private final DependencyService dependency;
    
    public NewServiceImpl(DependencyService dependency) {
        this.dependency = dependency;
    }
    
    @Override
    public CompletableFuture<String> performOperation(String input) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return dependency.process(input);
            } catch (Exception e) {
                throw new ServiceException("Operation failed", e);
            }
        });
    }
}
```

##### Adding New Controllers
1. **FXML First**: Design UI in Scene Builder
2. **Controller Pattern**: Follow existing controller structure
3. **Event Handling**: Use @FXML methods for events
4. **Data Binding**: Use JavaFX properties for reactive UI
5. **Resource Management**: Clean up resources in stop()

```java
public class NewController {
    @FXML private TextField inputField;
    @FXML private Button actionButton;
    
    private NewService newService;
    
    @FXML
    private void initialize() {
        newService = ServiceLocator.get(NewService.class);
        setupBindings();
    }
    
    private void setupBindings() {
        actionButton.disableProperty().bind(
            inputField.textProperty().isEmpty()
        );
    }
    
    @FXML
    private void handleAction() {
        String input = inputField.getText();
        newService.performOperation(input)
            .thenAcceptAsync(result -> {
                Platform.runLater(() -> showResult(result));
            })
            .exceptionally(throwable -> {
                Platform.runLater(() -> showError(throwable.getMessage()));
                return null;
            });
    }
}
```

#### Testing Guidelines

##### Unit Tests
```java
@Test
public void testServiceOperation() {
    // Arrange
    NewService service = new NewServiceImpl(mockDependency);
    String input = "test input";
    
    // Act
    CompletableFuture<String> result = service.performOperation(input);
    
    // Assert
    assertThat(result.join()).isEqualTo("expected output");
}
```

##### Integration Tests
```java
@Test
public void testFullWorkflow() {
    // Test complete user workflow
    // Login -> Navigate -> Perform Action -> Verify Result
}
```

##### UI Tests with TestFX
```java
public class ControllerTest extends ApplicationTest {
    @Override
    public void start(Stage stage) {
        // Setup test stage
    }
    
    @Test
    public void testButtonClick() {
        clickOn("#action-button");
        verifyThat("#result-label", hasText("Expected Result"));
    }
}
```

#### Release Process

##### Version Management
- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **MAJOR**: Breaking changes
- **MINOR**: New features, backward compatible
- **PATCH**: Bug fixes, backward compatible

##### Release Checklist
1. **Update Version**: In pom.xml and documentation
2. **Update Changelog**: Document all changes
3. **Run Full Test Suite**: All tests must pass
4. **Build Release**: Create release artifacts
5. **Tag Release**: Git tag with version number
6. **Deploy**: To appropriate environments
7. **Announce**: Update documentation and notify users

### Community Guidelines

#### Code of Conduct
- **Be Respectful**: Treat all contributors with respect
- **Be Inclusive**: Welcome contributors of all backgrounds
- **Be Constructive**: Provide helpful feedback and suggestions
- **Be Patient**: Remember that everyone is learning

#### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **Pull Requests**: Code contributions and reviews
- **Discussions**: General questions and ideas
- **Documentation**: Comprehensive guides and examples

#### Recognition
Contributors are recognized in:
- **CONTRIBUTORS.md**: List of all contributors
- **Release Notes**: Major contributions highlighted
- **Documentation**: Author attribution where appropriate

---

## 📄 License and Legal

### License Information
This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Third-Party Dependencies
- **JavaFX**: GPL v2 with Classpath Exception
- **ControlsFX**: BSD 3-Clause License
- **Apache Commons**: Apache License 2.0
- **Jackson**: Apache License 2.0

### Acknowledgments
- **JavaFX Community** for excellent UI framework
- **Ollama Team** for local AI model management
- **OpenRouter** for cloud AI model access
- **Material Design** for design inspiration
- **All Contributors** who have helped improve this project

---

## 🎉 Conclusion

The **Ollama OpenRouter JavaFX Manager** represents a comprehensive solution for hybrid AI desktop applications. It successfully combines:

- **🔐 Enterprise-grade authentication** with role-based access control
- **🎨 Professional UI/UX** with 20+ dynamic themes
- **🤖 Hybrid AI architecture** leveraging both local and cloud models
- **📚 Advanced RAG capabilities** for document-based AI interactions
- **🤝 Multi-agent orchestration** for complex task automation
- **📊 Real-time system monitoring** for performance optimization
- **🏗️ Clean, maintainable architecture** ready for production use

Whether you're a researcher exploring AI capabilities, an enterprise developer building secure AI applications, or a hobbyist wanting a comprehensive AI playground, this application provides the foundation and features you need.

The modular design ensures easy extensibility, while the comprehensive documentation and examples make it accessible to developers of all skill levels. With support for both local privacy-focused AI and powerful cloud models, it offers the flexibility to meet diverse requirements and use cases.

**Built with ❤️ using JavaFX and modern Java practices**

---

*Last updated: December 22, 2025*
*Version: 1.0.0*
*Documentation Version: Complete*