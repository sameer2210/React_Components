# React Components Library

A modern React component library featuring InputField and DataTable components built with React, TypeScript, and TailwindCSS.

## Features

### InputField Component

- **Multiple Variants**: Outlined, Filled, Ghost
- **Flexible Sizes**: Small, Medium, Large
- **Advanced States**: Loading, Error, Disabled
- **Enhanced UX**: Floating labels, clear button, password toggle
- **Full Validation**: Error messages, helper text, required fields
- **Accessibility**: ARIA labels and proper semantics
- **Dark Mode**: Full dark theme support

### DataTable Component

- **Interactive Sorting**: Click headers to sort data
- **Row Selection**: Single or multiple selection modes
- **Modern UI**: Hover effects, striped rows, clean borders
- **Responsive Design**: Horizontal scroll on mobile
- **Loading States**: Skeleton loading and empty states
- **Custom Rendering**: Support for custom cell renderers
- **Pagination**: Built-in pagination support
- **Sticky Headers**: Keep headers visible while scrolling
- **Dark Mode**: Seamless dark theme integration

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **TailwindCSS** - Utility-first styling
- **Storybook 7** - Component documentation
- **Vite** - Fast build tool
- **Heroicons & Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd react_components

# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook
```

## 🎯 Usage

### InputField Example

```tsx
import { InputField } from "./components/InputField";

function MyForm() {
  const [value, setValue] = useState("");

  return (
    <InputField
      label="Email"
      placeholder="Enter your email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="email"
      variant="outlined"
      size="md"
      clearable
      helperText="We'll never share your email"
      required
    />
  );
}
```

### DataTable Example

```tsx
import { DataTable } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

function UserTable() {
  const data: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Developer" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Designer" },
  ];

  const columns = [
    { key: "id", title: "ID", dataIndex: "id", sortable: true },
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email", sortable: true },
    { key: "role", title: "Role", dataIndex: "role" },
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      selectable="multiple"
      onRowSelect={(rows) => console.log("Selected:", rows)}
      hoverable
      striped
    />
  );
}
```

## 📚 Component APIs

### InputField Props

| Prop             | Type                                | Default      | Description             |
| ---------------- | ----------------------------------- | ------------ | ----------------------- |
| `value`          | `string`                            | `''`         | Input value             |
| `onChange`       | `function`                          | -            | Change handler          |
| `label`          | `string`                            | -            | Input label             |
| `placeholder`    | `string`                            | -            | Placeholder text        |
| `helperText`     | `string`                            | -            | Helper text below input |
| `errorMessage`   | `string`                            | -            | Error message           |
| `disabled`       | `boolean`                           | `false`      | Disable input           |
| `invalid`        | `boolean`                           | `false`      | Show error state        |
| `variant`        | `'outlined' \| 'filled' \| 'ghost'` | `'outlined'` | Input style variant     |
| `size`           | `'sm' \| 'md' \| 'lg'`              | `'md'`       | Input size              |
| `type`           | `string`                            | `'text'`     | Input type              |
| `clearable`      | `boolean`                           | `false`      | Show clear button       |
| `togglePassword` | `boolean`                           | `false`      | Show password toggle    |
| `loading`        | `boolean`                           | `false`      | Show loading state      |
| `required`       | `boolean`                           | `false`      | Mark as required        |

### DataTable Props

| Prop          | Type                                | Default | Description              |
| ------------- | ----------------------------------- | ------- | ------------------------ |
| `data`        | `T[]`                               | -       | Table data array         |
| `columns`     | `Column<T>[]`                       | -       | Column definitions       |
| `loading`     | `boolean`                           | `false` | Show loading state       |
| `selectable`  | `boolean \| 'single' \| 'multiple'` | `false` | Row selection mode       |
| `onRowSelect` | `function`                          | -       | Selection change handler |
| `size`        | `'sm' \| 'md' \| 'lg'`              | `'md'`  | Table size               |
| `bordered`    | `boolean`                           | `true`  | Show borders             |
| `striped`     | `boolean`                           | `true`  | Zebra striping           |
| `hoverable`   | `boolean`                           | `true`  | Row hover effects        |
| `sticky`      | `boolean`                           | `false` | Sticky header            |
| `maxHeight`   | `string \| number`                  | -       | Max table height         |
| `pagination`  | `object`                            | -       | Pagination config        |

## 🎨 Design System

### Color Palette

- **Primary**: Blue (500-600)
- **Success**: Green (500-600)
- **Warning**: Yellow/Amber (500-600)
- **Error**: Red (500-600)
- **Neutral**: Gray (50-900)

### Spacing Scale

- **Small**: 0.5rem (8px)
- **Medium**: 1rem (16px)
- **Large**: 1.5rem (24px)
- **XLarge**: 2rem (32px)

### Typography

- **Headings**: Font weight 600-700
- **Body**: Font weight 400-500
- **Small Text**: 0.875rem (14px)
- **Base Text**: 1rem (16px)

## 🌙 Dark Mode

Both components support dark mode out of the box. Simply add the `dark` class to your root element:

```html
<html class="dark">
  <!-- Your app -->
</html>
```

Or toggle programmatically:

```tsx
const toggleDarkMode = () => {
  document.documentElement.classList.toggle("dark");
};
```

## 📱 Responsive Design

Components are fully responsive:

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px)
- **Flexible**: Adapts to container width
- **Touch Friendly**: Proper touch targets

## ♿ Accessibility

- **Semantic HTML**: Proper HTML elements and structure
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators
- **Color Contrast**: WCAG AA compliant colors

## 📖 Storybook Documentation

Access comprehensive component documentation:

```bash
npm run storybook
```

Visit `http://localhost:6006` to explore:

- Interactive component playground
- All component variants and states
- Usage examples
- Props documentation
- Dark mode toggle

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy Storybook

```bash
npm run build-storybook
```

You can deploy the Storybook to platforms like:

- **Chromatic**: `npx chromatic --project-token=<token>`
- **Vercel**: Connect your repository
- **Netlify**: Drag and drop the `storybook-static` folder

## 📁 Project Structure

```
react_components/
├── src/
│   ├── components/
│   │   ├── InputField/
│   │   │   ├── InputField.tsx
│   │   │   ├── InputField.types.ts
│   │   │   ├── InputField.stories.tsx
│   │   │   └── index.ts
│   │   └── DataTable/
│   │       ├── DataTable.tsx
│   │       ├── DataTable.types.ts
│   │       ├── DataTable.stories.tsx
│   │       └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .storybook/
├── package.json
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests and stories
5. Submit a pull request

## 📄 License

MIT License - feel free to use in your projects!

## 🔧 Development Notes

- **TypeScript**: Strict mode enabled for better type safety
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (optional)

## 🚨 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Roadmap

- [ ] Add more input types (date, select, textarea)
- [ ] DataTable virtual scrolling for large datasets
- [ ] Form validation integration
- [ ] Animation presets
- [ ] Theme customization system
- [ ] Additional component variants

---

**Happy coding!** 🎉

react_components/
│
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
| |
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

<!-- json file -->

{
"name": "vite-project",
"private": true,
"version": "0.0.0",
"type": "module",
"scripts": {
"dev": "vite",
"build": "tsc -b && vite build",
"lint": "eslint .",
"preview": "vite preview",
"storybook": "storybook dev -p 6006",
"build-storybook": "storybook build"
},
"dependencies": {
"@tailwindcss/vite": "^4.1.12",
"lucide-react": "^0.539.0",
"react": "^19.1.1",
"react-dom": "^19.1.1",
"tailwindcss": "^4.1.12"
},
"devDependencies": {
"@eslint/js": "^9.33.0",
"@storybook/addon-docs": "^9.1.2",
"@storybook/react-vite": "^9.1.2",
"@types/react": "^19.1.10",
"@types/react-dom": "^19.1.7",
"@vitejs/plugin-react-swc": "^4.0.0",
"eslint": "^9.33.0",
"eslint-plugin-react-hooks": "^5.2.0",
"eslint-plugin-react-refresh": "^0.4.20",
"eslint-plugin-storybook": "^9.1.2",
"globals": "^16.3.0",
"storybook": "^9.1.2",
"typescript": "~5.8.3",
"typescript-eslint": "^8.39.1",
"vite": "^7.1.2"
}
}
