"use client";

import { AddUserWithCurriculum } from "@/components/custom/User/AddUserWithCurriculum";
import { Input } from "@/components/ui/input";
import { useCurriculums } from "@/hooks/useCurriculums";
import { Table } from "@tanstack/react-table";

import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  globalFilter,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  const { curriculums } = useCurriculums();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer"
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("curriculum") && (
          <DataTableFacetedFilter
            column={table.getColumn("curriculum")}
            title="Cursus"
            options={(
              curriculums.map((curriculum) => ({
                value: curriculum.id,
                label: curriculum.name,
              })) as { value: string; label: string }[]
            ).concat({
              value: "",
              label: "Aucun cursus",
            })}
          />
        )}
        <AddUserWithCurriculum />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
