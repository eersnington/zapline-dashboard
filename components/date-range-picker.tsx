"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import * as React from "react";

export function CalendarDateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const currentDate = new Date();

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn("w-[260px] text-center font-normal")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {currentDate.toDateString()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={currentDate}
            selected={currentDate}
            onSelect={() => {}}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
