import { useState, useMemo } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { Loader2, Database } from 'lucide-react';
import type { DataTableProps, Column } from './DataTable.types';

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  onSort,
  pagination,
  rowKey = 'id',
  size = 'md',
  bordered = true,
  striped = true,
  hoverable = true,
  sticky = false,
  maxHeight,
  emptyText,
  className = '',
  onRowClick,
  onRowDoubleClick,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ 
    key: string; 
    direction: 'asc' | 'desc' 
  } | null>(null);

  // Size configurations
  const sizeClasses = {
    sm: {
      cell: 'px-3 py-2 text-sm',
      header: 'px-3 py-3 text-xs font-semibold',
      checkbox: 'w-4 h-4'
    },
    md: {
      cell: 'px-4 py-3 text-sm',
      header: 'px-4 py-4 text-sm font-semibold',
      checkbox: 'w-4 h-4'
    },
    lg: {
      cell: 'px-6 py-4 text-base',
      header: 'px-6 py-5 text-sm font-semibold',
      checkbox: 'w-5 h-5'
    }
  };

  const currentSize = sizeClasses[size];

  // Get row key - Fixed the typing issue
  const getRowKey = (row: T): string => {
    if (typeof rowKey === 'function') {
      return String((rowKey as (row: T) => string | number)(row));
    }
    // Ensure rowKey is treated as a valid key of T
    const key = rowKey as keyof T;
    return String(row[key] ?? '');
  };

  // Handle row selection - Fixed the selectable comparison issue
  const handleRowSelect = (row: T, checked: boolean) => {
    let newSelectedRows: T[];

    if (selectable === 'single') {
      newSelectedRows = checked ? [row] : [];
    } else if (selectable === true || selectable === 'multiple') {
      if (checked) {
        newSelectedRows = [...selectedRows, row];
      } else {
        newSelectedRows = selectedRows.filter(r => getRowKey(r) !== getRowKey(row));
      }
    } else {
      // selectable is false, do nothing
      return;
    }

    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle select all - Only show when selectable is true or 'multiple'
  const handleSelectAll = (checked: boolean) => {
    if (selectable === false || selectable === 'single') return;
    
    const newSelectedRows = checked ? [...data] : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  // Handle sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;

    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === column.key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    setSortConfig({ key: column.key, direction });
    onSort?.(column.key, direction);
  };

  // Check if row is selected
  const isRowSelected = (row: T): boolean => {
    return selectedRows.some(r => getRowKey(r) === getRowKey(row));
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig || onSort) return data; // If external sorting, don't sort here

    const { key, direction } = sortConfig;
    const column = columns.find(col => col.key === key);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aVal = a[column.dataIndex];
      const bVal = b[column.dataIndex];

      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig, columns, onSort]);

  // Pagination
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const start = (pagination.current - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination]);

  // Check if all visible rows are selected
  const isAllSelected = paginatedData.length > 0 && 
    paginatedData.every(row => isRowSelected(row));
  const isIndeterminate = paginatedData.some(row => isRowSelected(row)) && !isAllSelected;

  // Render cell content
  const renderCell = (column: Column<T>, record: T, index: number) => {
    const value = record[column.dataIndex];
    
    if (column.render) {
      return column.render(value, record, index);
    }
    
    return String(value ?? '');
  };

  // Check if selection column should be shown
  const showSelectionColumn = selectable !== false;
  
  // Check if select all checkbox should be shown
  const showSelectAllCheckbox = selectable === true || selectable === 'multiple';

  // Loading state
  if (loading) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border ${bordered ? 'border-gray-200 dark:border-gray-700' : ''} ${className}`}>
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          <p className="text-gray-500 dark:text-gray-400 font-medium">Loading data...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!data.length) {
    return (
      <div className={`bg-white dark:bg-gray-900 rounded-xl border ${bordered ? 'border-gray-200 dark:border-gray-700' : ''} ${className}`}>
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <Database className="w-12 h-12 text-gray-300 dark:text-gray-600" />
          {emptyText || (
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 font-medium">No data available</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                There are no records to display at this time
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const tableClasses = [
    'w-full table-auto border-collapse',
    className
  ].join(' ');

  const containerClasses = [
    'bg-white dark:bg-gray-900 rounded-xl shadow-sm overflow-hidden',
    bordered ? 'border border-gray-200 dark:border-gray-700' : '',
    className
  ].join(' ');

  return (
    <div className={containerClasses}>
      <div 
        className="overflow-auto"
        style={{ maxHeight }}
      >
        <table className={tableClasses}>
          <thead className={`bg-gray-50 dark:bg-gray-800 ${sticky ? 'sticky top-0 z-10' : ''}`}>
            <tr>
              {/* Selection column */}
              {showSelectionColumn && (
                <th className={`${currentSize.header} text-left`}>
                  {showSelectAllCheckbox && (
                    <input
                      type="checkbox"
                      className={`${currentSize.checkbox} rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0`}
                      checked={isAllSelected}
                      ref={input => {
                        if (input) input.indeterminate = isIndeterminate;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                  )}
                </th>
              )}

              {/* Column headers */}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`
                    ${currentSize.header} text-left text-gray-900 dark:text-gray-100
                    ${column.sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors select-none' : ''}
                    ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
                  `}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.title}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUpIcon 
                          className={`w-3 h-3 ${
                            sortConfig?.key === column.key && sortConfig?.direction === 'asc'
                              ? 'text-blue-500'
                              : 'text-gray-400'
                          }`}
                        />
                        <ChevronDownIcon 
                          className={`w-3 h-3 -mt-1 ${
                            sortConfig?.key === column.key && sortConfig?.direction === 'desc'
                              ? 'text-blue-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((record, index) => {
              const isSelected = isRowSelected(record);
              
              return (
                <tr
                  key={getRowKey(record)}
                  className={`
                    transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0
                    ${striped && index % 2 === 1 ? 'bg-gray-25 dark:bg-gray-800/30' : ''}
                    ${hoverable ? 'hover:bg-gray-50 dark:hover:bg-gray-800/50' : ''}
                    ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
                    ${onRowClick ? 'cursor-pointer' : ''}
                  `}
                  onClick={() => onRowClick?.(record, index)}
                  onDoubleClick={() => onRowDoubleClick?.(record, index)}
                >
                  {/* Selection column */}
                  {showSelectionColumn && (
                    <td className={currentSize.cell}>
                      <input
                        type="checkbox"
                        className={`${currentSize.checkbox} rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0`}
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleRowSelect(record, e.target.checked);
                        }}
                      />
                    </td>
                  )}

                  {/* Data columns */}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`
                        ${currentSize.cell} text-gray-900 dark:text-gray-100
                        ${column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''}
                      `}
                    >
                      {renderCell(column, record, index)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {((pagination.current - 1) * pagination.pageSize) + 1} to{' '}
            {Math.min(pagination.current * pagination.pageSize, pagination.total)} of{' '}
            {pagination.total} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => pagination.onChange(pagination.current - 1, pagination.pageSize)}
              disabled={pagination.current <= 1}
              className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md">
              {pagination.current}
            </span>
            
            <button
              onClick={() => pagination.onChange(pagination.current + 1, pagination.pageSize)}
              disabled={pagination.current * pagination.pageSize >= pagination.total}
              className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;