# Technical Architecture Documentation

## System Architecture Overview

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Presentation Layer (JavaFX)                          │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │   Login     │ │    Admin    │ │    User     │ │  Enhanced   │      │
│  │ Controller  │ │ Controller  │ │ Controller  │ │    Chat     │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                      Service Layer                                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │ Unified     │ │    RAG      │ │ Multi-Agent │ │  Hardware   │      │
│  │   Model     │ │  Pipeline   │ │Orchestrator │ │  Monitor    │      │
│  │  Service    │ │             │ │             │ │  Service    │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │    User     │ │  Database   │ │   Theme     │ │   Session   │      │
│  │  Service    │ │  Service    │ │  Manager    │ │   Bridge    │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                    Integration Layer                                     │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │  Ollama     │ │ OpenRouter  │ │  ChromaDB   │ │ Embedding   │      │
│  │    API      │ │     API     │ │     API     │ │  Service    │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
┌─────────────────────────────────────────────────────────────────────────┐
│                     Data Layer                                           │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐      │
│  │   Vector    │ │    User     │ │    Chat     │ │   Config    │      │
│  │   Store     │ │    Data     │ │  History    │ │    Files    │      │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘      │
└─────────────────────────────────────────────────────────────────────────┘
```

## Design Patterns Implementation

### 1. Model-View-Controller (MVC)

#### Model Layer
```java
// User.java - Domain model
public class User {
    private String username;
    private String password;
    private Role role;
    private String apiKey;
    private boolean enabled;
    
    // Business logic methods
    public boolean hasValidApiKey() {
        return apiKey != null && !apiKey.trim().isEmpty();
    }
    
    public String getMaskedApiKey() {
        if (apiKey == null || apiKey.length() < 8) return "****";
        return apiKey.substring(0, 4) + "****" + apiKey.substring(apiKey.length() - 4);
    }
}

// SessionContext.java - Application state
public class SessionContext {
    private static SessionContext instance;
    private String username;
    private Role role;
    private String apiKey;
    private boolean loggedIn;
    
    // Singleton implementation with thread safety
    public static synchronized SessionContext getInstance() {
        if (instance == null) {
            instance = new SessionContext();
        }
        return instance;
    }
}
```

#### View Layer (FXML)
```xml
<!-- login-view.fxml -->
<?xml version="1.0" encoding="UTF-8"?>
<VBox xmlns="http://javafx.com/javafx/11.0.1" 
      xmlns:fx="http://javafx.com/fxml/1" 
      fx:controller="com.ollama.controllers.LoginController">
    
    <TextField fx:id="usernameField" promptText="Username" />
    <PasswordField fx:id="passwordField" promptText="Password" />
    <TextField fx:id="apiKeyField" promptText="API Key (Optional)" />
    <ComboBox fx:id="roleComboBox" />
    <Button fx:id="loginButton" text="Login" onAction="#handleLogin" />
    
</VBox>
```

#### Controller Layer
```java
// LoginController.java - UI logic
public class LoginController {
    @FXML private TextField usernameField;
    @FXML private PasswordField passwordField;
    @FXML private TextField apiKeyField;
    @FXML private ComboBox<User.Role> roleComboBox;
    
    private UserService userService;
    private LoginManager loginManager;
    
    @FXML
    private void initialize() {
        userService = UserService.getInstance();
        loginManager = LoginManager.getInstance();
        setupValidation();
    }
    
    @FXML
    private void handleLogin() {
        String username = usernameField.getText();
        String password = passwordField.getText();
        String apiKey = apiKeyField.getText();
        User.Role role = roleComboBox.getValue();
        
        if (userService.authenticate(username, password, apiKey, role)) {
            loginManager.showLoadingStage();
        } else {
            showErrorMessage("Invalid credentials");
        }
    }
}
```

### 2. Singleton Pattern

#### Thread-Safe Singleton Implementation
```java
public class UserService {
    private static volatile UserService instance;
    private final Map<String, User> users = new ConcurrentHashMap<>();
    
    private UserService() {
        initializeDefaultUsers();
    }
    
    public static UserService getInstance() {
        if (instance == null) {
            synchronized (UserService.class) {
                if (instance == null) {
                    instance = new UserService();
                }
            }
        }
        return instance;
    }
    
    // Thread-safe operations
    public synchronized boolean authenticate(String username, String password, String apiKey, User.Role role) {
        User user = users.get(username);
        if (user == null || !user.isEnabled()) {
            return false;
        }
        
        return user.getPassword().equals(password) && 
               user.getRole() == role &&
               (apiKey.isEmpty() || user.getApiKey().equals(apiKey));
    }
}
```

### 3. Observer Pattern

#### Theme Change Notifications
```java
public class ThemeManager {
    private final List<ThemeChangeListener> listeners = new ArrayList<>();
    private Theme currentTheme;
    
    public void addThemeChangeListener(ThemeChangeListener listener) {
        listeners.add(listener);
    }
    
    public void removeThemeChangeListener(ThemeChangeListener listener) {
        listeners.remove(listener);
    }
    
    public void applyTheme(Theme theme, Scene scene) {
        Theme oldTheme = currentTheme;
        currentTheme = theme;
        
        // Apply theme to scene
        String css = ThemeCssGenerator.generateCss(theme);
        scene.getStylesheets().clear();
        scene.getStylesheets().add("data:text/css," + css);
        
        // Notify listeners
        notifyThemeChanged(oldTheme, theme);
    }
    
    private void notifyThemeChanged(Theme oldTheme, Theme newTheme) {
        ThemeChangeEvent event = new ThemeChangeEvent(oldTheme, newTheme);
        listeners.forEach(listener -> listener.onThemeChanged(event));
    }
}

@FunctionalInterface
public interface ThemeChangeListener {
    void onThemeChanged(ThemeChangeEvent event);
}
```

#### Hardware Monitoring with JavaFX Properties
```java
public class HardwareMonitorService {
    private final DoubleProperty cpuUsage = new SimpleDoubleProperty();
    private final DoubleProperty memoryUsage = new SimpleDoubleProperty();
    private final StringProperty ollamaStatus = new SimpleStringProperty();
    
    // Observable properties for reactive UI
    public DoubleProperty cpuUsageProperty() { return cpuUsage; }
    public DoubleProperty memoryUsageProperty() { return memoryUsage; }
    public StringProperty ollamaStatusProperty() { return ollamaStatus; }
    
    private void updateMetrics() {
        // Update properties - UI automatically updates
        Platform.runLater(() -> {
            cpuUsage.set(getCurrentCpuUsage());
            memoryUsage.set(getCurrentMemoryUsage());
            ollamaStatus.set(getOllamaStatus());
        });
    }
}
```

### 4. Strategy Pattern

#### Query Routing Strategies
```java
public interface RoutingStrategy {
    RoutingDecision route(String query, QueryContext context);
}

public class ComplexityBasedRouting implements RoutingStrategy {
    @Override
    public RoutingDecision route(String query, QueryContext context) {
        QueryComplexity complexity = analyzeComplexity(query);
        
        switch (complexity) {
            case SIMPLE:
                return new RoutingDecision(Provider.OLLAMA, "llama2", "Fast local processing");
            case COMPLEX:
                return new RoutingDecision(Provider.OPENROUTER, "deepseek-r1", "Complex reasoning required");
            case CODE:
                return new RoutingDecision(Provider.OPENROUTER, "deepseek-coder", "Code generation task");
            default:
                return new RoutingDecision(Provider.OLLAMA, "llama2", "Default routing");
        }
    }
}

public class CostOptimizedRouting implements RoutingStrategy {
    @Override
    public RoutingDecision route(String query, QueryContext context) {
        // Always prefer free local models
        if (isOllamaAvailable()) {
            return new RoutingDecision(Provider.OLLAMA, "llama2", "Cost optimization - using free local model");
        }
        
        // Fallback to free OpenRouter models
        return new RoutingDecision(Provider.OPENROUTER, "google/gemma-2-9b-it:free", "Using free cloud model");
    }
}

// Usage in UnifiedModelService
public class UnifiedModelService {
    private RoutingStrategy routingStrategy = new ComplexityBasedRouting();
    
    public void setRoutingStrategy(RoutingStrategy strategy) {
        this.routingStrategy = strategy;
    }
    
    public void chat(String message, ChatCallback callback) {
        RoutingDecision decision = routingStrategy.route(message, createContext());
        
        switch (decision.getProvider()) {
            case OLLAMA:
                ollamaAPI.chat(decision.getModel(), message, callback);
                break;
            case OPENROUTER:
                openRouterAPI.chat(decision.getModel(), message, callback);
                break;
        }
    }
}
```

### 5. Factory Pattern

#### Theme Factory
```java
public class ThemeFactory {
    private static final Map<String, ThemeBuilder> builders = new HashMap<>();
    
    static {
        builders.put("material", new MaterialThemeBuilder());
        builders.put("brand", new BrandThemeBuilder());
        builders.put("nature", new NatureThemeBuilder());
        builders.put("gaming", new GamingThemeBuilder());
    }
    
    public static Theme createTheme(String category, String name, Map<String, String> properties) {
        ThemeBuilder builder = builders.get(category);
        if (builder == null) {
            throw new IllegalArgumentException("Unknown theme category: " + category);
        }
        
        return builder.build(name, properties);
    }
}

public interface ThemeBuilder {
    Theme build(String name, Map<String, String> properties);
}

public class MaterialThemeBuilder implements ThemeBuilder {
    @Override
    public Theme build(String name, Map<String, String> properties) {
        return new Theme(
            name,
            properties.getOrDefault("primary", "#2196F3"),
            properties.getOrDefault("secondary", "#FFC107"),
            properties.getOrDefault("background", "#FFFFFF"),
            // ... other properties with Material Design defaults
        );
    }
}
```

### 6. Command Pattern

#### Agent Task Execution
```java
public interface AgentCommand {
    CompletableFuture<String> execute(AgentContext context);
    String getDescription();
    boolean canUndo();
    CompletableFuture<Void> undo();
}

public class ResearchCommand implements AgentCommand {
    private final String topic;
    private final Agent agent;
    private String lastResult;
    
    public ResearchCommand(String topic, Agent agent) {
        this.topic = topic;
        this.agent = agent;
    }
    
    @Override
    public CompletableFuture<String> execute(AgentContext context) {
        return agent.research(topic, context)
            .thenApply(result -> {
                lastResult = result;
                return result;
            });
    }
    
    @Override
    public String getDescription() {
        return "Research: " + topic;
    }
    
    @Override
    public boolean canUndo() {
        return lastResult != null;
    }
    
    @Override
    public CompletableFuture<Void> undo() {
        // Clear research results from context
        return CompletableFuture.runAsync(() -> {
            // Undo logic
            lastResult = null;
        });
    }
}

// Command executor for agent orchestration
public class AgentCommandExecutor {
    private final Queue<AgentCommand> commandQueue = new LinkedList<>();
    private final Stack<AgentCommand> executedCommands = new Stack<>();
    
    public CompletableFuture<String> executeCommand(AgentCommand command, AgentContext context) {
        return command.execute(context)
            .thenApply(result -> {
                executedCommands.push(command);
                return result;
            });
    }
    
    public CompletableFuture<Void> undoLastCommand() {
        if (executedCommands.isEmpty()) {
            return CompletableFuture.completedFuture(null);
        }
        
        AgentCommand lastCommand = executedCommands.pop();
        if (lastCommand.canUndo()) {
            return lastCommand.undo();
        }
        
        return CompletableFuture.completedFuture(null);
    }
}
```

## Service Architecture

### Service Layer Design

#### Service Interface Pattern
```java
// Base service interface
public interface Service {
    void initialize();
    void shutdown();
    boolean isHealthy();
    String getServiceName();
}

// Specific service interfaces
public interface ModelService extends Service {
    CompletableFuture<String> chat(String model, String message, ChatCallback callback);
    CompletableFuture<List<String>> getAvailableModels();
    boolean isModelAvailable(String model);
}

public interface EmbeddingService extends Service {
    CompletableFuture<float[]> embed(String text);
    CompletableFuture<List<float[]>> embedBatch(List<String> texts);
    int getDimensions();
    String getModel();
}
```

#### Service Registry
```java
public class ServiceRegistry {
    private static final Map<Class<?>, Service> services = new ConcurrentHashMap<>();
    
    public static <T extends Service> void register(Class<T> serviceClass, T implementation) {
        services.put(serviceClass, implementation);
        implementation.initialize();
    }
    
    @SuppressWarnings("unchecked")
    public static <T extends Service> T get(Class<T> serviceClass) {
        T service = (T) services.get(serviceClass);
        if (service == null) {
            throw new ServiceNotFoundException("Service not found: " + serviceClass.getName());
        }
        return service;
    }
    
    public static void shutdownAll() {
        services.values().forEach(Service::shutdown);
        services.clear();
    }
    
    public static Map<String, Boolean> getHealthStatus() {
        return services.values().stream()
            .collect(Collectors.toMap(
                Service::getServiceName,
                Service::isHealthy
            ));
    }
}
```

### Dependency Injection

#### Constructor Injection Pattern
```java
public class RAGPipeline {
    private final EmbeddingService embeddingService;
    private final VectorStore vectorStore;
    private final UnifiedModelService modelService;
    
    // Constructor injection for testability
    public RAGPipeline(EmbeddingService embeddingService, 
                      VectorStore vectorStore, 
                      UnifiedModelService modelService) {
        this.embeddingService = Objects.requireNonNull(embeddingService);
        this.vectorStore = Objects.requireNonNull(vectorStore);
        this.modelService = Objects.requireNonNull(modelService);
    }
    
    // Factory method for default configuration
    public static RAGPipeline createDefault() {
        EmbeddingService embeddings = new EmbeddingService("nomic-embed-text");
        VectorStore store = new VectorStore(embeddings, VectorStore.Backend.IN_MEMORY);
        UnifiedModelService models = new UnifiedModelService(
            new OllamaAPI(), 
            new OpenRouterAPI()
        );
        
        return new RAGPipeline(embeddings, store, models);
    }
}
```

## Data Flow Architecture

### Request Processing Flow

```
User Input → Controller → Service Layer → Integration Layer → External APIs
    ↓           ↓            ↓              ↓                    ↓
UI Event → Validation → Business Logic → API Calls → HTTP Requests
    ↓           ↓            ↓              ↓                    ↓
Response ← UI Update ← Result Processing ← API Response ← HTTP Response
```

### Async Processing Pattern

```java
public class AsyncProcessingExample {
    
    // Async service method
    public CompletableFuture<String> processUserRequest(String input) {
        return CompletableFuture
            .supplyAsync(() -> validateInput(input))
            .thenCompose(this::enrichInput)
            .thenCompose(this::processWithAI)
            .thenApply(this::formatResponse)
            .exceptionally(this::handleError);
    }
    
    // UI integration with async processing
    @FXML
    private void handleUserInput() {
        String input = inputField.getText();
        
        // Show loading indicator
        progressIndicator.setVisible(true);
        sendButton.setDisable(true);
        
        processUserRequest(input)
            .thenAcceptAsync(result -> {
                // Update UI on JavaFX thread
                Platform.runLater(() -> {
                    responseArea.setText(result);
                    progressIndicator.setVisible(false);
                    sendButton.setDisable(false);
                });
            })
            .exceptionally(throwable -> {
                Platform.runLater(() -> {
                    showErrorDialog(throwable.getMessage());
                    progressIndicator.setVisible(false);
                    sendButton.setDisable(false);
                });
                return null;
            });
    }
}
```

## Error Handling Architecture

### Exception Hierarchy

```java
// Base application exception
public class OllamaManagerException extends Exception {
    public OllamaManagerException(String message) {
        super(message);
    }
    
    public OllamaManagerException(String message, Throwable cause) {
        super(message, cause);
    }
}

// Service-specific exceptions
public class ServiceException extends OllamaManagerException {
    private final String serviceName;
    
    public ServiceException(String serviceName, String message) {
        super(String.format("[%s] %s", serviceName, message));
        this.serviceName = serviceName;
    }
    
    public String getServiceName() {
        return serviceName;
    }
}

public class AuthenticationException extends OllamaManagerException {
    public AuthenticationException(String message) {
        super("Authentication failed: " + message);
    }
}

public class ConfigurationException extends OllamaManagerException {
    public ConfigurationException(String message) {
        super("Configuration error: " + message);
    }
}
```

### Global Error Handler

```java
public class GlobalErrorHandler {
    private static final Logger logger = Logger.getLogger(GlobalErrorHandler.class.getName());
    
    public static void handleException(Throwable throwable) {
        logger.severe("Unhandled exception: " + throwable.getMessage());
        
        Platform.runLater(() -> {
            Alert alert = new Alert(Alert.AlertType.ERROR);
            alert.setTitle("Application Error");
            alert.setHeaderText("An unexpected error occurred");
            
            if (throwable instanceof OllamaManagerException) {
                alert.setContentText(throwable.getMessage());
            } else {
                alert.setContentText("Please check the logs for more details.");
            }
            
            alert.showAndWait();
        });
    }
    
    public static void setupUncaughtExceptionHandler() {
        Thread.setDefaultUncaughtExceptionHandler((thread, exception) -> {
            handleException(exception);
        });
    }
}
```

This technical architecture documentation provides a comprehensive overview of the design patterns, service architecture, data flow, and error handling strategies used throughout the application. The modular design ensures maintainability, testability, and extensibility while following established software engineering best practices.