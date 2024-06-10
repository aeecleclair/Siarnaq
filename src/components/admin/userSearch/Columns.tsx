"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { Checkbox } from "@/components/ui/checkbox";
import { CoreUserSimple } from "@/api";
import { fuzzySort } from "./searchFunction";

export const columns: ColumnDef<CoreUserSimple>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    enableSorting: false,
    filterFn: "fuzzy", //using our custom fuzzy filter function
    // filterFn: fuzzyFilter, //or just define with the function
    sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
  },
  {
    accessorKey: "firstname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prénom" />
    ),
    cell: ({ row }) => <div>{row.getValue("firstname")}</div>,
    enableSorting: false,
    filterFn: "fuzzy", //using our custom fuzzy filter function
    // filterFn: fuzzyFilter, //or just define with the function
    sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
  },
  {
    accessorKey: "nickname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Surnom" />
    ),
    cell: ({ row }) => <div>{row.getValue("nickname")}</div>,
    enableSorting: false,
    filterFn: "fuzzy", //using our custom fuzzy filter function
    // filterFn: fuzzyFilter, //or just define with the function
    sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
