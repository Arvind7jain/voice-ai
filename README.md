# Voice AI Pipeline with NestJS

A comprehensive solution for processing audio inputs using NestJS, converting speech to text (STT) with Whisper, processing the text using a language model (LLM) with OpenAI, and converting the response back to speech (TTS) using `gTTS` (Google Text-to-Speech) library.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Components](#key-components)
3. [Setup Instructions](#setup-instructions)
4. [Running the Project](#running-the-project)
5. [Configuration and Permissions](#configuration-and-permissions)
6. [Assumptions](#assumptions)

## Project Structure

```
voice-ai/
├── dist/                    # Compiled output
├── node_modules/            # Node.js modules
├── scripts/                 # Whisper transcribe script
│   ├── whisper_transcribe.py
├── src/                     # Source code
│   ├── audio/               # Audio-related files
│   │   ├── audio.controller.ts
│   │   ├── audio.module.ts
│   ├── stt/                 # Speech-to-Text service
│   │   ├── stt.service.ts
│   │   ├── stt.module.ts
│   ├── llm/                 # Language Model service
│   │   ├── llm.service.ts
│   │   ├── llm.module.ts
│   ├── tts/                 # Text-to-Speech service
│   │   ├── tts.service.ts
│   │   ├── tts.module.ts
│   ├── app.module.ts        # Root module
│   ├── main.ts              # Entry point
├── frontend/                # Frontend files
│   ├── audio-record.html
├── uploads/                 # Directory for uploaded audio files
├── .env                     # Environment configuration
├── package.json             # NPM dependencies and scripts
├── README.md                # Documentation
└── tsconfig.json            # TypeScript configuration
```

## Key Components

- **`audio/`:** Handles audio upload and processing.
  - `audio.controller.ts`: Manages incoming audio files and coordinates the STT, LLM, and TTS services.
  - `audio.module.ts`: Sets up the audio controller and dependencies.
  
- **`stt/`:** Manages Speech-to-Text conversion.
  - `stt.service.ts`: Uses the Whisper library for converting speech to text.
  - `stt.module.ts`: Sets up the STT service.
  
- **`llm/`:** Manages Language Model processing.
  - `llm.service.ts`: Uses the OpenAI API to generate responses based on text input.
  - `llm.module.ts`: Sets up the LLM service.
  
- **`tts/`:** Manages Text-to-Speech conversion.
  - `tts.service.ts`: Uses gTTS (Google Text-to-Speech) to convert text to speech.
  - `tts.module.ts`: Sets up the TTS service.
  
- **`frontend/`:** Contains the HTML and JavaScript for recording and uploading audio.

## Setup Instructions

### Prerequisites

- **Node.js** (version 14 or above)
- **npm**
- **ffmpeg**
- **Python** and **pip**
- **Whisper Model**

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Arvind7jain/voice-ai.git
   cd voice-ai
   ```

2. **Install Node.js Dependencies:**
   ```bash
   npm install
   ```

3. **Install Python Dependencies:**
   Before installing python dependencies make sure you setup python venv and activate it
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
   ```bash
   pip3 install gtts
   ```

5. **Download and Set Up Whisper Model:**
   ```bash
   pip3 install openai-whisper
   ```

6. **Create an `.env` File for Environment Variables:**
   ```bash
   echo "OPENAI_API_KEY=your-openai-api-key" > .env
   echo "PYTHON_PATH=local-venv-path-for-repo" > .env
   ```

## Running the Project

1. **Ensure the `uploads` Directory Exists:**
   ```bash
   mkdir uploads
   ```

2. **Start the NestJS Server:**
   ```bash
   npm run start
   ```

3. **Open the Frontend in Your Browser:**
   Open `frontend/audio-record.html` in your web browser.

## Configuration and Permissions

### Environment Variables

Create a `.env` file in the root of your project to store sensitive data like API keys:

```
PYTHON_PATH=local-venv-path-for-repo
OPENAI_API_KEY=your-openai-api-key
```

### Permissions

- Ensure you have permission to access the microphone in your web browser.
- Depending on your OS, ensure `ffmpeg` is correctly installed and accessible in your `PATH`.

## Assumptions

- **Local Development**: Assumes a local development environment where dependencies like Node.js, Python, and ffmpeg are installed.
- **Whisper Model**: Assumes you have downloaded and set up the Whisper model.
- **OpenAI API Key**: Assumes you have a valid OpenAI API key.
- **Uploads Directory**: Assumes an `uploads` directory exists for storing audio files.

## Known Issues and Debugging

### Common Errors

- **File Path Undefined**: Ensure the file upload interceptor is correctly configured.

### Debugging

- **Check Console Logs**: Both server and client-side logs for error messages.
- **Verify Environment Variables**: Ensure environment variables are correctly set.
