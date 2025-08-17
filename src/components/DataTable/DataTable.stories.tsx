import type { Meta, StoryObj } from "@storybook/react-vite";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof DataTable>;

const sampleData = [
  { id: 1, name: "John Doe", age: 25, role: "Developer" },
  { id: 2, name: "Jane Smith", age: 30, role: "Designer" },
  { id: 3, name: "Sam Wilson", age: 28, role: "Product Manager" },
];

const sampleColumns = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "role", title: "Role", dataIndex: "role" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: sampleColumns,
  },
};

export const LargeData: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + (i % 10),
      role: i % 2 === 0 ? "Developer" : "Designer",
    })),
    columns: sampleColumns,
  },
};
