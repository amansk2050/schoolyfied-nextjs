"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { User, Briefcase, UserRoundXIcon } from "lucide-react";

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
  // Determine background color based on colorType using Tailwind classes
  const backgroundColor = colorType % 2 === 0 ? "bg-purple-100" : "bg-yellow-100";

  // Determine icon based on colorType
  let icon;
  switch (colorType) {
    case 1:
      icon = <User />;
      break;
    case 2:
      icon = <Briefcase />;
      break;
    case 3:
      icon = <UserRoundXIcon />;
      break;
    default:
      icon = <User />;
      break;
  }

  return (
    <Card className="flex flex-row items-center h-full p-2">
      {/* <div className="flex items-center w-full bg-lamaPurple "> */}
        {/* Icon with border on the left */}
        <div className="bg-secondary  rounded-full p-2 mr-2">
          {icon}
        </div>
        <CardContent className="flex flex-col  h-full w-full gap-2">
          <CardTitle className="text-lg font-bold">{count}</CardTitle>
          <CardDescription className="text-sm">{title}</CardDescription>
        </CardContent>
      {/* </div> */}
    </Card>
  );
};

export default TotalCountCard;
