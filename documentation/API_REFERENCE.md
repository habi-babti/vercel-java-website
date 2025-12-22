# API Reference Documentation

## Overview

This document provides comprehensive API reference for all public interfaces, classes, and methods in the Ollama OpenRouter JavaFX Manager application.

## Table of Contents

1. [Core Services](#core-services)
2. [Authentication APIs](#authentication-apis)
3. [AI Model APIs](#ai-model-apis)
4. [RAG Pipeline APIs](#rag-pipeline-apis)
5. [Multi-Agent APIs](#multi-agent-apis)
6. [Theme System APIs](#theme-system-apis)
7. [Hardware Monitoring APIs](#hardware-monitoring-apis)
8. [Utility APIs](#utility-apis)
9. [Event Interfaces](#event-interfaces)
10. [Exception Classes](#exception-classes)

---

## Core Services

### UnifiedModelService

Central service for AI model interactions across providers.

#### Constructor
```java
public UnifiedModelService(OllamaAPI ollamaAPI, OpenRouterAPI openRouterAPI)
```

#### Methods

##### setActiveProvider
```java
public void setActiveProvider(Provider provider)
```
**Description**: Sets the active AI provider.
**Parameters**:
- `provider` - The provider to use (OLLAMA or OPENROUTER)

##### setRoutingStrategy
```java
public void setRoutingStrategy(RoutingStrategy strategy)
```
**Description**: Sets the query routing strategy.
**Parameters**:
- `strategy` - Routing strategy (MANUAL, AUTO_COMPLEXITY, COST_OPTIMIZED, PERFORMANCE)

##### chat
```java
public void chat(String message, ChatCallback callback)
```
**Description**: Sends a chat message to the active provider.
**Parameters**:
- `message` - The message to send
- `callback` - Callback for handling responses

**Example**:
```java
UnifiedModelService service = new UnifiedModelService(ollamaAPI, openRouterAPI);
service.setActiveProvider(Provider.OPENROUTER);

service.chat("Explain quantum computing", new ChatCallback() {
    @Override
    public void onToken(String token) {
        Platform.runLater(() -> appendToChat(token));
    }
    
    @Override
    public void onComplete(String response, Provider provider) {
        System.out.println("Response from: " + provider);
    }
    
    @Override
    public void onError(String error) {
        showErrorDialog(error);
    }
});
```

##### getAvailableModels
```java
public void getAvailableModels(Provider provider, Consumer<List<String>> callback)
```
**Description**: Retrieves available models for a provider.
**Parameters**:
- `provider` - The provider to query
- `callback` - Callback receiving the model list

##### setAgenticMode
```java
public void setAgenticMode(boolean enabled)
```
**Description**: Enables or disables agentic capabilities.
**Parameters**:
- `enabled` - Whether to enable agentic mode

##### setChainOfThought
```java
public void setChainOfThought(boolean enabled)
```
**Description**: Enables or disables chain-of-thought reasoning.
**Parameters**:
- `enabled` - Whether to enable chain-of-thought

---

## Authentication APIs

### UserService

Manages user authentication and user data.

#### getInstance
```java
public static UserService getInstance()
```
**Description**: Returns the singleton instance.
**Returns**: UserService instance

#### authenticate
```java
public boolean authenticate(String username, String password, String apiKey, User.Role role)
```
**Description**: Authenticates a user with credentials.
**Parameters**:
- `username` - User's username
- `password` - User's password
- `apiKey` - User's API key (can be empty)
- `role` - Selected role (USER or ADMIN)
**Returns**: true if authentication successful

#### getUserByUsername
```java
public User getUserByUsername(String username)
```
**Description**: Retrieves user by username.
**Parameters**:
- `username` - Username to search for
**Returns**: User object or null if not found

#### updateUserApiKey
```java
public void updateUserApiKey(String username, String apiKey)
```
**Description**: Updates a user's API key.
**Parameters**:
- `username` - Username to update
- `apiKey` - New API key

#### getAllUsers
```java
public List<User> getAllUsers()
```
**Description**: Returns all users in the system.
**Returns**: List of all users

#### setUserEnabled
```java
public void setUserEnabled(String username, boolean enabled)
```
**Description**: Enables or disables a user account.
**Parameters**:
- `username` - Username to modify
- `enabled` - Whether to enable the account

#### resetPassword
```java
public void resetPassword(String username, String newPassword)
```
**Description**: Resets a user's password.
**Parameters**:
- `username` - Username to reset
- `newPassword` - New password

### SessionContext

Manages the current user session.

#### getInstance
```java
public static SessionContext getInstance()
```
**Description**: Returns the singleton session instance.
**Returns**: SessionContext instance

#### login
```java
public void login(String username, User.Role role, String apiKey, String userId)
```
**Description**: Logs in a user and creates a session.
**Parameters**:
- `username` - Logged in username
- `role` - User's role
- `apiKey` - User's API key
- `userId` - Unique user identifier

#### logout
```java
public void logout()
```
**Description**: Logs out the current user and clears session.

#### isLoggedIn
```java
public boolean isLoggedIn()
```
**Description**: Checks if a user is currently logged in.
**Returns**: true if logged in

#### getUsername
```java
public String getUsername()
```
**Description**: Gets the current username.
**Returns**: Current username or null

#### getRole
```java
public User.Role getRole()
```
**Description**: Gets the current user's role.
**Returns**: Current user role or null

#### getApiKey
```java
public String getApiKey()
```
**Description**: Gets the current user's API key.
**Returns**: Current API key or null

#### updateApiKey
```java
public void updateApiKey(String apiKey)
```
**Description**: Updates the session API key.
**Parameters**:
- `apiKey` - New API key

---

## AI Model APIs

### OllamaAPI

Interface for local Ollama models.

#### Constructor
```java
public OllamaAPI()
public OllamaAPI(String baseUrl)
```

#### chat
```java
public void chat(String model, String message, ChatCallback callback)
```
**Description**: Sends a chat message to Ollama.
**Parameters**:
- `model` - Model name (e.g., "llama2")
- `message` - Message to send
- `callback` - Response callback

#### getModels
```java
public void getModels(Consumer<List<String>> callback)
```
**Description**: Gets available Ollama models.
**Parameters**:
- `callback` - Callback receiving model list

#### pullModel
```java
public void pullModel(String model, ProgressCallback callback)
```
**Description**: Downloads a model from Ollama registry.
**Parameters**:
- `model` - Model name to download
- `callback` - Progress callback

#### isModelAvailable
```java
public boolean isModelAvailable(String model)
```
**Description**: Checks if a model is available locally.
**Parameters**:
- `model` - Model name to check
**Returns**: true if available

### OpenRouterAPI

Interface for cloud OpenRouter models.

#### Constructor
```java
public OpenRouterAPI()
public OpenRouterAPI(String apiKey)
```

#### setApiKey
```java
public void setApiKey(String apiKey)
```
**Description**: Sets the OpenRouter API key.
**Parameters**:
- `apiKey` - OpenRouter API key

#### chat
```java
public void chat(String model, String message, ChatCallback callback)
```
**Description**: Sends a chat message to OpenRouter.
**Parameters**:
- `model` - Model name (e.g., "deepseek-r1")
- `message` - Message to send
- `callback` - Response callback

#### getModels
```java
public void getModels(Consumer<List<OpenRouterModel>> callback)
```
**Description**: Gets available OpenRouter models.
**Parameters**:
- `callback` - Callback receiving model list

#### getModelInfo
```java
public void getModelInfo(String model, Consumer<OpenRouterModel> callback)
```
**Description**: Gets detailed information about a model.
**Parameters**:
- `model` - Model name
- `callback` - Callback receiving model info

---

## RAG Pipeline APIs

### RAGPipeline

Complete RAG (Retrieval-Augmented Generation) implementation.

#### Constructor
```java
public RAGPipeline(EmbeddingService embeddingService, VectorStore vectorStore, UnifiedModelService modelService)
```

#### Configuration Methods

##### setTopK
```java
public void setTopK(int topK)
```
**Description**: Sets number of documents to retrieve.
**Parameters**:
- `topK` - Number of top documents (default: 5)

##### setSimilarityThreshold
```java
public void setSimilarityThreshold(double threshold)
```
**Description**: Sets minimum similarity score for retrieval.
**Parameters**:
- `threshold` - Similarity threshold 0.0-1.0 (default: 0.5)

##### setChunkSize
```java
public void setChunkSize(int size)
```
**Description**: Sets document chunk size in characters.
**Parameters**:
- `size` - Chunk size (default: 500)

##### setChunkOverlap
```java
public void setChunkOverlap(int overlap)
```
**Description**: Sets overlap between chunks.
**Parameters**:
- `overlap` - Overlap in characters (default: 50)

#### Document Ingestion

##### ingestText
```java
public CompletableFuture<Void> ingestText(String id, String content, Map<String, String> metadata)
```
**Description**: Ingests text content into the knowledge base.
**Parameters**:
- `id` - Unique document identifier
- `content` - Text content to ingest
- `metadata` - Document metadata
**Returns**: CompletableFuture for async completion

##### ingestFile
```java
public CompletableFuture<Void> ingestFile(Path filePath)
```
**Description**: Ingests a file into the knowledge base.
**Parameters**:
- `filePath` - Path to file to ingest
**Returns**: CompletableFuture for async completion

##### ingestDirectory
```java
public CompletableFuture<Void> ingestDirectory(Path directoryPath, String... extensions)
```
**Description**: Ingests all files in a directory with specified extensions.
**Parameters**:
- `directoryPath` - Directory to process
- `extensions` - File extensions to include (e.g., "txt", "md")
**Returns**: CompletableFuture for async completion

#### Querying

##### query
```java
public void query(String question, RAGCallback callback)
```
**Description**: Performs RAG query against knowledge base.
**Parameters**:
- `question` - Question to ask
- `callback` - Callback for handling results

**Example**:
```java
RAGPipeline rag = new RAGPipeline(embeddings, vectorStore, modelService);

// Configure
rag.setTopK(5);
rag.setSimilarityThreshold(0.6);

// Ingest documents
rag.ingestDirectory(Path.of("docs/"), "md", "txt");

// Query
rag.query("What are the main features?", new RAGCallback() {
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
        System.out.println("\nSources: " + sources.size());
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Error: " + error);
    }
});
```

### VectorStore

Vector storage with multiple backend options.

#### Constructor
```java
public VectorStore(EmbeddingService embeddingService, Backend backend)
```

#### Backend Configuration

##### setChromaUrl
```java
public void setChromaUrl(String url)
```
**Description**: Sets ChromaDB server URL.
**Parameters**:
- `url` - ChromaDB server URL (default: "http://localhost:8000")

##### setCollectionName
```java
public void setCollectionName(String name)
```
**Description**: Sets ChromaDB collection name.
**Parameters**:
- `name` - Collection name (default: "documents")

##### initializeChroma
```java
public CompletableFuture<Void> initializeChroma()
```
**Description**: Initializes ChromaDB connection and collection.
**Returns**: CompletableFuture for async completion

#### Document Operations

##### addDocument
```java
public CompletableFuture<Void> addDocument(String id, String content, Map<String, String> metadata)
```
**Description**: Adds a document to the vector store.
**Parameters**:
- `id` - Unique document ID
- `content` - Document content
- `metadata` - Document metadata
**Returns**: CompletableFuture for async completion

##### addDocuments
```java
public CompletableFuture<Void> addDocuments(List<Document> documents)
```
**Description**: Adds multiple documents in batch.
**Parameters**:
- `documents` - List of documents to add
**Returns**: CompletableFuture for async completion

##### search
```java
public CompletableFuture<List<SearchResult>> search(String query, int topK)
```
**Description**: Searches for similar documents.
**Parameters**:
- `query` - Search query
- `topK` - Number of results to return
**Returns**: CompletableFuture with search results

##### searchWithFilter
```java
public CompletableFuture<List<SearchResult>> searchWithFilter(String query, int topK, Map<String, String> filter)
```
**Description**: Searches with metadata filtering.
**Parameters**:
- `query` - Search query
- `topK` - Number of results
- `filter` - Metadata filter criteria
**Returns**: CompletableFuture with filtered results

### EmbeddingService

Local embedding generation via Ollama.

#### Constructor
```java
public EmbeddingService(String model)
```
**Parameters**:
- `model` - Embedding model name (e.g., "nomic-embed-text")

#### Methods

##### embed
```java
public CompletableFuture<float[]> embed(String text)
```
**Description**: Generates embedding for text.
**Parameters**:
- `text` - Text to embed
**Returns**: CompletableFuture with embedding vector

##### embedSync
```java
public float[] embedSync(String text)
```
**Description**: Synchronous embedding generation.
**Parameters**:
- `text` - Text to embed
**Returns**: Embedding vector

##### embedBatch
```java
public CompletableFuture<List<float[]>> embedBatch(List<String> texts)
```
**Description**: Generates embeddings for multiple texts.
**Parameters**:
- `texts` - List of texts to embed
**Returns**: CompletableFuture with embedding vectors

##### getDimensions
```java
public int getDimensions()
```
**Description**: Gets embedding vector dimensions.
**Returns**: Number of dimensions

##### cosineSimilarity
```java
public static double cosineSimilarity(float[] a, float[] b)
```
**Description**: Calculates cosine similarity between vectors.
**Parameters**:
- `a` - First vector
- `b` - Second vector
**Returns**: Similarity score (0.0 to 1.0)

---
## Multi-Agent APIs

### MultiAgentOrchestrator

CrewAI-style multi-agent coordination system.

#### Constructor
```java
public MultiAgentOrchestrator(UnifiedModelService modelService, EmbeddingService embeddingService, RAGPipeline ragPipeline)
```

#### Quick Operations

##### research
```java
public void research(String topic, Consumer<String> onComplete, Consumer<String> onError)
```
**Description**: Performs research on a topic using the research agent.
**Parameters**:
- `topic` - Research topic
- `onComplete` - Callback for successful completion
- `onError` - Callback for errors

##### generateCode
```java
public void generateCode(String description, Consumer<String> onComplete, Consumer<String> onError)
```
**Description**: Generates code using the code agent.
**Parameters**:
- `description` - Code description/requirements
- `onComplete` - Callback with generated code
- `onError` - Callback for errors

##### queryKnowledgeBase
```java
public void queryKnowledgeBase(String question, Consumer<String> onComplete, Consumer<String> onError)
```
**Description**: Queries the RAG knowledge base.
**Parameters**:
- `question` - Question to ask
- `onComplete` - Callback with answer
- `onError` - Callback for errors

#### Agent Management

##### registerAgent
```java
public void registerAgent(Agent agent)
```
**Description**: Registers a custom agent.
**Parameters**:
- `agent` - Agent to register

##### getAvailableAgents
```java
public List<Agent> getAvailableAgents()
```
**Description**: Gets all registered agents.
**Returns**: List of available agents

##### setExecutionMode
```java
public void setExecutionMode(ExecutionMode mode)
```
**Description**: Sets agent execution mode.
**Parameters**:
- `mode` - Execution mode (SEQUENTIAL, PARALLEL, HIERARCHICAL)

#### Crew Task Execution

##### executeCrew
```java
public void executeCrew(CrewTask crewTask, CrewCallback callback)
```
**Description**: Executes a multi-agent crew task.
**Parameters**:
- `crewTask` - Task definition with agent assignments
- `callback` - Callback for task progress and completion

**Example**:
```java
MultiAgentOrchestrator orchestrator = new MultiAgentOrchestrator(modelService, embeddings, rag);

// Quick research
orchestrator.research("quantum computing applications", 
    result -> System.out.println("Research: " + result),
    error -> System.err.println("Error: " + error));

// Complex crew task
List<AgentTask> tasks = List.of(
    new AgentTask("research", "research_agent", 
        "Research REST API best practices", 
        "Comprehensive best practices", null),
    new AgentTask("implement", "code_agent",
        "Implement REST API using best practices",
        "Working Spring Boot code", null)
);

CrewTask crew = new CrewTask("Build REST API", tasks);
orchestrator.executeCrew(crew, new CrewCallback() {
    @Override
    public void onAgentStart(Agent agent, AgentTask task) {
        System.out.println(agent.name + " starting: " + task.description);
    }
    
    @Override
    public void onComplete(String result, List<TaskResult> history) {
        System.out.println("Crew completed: " + result);
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Crew failed: " + error);
    }
});
```

### AgentService

Tool registration and execution for agents.

#### Constructor
```java
public AgentService(UnifiedModelService modelService)
```

#### Tool Management

##### registerTool
```java
public void registerTool(Tool tool)
```
**Description**: Registers a tool for agent use.
**Parameters**:
- `tool` - Tool to register

##### getAvailableTools
```java
public List<Tool> getAvailableTools()
```
**Description**: Gets all registered tools.
**Returns**: List of available tools

##### executeTool
```java
public CompletableFuture<String> executeTool(String toolName, String input)
```
**Description**: Executes a tool with input.
**Parameters**:
- `toolName` - Name of tool to execute
- `input` - Tool input
**Returns**: CompletableFuture with tool output

#### Task Execution

##### executeTask
```java
public void executeTask(String task, AgentCallback callback)
```
**Description**: Executes an agentic task with tool use.
**Parameters**:
- `task` - Task description
- `callback` - Callback for task progress

##### createPlan
```java
public void createPlan(String goal, Consumer<List<String>> onComplete, Consumer<String> onError)
```
**Description**: Creates an execution plan for a goal.
**Parameters**:
- `goal` - Goal to plan for
- `onComplete` - Callback with plan steps
- `onError` - Callback for errors

**Example**:
```java
AgentService agent = new AgentService(modelService);

// Register custom tool
agent.registerTool(new Tool("weather", 
    "Get weather for a location",
    location -> fetchWeatherData(location)));

// Execute task with tools
agent.executeTask("Calculate 15% tip on $85.50", new AgentCallback() {
    @Override
    public void onToolUse(String toolName, String input) {
        System.out.println("Using tool: " + toolName + " with: " + input);
    }
    
    @Override
    public void onComplete(String answer) {
        System.out.println("Answer: " + answer);
    }
    
    @Override
    public void onError(String error) {
        System.err.println("Error: " + error);
    }
});
```

---

## Theme System APIs

### ThemeManager

Dynamic theme management system.

#### getInstance
```java
public static ThemeManager getInstance()
```
**Description**: Returns the singleton theme manager.
**Returns**: ThemeManager instance

#### getAvailableThemes
```java
public List<Theme> getAvailableThemes()
```
**Description**: Gets all available themes.
**Returns**: List of available themes

#### applyTheme
```java
public void applyTheme(String themeName, Scene scene)
```
**Description**: Applies a theme to a JavaFX scene.
**Parameters**:
- `themeName` - Name of theme to apply
- `scene` - JavaFX scene to style

##### applyTheme (Theme object)
```java
public void applyTheme(Theme theme, Scene scene)
```
**Description**: Applies a theme object to a scene.
**Parameters**:
- `theme` - Theme object to apply
- `scene` - JavaFX scene to style

#### getCurrentTheme
```java
public Theme getCurrentTheme()
```
**Description**: Gets the currently applied theme.
**Returns**: Current theme or null

#### registerTheme
```java
public void registerTheme(Theme theme)
```
**Description**: Registers a custom theme.
**Parameters**:
- `theme` - Theme to register

#### addThemeChangeListener
```java
public void addThemeChangeListener(ThemeChangeListener listener)
```
**Description**: Adds a theme change listener.
**Parameters**:
- `listener` - Listener to add

#### removeThemeChangeListener
```java
public void removeThemeChangeListener(ThemeChangeListener listener)
```
**Description**: Removes a theme change listener.
**Parameters**:
- `listener` - Listener to remove

### Theme

Theme data model.

#### Constructor
```java
public Theme(String name, String primaryColor, String secondaryColor, 
            String backgroundColor, String foregroundColor, String textColor,
            String buttonColor, String borderColor, String hoverColor, String accentColor)
```

#### Getters
```java
public String getName()
public String getPrimaryColor()
public String getSecondaryColor()
public String getBackgroundColor()
public String getForegroundColor()
public String getTextColor()
public String getButtonColor()
public String getBorderColor()
public String getHoverColor()
public String getAccentColor()
```

#### Theme Creation Example
```java
Theme customTheme = new Theme(
    "Custom Theme",
    "#2196F3",  // primary
    "#FFC107",  // secondary
    "#FFFFFF",  // background
    "#F5F5F5",  // foreground
    "#212121",  // text
    "#E0E0E0",  // button
    "#BDBDBD",  // border
    "#1976D2",  // hover
    "#FF4081"   // accent
);

ThemeManager.getInstance().registerTheme(customTheme);
ThemeManager.getInstance().applyTheme(customTheme, scene);
```

---

## Hardware Monitoring APIs

### HardwareMonitorService

Real-time system monitoring service.

#### Constructor
```java
public HardwareMonitorService()
```

#### Monitoring Control

##### startMonitoring
```java
public void startMonitoring()
```
**Description**: Starts hardware monitoring.

##### stopMonitoring
```java
public void stopMonitoring()
```
**Description**: Stops hardware monitoring and cleans up resources.

##### isMonitoring
```java
public boolean isMonitoring()
```
**Description**: Checks if monitoring is active.
**Returns**: true if monitoring is running

#### Configuration

##### setCpuUpdateInterval
```java
public void setCpuUpdateInterval(long intervalMs)
```
**Description**: Sets CPU monitoring update interval.
**Parameters**:
- `intervalMs` - Update interval in milliseconds

##### setMemoryUpdateInterval
```java
public void setMemoryUpdateInterval(long intervalMs)
```
**Description**: Sets memory monitoring update interval.
**Parameters**:
- `intervalMs` - Update interval in milliseconds

##### setGpuUpdateInterval
```java
public void setGpuUpdateInterval(long intervalMs)
```
**Description**: Sets GPU monitoring update interval.
**Parameters**:
- `intervalMs` - Update interval in milliseconds

#### JavaFX Properties (for UI binding)

##### cpuUsageProperty
```java
public DoubleProperty cpuUsageProperty()
```
**Description**: Observable CPU usage property (0.0 to 1.0).
**Returns**: DoubleProperty for CPU usage

##### memoryUsageProperty
```java
public DoubleProperty memoryUsageProperty()
```
**Description**: Observable memory usage property (0.0 to 1.0).
**Returns**: DoubleProperty for memory usage

##### gpuUsageProperty
```java
public DoubleProperty gpuUsageProperty()
```
**Description**: Observable GPU usage property (0.0 to 1.0).
**Returns**: DoubleProperty for GPU usage

##### ollamaStatusProperty
```java
public StringProperty ollamaStatusProperty()
```
**Description**: Observable Ollama process status.
**Returns**: StringProperty for Ollama status

#### Direct Value Access

##### getCurrentCpuUsage
```java
public double getCurrentCpuUsage()
```
**Description**: Gets current CPU usage.
**Returns**: CPU usage (0.0 to 1.0)

##### getCurrentMemoryUsage
```java
public double getCurrentMemoryUsage()
```
**Description**: Gets current memory usage.
**Returns**: Memory usage (0.0 to 1.0)

##### getOllamaProcessInfo
```java
public ProcessInfo getOllamaProcessInfo()
```
**Description**: Gets Ollama process information.
**Returns**: ProcessInfo object or null if not running

**Example Usage**:
```java
HardwareMonitorService monitor = new HardwareMonitorService();

// Configure update intervals
monitor.setCpuUpdateInterval(1000);    // 1 second
monitor.setMemoryUpdateInterval(2000); // 2 seconds

// Bind to UI components
ProgressBar cpuBar = new ProgressBar();
cpuBar.progressProperty().bind(monitor.cpuUsageProperty());

Label memoryLabel = new Label();
memoryLabel.textProperty().bind(
    monitor.memoryUsageProperty().asString("Memory: %.1f%%")
);

// Add listeners for alerts
monitor.cpuUsageProperty().addListener((obs, oldVal, newVal) -> {
    if (newVal.doubleValue() > 0.8) {
        showHighCpuAlert();
    }
});

// Start monitoring
monitor.startMonitoring();

// Remember to stop when done
monitor.stopMonitoring();
```

---

## Utility APIs

### ConfigManager

Application configuration management.

#### getInstance
```java
public static ConfigManager getInstance()
```
**Description**: Returns the singleton config manager.
**Returns**: ConfigManager instance

#### Property Access

##### getProperty
```java
public String getProperty(String key)
public String getProperty(String key, String defaultValue)
```
**Description**: Gets a configuration property.
**Parameters**:
- `key` - Property key
- `defaultValue` - Default value if key not found
**Returns**: Property value or default

##### getIntProperty
```java
public int getIntProperty(String key, int defaultValue)
```
**Description**: Gets an integer property.
**Parameters**:
- `key` - Property key
- `defaultValue` - Default value
**Returns**: Integer property value

##### getBooleanProperty
```java
public boolean getBooleanProperty(String key, boolean defaultValue)
```
**Description**: Gets a boolean property.
**Parameters**:
- `key` - Property key
- `defaultValue` - Default value
**Returns**: Boolean property value

##### setProperty
```java
public void setProperty(String key, String value)
```
**Description**: Sets a configuration property.
**Parameters**:
- `key` - Property key
- `value` - Property value

#### Configuration Management

##### loadConfig
```java
public void loadConfig()
```
**Description**: Loads configuration from file.

##### saveConfig
```java
public void saveConfig()
```
**Description**: Saves configuration to file.

##### getConfigFile
```java
public Path getConfigFile()
```
**Description**: Gets the configuration file path.
**Returns**: Path to config file

**Example**:
```java
ConfigManager config = ConfigManager.getInstance();

// Get configuration values
String apiKey = config.getProperty("openrouter.api.key");
int maxTokens = config.getIntProperty("model.max.tokens", 2048);
boolean debugMode = config.getBooleanProperty("debug.enabled", false);

// Set configuration values
config.setProperty("theme.current", "material-dark");
config.setProperty("window.width", "1200");

// Save changes
config.saveConfig();
```

### QueryRouter

Intelligent query routing system.

#### Constructor
```java
public QueryRouter()
```

#### Query Classification

##### classifyQuery
```java
public QueryType classifyQuery(String query)
```
**Description**: Classifies a query by type.
**Parameters**:
- `query` - Query to classify
**Returns**: QueryType enum value

**Query Types**:
- `SIMPLE_QA` - Basic questions
- `COMPLEX_REASONING` - Multi-step reasoning
- `CODE_GENERATION` - Programming tasks
- `CODE_REVIEW` - Code analysis
- `CREATIVE_WRITING` - Stories, poems
- `TRANSLATION` - Language translation
- `SUMMARIZATION` - Text summarization
- `MATH_CALCULATION` - Math problems

#### Routing

##### route
```java
public RoutingResult route(String query, RoutingPreferences preferences)
```
**Description**: Routes a query to the best provider.
**Parameters**:
- `query` - Query to route
- `preferences` - Routing preferences
**Returns**: RoutingResult with decision and explanation

**Example**:
```java
QueryRouter router = new QueryRouter();

// Classify query
QueryType type = router.classifyQuery("Write a Python function to sort a list");
System.out.println("Query type: " + type); // CODE_GENERATION

// Route query
RoutingPreferences prefs = RoutingPreferences.defaultPreferences();
RoutingResult result = router.route(query, prefs);

System.out.println("Provider: " + result.getProvider());
System.out.println("Model: " + result.getModel());
System.out.println("Explanation: " + result.getExplanation());
```

---

## Event Interfaces

### ChatCallback

Callback interface for chat operations.

```java
public interface ChatCallback {
    void onToken(String token);
    void onComplete(String response, Provider provider);
    void onError(String error);
}
```

### RAGCallback

Callback interface for RAG operations.

```java
public interface RAGCallback {
    void onContextRetrieved(List<SearchResult> results);
    void onToken(String token);
    void onComplete(String response, List<SearchResult> sources);
    void onError(String error);
}
```

### AgentCallback

Callback interface for agent operations.

```java
public interface AgentCallback {
    void onToolUse(String toolName, String input);
    void onComplete(String answer);
    void onError(String error);
}
```

### CrewCallback

Callback interface for crew task operations.

```java
public interface CrewCallback {
    void onAgentStart(Agent agent, AgentTask task);
    void onAgentComplete(Agent agent, AgentTask task, String result);
    void onComplete(String finalResult, List<TaskResult> history);
    void onError(String error);
}
```

### ThemeChangeListener

Listener interface for theme changes.

```java
@FunctionalInterface
public interface ThemeChangeListener {
    void onThemeChanged(ThemeChangeEvent event);
}
```

---

## Exception Classes

### Base Exceptions

#### OllamaManagerException
```java
public class OllamaManagerException extends Exception {
    public OllamaManagerException(String message);
    public OllamaManagerException(String message, Throwable cause);
}
```

### Service Exceptions

#### ServiceException
```java
public class ServiceException extends OllamaManagerException {
    public ServiceException(String serviceName, String message);
    public String getServiceName();
}
```

#### AuthenticationException
```java
public class AuthenticationException extends OllamaManagerException {
    public AuthenticationException(String message);
}
```

#### ConfigurationException
```java
public class ConfigurationException extends OllamaManagerException {
    public ConfigurationException(String message);
}
```

#### ModelException
```java
public class ModelException extends ServiceException {
    public ModelException(String message);
    public ModelException(String message, Throwable cause);
}
```

#### RAGException
```java
public class RAGException extends ServiceException {
    public RAGException(String message);
    public RAGException(String message, Throwable cause);
}
```

---

## Data Classes

### User
```java
public class User {
    public enum Role { USER, ADMIN }
    
    // Constructors
    public User(String id, String username, String password, String apiKey, Role role);
    
    // Getters and setters
    public String getId();
    public String getUsername();
    public String getPassword();
    public String getApiKey();
    public Role getRole();
    public boolean isEnabled();
    
    // Utility methods
    public String getMaskedApiKey();
    public boolean hasValidApiKey();
}
```

### ChatMessage
```java
public class ChatMessage {
    public enum Role { USER, ASSISTANT, SYSTEM }
    
    public ChatMessage(Role role, String content);
    public ChatMessage(Role role, String content, long timestamp);
    
    public Role getRole();
    public String getContent();
    public long getTimestamp();
    public String getFormattedTimestamp();
}
```

### SearchResult
```java
public class SearchResult {
    public final Document document;
    public final double score;
    
    public SearchResult(Document document, double score);
}
```

### Document
```java
public class Document {
    public final String id;
    public final String content;
    public final Map<String, String> metadata;
    
    public Document(String id, String content, Map<String, String> metadata);
}
```

---

## Constants and Enums

### Provider
```java
public enum Provider {
    OLLAMA,
    OPENROUTER
}
```

### RoutingStrategy
```java
public enum RoutingStrategy {
    MANUAL,
    AUTO_COMPLEXITY,
    COST_OPTIMIZED,
    PERFORMANCE
}
```

### ExecutionMode
```java
public enum ExecutionMode {
    SEQUENTIAL,
    PARALLEL,
    HIERARCHICAL
}
```

### Backend (VectorStore)
```java
public enum Backend {
    IN_MEMORY,
    CHROMA_DB,
    FILE_BASED
}
```

---

This API reference provides comprehensive documentation for all public interfaces in the Ollama OpenRouter JavaFX Manager. Each method includes parameter descriptions, return types, and usage examples where appropriate.