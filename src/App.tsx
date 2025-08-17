import React, { useState } from "react";
import {InputField} from "./components/InputField";
import {DataTable} from "./components/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const App = () => {
  const [value, setValue] = useState("");
  const data: User[] = [
    { id: 1, name: "Sameer Khan", email: "sameer@example.com" },
    { id: 2, name: "Aman Sharma", email: "aman@example.com" },
  ];

  const columns = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email", sortable: true },
  ];

  return (
    <div className="p-6 space-y-6">
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="This is a helper text"
        errorMessage={value === "" ? "Required field" : undefined}
        variant="outlined"
        size="md"
      />

      <DataTable
        data={data}
        columns={columns}
        loading={false}
        selectable="multiple"
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
};

export default App;
