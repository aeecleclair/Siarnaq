"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Equipe" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "captain",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capitaine" />
    ),
    cell: ({ row }) => {
      const captain = row.getValue("captain");
      return (
        <div className="flex space-x-2">
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "second",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Coéquiper" />
    ),
    cell: ({ row }) => {
      const second = row.getValue("second");
      return (
        <div className={`flex space-x-2 ${second ?? "text-muted-foreground"}`}>
        </div>
      );
    },
    enableSorting: false,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
