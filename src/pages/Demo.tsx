// src/pages/Demo.tsx
import React, { useState } from 'react';
import { InputField } from '../components/InputField';
import { Sun, Moon } from 'lucide-react';

const Demo = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    search: ''
  });

  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-100'
    }`}>
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header with Dark Mode Toggle */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                InputField Component
              </h1>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Clean, simple, and accessible input fields
              </p>
            </div>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' 
                  : 'bg-white border-gray-200 hover:bg-gray-50'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>

          <div className={`rounded-2xl shadow-xl p-8 transition-colors duration-300 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Inputs */}
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold border-b pb-2 ${
                  darkMode 
                    ? 'text-gray-200 border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Basic Examples
                </h3>
                
                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={values.name}
                    onChange={handleChange('name')}
                    helperText="This will be displayed publicly"
                    required
                    clearable
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Email Address"
                    type="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange('email')}
                    invalid={!!values.email && !values.email.includes('@')}
                    errorMessage="Please enter a valid email address"
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    value={values.password}
                    onChange={handleChange('password')}
                    helperText="Must be at least 8 characters"
                  />
                </div>
              </div>

              {/* Variants & States */}
              <div className="space-y-6">
                <h3 className={`text-lg font-semibold border-b pb-2 ${
                  darkMode 
                    ? 'text-gray-200 border-gray-600' 
                    : 'text-gray-800 border-gray-200'
                }`}>
                  Variants & States
                </h3>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Outlined (Default)"
                    placeholder="Default outlined style"
                    variant="outlined"
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Filled Style"
                    placeholder="Filled background style"
                    variant="filled"
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Ghost Style"
                    placeholder="Minimal ghost style"
                    variant="ghost"
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Loading State"
                    placeholder="Processing..."
                    loading={true}
                    value="Some content"
                  />
                </div>

                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Disabled Field"
                    placeholder="This field is disabled"
                    disabled={true}
                    value="Disabled content"
                  />
                </div>
              </div>
            </div>

            {/* Size Examples */}
            <div className={`mt-8 pt-6 border-t ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-gray-200' : 'text-gray-800'
              }`}>
                Different Sizes
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Small"
                    size="sm"
                    placeholder="Small input"
                    value={values.search}
                    onChange={handleChange('search')}
                    clearable
                  />
                </div>
                
                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Medium"
                    size="md"
                    placeholder="Medium input (default)"
                  />
                </div>
                
                <div className={darkMode ? 'dark' : ''}>
                  <InputField
                    label="Large"
                    size="lg"
                    placeholder="Large input"
                  />
                </div>
              </div>
            </div>

            {/* Theme Info */}
            <div className={`mt-8 pt-6 border-t text-center ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Current theme: <span className="font-semibold">{darkMode ? 'Dark' : 'Light'}</span> mode
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;