"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

interface AddTeacherSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddTeacherSheet({
  open,
  onOpenChange,
}: AddTeacherSheetProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be implemented later
    console.log("Form submitted");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md md:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Teacher</SheetTitle>
          <SheetDescription>
            Add a new teacher to the staff directory. Fill in all required
            fields.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Dr. John Doe" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Mathematics" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" placeholder="Class Teacher - X A" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description about the teacher's qualifications and expertise"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Picture URL</Label>
              <Input
                id="image"
                type="url"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="present" defaultChecked />
              <Label htmlFor="present">Currently Present</Label>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </SheetClose>
            <Button type="submit">Add Teacher</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
