"use client";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

interface DatePickerProps {
  date?: Date;
  defaultDate?: Date;
  fromDate?: Date;
  toDate?: Date;
  setDate: (date?: Date) => void;
  disabled?: boolean;
}

export function DatePicker({
  date,
  setDate,
  defaultDate,
  fromDate,
  toDate,
  disabled,
}: DatePickerProps) {
  const defaultToDate = new Date();
  defaultToDate.setFullYear(defaultToDate.getFullYear() + 10);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
          type="button"
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP", { locale: fr })
          ) : (
            <span>Sélectionner une date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={fr}
          captionLayout="dropdown-buttons"
          fromDate={fromDate ?? new Date(1900)}
          toDate={toDate ?? defaultToDate}
          defaultMonth={defaultDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
