"use client";

import { CdrUser, CurriculumComplete } from "@/api";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { fuzzySort } from "./searchFunction";

export const columns: ColumnDef<CdrUser>[] = [
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
  {
    accessorKey: "curriculum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cursus" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Badge variant="outline">
          {row.getValue("curriculum")
            ? (row.getValue("curriculum") as CurriculumComplete).name
            : "Aucun cursus"}
        </Badge>
      </div>
    ),
    filterFn: (row, id, value) => {
      if (!row.getValue(id)) return value.includes("");
      return value.includes((row.getValue(id) as CurriculumComplete).id);
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
