# Ollama Command Runner Feature

## Overview
The Ollama Command Runner is a comprehensive interface within the JavaFX application that allows users to execute any Ollama command directly from the GUI.

## Location
- **Menu**: Options → Ollama Command Runner
- **Shortcut**: Available through the main menu bar

## Features

### 1. Help Display
- Shows the complete `ollama help` output at the top
- Displays all available commands with descriptions
- Updates automatically when the dialog opens

### 2. Command Input
- Text field with "ollama" prefix for easy command entry
- Supports any valid Ollama command
- Press Enter to execute commands quickly

### 3. Quick Command Buttons
Pre-configured buttons for common commands:
- `list` - List installed models
- `ps` - List running models  
- `serve` - Start Ollama server
- `help` - Show general help
- `--version` - Show version info
- `help serve` - Help for serve command
- `help run` - Help for run command
- `help pull` - Help for pull command
- `help create` - Help for create command

### 4. Real-time Output
- Command output appears in real-time
- Shows command, exit code, and full output
- Scrollable output area with monospace font
- Auto-scrolls to show latest output

## Usage Examples

### Basic Commands
```
list                    # List all models
ps                      # Show running models
help                    # Show help
--version              # Show version
```

### Model Management
```
pull llama2            # Download llama2 model
show llama2            # Show model information
run llama2             # Run model interactively
stop llama2            # Stop running model
rm llama2              # Remove model
```

### Advanced Commands
```
help serve             # Get help for serve command
help pull              # Get help for pull command
create mymodel -f ./Modelfile  # Create custom model
cp llama2 mymodel      # Copy model
```

## Technical Details

### Implementation
- Located in `MainController.java`
- Method: `showOllamaCommandRunnerDialog()`
- Uses `ProcessBuilder` to execute commands
- Runs commands in background threads
- Updates UI on JavaFX Application Thread

### Command Execution
- Commands are executed as: `cmd /c ollama [command]`
- Output is captured in real-time
- Both stdout and stderr are displayed
- Exit codes are shown for debugging

### Error Handling
- Shows error messages if Ollama is not installed
- Displays PATH-related issues
- Handles command execution failures gracefully

## Requirements
- Ollama must be installed and in system PATH
- Windows environment (uses `cmd /c`)
- JavaFX application running

## Benefits
1. **Convenience**: No need to switch to terminal
2. **Discovery**: See all available commands in one place
3. **Real-time feedback**: Watch command output as it happens
4. **Quick access**: Pre-configured buttons for common tasks
5. **Complete interface**: Access to all Ollama functionality

## Integration
This feature integrates with the existing Ollama menu items in the Options menu, providing a more comprehensive command interface while maintaining the specific action handlers for common operations.