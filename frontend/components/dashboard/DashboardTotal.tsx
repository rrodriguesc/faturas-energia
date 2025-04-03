import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface Props {
  title: string;
  content: React.ReactNode;
}

const DashboardTotal = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardContent className="text-xl font-bold">{props.content}</CardContent>
    </Card>
  );
};

export default DashboardTotal;
