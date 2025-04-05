"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCallback } from "react";
import { Loader2 } from "lucide-react";
import DashboardDatePicker from "./DashboardDatePicker";

const formSchema = z.object({
  nCliente: z.string().min(4, {
    message: "Numero do cliente must be at least 4 characters.",
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type FilterParams = z.infer<typeof formSchema>;

export interface Props {
  isLoading?: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

const DashboardFilter = (props: Props) => {
  const { onSubmit, isLoading } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nCliente: "",
      startDate: undefined,
      endDate: undefined,
    },
  });

  const submitForm = useCallback(
    (values: z.infer<typeof formSchema>) => {
      onSubmit?.(values);
    },
    [onSubmit]
  );

  return (
    <Card className="p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitForm)}
          className="grid md:grid-cols-4 gap-2 items-end"
        >
          <FormField
            control={form.control}
            name="nCliente"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nº do cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nº Cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DashboardDatePicker
            name="startDate"
            placeholder="Selecione uma data"
            control={form.control}
            label="Data Inicial"
          />
          <DashboardDatePicker
            name="endDate"
            placeholder="Selecione uma data"
            control={form.control}
            label="Data Final"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Atualizar"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default DashboardFilter;
