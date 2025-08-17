import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

// Define your User type here
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  role: string;
  status: string;
  joinDate: string;
  [key: string]: unknown;
}

const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    search: "",
  });

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const sampleData: User[] = [
    { 
      id: 1, 
      name: "Sameer Khan", 
      email: "sameer@example.com", 
      age: 28, 
      role: "Full Stack Developer", 
      status: "Active",
      joinDate: "2023-01-15"
    },
    { 
      id: 2, 
      name: "Aman Sharma", 
      email: "aman@example.com", 
      age: 32, 
      role: "UI/UX Designer", 
      status: "Active",
      joinDate: "2023-02-20"
    },
    { 
      id: 3, 
      name: "Priya Singh", 
      email: "priya@example.com", 
      age: 26, 
      role: "Product Manager", 
      status: "Inactive",
      joinDate: "2023-03-10"
    },
    { 
      id: 4, 
      name: "Raj Patel", 
      email: "raj@example.com", 
      age: 30, 
      role: "DevOps Engineer", 
      status: "Active",
      joinDate: "2023-04-05"
    },
    { 
      id: 5, 
      name: "Sneha Reddy", 
      email: "sneha@example.com", 
      age: 29, 
      role: "Data Analyst", 
      status: "Active",
      joinDate: "2023-01-20"
    }
  ];

  const columns = [
    { 
      key: "id", 
      title: "ID", 
      dataIndex: "id" as keyof User, 
      sortable: true, 
      width: 60 
    },
    { 
      key: "name", 
      title: "Name", 
      dataIndex: "name" as keyof User, 
      sortable: true,
      render: (value: string) => (
        <div className="flex items-center gap-3">
          <div className="px-2 py-1.5 bg-gradient-to-br from-teal-500 to-black rounded-full flex items-center justify-center text-white text-sm font-semibold">
            {value.split(' ').map(n => n[0]).join('')}
          </div>
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { 
      key: "email", 
      title: "Email", 
      dataIndex: "email" as keyof User, 
      sortable: true 
    },
    { 
      key: "age", 
      title: "Age", 
      dataIndex: "age" as keyof User, 
      sortable: true, 
      width: 80,
      align: "center" as const
    },
    { 
      key: "role", 
      title: "Role", 
      dataIndex: "role" as keyof User, 
      sortable: true 
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status" as keyof User,
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {value}
        </span>
      ),
    }
  ];

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredData = sampleData.filter(user => 
    user.name.toLowerCase().includes(formData.search.toLowerCase()) ||
    user.email.toLowerCase().includes(formData.search.toLowerCase()) ||
    user.role.toLowerCase().includes(formData.search.toLowerCase())
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                React Components Demo
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                InputField & DataTable Components
              </p>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5  text-yellow-400" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gray-100" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* InputField Demo Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                InputField Component
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Flexible input component with validation states and modern styling
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Input */}
              <div className="space-y-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Basic Examples
                </h3>
                
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  helperText="This field is required"
                  variant="outlined"
                  size="md"
                  required
                  clearable
                />

                <InputField
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  helperText="We'll never share your email"
                  variant="filled"
                  size="md"
                  clearable
                />

                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  helperText="Must be at least 8 characters"
                  variant="outlined"
                  size="md"
                  togglePassword
                />
              </div>

              {/* States Demo */}
              <div className="space-y-8 ">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  States & Variants
                </h3>
                
                <InputField
                  label="Error State"
                  placeholder="This has an error"
                  value="invalid@"
                  errorMessage="Please enter a valid email address"
                  variant="outlined"
                  invalid
                />

                <InputField
                  label="Loading State"
                  placeholder="Processing..."
                  value="Loading example"
                  variant="filled"
                  loading
                />

                <InputField
                  label="Disabled State"
                  placeholder="This is disabled"
                  value="Cannot edit this"
                  variant="outlined"
                  disabled
                  helperText="This field is read-only"
                />

                <InputField
                  label="Ghost Variant"
                  placeholder="Minimal styling"
                  variant="ghost"
                  helperText="Clean and minimal appearance"
                />
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Demo Section */}
        <section>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-soft-lg border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                DataTable Component
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Feature-rich data table with sorting, selection, and modern UI
              </p>
            </div>

            {/* Search Filter */}
            <div className="mb-8">
              <InputField
                label="Search Users"
                placeholder="Search by name, email, or role..."
                value={formData.search}
                onChange={(e) => updateField('search', e.target.value)}
                variant="outlined"
                size="md"
                clearable
              />
            </div>

            {/* Results Summary */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredData.length} of {sampleData.length} users
              </p>
            </div>

            {/* DataTable */}
            <DataTable<User>
              data={filteredData}
              columns={columns}
              loading={false}
              selectable="multiple" 
              onRowSelect={(rows) => {
                console.log("Selected users:", rows.map(r => r.name));
              }}
              hoverable
              striped
              onRowClick={(record) => {
                console.log("Clicked user:", record.name);
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
