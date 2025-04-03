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
  chartData: { consumo: number; compensada: number }[];
}

const chartConfig = {
  compensada: {
    label: "Compensada",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ReportChart = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resultados de Energia(kWh)</CardTitle>
        <CardDescription>
          Consumo de Energia Elétrica KWh vs Energía Compensada kWh
        </CardDescription>
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
              dataKey="consumo"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="compensada"
              type="natural"
              stroke="var(--color-compensada)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-compensada)",
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
                formatter={(value: number) => value.toFixed(2)}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ReportChart;
