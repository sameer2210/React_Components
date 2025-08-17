import React, { useState } from "react";
import { InputField } from "./components/InputField";


function App() {
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-stone-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-gray-100">
          InputField Component Demo
        </h1>

        {/* Default input */}
        <InputField
          label="Name"
          placeholder="Enter your name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          helperText="This is a helper text"
        />

        {/* Invalid input */}
        <InputField
          label="Email"
          placeholder="Enter your email"
          errorMessage="Invalid email address"
          invalid
        />

        {/* Disabled input */}
        <InputField
          label="Username"
          placeholder="Disabled field"
          disabled
        />

        {/* Variants */}
        <InputField
          label="Outlined"
          placeholder="Outlined variant"
          variant="outlined"
        />

        <InputField
          label="Ghost"
          placeholder="Ghost variant"
          variant="ghost"
        />

        {/* Sizes */}
        <InputField
          label="Small Input"
          placeholder="Small size"
          size="sm"
        />
        <InputField
          label="Large Input"
          placeholder="Large size"
          size="lg"
        />
      </div>
    </div>
  );
}

export default App;
