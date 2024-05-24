"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { DataTableFilterCheckBox } from "./DataTableFilterCheckBox";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer les équipes..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("difficulty") && (
          <DataTableFacetedFilter
            column={table.getColumn("difficulty")}
            title="Parcours"
            options={{} as any}
          />
        )}
        {table.getColumn("second") && (
          <DataTableFilterCheckBox
            column={table.getColumn("second")}
            title="Equipe sans coéquipier"
          />
        )}
        {(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && (
          <div className="">
            <Button
              variant="ghost"
              onClick={() => {
                table.resetRowSelection();
              }}
              className="ml-2 h-8 px-2 lg:px-3 lg:w-[105px] w-[40px]"
            >
              <span className="max-lg:hidden">Annuler</span>
              <Cross2Icon className="lg:ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
