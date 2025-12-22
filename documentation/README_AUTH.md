# JavaFX Authentication System

A complete JavaFX authentication system with role-based access control for the Ollama Manager application.

## Features

- **Separate Login Window**: Dedicated login stage shown before the main application
- **Role-Based Access**: Support for USER and ADMIN roles with different capabilities
- **Session Management**: Secure session context with API key storage
- **Admin Dashboard**: Complete user management interface for administrators
- **User Interface**: Chat interface for regular users with API integration
- **In-Memory Storage**: Simple user store that can be easily replaced with REST API

## Architecture

### Core Components

1. **Models**
   - `User.java`: User entity with credentials and role information
   - `SessionContext.java`: Singleton session management with current user context

2. **Services**
   - `UserService.java`: User authentication and management service
   - `LoginManager.java`: Navigation and stage management

3. **Controllers**
   - `LoginController.java`: Handles login form and authentication
   - `AdminController.java`: Admin dashboard with user management
   - `UserController.java`: User chat interface

4. **Views (FXML)**
   - `login-view.fxml`: Login form interface
   - `admin-view.fxml`: Admin dashboard interface
   - `user-view.fxml`: User chat interface

## Default Test Credentials

The system comes with pre-configured test accounts:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: Admin
- **API Key**: `sk-admin-1234567890abcdef`

### User Accounts
- **Username**: `user`
- **Password**: `user123`
- **Role**: User
- **API Key**: `sk-user-abcdef1234567890`

- **Username**: `testuser`
- **Password**: `test123`
- **Role**: User
- **API Key**: `sk-test-fedcba0987654321`

## How to Run

### Option 1: Using Maven (if Maven is installed)
```bash
mvn clean javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp
```

### Option 2: Using Maven Wrapper
```bash
./mvnw.cmd clean compile
./mvnw.cmd javafx:run -Djavafx.mainClass=com.ollama.ollamaopenrouterjavafxmanager.AuthApp
```

### Option 3: Direct Java Execution
```bash
# Compile first
./mvnw.cmd clean compile

# Run with JavaFX modules
java --module-path /path/to/javafx/lib --add-modules javafx.controls,javafx.fxml -cp target/classes com.ollama.ollamaopenrouterjavafxmanager.AuthApp
```

### Option 4: View Test Credentials
```bash
java -cp target/classes com.ollama.ollamaopenrouterjavafxmanager.AuthDemo
```

## Usage Flow

1. **Application Start**: The application launches with the login window
2. **Authentication**: Enter username, password, API key, and select role
3. **Role-Based Navigation**:
   - **Admin**: Redirected to admin dashboard with user management capabilities
   - **User**: Redirected to chat interface with API integration
4. **Session Management**: User session is maintained throughout the application
5. **Logout**: Return to login screen and clear session

## Admin Capabilities

When logged in as an admin, you can:

- **View All Users**: See complete user list with masked API keys
- **Change API Keys**: Update user API keys
- **Enable/Disable Users**: Toggle user account status
- **Reset Passwords**: Change user passwords
- **View Chat History**: Access user chat logs (demo data)

## User Capabilities

When logged in as a user, you can:

- **Chat Interface**: Send messages through the chat interface
- **API Integration**: Messages are processed using the stored API key
- **Session Info**: View current session details and masked API key
- **Chat Management**: Clear chat history

## Security Features

- **Password Validation**: Basic password requirements
- **API Key Verification**: API key must match user account
- **Role Verification**: Role selection must match user's assigned role
- **Session Security**: Session context is cleared on logout
- **API Key Masking**: API keys are masked in the UI for security

## Customization

### Adding New Users
Modify the `initializeDefaultUsers()` method in `UserService.java`:

```java
User newUser = new User("user-003", "newuser", "password123", 
                       "sk-new-1234567890abcdef", User.Role.USER);
users.put(newUser.getUsername(), newUser);
```

### Replacing with REST API
The `UserService` class is designed to be easily replaced with a REST API implementation:

1. Keep the same interface methods
2. Replace in-memory storage with HTTP calls
3. Add proper error handling and async operations
4. Implement proper password hashing

### Customizing UI
- Modify FXML files for different layouts
- Update CSS styling (add stylesheet references to FXML)
- Customize validation messages and error handling

## File Structure

```
src/main/java/com/ollama/ollamaopenrouterjavafxmanager/
├── AuthApp.java                    # Main application entry point
├── AuthDemo.java                   # Demo credentials display
├── models/
│   ├── User.java                   # User entity
│   └── SessionContext.java         # Session management
├── services/
│   ├── UserService.java            # User authentication service
│   └── LoginManager.java           # Navigation management
└── controllers/
    ├── LoginController.java        # Login form controller
    ├── AdminController.java        # Admin dashboard controller
    └── UserController.java         # User interface controller

src/main/resources/com/ollama/ollamaopenrouterjavafxmanager/
├── login-view.fxml                 # Login form UI
├── admin-view.fxml                 # Admin dashboard UI
└── user-view.fxml                  # User interface UI
```

## Future Enhancements

- **Password Hashing**: Implement proper password hashing (BCrypt)
- **API Key Encryption**: Encrypt stored API keys
- **Database Integration**: Replace in-memory storage with database
- **JWT Tokens**: Implement JWT-based authentication
- **Password Reset**: Add password reset functionality
- **User Registration**: Add new user registration
- **Audit Logging**: Track user actions and login attempts
- **Session Timeout**: Implement automatic session expiration
- **Multi-Factor Authentication**: Add 2FA support

## Troubleshooting

### Common Issues

1. **FXML Loading Errors**: Ensure FXML files are in the correct resource path
2. **Module Path Issues**: Verify JavaFX modules are properly configured
3. **Login Failures**: Check that credentials match exactly (case-sensitive)
4. **Navigation Issues**: Ensure LoginManager is properly passed to controllers

### Debug Mode
Add system properties for debugging:
```bash
-Djavafx.verbose=true -Dprism.verbose=true
```

This authentication system provides a solid foundation for secure JavaFX applications with role-based access control and can be easily extended for production use.