# EmotiCare - AI-Powered Mental Well-being App

EmotiCare is an empathetic, privacy-first web application designed to support your mental well-being journey. It provides a suite of tools powered by generative AI to help you reflect, understand your emotions, and find support when you need it. This project is built with Next.js by kaushik.

## About The Project

EmotiCare offers a safe and non-judgmental space for users to engage with their mental health. Key features include:

*   **AI Chat Companion**: A supportive, multilingual AI chatbot (informed by CBT principles) that you can talk to anytime.
*   **Multimodal Check-in**: A unique feature that analyzes your mood based on facial expressions, voice tone (simulated), and text input.
*   **Digital Journal**: A private journal where entries are analyzed by an AI to identify sentiment and mood patterns, helping you gain deeper self-awareness.
*   **Dashboard**: A personalized dashboard that visualizes your mood trends over time.
*   **Emergency Support**: A dedicated page with quick access to helplines and trusted contacts.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **AI/Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
*   **UI**: [React](https://react.dev/), [ShadCN UI](https://ui.shadcn.com/), [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

Follow these instructions to get a local copy up and running for development and testing.

### Prerequisites

You'll need the following software installed on your machine:

*   [Node.js](https://nodejs.org/en) (v18 or later is recommended)
*   [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation & Setup

1.  **Clone the repository** (if you have it on GitHub):
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2.  **Install dependencies**:
    Navigate to the project directory and run:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    For the AI features to work, you need a Google AI API key.
    *   Create a new file named `.env` in the root of your project.
    *   Add your API key to the `.env` file like this:
        ```env
        GEMINI_API_KEY=AIzaSy...your...api...key...here...
        ```
    *   You can get a free API key from [Google AI for Developers](https://ai.google.dev/).

### Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```

2.  **Open in your browser**:
    Once the server is running, open [http://localhost:9002](http://localhost:9002) to see the application.

You are now ready to explore and develop the EmotiCare application locally!

# 7thsem
