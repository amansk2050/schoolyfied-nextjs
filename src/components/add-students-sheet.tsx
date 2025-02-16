"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function AddStudent() {
  // New state for controlled parent details
  const [father, setFather] = useState({
    name: "",
    email: "",
    contact: "",
    occupation: "",
    education: "",
  });
  const [mother, setMother] = useState({
    name: "",
    email: "",
    contact: "",
    occupation: "",
    education: "",
  });
  const [guardian, setGuardian] = useState({
    name: "",
    email: "",
    contact: "",
    occupation: "",
    education: "",
  });
  const [copyFather, setCopyFather] = useState(false);
  const [copyMother, setCopyMother] = useState(false);

  const handleCopyFather = (val: boolean) => {
    setCopyFather(val);
    if (val) {
      setCopyMother(false);
      setGuardian({ ...father });
    }
  };

  const handleCopyMother = (val: boolean) => {
    setCopyMother(val);
    if (val) {
      setCopyFather(false);
      setGuardian({ ...mother });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add students</Button>
      </DialogTrigger>
      {/* Increase width a bit more */}
      <DialogContent className="min-w-max w-[140%] h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>Fill out the form and save.</DialogDescription>
        </DialogHeader>

        {/* Scrollable container */}
        <div className="max-h-[80vh] overflow-y-auto space-y-6">
          {/* Profile Picture Upload Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Profile Picture</h2>
            <div className="flex items-center gap-4">
              <Avatar />
              <div>
                <Label className="block mb-1">
                  Upload passport size picture
                </Label>
                <Input type="file" accept=".png,.jpg" />
                <p className="text-sm text-muted-foreground">
                  Max file size: 10 MB. Formats: PNG, JPG.
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />

          {/* Basic Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Basic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* firstName */}
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" />
              </div>
              {/* lastName */}
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" />
              </div>
              {/* contactNumber */}
              <div>
                <Label htmlFor="contactNumber">Primary Contact Number</Label>
                <Input id="contactNumber" />
              </div>
              {/* class */}
              <div>
                <Label htmlFor="class">Class</Label>
                <Input id="class" />
              </div>
              {/* rollNo */}
              <div>
                <Label htmlFor="rollNo">Roll Number</Label>
                <Input id="rollNo" />
              </div>
              {/* admissionNo */}
              <div>
                <Label htmlFor="admissionNo">Admission Number</Label>
                <Input id="admissionNo" />
              </div>
            </div>
          </div>
          <Separator className="my-4" />

          {/* Address Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* addressLine1 */}
              <div>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input id="addressLine1" />
              </div>
              {/* addressLine2 */}
              <div>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input id="addressLine2" />
              </div>
              {/* city/town */}
              <div>
                <Label htmlFor="city">City/Town</Label>
                <Input id="city" />
              </div>
              {/* state */}
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" />
              </div>
              {/* pincode */}
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input id="pincode" />
              </div>
              {/* country */}
              <div>
                <Label htmlFor="country">Country</Label>
                <Input id="country" />
              </div>
            </div>
          </div>
          <Separator className="my-4" />

          {/* Updated Parent Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Parent Details</h2>
            <div className="flex flex-row gap-4">
              {/* Father Details */}
              <div className="flex-1 space-y-2 p-2 border rounded">
                <h3 className="font-semibold">Father Details</h3>
                <Label htmlFor="fatherName">Name</Label>
                <Input
                  id="fatherName"
                  value={father.name}
                  onChange={(e) => {
                    setFather({ ...father, name: e.target.value });
                    if (copyFather)
                      setGuardian({ ...guardian, name: e.target.value });
                  }}
                />
                <Label htmlFor="fatherEmail">Email</Label>
                <Input
                  id="fatherEmail"
                  value={father.email}
                  onChange={(e) => {
                    setFather({ ...father, email: e.target.value });
                    if (copyFather)
                      setGuardian({ ...guardian, email: e.target.value });
                  }}
                />
                <Label htmlFor="fatherContact">Contact Number</Label>
                <Input
                  id="fatherContact"
                  value={father.contact}
                  onChange={(e) => {
                    setFather({ ...father, contact: e.target.value });
                    if (copyFather)
                      setGuardian({ ...guardian, contact: e.target.value });
                  }}
                />
                <Label htmlFor="fatherOccupation">Occupation</Label>
                <Input
                  id="fatherOccupation"
                  value={father.occupation}
                  onChange={(e) => {
                    setFather({ ...father, occupation: e.target.value });
                    if (copyFather)
                      setGuardian({ ...guardian, occupation: e.target.value });
                  }}
                />
                <Label htmlFor="fatherEducation">Education Qualification</Label>
                <Input
                  id="fatherEducation"
                  value={father.education}
                  onChange={(e) => {
                    setFather({ ...father, education: e.target.value });
                    if (copyFather)
                      setGuardian({ ...guardian, education: e.target.value });
                  }}
                />
              </div>
              {/* Mother Details */}
              <div className="flex-1 space-y-2 p-2 border rounded">
                <h3 className="font-semibold">Mother Details</h3>
                <Label htmlFor="motherName">Name</Label>
                <Input
                  id="motherName"
                  value={mother.name}
                  onChange={(e) => {
                    setMother({ ...mother, name: e.target.value });
                    if (copyMother)
                      setGuardian({ ...guardian, name: e.target.value });
                  }}
                />
                <Label htmlFor="motherEmail">Email</Label>
                <Input
                  id="motherEmail"
                  value={mother.email}
                  onChange={(e) => {
                    setMother({ ...mother, email: e.target.value });
                    if (copyMother)
                      setGuardian({ ...guardian, email: e.target.value });
                  }}
                />
                <Label htmlFor="motherContact">Contact Number</Label>
                <Input
                  id="motherContact"
                  value={mother.contact}
                  onChange={(e) => {
                    setMother({ ...mother, contact: e.target.value });
                    if (copyMother)
                      setGuardian({ ...guardian, contact: e.target.value });
                  }}
                />
                <Label htmlFor="motherOccupation">Occupation</Label>
                <Input
                  id="motherOccupation"
                  value={mother.occupation}
                  onChange={(e) => {
                    setMother({ ...mother, occupation: e.target.value });
                    if (copyMother)
                      setGuardian({ ...guardian, occupation: e.target.value });
                  }}
                />
                <Label htmlFor="motherEducation">Education Qualification</Label>
                <Input
                  id="motherEducation"
                  value={mother.education}
                  onChange={(e) => {
                    setMother({ ...mother, education: e.target.value });
                    if (copyMother)
                      setGuardian({ ...guardian, education: e.target.value });
                  }}
                />
              </div>
              {/* Guardian Details */}
              <div className="flex-1 space-y-2 p-2 border rounded">
                <h3 className="font-semibold">Guardian Details</h3>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={copyFather}
                    onCheckedChange={(val) => handleCopyFather(val as boolean)}
                  />
                  <span className="text-sm">Copy Father's</span>
                  <Checkbox
                    checked={copyMother}
                    onCheckedChange={(val) => handleCopyMother(val as boolean)}
                  />
                  <span className="text-sm">Copy Mother's</span>
                </div>
                <Label htmlFor="guardianName">Name</Label>
                <Input
                  id="guardianName"
                  value={guardian.name}
                  onChange={(e) =>
                    setGuardian({ ...guardian, name: e.target.value })
                  }
                />
                <Label htmlFor="guardianEmail">Email</Label>
                <Input
                  id="guardianEmail"
                  value={guardian.email}
                  onChange={(e) =>
                    setGuardian({ ...guardian, email: e.target.value })
                  }
                />
                <Label htmlFor="guardianContact">Contact Number</Label>
                <Input
                  id="guardianContact"
                  value={guardian.contact}
                  onChange={(e) =>
                    setGuardian({ ...guardian, contact: e.target.value })
                  }
                />
                <Label htmlFor="guardianOccupation">Occupation</Label>
                <Input
                  id="guardianOccupation"
                  value={guardian.occupation}
                  onChange={(e) =>
                    setGuardian({ ...guardian, occupation: e.target.value })
                  }
                />
                <Label htmlFor="guardianEducation">
                  Education Qualification
                </Label>
                <Input
                  id="guardianEducation"
                  value={guardian.education}
                  onChange={(e) =>
                    setGuardian({ ...guardian, education: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <Separator className="my-4" />

          {/* Medical Details Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-2">Medical Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* medicalName */}
              <div>
                <Label htmlFor="medicalName">Name</Label>
                <Input id="medicalName" />
              </div>
              {/* medicalEmail */}
              <div>
                <Label htmlFor="medicalEmail">Email</Label>
                <Input id="medicalEmail" />
              </div>
              {/* bmi */}
              <div>
                <Label htmlFor="bmi">BMI</Label>
                <Input id="bmi" />
              </div>
              {/* covidVaccinationStatus */}
              <div>
                <Label htmlFor="covidVaccinationStatus">
                  Covid Vaccination
                </Label>
                <select id="covidVaccinationStatus" className="input">
                  <option value="none">None</option>
                  <option value="first">First Dose</option>
                  <option value="second">Second Dose</option>
                  <option value="both">Both Doses</option>
                </select>
              </div>
              {/* allergies */}
              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input id="allergies" />
              </div>
              {/* healthInfo */}
              <div>
                <Label htmlFor="healthInfo">Health Explanation</Label>
                <Input id="healthInfo" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
