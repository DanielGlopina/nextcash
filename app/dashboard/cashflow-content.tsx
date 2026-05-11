'use client';

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import numeral from "numeral";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

function CashflowContent({
   annualCashflow
}: {
   annualCashflow: { month: number; income: number; expenses: number }[]
}) {
   const today = new Date();
   const totalAnnualIncome = annualCashflow.reduce((prevValue: number, month) => {
      return prevValue + month.income;
   }, 0);
   const totalAnnualExpenses = annualCashflow.reduce((prevValue: number, month) => {
      return prevValue + month.expenses;
   }, 0);
   const balance = totalAnnualIncome - totalAnnualExpenses;

   return (
      <>
         <div className="-mx-4 px-4 overflow-x-auto">
            <div className="min-w-[580px]">
               <ChartContainer config={{
                  income: {
                     label: "Income",
                     color: "#84cc16"
                  },
                  expenses: {
                     label: "Expenses",
                     color: "#f97316"
                  }
               }} className="w-full h-[300px]" >

                  <BarChart
                     data={annualCashflow}
                     margin={{ top: 8, right: 12, left: 0, bottom: 8 }}
                  >
                     <CartesianGrid vertical={false} />
                     <YAxis tickFormatter={(value) => {
                        return `$${numeral(value).format('0,0')}`
                     }} />
                     <XAxis
                        tickFormatter={(value) => {
                           return format(new Date(today.getFullYear(), value, 1), "MMM");
                        }}
                        angle={-35}
                        textAnchor="end"
                        height={44}
                        tickMargin={10}
                        minTickGap={6}
                        interval="preserveStartEnd"
                     />
                     <ChartTooltip content={
                        <ChartTooltipContent labelFormatter={(value, payload) => {
                           const month = payload[0]?.payload?.month;
                           return <div>
                              {format(new Date(today.getFullYear(), month - 1, 1), "MMM")}
                           </div>
                        }} />
                     } />
                     <ChartLegend
                        verticalAlign="bottom"
                        align="center"
                        content={<ChartLegendContent className="flex-wrap justify-center gap-3 sm:gap-4" />}
                     />
                     <Bar dataKey="income" radius={4} fill="var(--color-income)" />
                     <Bar dataKey="expenses" radius={4} fill="var(--color-expenses)" />
                  </BarChart>
               </ChartContainer>
            </div>
         </div>

         <div className="border-t lg:border-t-0 lg:border-l px-0 lg:px-4 pt-4 lg:pt-0 flex flex-col gap-4 justify-center align-middle">
            <div>
               <span className="text-muted-foreground font-bold text-sm">Income</span>
               <h2 className="text-3xl">
                  ${numeral(totalAnnualIncome).format("0,0[.]00")}
               </h2>
            </div>
            <div className="border-t" />
            <div>
               <span className="text-muted-foreground font-bold text-sm">Expenses</span>
               <h2 className="text-3xl">
                  ${numeral(totalAnnualExpenses).format("0,0[.]00")}
               </h2>
            </div>
            <div className="border-t" />
            <div>
               <span className="text-muted-foreground font-bold text-sm">Balance</span>
               <h2 className={cn("text-3xl font-bold", balance >= 0 ? 'text-lime-500' : "text-orange-500")}>
                  ${numeral(balance).format("0,0[.]00")}
               </h2>
            </div>
         </div>
      </>
   )
}

export default CashflowContent;