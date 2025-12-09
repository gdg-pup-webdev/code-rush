# Code Rush

> **Code. Create. Conquer.**
> The ultimate campus CSS showdown by GDG On Campus PUP.

Code Rush is an interactive, competitive coding platform designed to test and sharpen CSS skills. Participants race against the clock to arrange code blocks, match designs, and build layouts using modern CSS techniques. It combines the thrill of a speed run with the intricacies of web design.

## 🚀 Features

-   **Interactive Challenges**: Drag, drop, and configure CSS properties to solve layout puzzles.
-   **Real-time Preview**: Visualize your code's output instantly as you build.
-   **Speed Runs**: Compete for the fastest completion times and climb the leaderboards.
-   **Dynamic Visuals**: A polished, responsive interface featuring layout animations and bouncy geometric elements.
-   **Live Leaderboards**: Track rankings and scores in real-time.

## 🛠️ Tech Stack

Built with modern web technologies for performance and developer experience:

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Interactivity**: [dnd-kit](https://dndkit.com/) for drag-and-drop mechanics
-   **Backend**: [Firebase](https://firebase.google.com/)

## 🏁 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (v18 or higher recommended)
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/gdg-pup-webdev/code-rush.git
    cd code-rush
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Environment Setup**
    This project uses Firebase. You will need to create a `.env` file in the root directory with your Firebase configuration keys.
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    # Add other necessary variables
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🧪 Usage

Once the server is running:
-   Navigate to the **Landing Page** to start.
-   Click **"Enter Arena"** or **"Start Challenge"** to begin the *Spark Rush* game mode.
-   Use the **Leaderboard** button to view current standings.

## 🆘 Support

If you encounter any issues or have questions, please [open an issue](https://github.com/gdg-pup-webdev/code-rush/issues) on GitHub.

## 👥 Maintainers

-   **GDG On Campus PUP** - *Core Team*

## 📄 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
