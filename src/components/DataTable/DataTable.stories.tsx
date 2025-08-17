import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './DataTable';
import { useState } from 'react';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible data table component with sorting, selection, pagination, and modern styling.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selectable: {
      control: 'select',
      options: [false, true, 'single', 'multiple'],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample data
const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 28, role: 'Developer', status: 'Active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 32, role: 'Designer', status: 'Active', joinDate: '2023-02-20' },
  { id: 3, name: 'Sam Wilson', email: 'sam@example.com', age: 25, role: 'Product Manager', status: 'Inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Lisa Brown', email: 'lisa@example.com', age: 29, role: 'Developer', status: 'Active', joinDate: '2023-04-05' },
  { id: 5, name: 'Mike Johnson', email: 'mike@example.com', age: 35, role: 'Team Lead', status: 'Active', joinDate: '2023-01-20' },
];

const basicColumns = [
  { key: 'id', title: 'ID', dataIndex: 'id' as keyof typeof sampleUsers[0], sortable: true, width: 80 },
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof typeof sampleUsers[0], sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof typeof sampleUsers[0], sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof typeof sampleUsers[0], sortable: true, width: 80 },
  { key: 'role', title: 'Role', dataIndex: 'role' as keyof typeof sampleUsers[0], sortable: true },
];

const enhancedColumns = [
  { key: 'id', title: 'ID', dataIndex: 'id' as keyof typeof sampleUsers[0], sortable: true, width: 80 },
  { 
    key: 'name', 
    title: 'Name', 
    dataIndex: 'name' as keyof typeof sampleUsers[0], 
    sortable: true,
    render: (value: string) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
          {value.split(' ').map(n => n[0]).join('')}
        </div>
        <span className="font-medium">{value}</span>
      </div>
    )
  },
  { key: 'email', title: 'Email', dataIndex: 'email' as keyof typeof sampleUsers[0], sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof typeof sampleUsers[0], sortable: true, width: 80, align: 'center' as const },
  { key: 'role', title: 'Role', dataIndex: 'role' as keyof typeof sampleUsers[0], sortable: true },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status' as keyof typeof sampleUsers[0],
    render: (value: string) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === 'Active' 
          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
          : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
      }`}>
        {value}
      </span>
    ),
  },
  {
    key: 'actions',
    title: 'Actions',
    dataIndex: 'id' as keyof typeof sampleUsers[0],
    align: 'center' as const,
    render: () => (
      <div className="flex items-center justify-center gap-2">
        <button className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    data: sampleUsers,
    columns: basicColumns,
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<typeof sampleUsers>([]);
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedRows.length} rows
          {selectedRows.length > 0 && (
            <span className="ml-2">
              ({selectedRows.map(row => row.name).join(', ')})
            </span>
          )}
        </div>
        <DataTable
          data={sampleUsers}
          columns={basicColumns}
          selectable="multiple"
          onRowSelect={setSelectedRows}
        />
      </div>
    );
  },
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<typeof sampleUsers>([]);
    
    return (
      <div className="space-y-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Selected: {selectedRows.length > 0 ? selectedRows[0].name : 'None'}
        </div>
        <DataTable
          data={sampleUsers}
          columns={basicColumns}
          selectable="single"
          onRowSelect={setSelectedRows}
        />
      </div>
    );
  },
};

export const Enhanced: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<typeof sampleUsers>([]);
    
    return (
      <DataTable
        data={sampleUsers}
        columns={enhancedColumns}
        selectable="multiple"
        onRowSelect={setSelectedRows}
        hoverable
        striped
        onRowClick={(record) => console.log('Row clicked:', record)}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={basicColumns}
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium (Default)</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={basicColumns}
          size="md"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large</h3>
        <DataTable
          data={sampleUsers.slice(0, 3)}
          columns={basicColumns}
          size="lg"
        />
      </div>
    </div>
  ),
};

export const Loading: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: false,
  },
};

export const CustomEmpty: Story = {
  args: {
    data: [],
    columns: basicColumns,
    loading: false,
    emptyText: (
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-gray-500 font-medium">No users found</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</p>
      </div>
    ),
  },
};

export const WithPagination: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    
    // Generate more data for pagination demo
    const largeDataset = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 30),
      role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
      status: i % 3 === 0 ? 'Inactive' : 'Active',
      joinDate: `2023-${String(Math.floor(i / 2) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    }));

    const paginationConfig = {
      current: currentPage,
      pageSize,
      total: largeDataset.length,
      onChange: (page: number, size: number) => {
        setCurrentPage(page);
      },
    };

    return (
      <DataTable
        data={largeDataset}
        columns={enhancedColumns}
        selectable="multiple"
        pagination={paginationConfig}
        onRowSelect={(rows) => console.log('Selected:', rows.length, 'rows')}
      />
    );
  },
};

export const StickyHeader: Story = {
  args: {
    data: Array.from({ length: 20 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 30),
      role: ['Developer', 'Designer', 'Manager', 'Analyst'][i % 4],
      status: i % 3 === 0 ? 'Inactive' : 'Active',
      joinDate: `2023-${String(Math.floor(i / 2) + 1).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')}`,
    })),
    columns: enhancedColumns,
    maxHeight: '400px',
    sticky: true,
    selectable: 'multiple',
  },
};

export const DarkMode: Story = {
  render: () => (
    <div className="dark bg-gray-900 p-6 rounded-lg">
      <DataTable
        data={sampleUsers}
        columns={enhancedColumns}
        selectable="multiple"
        hoverable
        striped
      />
    </div>
  ),
};