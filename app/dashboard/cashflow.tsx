import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashflow } from "@/data/getAnnualCashflow";
import CashflowFilters from "./cashflow-filters";
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange";
import CashflowContent from "./cashflow-content";

async function Cashflow({ year }: { year: number }) {
   const [cashflow, yearsRange] = await Promise.all([
      getAnnualCashflow(year),
      getTransactionYearsRange()
   ]);
   return <Card className="mb-5">
      <CardHeader>
         <CardTitle>
            <CardTitle className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
               <span>Cashflow</span>
               <CashflowFilters year={year} yearsRange={yearsRange} />
            </CardTitle>
         </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-[1fr_260px] lg:gap-0">
         <CashflowContent annualCashflow={cashflow} />
      </CardContent>
   </Card >;
}

export default Cashflow;