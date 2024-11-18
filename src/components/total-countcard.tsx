"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TotalCountCardProps {
  title: string;
  count: number;
  colorType: number;
}

const TotalCountCard: React.FC<TotalCountCardProps> = ({
  title,
  count,
  colorType,
}) => {
  const backgroundColor = colorType % 2 === 0 ? "#F1F0FF" : "#FEFCE8";
  return (
    <Card
      className="flex flex-col justify-center items-center"
      //   style={{ backgroundColor }}
    >
      <CardHeader>
        <CardTitle>{count}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{title}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default TotalCountCard;
