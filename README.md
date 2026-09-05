# Code Rush

[![Status: Archive](https://img.shields.io/badge/Status-Archive-lightgrey)](docs/state.md)
[![Stack: Next.js](https://img.shields.io/badge/Stack-Next.js-black)](#about)
[![FMD philosophy: 1.31.0](https://img.shields.io/badge/FMD%20philosophy-1.31.0-blue)](AGENTS.md)


> **Code. Create. Conquer.**
> The ultimate campus CSS showdown by GDG On Campus PUP.

Code Rush is an interactive, competitive coding platform designed to test and sharpen CSS skills. Participants race against the clock to arrange code blocks, match designs, and build layouts using modern CSS techniques. It combines the thrill of a speed run with the intricacies of web design.

## Table of Contents

- [About](#about)
- [Start here](#start-here)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick start](#quick-start)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributors](#contributors)
- [Support](#support)
- [License](#license)

## About

Code Rush is GDG On Campus PUP's competitive CSS arena. Participants race against the clock to arrange code blocks, match designs, and build layouts. Built for campus showdowns where speed and visual accuracy both score.

## Start here

- **Humans:** this README, then [docs/state.md](docs/state.md)
- **Agents:** [AGENTS.md](AGENTS.md) (state → index → FLAGS)
- **Contributors:** table below

## Features

- **Interactive Challenges**: Drag, drop, and configure CSS properties to solve layout puzzles.
- **Real-time Preview**: Visualize your code's output instantly as you build.
- **Speed Runs**: Compete for the fastest completion times and climb the leaderboards.
- **Dynamic Visuals**: A polished, responsive interface featuring layout animations and bouncy geometric elements.
- **Live Leaderboards**: Track rankings and scores in real-time.

## Tech Stack

Built with modern web technologies for performance and developer experience:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Interactivity**: [dnd-kit](https://dndkit.com/) for drag-and-drop mechanics
- **Backend**: [Firebase](https://firebase.google.com/)

## Quick start

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/gdg-pup-webdev/code-rush.git
    cd code-rush
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Environment Setup**
    This project uses Firebase. Create a `.env` file in the root directory with your Firebase configuration keys. Point at [FLAGS.md](FLAGS.md) / [docs/state.md](docs/state.md) for secrets posture.
    ```env
    NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
    # Add other necessary variables
    ```

4. **Run the development server**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

Once the server is running:
- Navigate to the **Landing Page** to start.
- Click **"Enter Arena"** or **"Start Challenge"** to begin the *Spark Rush* game mode.
- Use the **Leaderboard** button to view current standings.

## Documentation

| Doc | Purpose |
|-----|---------|
| [State](docs/state.md) | Operating position / handover |
| [Index](docs/index.md) | Doc inventory |
| [FLAGS](FLAGS.md) | Improvement register |
| [AGENTS](AGENTS.md) | Agent load order |

## Contributors

This project is made possible by the GDG PUP community.

| Name | Role | GitHub |
| --- | --- | --- |
| [Carlos Jerico Dela Torre](https://www.linkedin.com/in/delatorrecj) | Chief Technology Officer (2025-2026) | [@delatorrecj](https://github.com/delatorrecj) |
| [Erwin Daguinotas](https://www.linkedin.com/in/erwin-daguinotas) | Web Development Lead | [@SauceCode01](https://github.com/SauceCode01) |
| [Gerald Berongoy](https://www.linkedin.com/in/geraldberongoy) | Senior Backend Developer / Web Development Learning Head | [@geraldsberongoy](https://github.com/geraldsberongoy) |

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/gdg-pup-webdev/code-rush/issues) on GitHub.

Maintainers: **GDG On Campus PUP** Core Team.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.
