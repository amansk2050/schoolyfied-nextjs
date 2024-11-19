import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { MoreHorizontal } from "lucide-react";
const HealthEmergencyAlert = () => {
  return (
    <Alert className="border-t-4 border-red-400 rounded-lg p-4 mb-4 bg-white shadow">
      <div className="flex flex-row justify-between items-center">
        <AlertTitle>Sheikh Aman</AlertTitle>
        <MoreHorizontal
          size={30}
          strokeWidth={2}
          color="gray"
        >

        </MoreHorizontal>
      </div>

      <AlertDescription>
        High fever, cough, and cold. Please take him to the nearest hospital.
      </AlertDescription>
    </Alert>
  );
};

export default HealthEmergencyAlert;
