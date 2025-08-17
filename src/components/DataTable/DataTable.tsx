import React, { useState } from "react";
import type { DataTableProps, Column } from "./DataTable.types";
import { Loader2 } from "lucide-react";

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);

  const toggleRow = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter(r => r !== row);
    } else {
      updated = selectable === "single" ? [row] : [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];
      if (valA! < valB!) return direction === "asc" ? -1 : 1;
      if (valA! > valB!) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === col.key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.key, direction });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (!data.length) {
    return <p className="p-4 text-center text-gray-500">No data available</p>;
  }

  return (
    <div className="overflow-x-auto border rounded-xl shadow-sm bg-white dark:bg-gray-800">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            {selectable && <th className="p-3"></th>}
            {columns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`p-3 font-semibold text-gray-700 dark:text-gray-200 ${
                  col.sortable ? "cursor-pointer hover:underline" : ""
                }`}
              >
                {col.title}
                {sortConfig?.key === col.key && (
                  <span className="ml-1 text-xs">
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                selectedRows.includes(row) ? "bg-blue-50 dark:bg-blue-900/30" : ""
              }`}
            >
              {selectable && (
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}
              {columns.map(col => (
                <td key={col.key} className="p-3 text-gray-800 dark:text-gray-100">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
