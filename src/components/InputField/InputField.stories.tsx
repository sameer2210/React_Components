import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import { useState } from 'react';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, variants, and modern styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

// Interactive wrapper for stories that need state
const InteractiveWrapper = ({ children, ...args }: any) => {
  const [value, setValue] = useState(args.value || '');
  return children({
    ...args,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  });
};

export const Default: Story = {
  render: (args) => (
    <InteractiveWrapper {...args}>
      {(props: any) => <InputField {...props} />}
    </InteractiveWrapper>
  ),
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    helperText: 'This field is required',
  },
};

export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({ outlined: '', filled: '', ghost: '' });
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          variant="outlined"
          label="Outlined"
          placeholder="Outlined variant"
          value={values.outlined}
          onChange={(e) => setValues(prev => ({ ...prev, outlined: e.target.value }))}
        />
        <InputField
          variant="filled"
          label="Filled"
          placeholder="Filled variant"
          value={values.filled}
          onChange={(e) => setValues(prev => ({ ...prev, filled: e.target.value }))}
        />
        <InputField
          variant="ghost"
          label="Ghost"
          placeholder="Ghost variant"
          value={values.ghost}
          onChange={(e) => setValues(prev => ({ ...prev, ghost: e.target.value }))}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [values, setValues] = useState({ sm: '', md: '', lg: '' });
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          size="sm"
          label="Small"
          placeholder="Small size"
          value={values.sm}
          onChange={(e) => setValues(prev => ({ ...prev, sm: e.target.value }))}
        />
        <InputField
          size="md"
          label="Medium"
          placeholder="Medium size (default)"
          value={values.md}
          onChange={(e) => setValues(prev => ({ ...prev, md: e.target.value }))}
        />
        <InputField
          size="lg"
          label="Large"
          placeholder="Large size"
          value={values.lg}
          onChange={(e) => setValues(prev => ({ ...prev, lg: e.target.value }))}
        />
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [values, setValues] = useState({ 
      normal: '', 
      error: 'invalid@', 
      disabled: 'Disabled value',
      loading: 'Loading...'
    });
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          label="Normal"
          placeholder="Normal state"
          value={values.normal}
          onChange={(e) => setValues(prev => ({ ...prev, normal: e.target.value }))}
          helperText="This is helper text"
        />
        <InputField
          label="Error"
          placeholder="Error state"
          value={values.error}
          onChange={(e) => setValues(prev => ({ ...prev, error: e.target.value }))}
          errorMessage="Please enter a valid email"
          invalid
        />
        <InputField
          label="Disabled"
          placeholder="Disabled state"
          value={values.disabled}
          onChange={(e) => setValues(prev => ({ ...prev, disabled: e.target.value }))}
          disabled
          helperText="This field is disabled"
        />
        <InputField
          label="Loading"
          placeholder="Loading state"
          value={values.loading}
          onChange={(e) => setValues(prev => ({ ...prev, loading: e.target.value }))}
          loading
          helperText="Processing..."
        />
      </div>
    );
  },
};

export const WithFeatures: Story = {
  render: () => {
    const [values, setValues] = useState({ 
      clearable: 'Clear me', 
      password: 'secret123'
    });
    
    return (
      <div className="space-y-4 w-80">
        <InputField
          label="Clearable"
          placeholder="Type something..."
          value={values.clearable}
          onChange={(e) => setValues(prev => ({ ...prev, clearable: e.target.value }))}
          clearable
          helperText="Click X to clear"
        />
        <InputField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={values.password}
          onChange={(e) => setValues(prev => ({ ...prev, password: e.target.value }))}
          togglePassword
          helperText="Click eye to toggle visibility"
        />
      </div>
    );
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
      const newErrors: Record<string, string> = {};
      
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validateForm()) {
        alert('Form submitted successfully!');
      }
    };

    const updateField = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-80 p-6 bg-white dark:bg-gray-900 rounded-lg border">
        <h3 className="text-lg font-semibold mb-4">Registration Form</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            errorMessage={errors.firstName}
            required
          />
          <InputField
            label="Last Name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateField('lastName', e.target.value)}
            errorMessage={errors.lastName}
            required
          />
        </div>
        
        <InputField
          label="Email"
          placeholder="john.doe@example.com"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          errorMessage={errors.email}
          required
          clearable
        />
        
        <InputField
          label="Password"
          placeholder="Enter password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          errorMessage={errors.password}
          required
          togglePassword
        />
        
        <InputField
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => updateField('confirmPassword', e.target.value)}
          errorMessage={errors.confirmPassword}
          required
          togglePassword
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Register
        </button>
      </form>
    );
  },
};

export const DarkMode: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    return (
      <div className="dark bg-gray-900 p-6 rounded-lg">
        <InputField
          label="Dark Mode Input"
          placeholder="Type in dark mode"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          clearable
          helperText="This input is in dark mode"
        />
      </div>
    );
  },
};
