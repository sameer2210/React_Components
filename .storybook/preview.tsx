import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1f2937',
        },
      ],
    },
  },
  globalTypes: {
    darkMode: {
      description: 'Global dark mode for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Dark mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { darkMode } = context.globals;
      
      // Apply dark mode class to the story container
      if (darkMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return (
        <div className={`${darkMode === 'dark' ? 'dark' : ''}`}>
          <div className="bg-white dark:bg-stone-900 min-h-screen p-4 transition-colors">
            <Story />
          </div>
        </div>
      );
    },
  ],
};

export default preview;