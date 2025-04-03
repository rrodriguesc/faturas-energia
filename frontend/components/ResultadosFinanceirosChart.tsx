"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  chartData: { total: number; economia: number }[];
}

const chartConfig = {
  economia: {
    label: "Economia",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ReportChart = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados Financeiros (R$)</CardTitle>
        <CardDescription>Valor Total sem GDR$ vs Economia GDR$</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={props.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="total"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.toLocaleString(undefined, { minimumFractionDigits: 2 })
              }
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="economia"
              type="natural"
              stroke="var(--color-economia)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-economia)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ReportChart;
