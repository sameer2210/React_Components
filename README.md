# React Components Project

This project contains reusable React components.

## Getting Started

1. **Install dependencies**

   ```
   npm install
   ```

2. **Run the development server**
   ```
   npm start
   ```

## Project Structure

- `src/components/` - Reusable React components
- `src/App.tsx` - Main application component
- `public/` - Static files

## Scripts

- `npm start` - Start development server
- `npm run build` - Build for production

## License

MIT
react_components/
│
├── node_modules/
├── public/ # static assets (optional for Vite)
│
├── src/
│ ├── components/ # all reusable UI components
│ │ └── InputField/
│ │ ├── InputField.tsx
│ │ ├── InputField.types.ts
│ │ ├── InputField.stories.tsx # if you're using Storybook
│ │ ├── index.ts # re-export for easy imports
│ │
│ ├── App.tsx # main app entry
│ ├── main.tsx # Vite entry point
│ ├── index.css # global styles
│ └── vite-env.d.ts # Vite types
│
├── .gitignore
├── eslint.config.js
├── index.html # Vite root HTML
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
