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
          {/*  for now we have not decided about performance tab
          <TabsTrigger value="performance">Performance</TabsTrigger>
           */}
        </TabsList>
        <TabsContent value="address">
          <Card>
            <CardHeader>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid w-full grid-cols-3 gap-4">
                <div className="w-full ">
                  <Label htmlFor="addressLine1">Address Line 1</Label>
                  <CardDescription>Amravati gali, Jyangra</CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <CardDescription>
                    Baguihati, North 24 parganas
                  </CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="cityTown">City/Town</Label>
                  <CardDescription>Kolkata</CardDescription>
                </div>
                {/* Separator */}
                <div className="col-span-3">
                  <Separator
                    orientation="horizontal"
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="pincode">Pincode</Label>
                  <CardDescription>70059</CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="country">Country</Label>
                  <CardDescription>India</CardDescription>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="parentDetails">
          <Card>
            <CardHeader>
              <CardTitle>Parents Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <CardTitle className="font-medium text-lg bg-muted rounded-md pl-2">
                    Father Details
                  </CardTitle>
                  <div className="grid w-full grid-cols-3 gap-4">
                    <div className="w-full ">
                      <Label htmlFor="name">Name</Label>
                      <CardDescription>Abdul Hasib</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <CardDescription>+91 - 8827475472</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="emailId">Email ID</Label>
                      <CardDescription> NA </CardDescription>
                    </div>
                    {/* Separator */}
                    <div className="col-span-3">
                      <Separator
                        orientation="horizontal"
                        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="education">Education Qualification</Label>
                      <CardDescription>B.Tech </CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="occupation">Occupation</Label>
                      <CardDescription>Garments Business</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="income">Annual Income</Label>
                      <CardDescription>20 L</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <CardTitle className="font-medium text-lg bg-muted rounded-md pl-2">
                    Mother Details
                  </CardTitle>
                  <div className="grid w-full grid-cols-3 gap-4">
                    <div className="w-full ">
                      <Label htmlFor="name">Name</Label>
                      <CardDescription>Rousonara Begum</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <CardDescription>+91 - 8967305644</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="emailId">Email ID</Label>
                      <CardDescription> NA </CardDescription>
                    </div>
                    {/* Separator */}
                    <div className="col-span-3">
                      <Separator
                        orientation="horizontal"
                        className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                      />
                    </div>
                    <div className="w-full">
                      <Label htmlFor="education">Education Qualification</Label>
                      <CardDescription>class 10</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="occupation">Occupation</Label>
                      <CardDescription>House Wife</CardDescription>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="income">Annual Income</Label>
                      <CardDescription> NA </CardDescription>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="medicalRecords">
          <Card>
            <CardHeader>
              <CardTitle>Medical Records</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid w-full grid-cols-3 gap-4">
                <div className="w-full">
                  <Label htmlFor="weight">Weight (KG)</Label>
                  <CardDescription>70</CardDescription>
                </div>
                <div className="w-full ">
                  <Label htmlFor="height">Height (CM)</Label>
                  <CardDescription>174</CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="bmi">Body Mass Index (BMI)</Label>
                  <CardDescription> NA </CardDescription>
                </div>
                {/* Separator */}
                <div className="col-span-3">
                  <Separator
                    orientation="horizontal"
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="haemoglobin">haemoglobin (HB)</Label>
                  <CardDescription> NA </CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="desises">Desises </Label>
                  <CardDescription> NA </CardDescription>
                </div>
                <div className="w-full">
                  <Label htmlFor="allergies">Allergies </Label>
                  <CardDescription> NA </CardDescription>
                </div>
                {/* Separator */}
                <div className="col-span-3">
                  <Separator
                    orientation="horizontal"
                    className="h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="covid">Covid Vaccination </Label>
                  <CardDescription> YES </CardDescription>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Edit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentProfile;
