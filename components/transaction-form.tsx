'use client';

import z from "zod";
import { addDays, format } from "date-fns";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import type { Category } from "@/types/Category";

export const transactionFormSchema = z.object({
   transactionType: z.enum(['income', 'expense']),
   categoryId: z.number().positive('Please select a category'),
   transactionDate: z.date().max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
   amount: z.number().positive('Amount must be greater than 0'),
   description: z.string().min(3, 'Description must contain at least 3 characters').max(300, 'Description must contain a maximum of 300 characters'),

})

type Props = {
   categories: Category[],
   onSubmit: (data: z.infer<typeof transactionFormSchema>) => Promise<void>,
   defaultValues?: {
      transactionType: "income" | "expense",
      amount: number;
      categoryId: number;
      description: string;
      transactionDate: Date;
   }
};

function TransactionForm({ categories, onSubmit, defaultValues }: Props) {
   const form = useForm<z.infer<typeof transactionFormSchema>>({
      resolver: zodResolver(transactionFormSchema),
      defaultValues: {
         amount: 0,
         categoryId: 0,
         description: "",
         transactionDate: new Date(),
         transactionType: "income",
         ...defaultValues,
      }
   })

   const transactionType = form.watch('transactionType');
   const filteredCategories = categories.filter(category => category.type === transactionType);


   return <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4">
         <Controller
            name="transactionType"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Transaction Type
                  </FieldLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="income">
                           Income
                        </SelectItem>

                        <SelectItem value="expense">
                           Expense
                        </SelectItem>
                     </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />

         <Controller
            name="categoryId"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Category
                  </FieldLabel>
                  <Select
                     onValueChange={(v) => {
                        field.onChange(Number(v));
                     }}
                     value={field.value > 0 ? field.value.toString() : ""}
                  >
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        {filteredCategories.map((category) => (
                           <SelectItem key={category.id} value={category.id.toString()}>
                              {category.name}
                           </SelectItem>
                        ))}
                     </SelectContent>
                  </Select>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>


      <fieldset disabled={form.formState.isSubmitting} className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3 mt-4">
         <Controller
            name="transactionDate"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Transaction Date
                  </FieldLabel>

                  <Popover>
                     <PopoverTrigger asChild>
                        <Button
                           variant="outline"
                           id="date-picker-range"
                           className={cn("w-full justify-start px-2.5 font-normal",
                              !field.value && "text-muted-foreground"
                           )}
                        >
                           <CalendarIcon />
                           {
                              field.value ?
                                 (format(field.value, "PPP"))
                                 :
                                 (<span>Pick a date</span>)
                           }
                        </Button>
                     </PopoverTrigger>
                     <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                           mode="single"
                           selected={field.value}
                           onSelect={field.onChange}
                           numberOfMonths={1}
                           disabled={{
                              after: new Date(),
                           }}
                        />
                     </PopoverContent>
                  </Popover>

                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />


         <Controller
            name="amount"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>Amount</FieldLabel>
                  <Input
                     type="number"
                     inputMode="decimal"
                     step="any"
                     min={0}
                     value={field.value || ''}
                     onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />
      </fieldset>

      <fieldset disabled={form.formState.isSubmitting} className="mt-4 flex flex-col gap-5">
         <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
               <Field>
                  <FieldLabel>
                     Description
                  </FieldLabel>
                  <Input {...field} />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
               </Field>
            )}
         />

         <Button type="submit" className="mt-4 w-full">Submit</Button>
      </fieldset>
   </form >;
}

export default TransactionForm;

