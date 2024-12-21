import React from "react";
import { User, Phone, Mail, GraduationCap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentProfile = () => {
  return (
    <div className="flex flex-col p-2 gap-2 ">
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
              <GraduationCap size={20} className="text-muted-foreground" />
              <div>
                <Label>Class</Label>
                <CardDescription>12 - A</CardDescription>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <User size={20} className="text-muted-foreground" />
              <div>
                <Label>Full Name</Label>
                <CardDescription>Sheikh Aman</CardDescription>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Phone size={20} className="text-muted-foreground" />
              <div>
                <Label>Contact Number</Label>
                <CardDescription>8250515182</CardDescription>
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <Mail size={20} className="text-muted-foreground" />
              <div>
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
            <div className="flex flex-col gap-2 justify-start items-start pb-4 ">
              <CardDescription className="ml-12 font-semibold ">
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

      <Tabs defaultValue="address" className="w-full ">
        <TabsList className="grid w-full grid-cols-4 ">
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="parentDetails">Parent details</TabsTrigger>
          <TabsTrigger value="medicalRecords">Medical Records</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when youre done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="parentDetails">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, youll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
