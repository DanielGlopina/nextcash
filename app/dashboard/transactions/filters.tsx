"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Filters({
   year,
   month,
   yearsRange
}: {
   year: number;
   month: number;
   yearsRange: number[];
}
) {
   const [selectedMonth, setSelectedMonth] = useState(month);
   const [selectedYear, setSelectedYear] = useState(year);
   return (
      <div className="flex w-full flex-row flex-nowrap items-center gap-2">
         <div className="min-w-0 flex-1 basis-0">
            <Select value={selectedMonth.toString()} onValueChange={(newValue) => setSelectedMonth(Number(newValue))}>
               <SelectTrigger className="w-full">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  {Array.from({ length: 12 }).map((_, i) => (
                     <SelectItem key={i} value={`${i + 1}`}>
                        {format(new Date(selectedYear, i, 1), "MMM")}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>

         <div className="min-w-0 flex-1 basis-0">
            <Select value={selectedYear.toString()} onValueChange={(newValue) => setSelectedYear(Number(newValue))}>
               <SelectTrigger className="w-full">
                  <SelectValue />
               </SelectTrigger>
               <SelectContent>
                  {yearsRange.map((year) => (
                     <SelectItem key={year} value={`${year}`}>
                        {year}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>
         <Button asChild className="shrink-0">
            <Link href={`/dashboard/transactions?year=${selectedYear}&month=${selectedMonth}`}>
               Go
            </Link>
         </Button>
      </div>
   )
}

export default Filters;