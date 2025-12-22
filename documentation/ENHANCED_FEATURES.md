# Enhanced Chatbot Features

This document describes the enhanced features added to the Ollama-OpenRouter JavaFX Manager, including multi-model switching, intelligent routing, conversation persistence, and agentic capabilities.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    EnhancedChatController                        │
│  (UI Layer - JavaFX)                                            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UnifiedModelService                           │
│  - Provider abstraction (Ollama/OpenRouter)                     │
│  - Conversation context management                              │
│  - Intelligent routing                                          │
│  - Agentic mode support                                         │
└─────────────────────────────────────────────────────────────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  OllamaAPI  │    │  OpenRouterAPI  │    │   AgentService  │
│  (Local)    │    │  (Cloud)        │    │  (Tools/Plans)  │
└─────────────┘    └─────────────────┘    └─────────────────┘
```

## New Services

### 1. UnifiedModelService
Provides a unified interface for both Ollama and OpenRouter APIs.

**Features:**
- Seamless provider switching
- Conversation history management
- Automatic context window management
- Chain-of-thought prompting
- Task decomposition

**Usage:**
```java
UnifiedModelService service = new UnifiedModelService(ollamaAPI, openRouterAPI);

// Set provider
service.setActiveProvider(Provider.OPENROUTER);

// Set routing strategy
service.setRoutingStrategy(RoutingStrategy.AUTO_COMPLEXITY);

// Enable agentic features
service.setAgenticMode(true);
service.setChainOfThought(true);

// Chat with context
service.chat("Explain quantum computing", new ChatCallback() {
    @Override
    public void onToken(String token) { /* streaming */ }
    
    @Override
    public void onComplete(String response, Provider provider) { /* done */ }
    
    @Override
    public void onError(String error) { /* handle error */ }
});
```

### 2. AgentService
Provides LangChain/CrewAI-style agentic capabilities.

**Features:**
- Tool registration and execution
- Chain-of-thought reasoning
- Task planning and decomposition
- Multi-step execution with tool use

**Built-in Tools:**
- `calculator` - Mathematical calculations
- `current_time` - Current date/time
- `text_stats` - Text analysis (word count, etc.)
- `search` - Simulated search (connect to real API in production)

**Usage:**
```java
AgentService agent = new AgentService(unifiedModelService);

// Register custom tool
agent.registerTool(new Tool("weather", 
    "Get weather for a location",
    input -> fetchWeather(input)
));

// Execute agentic task
agent.executeTask("Calculate 15% tip on $85.50", new AgentCallback() {
    @Override
    public void onToolUse(String toolName, String input) {
        System.out.println("Using tool: " + toolName);
    }
    
    @Override
    public void onComplete(String answer) {
        System.out.println("Answer: " + answer);
    }
});

// Create execution plan
agent.createPlan("Build a REST API for user management", 
    steps -> steps.forEach(System.out::println),
    error -> System.err.println(error)
);
```

### 3. QueryRouter
Intelligent query routing based on complexity and type.

**Query Types:**
- `SIMPLE_QA` - Basic questions
- `COMPLEX_REASONING` - Multi-step reasoning
- `CODE_GENERATION` - Programming tasks
- `CODE_REVIEW` - Code analysis
- `CREATIVE_WRITING` - Stories, poems
- `TRANSLATION` - Language translation
- `SUMMARIZATION` - Text summarization
- `MATH_CALCULATION` - Math problems

**Routing Decisions:**
- `OLLAMA_LOCAL` - Use local Ollama (fast, free)
- `OPENROUTER_FREE` - Use free OpenRouter models
- `OPENROUTER_PAID` - Use premium models
- `HYBRID` - Use both providers

**Usage:**
```java
QueryRouter router = new QueryRouter();

// Classify query
QueryType type = router.classifyQuery("Write a Python function to sort a list");
// Returns: CODE_GENERATION

// Get routing recommendation
RoutingResult result = router.route(query, RoutingPreferences.defaultPreferences());
System.out.println(result.explanation);
// "Query classified as CODE GENERATION. Using free OpenRouter model for better quality."
```

### 4. ConversationMemory
Advanced conversation context management.

**Memory Strategies:**
- `SLIDING_WINDOW` - Keep last N messages
- `SUMMARY_BUFFER` - Summarize old messages
- `SEMANTIC_SEARCH` - Keep relevant messages
- `HYBRID` - Combination approach

**Features:**
- Token budget management
- Semantic relevance filtering
- Working memory for agentic tasks
- Automatic summarization

**Usage:**
```java
ConversationMemory memory = new ConversationMemory();
memory.setStrategy(MemoryStrategy.HYBRID);
memory.setMaxMessages(20);
memory.setMaxTokenBudget(4000);

// Add messages
memory.addMessage("user", "What is machine learning?");
memory.addMessage("assistant", "Machine learning is...");

// Get context for LLM
List<ContextMessage> context = memory.getContextWithBudget(2000);

// Search relevant context
List<ContextMessage> relevant = memory.searchRelevant("neural networks", 5);

// Working memory for agents
memory.setWorkingMemory("current_task", "data analysis");
String task = memory.getWorkingMemory("current_task", String.class);
```

## UI Features

### Agentic Menu
Access via **Agentic** menu in the menu bar:

- **Enable Agentic Mode** - Toggle tool use and multi-step reasoning
- **Chain of Thought** - Show step-by-step reasoning
- **Decompose Task** - Break complex tasks into subtasks
- **Create Execution Plan** - Generate step-by-step plans
- **Step-by-Step Reasoning** - Detailed reasoning for questions
- **Manage Tools** - View available agent tools
- **View Agent History** - See past agent executions
- **Routing Strategy** - Choose how queries are routed

### Enhanced Chat Panel
The `EnhancedChatController` provides a complete UI with:

- Provider selection (Ollama/OpenRouter/Auto-Route)
- Model selection with filtering
- Routing strategy selection
- Agentic mode toggles
- Tool panel showing available tools
- System prompt configuration
- Context info and management

## Running the Demo

```bash
# Using Maven wrapper
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.EnhancedChatDemo
```

## Configuration

### API Keys
- **Ollama**: Runs locally on `http://localhost:11434`
- **OpenRouter**: Store API key in `api.txt` or configure via Preferences menu

### Model Parameters
Configure via **Preferences > Model Parameters**:
- Temperature (0.0 - 2.0)
- Top-p (0.0 - 1.0)
- Max tokens

## Best Practices

1. **Use Auto-Routing** for optimal cost/quality balance
2. **Enable Chain of Thought** for complex reasoning tasks
3. **Use Agentic Mode** when tasks require tool use or planning
4. **Set System Prompts** for consistent behavior
5. **Monitor Context Size** to avoid token limits

## Extending the System

### Adding Custom Tools
```java
agentService.registerTool(new Tool(
    "database_query",
    "Execute SQL queries against the database",
    input -> {
        // Your implementation
        return executeQuery(input);
    }
));
```

### Custom Routing Logic
Extend `QueryRouter` to add custom classification patterns or routing rules.

### Custom Memory Strategies
Implement `SummaryGenerator` for LLM-based summarization:
```java
memory.setSummaryGenerator(text -> {
    // Use LLM to summarize
    return llmSummarize(text);
});
```


## RAG Pipeline & Multi-Agent System

### Architecture Overview (Extended)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         Application Layer                                │
│  EnhancedChatController / MultiAgentOrchestrator                        │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│  RAGPipeline  │         │ UnifiedModel    │         │ MultiAgent      │
│               │         │ Service         │         │ Orchestrator    │
│ - Ingest docs │         │ - Routing       │         │ - Crew tasks    │
│ - Retrieve    │         │ - Context       │         │ - Agent coord   │
│ - Generate    │         │ - Streaming     │         │ - Parallel exec │
└───────────────┘         └─────────────────┘         └─────────────────┘
        │                           │                           │
        ▼                           ▼                           ▼
┌───────────────┐         ┌─────────────────┐         ┌─────────────────┐
│ VectorStore   │         │   OllamaAPI     │         │  AgentService   │
│ - ChromaDB    │         │   (Local)       │         │  - Tools        │
│ - In-memory   │         │                 │         │  - Planning     │
│ - File-based  │         │   OpenRouterAPI │         │  - Reasoning    │
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

### 5. EmbeddingService
Local embedding generation using Ollama models.

**Supported Models:**
- `nomic-embed-text` (recommended, 768 dimensions)
- `all-minilm` (384 dimensions, faster)
- `mxbai-embed-large` (1024 dimensions, higher quality)

**Usage:**
```java
EmbeddingService embeddings = new EmbeddingService("nomic-embed-text");

// Single embedding
float[] vector = embeddings.embedSync("Hello world");

// Async embedding
embeddings.embed("Hello world").thenAccept(vec -> {
    System.out.println("Dimensions: " + vec.length);
});

// Batch embeddings
List<String> texts = List.of("text1", "text2", "text3");
embeddings.embedBatch(texts).thenAccept(vectors -> {
    // Process vectors
});

// Similarity calculation
double similarity = EmbeddingService.cosineSimilarity(vec1, vec2);
```

### 6. VectorStore
Vector storage with multiple backend options.

**Backends:**
- `IN_MEMORY` - Fast, no persistence (default)
- `CHROMA_DB` - Persistent, scalable (requires ChromaDB server)
- `FILE_BASED` - Simple file persistence

**Usage:**
```java
// In-memory store
VectorStore store = new VectorStore(embeddingService, Backend.IN_MEMORY);

// ChromaDB store
VectorStore chromaStore = new VectorStore(embeddingService, Backend.CHROMA_DB);
chromaStore.setChromaUrl("http://localhost:8000");
chromaStore.setCollectionName("my_documents");
chromaStore.initializeChroma();

// Add documents
Map<String, String> metadata = Map.of("source", "manual", "category", "tech");
store.addDocument("doc1", "Document content here", metadata).join();

// Search
store.search("query text", 5).thenAccept(results -> {
    for (SearchResult result : results) {
        System.out.println(result.document.id + ": " + result.score);
    }
});
```

### 7. RAGPipeline
Complete RAG (Retrieval-Augmented Generation) pipeline.

**Features:**
- Document chunking with overlap
- Semantic search retrieval
- Context-aware generation
- Source attribution

**Usage:**
```java
RAGPipeline rag = new RAGPipeline(embeddingService, vectorStore, modelService);

// Configure
rag.setTopK(5);                    // Retrieve top 5 documents
rag.setSimilarityThreshold(0.5);   // Minimum similarity
rag.setChunkSize(500);             // Characters per chunk
rag.setChunkOverlap(50);           // Overlap between chunks

// Ingest documents
rag.ingestText("doc1", "Long document content...", Map.of("source", "manual"));
rag.ingestFile(Path.of("document.txt"));
rag.ingestDirectory(Path.of("docs/"), "txt", "md", "java");

// Query with RAG
rag.query("What is the main topic?", new RAGPipeline.RAGCallback() {
    @Override
    public void onContextRetrieved(List<SearchResult> results) {
        System.out.println("Found " + results.size() + " relevant documents");
    }
    
    @Override
    public void onToken(String token) {
        System.out.print(token);
    }
    
    @Override
    public void onComplete(String response, List<SearchResult> sources) {
        System.out.println("\n\nSources: " + sources.size());
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Error: " + error);
    }
});
```

### 8. MultiAgentOrchestrator
CrewAI-style multi-agent coordination.

**Default Agents:**
| Agent | Provider | Model | Capabilities |
|-------|----------|-------|--------------|
| embedding_agent | Ollama | llama2 | Embedding, Analysis |
| research_agent | OpenRouter | deepseek-r1 | Research, Analysis, Reasoning |
| synthesis_agent | OpenRouter | gemma-2-9b | Synthesis, Writing |
| code_agent | OpenRouter | deepseek-coder | Coding, Debugging, Review |
| rag_agent | OpenRouter | gemma-2-9b | RAG, Research |

**Execution Modes:**
- `SEQUENTIAL` - Tasks run one after another
- `PARALLEL` - Tasks run concurrently
- `HIERARCHICAL` - Manager agent delegates to workers

**Usage:**
```java
MultiAgentOrchestrator orchestrator = new MultiAgentOrchestrator(
    modelService, embeddingService, ragPipeline
);

// Quick research
orchestrator.research("quantum computing applications", 
    result -> System.out.println(result),
    error -> System.err.println(error)
);

// Quick code generation
orchestrator.generateCode("Python function to merge two sorted lists",
    code -> System.out.println(code),
    error -> System.err.println(error)
);

// Query knowledge base
orchestrator.queryKnowledgeBase("What are the main features?",
    answer -> System.out.println(answer),
    error -> System.err.println(error)
);

// Complex crew task
List<AgentTask> tasks = List.of(
    new AgentTask("research", "research_agent", 
        "Research best practices for REST API design", 
        "Comprehensive list of best practices", null),
    new AgentTask("code", "code_agent",
        "Implement a REST API following the researched best practices",
        "Working Java code", null),
    new AgentTask("review", "code_agent",
        "Review the generated code for issues",
        "Code review with suggestions", null)
);

CrewTask crew = new CrewTask("Build a production-ready REST API", tasks);
orchestrator.setExecutionMode(ExecutionMode.SEQUENTIAL);

orchestrator.executeCrew(crew, new CrewCallback() {
    @Override
    public void onAgentStart(Agent agent, AgentTask task) {
        System.out.println("Agent " + agent.name + " starting: " + task.description);
    }
    
    @Override
    public void onAgentComplete(Agent agent, AgentTask task, String result) {
        System.out.println("Agent " + agent.name + " completed");
    }
    
    @Override
    public void onComplete(String finalResult, List<TaskResult> history) {
        System.out.println("Crew completed!\n" + finalResult);
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Crew failed: " + error);
    }
});
```

### Custom Agent Registration
```java
// Register a custom agent
orchestrator.registerAgent(new Agent(
    "translator_agent",
    "Translation Expert",
    "Expert at translating text between languages accurately.",
    UnifiedModelService.Provider.OPENROUTER,
    "google/gemma-2-9b-it:free",
    AgentCapability.WRITING, AgentCapability.ANALYSIS
));
```

## ChromaDB Setup

To use ChromaDB as the vector store backend:

```bash
# Install ChromaDB
pip install chromadb

# Run ChromaDB server
chroma run --host localhost --port 8000
```

Or with Docker:
```bash
docker run -p 8000:8000 chromadb/chroma
```

## Complete Example: RAG-Powered Multi-Agent System

```java
// Initialize services
OllamaAPI ollamaAPI = new OllamaAPI();
OpenRouterAPI openRouterAPI = new OpenRouterAPI();
UnifiedModelService modelService = new UnifiedModelService(ollamaAPI, openRouterAPI);

// Setup embedding and vector store
EmbeddingService embeddings = new EmbeddingService("nomic-embed-text");
VectorStore vectorStore = new VectorStore(embeddings, Backend.CHROMA_DB);
vectorStore.setChromaUrl("http://localhost:8000");
vectorStore.setCollectionName("knowledge_base");
vectorStore.initializeChroma();

// Setup RAG pipeline
RAGPipeline rag = new RAGPipeline(embeddings, vectorStore, modelService);
rag.ingestDirectory(Path.of("docs/"), "md", "txt");

// Setup multi-agent orchestrator
MultiAgentOrchestrator orchestrator = new MultiAgentOrchestrator(
    modelService, embeddings, rag
);

// Execute a complex task
orchestrator.queryKnowledgeBase(
    "Based on our documentation, what are the key features and how do they work?",
    answer -> {
        System.out.println("Answer: " + answer);
    },
    error -> {
        System.err.println("Error: " + error);
    }
);
```

## Performance Tips

1. **Use nomic-embed-text** for best embedding quality/speed balance
2. **Set appropriate chunk sizes** (300-500 chars for most use cases)
3. **Use ChromaDB** for large document collections (>1000 docs)
4. **Enable parallel execution** for independent agent tasks
5. **Cache embeddings** when possible to avoid recomputation
6. **Set similarity threshold** to filter low-quality matches (0.5-0.7)

## Comprehensive Demo Application

### ComprehensiveDemo.java

A complete demonstration application showcasing all enhanced features in a single JavaFX interface.

**Features:**
- **RAG Pipeline Demos**: Document ingestion and knowledge base querying
- **Multi-Agent Orchestrator**: Research, code generation, and complex analysis
- **Hardware Monitoring**: Real-time system status with live updates
- **Hybrid Architecture**: Side-by-side comparison of Ollama vs OpenRouter
- **Full Pipeline**: End-to-end document processing with multi-agent analysis

**Running the Demo:**
```bash
# Using Maven wrapper
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.ComprehensiveDemo

# Or compile and run
./mvnw compile exec:java -Dexec.mainClass="com.ollama.ollamaopenrouterjavafxmanager.ComprehensiveDemo"
```

**Demo Options:**

1. **RAG: Ingest Documentation**
   - Ingests sample documents into the vector store
   - Shows chunking and embedding process
   - Displays storage statistics

2. **RAG: Query Knowledge Base**
   - Semantic search through ingested documents
   - Shows retrieval scores and context building
   - Generates responses using retrieved context

3. **Multi-Agent: Research Task**
   - Uses research agent for topic investigation
   - Demonstrates OpenRouter model capabilities
   - Shows structured research output

4. **Multi-Agent: Code Generation**
   - Code agent generates programming solutions
   - Uses specialized coding models (DeepSeek Coder)
   - Provides working code with explanations

5. **Multi-Agent: Complex Analysis**
   - Sequential multi-agent workflow
   - Research → Analysis → Synthesis pipeline
   - Shows agent coordination and handoffs

6. **Hardware: System Status**
   - Real-time system monitoring
   - CPU, memory, GPU, and Ollama process status
   - Performance recommendations

7. **Hybrid: Model Comparison**
   - Side-by-side Ollama vs OpenRouter comparison
   - Same query processed by both providers
   - Shows speed vs quality tradeoffs

8. **Full Pipeline: Document → Agents → Analysis**
   - Complete end-to-end workflow
   - Document ingestion → RAG query → Agent analysis → Synthesis
   - Demonstrates the full hybrid architecture

### Quick Test Utility

**QuickTest.java** - Verifies all services are working correctly:

```bash
./mvnw compile exec:java -Dexec.mainClass="com.ollama.ollamaopenrouterjavafxmanager.QuickTest"
```

This utility:
- Tests all service initialization
- Verifies API connectivity
- Checks hardware monitoring
- Lists available tools and agents
- Provides system readiness report

## Hardware Monitor Integration

The hardware monitor is now fully integrated into the main application:

**Features:**
- **CPU Monitoring**: Real-time CPU usage via JMX
- **Memory Monitoring**: JVM heap usage tracking
- **GPU Detection**: Supports NVIDIA (nvidia-smi), AMD (rocm-smi), Intel (WMI)
- **VRAM Tracking**: GPU memory usage with temperature readings
- **Ollama Process**: Detects running Ollama instances with PID and uptime
- **Color-coded Progress Bars**: Green/Yellow/Red based on usage levels

**Integration Points:**
- Automatically starts when MainController initializes
- Properly shuts down on application exit
- Uses JavaFX properties for reactive UI updates
- Configurable update intervals for different metrics

## Production Deployment

### Prerequisites

1. **Java 17+** with JavaFX modules
2. **Ollama** installed and running locally
3. **OpenRouter API key** (optional, for cloud models)
4. **ChromaDB** (optional, for persistent vector storage)

### Setup Steps

1. **Install Ollama**:
   ```bash
   # Download from https://ollama.ai
   ollama pull nomic-embed-text  # For embeddings
   ollama pull llama2           # For local chat
   ```

2. **Configure OpenRouter** (optional):
   ```bash
   echo "your-openrouter-api-key" > api.txt
   ```

3. **Install ChromaDB** (optional):
   ```bash
   pip install chromadb
   chroma run --host localhost --port 8000
   ```

4. **Run Application**:
   ```bash
   ./mvnw javafx:run
   ```

### Configuration Options

**Embedding Models** (via Ollama):
- `nomic-embed-text` (recommended, 768 dimensions)
- `all-minilm` (faster, 384 dimensions)  
- `mxbai-embed-large` (highest quality, 1024 dimensions)

**Vector Store Backends**:
- `IN_MEMORY` - Fast, no persistence
- `CHROMA_DB` - Persistent, scalable
- `FILE_BASED` - Simple file persistence

**Model Routing Strategies**:
- `MANUAL` - User selects provider
- `AUTO_COMPLEXITY` - Route based on query complexity
- `COST_OPTIMIZED` - Prefer free/local models
- `PERFORMANCE` - Prefer cloud models for quality

### Performance Tuning

**For Large Document Collections:**
- Use ChromaDB backend for >1000 documents
- Increase chunk overlap for better context
- Adjust similarity threshold based on use case

**For Real-time Applications:**
- Use smaller embedding models (all-minilm)
- Reduce hardware monitoring intervals
- Enable parallel agent execution

**For Resource-Constrained Systems:**
- Use Ollama-only mode (no OpenRouter)
- Reduce context window sizes
- Lower hardware monitoring frequency

## Troubleshooting

**Common Issues:**

1. **"nvidia-smi not found"**
   - Install NVIDIA drivers and CUDA toolkit
   - Or ignore if using AMD/Intel GPU

2. **"Ollama connection failed"**
   - Ensure Ollama is running: `ollama serve`
   - Check port 11434 is accessible

3. **"OpenRouter API key invalid"**
   - Verify API key in api.txt
   - Check OpenRouter account status

4. **"ChromaDB connection failed"**
   - Start ChromaDB server: `chroma run`
   - Check port 8000 is available

5. **"Embedding model not found"**
   - Pull model: `ollama pull nomic-embed-text`
   - Wait for download to complete

**Debug Mode:**
Enable verbose logging by setting system property:
```bash
./mvnw javafx:run -Dcom.ollama.debug=true
```

This comprehensive system provides a complete hybrid AI architecture combining the best of local and cloud AI capabilities with real-time system monitoring and multi-agent coordination.