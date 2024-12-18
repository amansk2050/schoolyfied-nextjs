import React from "react";
import { User, Phone, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

const StudentProfile = () => {
  return (
    <div className="flex flex-col p-2 ">
      {/* TOP*/}
      <Card className="h-[35vh] w-full flex flex-row ">
        <CardHeader className="justify-center items-center w-[30%] ">
          <Avatar className="h-20 w-20 ">
            <AvatarImage src="https://github.com/shadcn.png" className="" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <CardTitle className="font-semibold text-xl">Sheikh Aman</CardTitle>
          <CardDescription className="text-center">
            {/* Hobbies */}
            Loves coding, playing chess, and exploring new tech.
          </CardDescription>
          <Badge
            variant="outline"
            className="rounded-xl border-green-600 text-green-600"
          >
            Present
          </Badge>
        </CardHeader>

        <div className="flex flex-col w-[70%] ">
          <div className="flex flex-row gap-4 justify-between items-center p-6">
            <div className="flex flex-row gap-2 items-center">
              <User size={20} className="text-muted-foreground" />
              <div >
                <Label>Full Name</Label>
                <CardDescription>Sheikh Aman</CardDescription>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Phone size={20} className="text-muted-foreground" />
              <div >
                <Label>Contact Number</Label>
                <CardDescription>8250515182</CardDescription>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Mail size={20} className="text-muted-foreground" />
              <div >
                <Label>Email</Label>
                <CardDescription>skaman.2050@gmail.com</CardDescription>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <Separator
            orientation="horizontal"
            className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          />
          <CardContent className="flex flex-col p-3  ">
            {/* Class Teacher */}
            <div className="flex flex-col gap-2 justify-start items-start pb-4">
              <CardDescription className="text-center">
                Class Teacher
              </CardDescription>
              <div className="flex flex-row gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" className="" />
                  <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-center">
                  <CardTitle className="font-normal text-sm">
                    Antarika Maity
                  </CardTitle>
                  <CardDescription className="font-light text-xs">
                    Music Teacher
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* BOTTOM */}
    </div>
  );
};

export default StudentProfile;
