# My Interactive Developer Portfolio 🚀

Welcome to the repository for my personal portfolio! This isn't just a list of projects; it's a fully interactive experience built with **Next.js** and brought to life with **Framer Motion**. The entire design is a nod to the developer's world: the 'About Me' section is a terminal, the 'Projects' are displayed in an IDE-like interface, and the 'Contact' form is styled as a GitHub pull request.

The portfolio is designed to be **silky-smooth**, **fully responsive**, and **data-driven**, making content updates a breeze.

### ✨ Live Demo ✨
Visit my portfolio at: **https://faizanahmed0107.github.io**

---

## Key Features 🎯

* **Interactive UI**: A unique, developer-centric theme that makes browsing fun.
    * **Terminal About Section**: Get to know me through a simulated terminal interface.
    * **IDE Projects Showcase**: Explore my work within a familiar code editor layout.
    * **Pull Request Contact Form**: Send me a message by "opening a pull request."
* **Fluid Animations**: Powered by **Framer Motion** for a seamless and engaging user experience.
* **JSON-Driven Content**: All personal data, project details, and skills are fetched from a single JSON file. No need to dig through code to update your info!
* **Fully Responsive**: Looks and works great on all devices, from mobile phones to desktops.
* **Built with Modern Tech**: Crafted with the latest features of **Next.js 14** (App Router), **TypeScript**, and styled with **Tailwind CSS**.

---

## Tech Stack 🛠️

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

---

## Getting Started 🏁

You can easily clone and run this portfolio locally.

### Prerequisites

Make sure you have Node.js (v18.x or later) and npm/yarn/pnpm installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/FaizanAhmed0107/FaizanAhmed0107.git][(https://github.com/your-username/your-repo-name.git](https://github.com/FaizanAhmed0107/FaizanAhmed0107.git))
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## Easy Customization ✏️

One of the best features of this portfolio is how easy it is to make it your own. All the text, project details, links, and skills are managed in one central file.

**Simply edit `src/data/portfolioData.json` to update the content.**

The structure of the JSON is self-explanatory. Modify the values, save the file, and your portfolio will update automatically in development mode.

```json
  {
    "personalInfo": {
      "name": "Your Name",
      "title": "Software Developer",
      "bio": "A short and catchy bio about yourself."
    },
    "projects": [
      {
        "id": 1,
        "title": "My Awesome Project",
        "description": "This is a description of my project.",
        "tags": ["Next.js", "TypeScript", "Tailwind CSS"],
        "liveUrl": "https://...",
        "repoUrl": "https://..."
      }
    ],
    "skills": [
      "JavaScript", "React", "Node.js"
    ]
  }
```

---

###Contact

Feel free to reach out to me for collaborations or job opportunities:

* Email: faizanahmed0107@gmail.com
* LinkedIn: [www.linkedin.com/in/faizan-ahmed-a947791b0](https://www.linkedin.com/in/faizan-ahmed-a947791b0)
