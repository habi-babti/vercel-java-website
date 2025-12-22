# Deployment Guide

## Overview

This guide covers all deployment scenarios for the Ollama OpenRouter JavaFX Manager, from development to production environments.

## Table of Contents

1. [Development Deployment](#development-deployment)
2. [Local Production Deployment](#local-production-deployment)
3. [Server Deployment](#server-deployment)
4. [Cloud Deployment](#cloud-deployment)
5. [Containerized Deployment](#containerized-deployment)
6. [Native Application Packaging](#native-application-packaging)
7. [Configuration Management](#configuration-management)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Security Considerations](#security-considerations)
10. [Troubleshooting](#troubleshooting)

---

## Development Deployment

### Prerequisites

#### Required Software
- **Java 17+** - [Download OpenJDK](https://openjdk.org/) or [Oracle JDK](https://www.oracle.com/java/technologies/downloads/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi) (or use included wrapper)
- **Git** - For version control

#### Optional Software
- **Ollama** - [Download from ollama.ai](https://ollama.ai) for local AI models
- **ChromaDB** - `pip install chromadb` for persistent vector storage
- **OpenRouter Account** - [Sign up at openrouter.ai](https://openrouter.ai) for cloud AI models

### Quick Development Setup

```bash
# Clone repository
git clone <repository-url>
cd Ollama-OpenRouter-javafx-manager

# Build project
./mvnw clean compile

# Run main application
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp

# Run comprehensive demo
./mvnw javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.ComprehensiveDemo
```

### IDE Setup

#### IntelliJ IDEA
1. **Import Project**: File → Open → Select project directory
2. **Configure JavaFX**: File → Project Structure → Libraries → Add JavaFX SDK
3. **VM Options**: Run → Edit Configurations → Add VM options:
   ```
   --module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml
   ```
4. **Main Class**: Set to `com.ollama.ollamaopenrouterjavafxmanager.AuthApp`

#### Eclipse
1. **Import**: File → Import → Existing Maven Projects
2. **Install e(fx)clipse**: Help → Eclipse Marketplace → Search "e(fx)clipse"
3. **Configure JavaFX**: Project Properties → Java Build Path → Add JavaFX SDK
4. **Run Configuration**: Run As → JavaFX Application

#### VS Code
1. **Install Extensions**:
   - Extension Pack for Java
   - JavaFX Support
2. **Configure**: Create `.vscode/launch.json`:
   ```json
   {
     "version": "0.2.0",
     "configurations": [
       {
         "type": "java",
         "name": "Launch AuthApp",
         "request": "launch",
         "mainClass": "com.ollama.ollamaopenrouterjavafxmanager.AuthApp",
         "vmArgs": "--module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml"
       }
     ]
   }
   ```

### Development Environment Configuration

#### Environment Variables
```bash
# Optional - for OpenRouter integration
export OPENROUTER_API_KEY="your-api-key-here"

# Optional - for ChromaDB
export CHROMA_URL="http://localhost:8000"

# Optional - for custom Ollama URL
export OLLAMA_URL="http://localhost:11434"
```

#### Configuration Files
Create `config.properties` in project root:
```properties
# Development configuration
debug.enabled=true
logging.level=DEBUG

# API Configuration
openrouter.api.key=${OPENROUTER_API_KEY}
ollama.url=${OLLAMA_URL:http://localhost:11434}
chroma.url=${CHROMA_URL:http://localhost:8000}

# UI Configuration
theme.default=material-light
window.width=1200
window.height=800

# Model Configuration
model.default.ollama=llama2
model.default.openrouter=deepseek-r1
embedding.model=nomic-embed-text
```

---

## Local Production Deployment

### Building for Production

#### Create Executable JAR
```bash
# Clean build with all dependencies
./mvnw clean package

# The JAR will be created in target/
ls -la target/ollama-manager-*.jar
```

#### Run Production JAR
```bash
# Basic execution
java -jar target/ollama-manager-1.0.jar

# With JavaFX modules (if not included)
java --module-path /path/to/javafx/lib \
     --add-modules javafx.controls,javafx.fxml \
     -jar target/ollama-manager-1.0.jar

# With custom configuration
java -Dconfig.file=production.properties \
     -jar target/ollama-manager-1.0.jar
```

### System Service Setup

#### Windows Service
Create `ollama-manager-service.bat`:
```batch
@echo off
cd /d "C:\path\to\ollama-manager"
java -Xmx2g -jar ollama-manager-1.0.jar
```

Install as Windows Service using [NSSM](https://nssm.cc/):
```cmd
nssm install OllamaManager "C:\path\to\ollama-manager-service.bat"
nssm set OllamaManager DisplayName "Ollama Manager Service"
nssm set OllamaManager Description "Ollama OpenRouter JavaFX Manager"
nssm start OllamaManager
```

#### Linux Systemd Service
Create `/etc/systemd/system/ollama-manager.service`:
```ini
[Unit]
Description=Ollama Manager Service
After=network.target

[Service]
Type=simple
User=ollama-manager
WorkingDirectory=/opt/ollama-manager
ExecStart=/usr/bin/java -Xmx2g -jar ollama-manager-1.0.jar
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable ollama-manager
sudo systemctl start ollama-manager
sudo systemctl status ollama-manager
```

#### macOS LaunchDaemon
Create `~/Library/LaunchAgents/com.ollama.manager.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.ollama.manager</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/bin/java</string>
        <string>-Xmx2g</string>
        <string>-jar</string>
        <string>/Applications/OllamaManager/ollama-manager-1.0.jar</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

Load the service:
```bash
launchctl load ~/Library/LaunchAgents/com.ollama.manager.plist
launchctl start com.ollama.manager
```

---

## Server Deployment

### Headless Server Mode

For server deployments without GUI, create a headless version:

#### Headless Configuration
```properties
# Server mode configuration
server.mode=true
server.port=8080
ui.enabled=false

# API endpoints
api.enabled=true
api.auth.required=true

# Background services
hardware.monitor.enabled=true
rag.pipeline.enabled=true
agents.enabled=true
```

#### Server Startup Script
```bash
#!/bin/bash
# ollama-manager-server.sh

# Set Java options for server
export JAVA_OPTS="-Xmx4g -Xms2g -server -XX:+UseG1GC"

# Set headless mode
export JAVA_OPTS="$JAVA_OPTS -Djava.awt.headless=true"

# Start server
java $JAVA_OPTS \
     -Dserver.mode=true \
     -Dconfig.file=server.properties \
     -jar ollama-manager-1.0.jar
```

### Reverse Proxy Setup

#### Nginx Configuration
```nginx
# /etc/nginx/sites-available/ollama-manager
server {
    listen 80;
    server_name ollama-manager.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/ollama-manager /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### Apache Configuration
```apache
# /etc/apache2/sites-available/ollama-manager.conf
<VirtualHost *:80>
    ServerName ollama-manager.yourdomain.com
    
    ProxyPreserveHost On
    ProxyRequests Off
    ProxyPass / http://localhost:8080/
    ProxyPassReverse / http://localhost:8080/
    
    # WebSocket support
    RewriteEngine on
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) "ws://localhost:8080/$1" [P,L]
</VirtualHost>
```

Enable the site:
```bash
sudo a2enmod proxy proxy_http rewrite
sudo a2ensite ollama-manager
sudo systemctl reload apache2
```

### SSL/TLS Configuration

#### Let's Encrypt with Certbot
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d ollama-manager.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

---

## Cloud Deployment

### AWS Deployment

#### EC2 Instance Setup
```bash
# Launch EC2 instance (Ubuntu 20.04 LTS)
# Security Group: Allow ports 22, 80, 443, 8080

# Install Java
sudo apt update
sudo apt install openjdk-17-jdk

# Install application
sudo mkdir -p /opt/ollama-manager
sudo chown ubuntu:ubuntu /opt/ollama-manager
cd /opt/ollama-manager

# Upload JAR file
scp ollama-manager-1.0.jar ubuntu@your-ec2-ip:/opt/ollama-manager/

# Create systemd service (as shown above)
```

#### ECS Deployment
Create `task-definition.json`:
```json
{
  "family": "ollama-manager",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "ollama-manager",
      "image": "your-account.dkr.ecr.region.amazonaws.com/ollama-manager:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "OPENROUTER_API_KEY",
          "value": "your-api-key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/ollama-manager",
          "awslogs-region": "us-west-2",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Application Load Balancer
```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name ollama-manager-alb \
  --subnets subnet-12345 subnet-67890 \
  --security-groups sg-12345

# Create target group
aws elbv2 create-target-group \
  --name ollama-manager-targets \
  --protocol HTTP \
  --port 8080 \
  --vpc-id vpc-12345 \
  --health-check-path /health
```

### Google Cloud Platform

#### Compute Engine
```bash
# Create instance
gcloud compute instances create ollama-manager \
  --image-family ubuntu-2004-lts \
  --image-project ubuntu-os-cloud \
  --machine-type e2-standard-2 \
  --tags http-server,https-server

# SSH and setup
gcloud compute ssh ollama-manager
# Follow EC2 setup steps
```

#### Cloud Run
Create `Dockerfile`:
```dockerfile
FROM openjdk:17-jdk-slim

COPY target/ollama-manager-1.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-Dserver.port=8080", "-jar", "/app.jar"]
```

Deploy:
```bash
# Build and push to Container Registry
docker build -t gcr.io/your-project/ollama-manager .
docker push gcr.io/your-project/ollama-manager

# Deploy to Cloud Run
gcloud run deploy ollama-manager \
  --image gcr.io/your-project/ollama-manager \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure Deployment

#### Virtual Machine
```bash
# Create VM
az vm create \
  --resource-group ollama-manager-rg \
  --name ollama-manager-vm \
  --image UbuntuLTS \
  --admin-username azureuser \
  --generate-ssh-keys

# Open ports
az vm open-port --port 8080 --resource-group ollama-manager-rg --name ollama-manager-vm
```

#### Container Instances
```bash
# Create container group
az container create \
  --resource-group ollama-manager-rg \
  --name ollama-manager-container \
  --image your-registry/ollama-manager:latest \
  --dns-name-label ollama-manager \
  --ports 8080 \
  --environment-variables OPENROUTER_API_KEY=your-key
```

---

## Containerized Deployment

### Docker Setup

#### Dockerfile
```dockerfile
# Multi-stage build
FROM maven:3.8-openjdk-17 AS build

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create app user
RUN useradd -r -s /bin/false ollama-manager

WORKDIR /app

# Copy JAR from build stage
COPY --from=build /app/target/ollama-manager-*.jar app.jar

# Copy configuration
COPY docker/config.properties .
COPY docker/themes ./themes

# Set ownership
RUN chown -R ollama-manager:ollama-manager /app

USER ollama-manager

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/health || exit 1

ENTRYPOINT ["java", "-Xmx2g", "-jar", "app.jar"]
```

#### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  ollama-manager:
    build: .
    ports:
      - "8080:8080"
    environment:
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - CHROMA_URL=http://chromadb:8000
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - chromadb
      - ollama
    volumes:
      - ./data:/app/data
      - ./logs:/app/logs
    restart: unless-stopped
    networks:
      - ollama-network

  chromadb:
    image: chromadb/chroma:latest
    ports:
      - "8000:8000"
    volumes:
      - chroma_data:/chroma/chroma
    environment:
      - CHROMA_SERVER_HOST=0.0.0.0
    restart: unless-stopped
    networks:
      - ollama-network

  ollama:
    image: ollama/ollama:latest
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama
    restart: unless-stopped
    networks:
      - ollama-network

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./nginx/ssl:/etc/nginx/ssl
    depends_on:
      - ollama-manager
    restart: unless-stopped
    networks:
      - ollama-network

volumes:
  chroma_data:
  ollama_data:

networks:
  ollama-network:
    driver: bridge
```

#### Environment File
Create `.env`:
```bash
# API Keys
OPENROUTER_API_KEY=your-openrouter-api-key

# Database
POSTGRES_USER=ollama_manager
POSTGRES_PASSWORD=secure_password
POSTGRES_DB=ollama_manager

# Application
APP_ENV=production
LOG_LEVEL=INFO
```

### Kubernetes Deployment

#### Namespace
```yaml
# namespace.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: ollama-manager
```

#### ConfigMap
```yaml
# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ollama-manager-config
  namespace: ollama-manager
data:
  application.properties: |
    server.port=8080
    logging.level.root=INFO
    chroma.url=http://chromadb-service:8000
    ollama.url=http://ollama-service:11434
```

#### Secret
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: ollama-manager-secrets
  namespace: ollama-manager
type: Opaque
data:
  openrouter-api-key: <base64-encoded-api-key>
```

#### Deployment
```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ollama-manager
  namespace: ollama-manager
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
        image: your-registry/ollama-manager:latest
        ports:
        - containerPort: 8080
        env:
        - name: OPENROUTER_API_KEY
          valueFrom:
            secretKeyRef:
              name: ollama-manager-secrets
              key: openrouter-api-key
        volumeMounts:
        - name: config
          mountPath: /app/config
        resources:
          requests:
            memory: "1Gi"
            cpu: "500m"
          limits:
            memory: "2Gi"
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
      volumes:
      - name: config
        configMap:
          name: ollama-manager-config
```

#### Service
```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: ollama-manager-service
  namespace: ollama-manager
spec:
  selector:
    app: ollama-manager
  ports:
  - port: 80
    targetPort: 8080
  type: LoadBalancer
```

#### Ingress
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ollama-manager-ingress
  namespace: ollama-manager
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - ollama-manager.yourdomain.com
    secretName: ollama-manager-tls
  rules:
  - host: ollama-manager.yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: ollama-manager-service
            port:
              number: 80
```

Deploy to Kubernetes:
```bash
kubectl apply -f namespace.yaml
kubectl apply -f configmap.yaml
kubectl apply -f secret.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
kubectl apply -f ingress.yaml
```

---
## Native Application Packaging

### JavaFX jpackage

#### Windows Installer
```bash
# Build MSI installer
./mvnw javafx:jpackage \
  -Djpackage.type=msi \
  -Djpackage.name="Ollama Manager" \
  -Djpackage.vendor="Your Company" \
  -Djpackage.description="Ollama OpenRouter JavaFX Manager" \
  -Djpackage.icon=src/main/resources/img/app-icon.ico \
  -Djpackage.win-menu \
  -Djpackage.win-shortcut
```

#### macOS Application Bundle
```bash
# Build DMG installer
./mvnw javafx:jpackage \
  -Djpackage.type=dmg \
  -Djpackage.name="Ollama Manager" \
  -Djpackage.vendor="Your Company" \
  -Djpackage.icon=src/main/resources/img/app-icon.icns \
  -Djpackage.mac-package-name="com.ollama.manager"
```

#### Linux Package
```bash
# Build DEB package
./mvnw javafx:jpackage \
  -Djpackage.type=deb \
  -Djpackage.name="ollama-manager" \
  -Djpackage.vendor="Your Company" \
  -Djpackage.linux-shortcut

# Build RPM package
./mvnw javafx:jpackage \
  -Djpackage.type=rpm \
  -Djpackage.name="ollama-manager" \
  -Djpackage.vendor="Your Company"
```

### Advanced Packaging Options

#### Custom JVM Options
```bash
./mvnw javafx:jpackage \
  -Djpackage.jvm-args="-Xmx4g -XX:+UseG1GC -Dfile.encoding=UTF-8"
```

#### Include Additional Files
```bash
./mvnw javafx:jpackage \
  -Djpackage.resource-dir=src/main/resources/packaging \
  -Djpackage.input=target/dependencies
```

#### Code Signing (Windows)
```bash
# Sign the installer
signtool sign /f certificate.p12 /p password /t http://timestamp.digicert.com target/Ollama-Manager-1.0.msi
```

#### Notarization (macOS)
```bash
# Notarize the application
xcrun altool --notarize-app \
  --primary-bundle-id "com.ollama.manager" \
  --username "your-apple-id" \
  --password "app-specific-password" \
  --file target/Ollama-Manager-1.0.dmg
```

---

## Configuration Management

### Environment-Specific Configurations

#### Development Configuration
```properties
# config/development.properties
debug.enabled=true
logging.level=DEBUG
logging.console.enabled=true

# Local services
ollama.url=http://localhost:11434
chroma.url=http://localhost:8000
openrouter.api.key=${OPENROUTER_API_KEY}

# UI settings
theme.default=material-light
window.width=1200
window.height=800

# Development features
hot.reload.enabled=true
mock.data.enabled=true
```

#### Production Configuration
```properties
# config/production.properties
debug.enabled=false
logging.level=INFO
logging.file.enabled=true
logging.file.path=/var/log/ollama-manager/

# Production services
ollama.url=http://ollama-service:11434
chroma.url=http://chroma-service:8000
openrouter.api.key=${OPENROUTER_API_KEY}

# Security settings
auth.session.timeout=3600
api.rate.limit.enabled=true
api.rate.limit.requests=100
api.rate.limit.window=60

# Performance settings
thread.pool.size=10
connection.pool.size=20
cache.enabled=true
cache.ttl=300
```

#### Docker Configuration
```properties
# config/docker.properties
server.port=8080
server.host=0.0.0.0

# Container-specific settings
logging.console.enabled=true
logging.file.enabled=false

# Health checks
health.check.enabled=true
health.check.interval=30

# Graceful shutdown
shutdown.timeout=30
```

### Configuration Loading Strategy

#### Configuration Hierarchy
```java
// ConfigurationLoader.java
public class ConfigurationLoader {
    private static final String[] CONFIG_LOCATIONS = {
        "classpath:application.properties",
        "classpath:application-${spring.profiles.active}.properties",
        "file:./config/application.properties",
        "file:./config/application-${spring.profiles.active}.properties",
        "file:${user.home}/.ollama-manager/application.properties"
    };
    
    public Properties loadConfiguration() {
        Properties config = new Properties();
        
        for (String location : CONFIG_LOCATIONS) {
            try {
                String resolvedLocation = resolveLocation(location);
                if (resourceExists(resolvedLocation)) {
                    Properties props = loadProperties(resolvedLocation);
                    config.putAll(props);
                }
            } catch (Exception e) {
                logger.warn("Failed to load configuration from: " + location, e);
            }
        }
        
        // Override with environment variables
        overrideWithEnvironmentVariables(config);
        
        return config;
    }
}
```

### Secrets Management

#### Environment Variables
```bash
# Production secrets
export OPENROUTER_API_KEY="sk-or-v1-..."
export DATABASE_PASSWORD="secure-password"
export JWT_SECRET="jwt-signing-secret"
export ENCRYPTION_KEY="data-encryption-key"
```

#### Docker Secrets
```bash
# Create secrets
echo "sk-or-v1-..." | docker secret create openrouter_api_key -
echo "secure-password" | docker secret create db_password -

# Use in docker-compose.yml
services:
  ollama-manager:
    secrets:
      - openrouter_api_key
      - db_password
    environment:
      - OPENROUTER_API_KEY_FILE=/run/secrets/openrouter_api_key
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  openrouter_api_key:
    external: true
  db_password:
    external: true
```

#### Kubernetes Secrets
```bash
# Create secrets
kubectl create secret generic ollama-manager-secrets \
  --from-literal=openrouter-api-key="sk-or-v1-..." \
  --from-literal=db-password="secure-password" \
  --namespace=ollama-manager

# Use in deployment
env:
- name: OPENROUTER_API_KEY
  valueFrom:
    secretKeyRef:
      name: ollama-manager-secrets
      key: openrouter-api-key
```

#### HashiCorp Vault Integration
```java
// VaultConfigurationSource.java
@Component
public class VaultConfigurationSource {
    
    @Value("${vault.url}")
    private String vaultUrl;
    
    @Value("${vault.token}")
    private String vaultToken;
    
    public String getSecret(String path, String key) {
        VaultTemplate vaultTemplate = new VaultTemplate(
            VaultEndpoint.create(vaultUrl),
            new TokenAuthentication(vaultToken)
        );
        
        VaultResponse response = vaultTemplate.read(path);
        return (String) response.getData().get(key);
    }
}
```

---

## Monitoring and Logging

### Application Monitoring

#### Health Checks
```java
// HealthCheckController.java
@RestController
public class HealthCheckController {
    
    @Autowired
    private List<HealthIndicator> healthIndicators;
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> health = new HashMap<>();
        boolean allHealthy = true;
        
        for (HealthIndicator indicator : healthIndicators) {
            HealthStatus status = indicator.checkHealth();
            health.put(indicator.getName(), status);
            if (!status.isHealthy()) {
                allHealthy = false;
            }
        }
        
        health.put("status", allHealthy ? "UP" : "DOWN");
        health.put("timestamp", Instant.now());
        
        return ResponseEntity
            .status(allHealthy ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
            .body(health);
    }
    
    @GetMapping("/ready")
    public ResponseEntity<Map<String, String>> ready() {
        // Check if application is ready to serve requests
        boolean ready = checkDatabaseConnection() && 
                       checkExternalServices() && 
                       checkRequiredConfiguration();
        
        Map<String, String> response = Map.of(
            "status", ready ? "READY" : "NOT_READY",
            "timestamp", Instant.now().toString()
        );
        
        return ResponseEntity
            .status(ready ? HttpStatus.OK : HttpStatus.SERVICE_UNAVAILABLE)
            .body(response);
    }
}
```

#### Metrics Collection
```java
// MetricsCollector.java
@Component
public class MetricsCollector {
    
    private final MeterRegistry meterRegistry;
    private final Counter requestCounter;
    private final Timer responseTimer;
    private final Gauge activeUsers;
    
    public MetricsCollector(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.requestCounter = Counter.builder("http.requests.total")
            .description("Total HTTP requests")
            .register(meterRegistry);
        this.responseTimer = Timer.builder("http.response.time")
            .description("HTTP response time")
            .register(meterRegistry);
        this.activeUsers = Gauge.builder("users.active")
            .description("Active users")
            .register(meterRegistry, this, MetricsCollector::getActiveUserCount);
    }
    
    public void recordRequest(String method, String uri, int status) {
        requestCounter.increment(
            Tags.of(
                Tag.of("method", method),
                Tag.of("uri", uri),
                Tag.of("status", String.valueOf(status))
            )
        );
    }
    
    private double getActiveUserCount() {
        return SessionContext.getActiveSessionCount();
    }
}
```

### Logging Configuration

#### Logback Configuration
```xml
<!-- logback-spring.xml -->
<configuration>
    <springProfile name="development">
        <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
            <encoder>
                <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
            </encoder>
        </appender>
        <root level="DEBUG">
            <appender-ref ref="CONSOLE" />
        </root>
    </springProfile>
    
    <springProfile name="production">
        <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>/var/log/ollama-manager/application.log</file>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>/var/log/ollama-manager/application.%d{yyyy-MM-dd}.log</fileNamePattern>
                <maxHistory>30</maxHistory>
                <totalSizeCap>1GB</totalSizeCap>
            </rollingPolicy>
            <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
                <providers>
                    <timestamp/>
                    <logLevel/>
                    <loggerName/>
                    <message/>
                    <mdc/>
                    <stackTrace/>
                </providers>
            </encoder>
        </appender>
        
        <appender name="ERROR_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
            <file>/var/log/ollama-manager/error.log</file>
            <filter class="ch.qos.logback.classic.filter.LevelFilter">
                <level>ERROR</level>
                <onMatch>ACCEPT</onMatch>
                <onMismatch>DENY</onMismatch>
            </filter>
            <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
                <fileNamePattern>/var/log/ollama-manager/error.%d{yyyy-MM-dd}.log</fileNamePattern>
                <maxHistory>90</maxHistory>
            </rollingPolicy>
            <encoder class="net.logstash.logback.encoder.LoggingEventCompositeJsonEncoder">
                <providers>
                    <timestamp/>
                    <logLevel/>
                    <loggerName/>
                    <message/>
                    <mdc/>
                    <stackTrace/>
                </providers>
            </encoder>
        </appender>
        
        <root level="INFO">
            <appender-ref ref="FILE" />
            <appender-ref ref="ERROR_FILE" />
        </root>
    </springProfile>
</configuration>
```

#### Structured Logging
```java
// StructuredLogger.java
@Component
public class StructuredLogger {
    
    private static final Logger logger = LoggerFactory.getLogger(StructuredLogger.class);
    
    public void logUserAction(String username, String action, Map<String, Object> details) {
        MDC.put("username", username);
        MDC.put("action", action);
        MDC.put("timestamp", Instant.now().toString());
        
        details.forEach((key, value) -> MDC.put(key, String.valueOf(value)));
        
        logger.info("User action performed");
        
        MDC.clear();
    }
    
    public void logApiCall(String provider, String model, long duration, boolean success) {
        MDC.put("provider", provider);
        MDC.put("model", model);
        MDC.put("duration_ms", String.valueOf(duration));
        MDC.put("success", String.valueOf(success));
        
        if (success) {
            logger.info("API call completed successfully");
        } else {
            logger.warn("API call failed");
        }
        
        MDC.clear();
    }
}
```

### External Monitoring Integration

#### Prometheus Metrics
```java
// PrometheusConfiguration.java
@Configuration
public class PrometheusConfiguration {
    
    @Bean
    public MeterRegistryCustomizer<PrometheusMeterRegistry> metricsCommonTags() {
        return registry -> registry.config().commonTags(
            "application", "ollama-manager",
            "version", getClass().getPackage().getImplementationVersion()
        );
    }
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
}

// Expose metrics endpoint
@RestController
public class MetricsController {
    
    @Autowired
    private PrometheusMeterRegistry prometheusMeterRegistry;
    
    @GetMapping("/metrics")
    public String metrics() {
        return prometheusMeterRegistry.scrape();
    }
}
```

#### ELK Stack Integration
```yaml
# docker-compose.yml - Add ELK stack
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.0
    environment:
      - discovery.type=single-node
      - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
    ports:
      - "9200:9200"
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.0
    volumes:
      - ./logstash/pipeline:/usr/share/logstash/pipeline
    ports:
      - "5044:5044"
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
    depends_on:
      - elasticsearch

volumes:
  elasticsearch_data:
```

#### Grafana Dashboard
```json
{
  "dashboard": {
    "title": "Ollama Manager Metrics",
    "panels": [
      {
        "title": "Request Rate",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])",
            "legendFormat": "{{method}} {{uri}}"
          }
        ]
      },
      {
        "title": "Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_response_time_bucket[5m]))",
            "legendFormat": "95th percentile"
          }
        ]
      },
      {
        "title": "Active Users",
        "type": "singlestat",
        "targets": [
          {
            "expr": "users_active",
            "legendFormat": "Active Users"
          }
        ]
      }
    ]
  }
}
```

---

## Security Considerations

### Authentication and Authorization

#### JWT Token Configuration
```properties
# JWT settings
jwt.secret=${JWT_SECRET}
jwt.expiration=3600
jwt.refresh.expiration=86400
jwt.issuer=ollama-manager
```

#### Security Headers
```java
// SecurityConfiguration.java
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers
                .frameOptions().deny()
                .contentTypeOptions().and()
                .httpStrictTransportSecurity(hsts -> hsts
                    .maxAgeInSeconds(31536000)
                    .includeSubdomains(true)
                )
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/health", "/metrics").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/**").authenticated()
                .anyRequest().permitAll()
            );
        
        return http.build();
    }
}
```

### Data Protection

#### Encryption at Rest
```java
// EncryptionService.java
@Service
public class EncryptionService {
    
    private final AESUtil aesUtil;
    
    public EncryptionService(@Value("${encryption.key}") String encryptionKey) {
        this.aesUtil = new AESUtil(encryptionKey);
    }
    
    public String encryptApiKey(String apiKey) {
        return aesUtil.encrypt(apiKey);
    }
    
    public String decryptApiKey(String encryptedApiKey) {
        return aesUtil.decrypt(encryptedApiKey);
    }
}
```

#### Secure Configuration
```properties
# Security settings
security.require.ssl=true
security.session.secure=true
security.session.http.only=true
security.csrf.protection=true

# API rate limiting
api.rate.limit.enabled=true
api.rate.limit.requests=100
api.rate.limit.window=60

# Input validation
validation.max.request.size=10MB
validation.max.file.size=50MB
validation.allowed.file.types=txt,md,pdf,docx
```

### Network Security

#### Firewall Rules
```bash
# Ubuntu/Debian
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 8080/tcp   # Block direct access to app
sudo ufw enable

# CentOS/RHEL
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

#### SSL/TLS Configuration
```nginx
# nginx SSL configuration
server {
    listen 443 ssl http2;
    server_name ollama-manager.yourdomain.com;
    
    ssl_certificate /etc/ssl/certs/ollama-manager.crt;
    ssl_certificate_key /etc/ssl/private/ollama-manager.key;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Troubleshooting

### Common Deployment Issues

#### Java/JavaFX Issues
**Problem**: `Error: JavaFX runtime components are missing`
```bash
# Solution 1: Use included JavaFX
./mvnw javafx:run

# Solution 2: Download JavaFX SDK and set module path
java --module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml -jar app.jar

# Solution 3: Use OpenJFX packages
sudo apt install openjfx  # Ubuntu/Debian
sudo yum install java-openjfx  # CentOS/RHEL
```

#### Memory Issues
**Problem**: `OutOfMemoryError`
```bash
# Increase heap size
java -Xmx4g -Xms2g -jar ollama-manager.jar

# Use G1 garbage collector for better performance
java -XX:+UseG1GC -XX:MaxGCPauseMillis=200 -jar ollama-manager.jar

# Monitor memory usage
jstat -gc -t <pid> 5s
```

#### Port Conflicts
**Problem**: `Port 8080 already in use`
```bash
# Find process using port
sudo netstat -tlnp | grep :8080
sudo lsof -i :8080

# Kill process
sudo kill -9 <pid>

# Use different port
java -Dserver.port=8081 -jar ollama-manager.jar
```

#### SSL Certificate Issues
**Problem**: SSL certificate errors
```bash
# Check certificate validity
openssl x509 -in certificate.crt -text -noout

# Test SSL connection
openssl s_client -connect ollama-manager.yourdomain.com:443

# Renew Let's Encrypt certificate
sudo certbot renew --dry-run
```

### Container Issues

#### Docker Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Build with no cache
docker build --no-cache -t ollama-manager .

# Check build logs
docker build -t ollama-manager . 2>&1 | tee build.log
```

#### Container Startup Issues
```bash
# Check container logs
docker logs ollama-manager

# Run container interactively
docker run -it ollama-manager /bin/bash

# Check resource usage
docker stats ollama-manager
```

### Kubernetes Issues

#### Pod Startup Problems
```bash
# Check pod status
kubectl get pods -n ollama-manager

# Describe pod for events
kubectl describe pod <pod-name> -n ollama-manager

# Check pod logs
kubectl logs <pod-name> -n ollama-manager

# Execute into pod
kubectl exec -it <pod-name> -n ollama-manager -- /bin/bash
```

#### Service Discovery Issues
```bash
# Check service endpoints
kubectl get endpoints -n ollama-manager

# Test service connectivity
kubectl run test-pod --image=busybox -it --rm -- /bin/sh
# Inside pod: wget -qO- http://ollama-manager-service/health
```

### Performance Troubleshooting

#### Application Profiling
```bash
# Enable JFR (Java Flight Recorder)
java -XX:+FlightRecorder \
     -XX:StartFlightRecording=duration=60s,filename=profile.jfr \
     -jar ollama-manager.jar

# Analyze with JProfiler or VisualVM
```

#### Database Performance
```sql
-- Check slow queries
SELECT query, mean_time, calls 
FROM pg_stat_statements 
ORDER BY mean_time DESC 
LIMIT 10;

-- Check connection pool
SELECT count(*) as active_connections 
FROM pg_stat_activity 
WHERE state = 'active';
```

#### Network Diagnostics
```bash
# Test API endpoints
curl -v http://localhost:8080/health
curl -v http://localhost:8080/metrics

# Check network latency
ping ollama-service
traceroute ollama-service

# Monitor network traffic
sudo tcpdump -i any port 8080
```

This comprehensive deployment guide covers all aspects of deploying the Ollama OpenRouter JavaFX Manager from development to production environments, including containerization, cloud deployment, security considerations, and troubleshooting common issues.