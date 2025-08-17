export type Column<T> = {
  key: string;              // unique key for column
  title: string;            // column title shown in table
  dataIndex: keyof T;       // the field name in data row
  sortable?: boolean;       // optional sorting
};

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean | "single"; // false | true (multi) | "single"
  onRowSelect?: (rows: T[]) => void;
}
