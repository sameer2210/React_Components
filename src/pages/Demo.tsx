import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { DataTable } from "../components/DataTable";
import { Sun, Moon } from "lucide-react";

const Demo = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "", search: "" });
  const [darkMode, setDarkMode] = useState(false);

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues(prev => ({ ...prev, [field]: e.target.value }));

  // DataTable demo data
  const columns = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email", sortable: true },
    { key: "role", title: "Role", dataIndex: "role" },
  ];
  const data = [
    { name: "Alice", email: "alice@example.com", role: "Admin" },
    { name: "Bob", email: "bob@example.com", role: "User" },
    { name: "Charlie", email: "charlie@example.com", role: "Editor" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      <div className="p-6 max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            Component Demo
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full border shadow bg-white dark:bg-gray-800"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </button>
        </div>

        {/* InputField Section */}
        <section className={`p-6 rounded-xl shadow bg-white dark:bg-gray-800`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            InputField Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Full Name" placeholder="Enter your name" value={values.name} onChange={handleChange("name")} clearable required />
            <InputField label="Email" type="email" placeholder="you@example.com" value={values.email} onChange={handleChange("email")} invalid={!!values.email && !values.email.includes("@")} errorMessage="Invalid email" />
            <InputField label="Password" type="password" placeholder="Enter password" value={values.password} onChange={handleChange("password")} />
            <InputField label="Loading" loading value="Processing..." />
          </div>
        </section>

        {/* DataTable Section */}
        <section className={`p-6 rounded-xl shadow bg-white dark:bg-gray-800`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
            DataTable Example
          </h2>
          <DataTable data={data} columns={columns} selectable="multiple" onRowSelect={(rows) => console.log("Selected:", rows)} />
        </section>
      </div>
    </div>
  );
};

export default Demo;
