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

## Getting Started in Visual Studio Code

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v18 or later is recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/) for version control.
- [Visual Studio Code](https://code.visualstudio.com/) as your code editor.

### Installation & Setup

1.  **Clone the repository:**
    Open a terminal (or use the integrated terminal in VS Code: `View -> Terminal`) and run:
    ```bash
    git clone https://github.com/your-username/kaushik-emoticare.git
    cd kaushik-emoticare
    ```
    *(Replace `your-username/kaushik-emoticare` with your actual GitHub repository URL).*

2.  **Open in VS Code:**
    In the same terminal, type:
    ```bash
    code .
    ```
    This will open the project folder in Visual Studio Code.

3.  **Install dependencies:**
    In the VS Code terminal, install the required packages:
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    The application needs your Google Gemini API key to work.
    - Create a new file named `.env` in the root of your project.
    - Open the `.env` file and add your API key like this:
    ```
    GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    - Replace `YOUR_API_KEY_HERE` with the actual key you were provided: `AIzaSy...`

5.  **Run the development server:**
    In the VS Code terminal, start the app:
    ```bash
    npm run dev
    ```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the application running.

## Deployment to Vercel

Vercel is a platform from the creators of Next.js that makes it very easy to deploy your project.

1.  **Push your code to GitHub:**
    Make sure your latest code and your `.env` file (with the real API key) are saved locally. Commit and push your changes to your GitHub repository.

2.  **Create a Vercel Account:**
    - Go to [vercel.com](https://vercel.com/) and sign up, preferably using your GitHub account.

3.  **Import Project:**
    - On your Vercel dashboard, click "Add New... > Project".
    - Find your `kaushik-emoticare` repository and click "Import".

4.  **Configure Project:**
    - Vercel will automatically detect that it's a Next.js project. You don't need to change the build settings.
    - **Crucially**, you must add your environment variable. Expand the "Environment Variables" section.
    - For the **Name**, enter `GEMINI_API_KEY`.
    - For the **Value**, paste your actual API key (`AIzaSy...`).
    - Click "Add".

5.  **Deploy:**
    - Click the "Deploy" button. Vercel will now build and deploy your application.
    - Once it's finished, you'll be given a public URL where you can see your live application. Vercel will automatically redeploy the site every time you push new code to your `main` branch on GitHub.
