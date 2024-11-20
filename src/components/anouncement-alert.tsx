import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { AlertType } from "@/enums/alertEnums";

interface AnnouncementsAlertProps {
  id: number;
  type: AlertType;
  title: string;
  message: string;
}
const AnnouncementsAlert: React.FC<AnnouncementsAlertProps> = ({
  type,
  title,
  message,
}) => {
  const typeToBorderColor = {
    [AlertType.Health]: "border-red-400",
    [AlertType.Events]: "border-blue-400",
    [AlertType.Announcement]: "border-yellow-400",
  };

  const borderColor = typeToBorderColor[type] || "border-gray-300"; // Default color

  return (
    <Alert
      className={`border-t-4 ${borderColor} rounded-lg p-4 mb-4 bg-white shadow`}
    >
      <div className="flex flex-row justify-between items-center">
        <AlertTitle>{title}</AlertTitle>
        <MoreHorizontal size={30} strokeWidth={2} color="gray"></MoreHorizontal>
      </div>

      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AnnouncementsAlert;
