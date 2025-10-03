# Project Overview

This project is a web application built with React, TypeScript, and Vite. It is migrated from a tool called Stitch with the original design files in the `designs` folder.

## Stitch Import

The files in the `designs` folder (.stitch) files are the design imports from Stitch which allows users to turn simple prompt and image inputs into complex UI designs and frontend code in minutes.

These `.stitch` files are in HTML/CSS/JS.


## Guidelines for migration to React app

When asked to migrate Stitch designs to the react app, follow these guidelines

1. Keep the original styling as is (migrate the tailwind classes as is)
2. Copy any links fonts.googleapis.com/css2?display=swap directly to index.html
3. If there are multiple screens in the `designs` folder, use React Router to support multiple pages.

## Environment Guidelines

This is a Firebase Studio workspace. It has a working preview of the react app that runs `npm run dev` and any changes made to the app are visible instantly. Don't run `npm install` unless any changes are made to package.json

## Key Technologies

*   **Framework:** React 19
*   **Language:** TypeScript 5.8
*   **CSS:** Tailwind CSS
*   **Build Tool:** Vite 6.3
*   **Routing:** React Router 7.7
*   **Package Manager:** npm

# Development Conventions

*   **Component-Based Architecture:** The project follows a component-based architecture, with components located in the `src/components` directory.
*   **Routing:** Routing is handled by `react-router`, with routes defined in `src/main.tsx`.
*   **Styling:** Tailwind CSS is the preferred way to style UI
*   **File Naming:** Components use PascalCase (e.g., `HomePage.tsx`), while other files use camelCase or kebab-case.
