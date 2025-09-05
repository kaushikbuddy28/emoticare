# EmotiCare - An AI-Powered Mental Wellness Companion

EmotiCare is an empathetic, privacy-first web application designed to support your mental well-being. It provides a suite of tools including a multimodal mood check-in, a digital journal with sentiment analysis, and a supportive AI chat companion based on CBT principles.

## Features

- **Multimodal Check-in:** Uses camera, microphone, and text input to provide a holistic mood prediction.
- **AI Chat Companion:** A supportive, non-judgmental space to talk, powered by AI.
- **Digital Journal:** A private space for your thoughts, with AI-powered analysis to help you understand mood patterns.
- **Mood Timeline:** Visualizes your emotional trends over time.
- **Emergency Support:** Provides quick access to helplines and trusted contacts.

## Tech Stack

- **Framework:** Next.js (App Router)
- **UI:** React, ShadCN UI, Tailwind CSS
- **Generative AI:** Google Gemini via Genkit
- **Language:** TypeScript

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18 or later is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies:**
   Using npm:
   ```bash
   npm install
   ```
   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root of your project by making a copy of the `.env.example` file.
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini API key to the `.env` file:
   ```
   GEMINI_API_KEY=YOUR_API_KEY_HERE
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the application.
