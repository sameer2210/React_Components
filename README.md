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
|---.storybook
├── node_modules/
│
├── src/
│ ├── components/
│ │ ├── InputField/
│ │ │ ├── InputField.tsx
│ │ │ ├── InputField.types.ts
│ │ │ ├── InputField.stories.tsx
│ │ │ └── index.ts
│ │ │
│ │ ├── DataTable/
│ │ │ ├── DataTable.tsx
│ │ │ ├── DataTable.types.ts
│ │ │ ├── DataTable.stories.tsx
│ │ │ └── index.ts
│ │
│ ├── pages/
│ │ └── Demo.tsx
│ │
│ ├── App.tsx
│ ├── main.tsx
│ ├── index.css
│ └── vite-env.d.ts
│
├── .storybook/
│ ├── main.ts
│ └── preview.ts
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
