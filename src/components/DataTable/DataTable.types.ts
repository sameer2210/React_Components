import React from 'react';

export type Column<T> = {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, record: T, index: number) => React.ReactNode;
  fixed?: 'left' | 'right';
};

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | 'single' | 'multiple';
  onRowSelect?: (selectedRows: T[]) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((row: T) => string | number);
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  sticky?: boolean;
  maxHeight?: string | number;
  emptyText?: React.ReactNode;
  className?: string;
  onRowClick?: (record: T, index: number) => void;
  onRowDoubleClick?: (record: T, index: number) => void;
}