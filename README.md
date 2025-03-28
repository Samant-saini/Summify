# Summify
# Summify - Research Assistant Using Gemini API

Summify is a research assistant application that leverages the **Gemini API** to process and analyze text. It provides functionalities like text summarization and content-based suggestions using Gemini's powerful language models.

## Features
- Summarizes given text into a concise and meaningful format.
- Suggests related topics and further reading based on the input text.
- Utilizes **Google's Gemini API** for language understanding and text processing.

## Tech Stack
- **Spring Boot** - Backend framework
- **WebClient** - For making API calls
- **Jackson** - JSON parsing
- **Gemini API** - AI-powered text processing

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Java 17+
- Maven
- A **Gemini API Key** (Sign up at [Google AI](https://ai.google.dev/))

### Clone the Repository
```sh
git clone https://github.com/Samant-saini/Summify.git
cd Summify
```

### Configure API Keys
Update your `application.properties` file with your **Gemini API Key**:
```properties
gemini.api.url=https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=
gemini.api.key=YOUR_GEMINI_API_KEY
```

### Build and Run the Project
```sh
mvn clean install
mvn spring-boot:run
```

## Usage
### API Endpoints
#### **1. Process Content**
**Endpoint:** `POST /process`
- **Request Body:**
```json
{
  "operation": "summarize",
  "content": "Your text here."
}
```
- **Response:**
```json
{
  "summary": "Summarized text output."
}
```

#### **2. Suggest Content**
**Endpoint:** `POST /process`
- **Request Body:**
```json
{
  "operation": "suggest",
  "content": "Your text here."
}
```
- **Response:**
```json
{
  "suggestions": "Related topics and further readings."
}
```

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add new feature"`
4. Push to the branch: `git push origin feature-name`
5. Create a pull request.



