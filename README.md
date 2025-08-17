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

react_components/
│
├── node_modules/
├── public/ # static assets (favicon, images, etc.)
│
├── src/
│ ├── components/ # all reusable UI components
│ │ └── InputField/
│ │ ├── InputField.tsx
│ │ ├── InputField.types.ts
│ │ ├── index.ts # re-export for easy imports
│ │
│ ├── pages/ # app pages
│ │ ├── Demo.tsx # InputField demo playground
│ │ ├── About.tsx # example About page
│ │ └── Contact.tsx # example Contact page
│ │
│ ├── App.tsx # main app entry (imports pages)
│ ├── main.tsx # Vite entry point
│ ├── index.css # global styles (Tailwind)
│ └── vite-env.d.ts # Vite TS types
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
