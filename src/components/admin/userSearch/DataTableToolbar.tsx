"use client";

import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { DataTableFilterCheckBox } from "./DataTableFilterCheckBox";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
  setRefetchData: (value: boolean) => void;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
  setRefetchData,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          onClick={()=>setRefetchData(true)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
