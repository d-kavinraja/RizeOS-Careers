<br/>
<div align="center">

  <h1 align="center">RizeOS Career Platform</h1>

  <p align="center">
    A next-generation, Web3-enabled career platform combining AI-powered job matching with the transparency of blockchain technology.
    <br />
    <a href="https://github.com/d-kavinraja/RizeOS-Careers"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://rize-os-careers.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/d-kavinraja/RizeOS-Careers/issues">Report Bug</a>
    ·
    <a href="https://github.com/d-kavinraja/RizeOS-Careers/issues">Request Feature</a>
  </p>
</div>

<div align="center">

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://rize-os-careers.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-blue?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## About The Project

**RizeOS Careers** is a full-stack Web3 career platform designed to bridge the gap between talented professionals and innovative companies. It leverages the power of Google's Gemini AI for intelligent resume parsing and job matching, while integrating blockchain technology for secure and transparent job postings.

This project was built as a comprehensive submission for the **RizeOS Core Team Intern** position, showcasing expertise in modern web development, AI integration, Web3 protocols, and product strategy.

### Key Features

-   ✅ **AI-Powered Matching:** Utilizes the Gemini API for deep resume analysis, skill extraction, and calculating compatibility scores between candidates and job postings.
-   ✅ **Web3 Integration:** Connects with MetaMask wallets for secure, on-chain payments (0.001 ETH) for job postings, ensuring authenticity and reducing spam.
-   ✅ **Robust Authentication:** Secure, JWT-based authentication system for users and employers.
-   ✅ **Comprehensive Job Board:** Full CRUD functionality for job listings with advanced search and filtering.
-   ✅ **Professional Social Feed:** A built-in networking platform for users to share content and connect with peers.
-   ✅ **Interactive User Dashboard:** A personalized space for users to manage their profile, track applications, and view insights, complete with 3D visuals using React Three Fiber.
-   ✅ **Mobile-First Responsive Design:** A seamless experience across all devices, from mobile phones to desktops.

---

## Technology Stack

This project is built with a modern, scalable, and powerful technology stack.

<details>
  <summary><strong>Frontend</strong></summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js 14</a></li>
    <li><a href="https://react.dev/">React.js</a></li>
    <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
    <li><a href="https://tailwindcss.com/">Tailwind CSS</a></li>
    <li><a href="https://www.radix-ui.com/">Radix UI</a></li>
    <li><a href="https://docs.pmnd.rs/react-three-fiber/getting-started/introduction">React Three Fiber</a></li>
  </ul>
</details>

<details>
  <summary><strong>Backend & API</strong></summary>
  <ul>
    <li><a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers">Next.js API Routes</a></li>
    <li><a href="https://jwt.io/">JSON Web Tokens (JWT)</a></li>
  </ul>
</details>

<details>
  <summary><strong>AI & Web3</strong></summary>
  <ul>
    <li><a href="https://ai.google.dev/">Google Gemini API</a></li>
    <li><a href="https://ethers.org/">Ethers.js</a></li>
    <li><a href="https://metamask.io/">MetaMask</a></li>
  </ul>
</details>

<details>
  <summary><strong>Database & Deployment</strong></summary>
  <ul>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
    <li><a href="https://vercel.com/">Vercel</a></li>
  </ul>
</details>

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Ensure you have the following installed on your machine:
* Node.js (v18 or later)
* `pnpm` package manager
    ```sh
    npm install -g pnpm
    ```
* A running PostgreSQL instance.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/d-kavinraja/RizeOS-Careers.git](https://github.com/d-kavinraja/RizeOS-Careers.git)
    cd RizeOS-Careers
    ```
2.  **Install dependencies:**
    ```sh
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add the necessary environment variables. You can use `.env.example` as a template.
    ```env
    # Example
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    # Add any other variables required for your setup
    ```
4.  **Run the development server:**
    ```sh
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

---

## API Endpoints

The application exposes a set of RESTful API endpoints for managing data and interacting with services.

| Endpoint                  | HTTP Method | Description                                      |
| ------------------------- | ----------- | ------------------------------------------------ |
| `/api/auth/register`      | `POST`      | Register a new user.                             |
| `/api/auth/login`         | `POST`      | Authenticate a user and return a JWT.            |
| `/api/jobs`               | `GET`       | Fetch all job listings with search/filter.       |
| `/api/jobs`               | `POST`      | Create a new job posting (requires auth).        |
| `/api/jobs/[id]`          | `GET`       | Get details for a specific job.                  |
| `/api/ai/parse-resume`    | `POST`      | Upload a resume for AI-powered parsing.          |
| `/api/ai/match-score`     | `POST`      | Calculate compatibility score for a job.         |
| `/api/posts`              | `GET`       | Fetch all posts from the social feed.            |
| `/api/posts`              | `POST`      | Create a new post (requires auth).               |

---

## Roadmap

This project has a clear vision for future development and expansion.

-   [ ] **Q1: Mobile App Development**
    -   [ ] Build a cross-platform mobile app using React Native.
-   [ ] **Q2: Advanced AI Features**
    -   [ ] Implement AI-driven salary prediction models.
    -   [ ] Introduce an AI career coach for personalized advice.
-   [ ] **Q3: NFT-Based Certification**
    -   [ ] Allow users to mint their skills and achievements as verifiable NFTs.
-   [ ] **Q4: Decentralized Governance**
    -   [ ] Launch a DAO for community-led platform decisions and governance.

See the [open issues](https://github.com/d-kavinraja/RizeOS-Careers/issues) for a full list of proposed features (and known issues).

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Contact

Project Link: [https://github.com/d-kavinraja/RizeOS-Careers](https://github.com/d-kavinraja/RizeOS-Careers)
