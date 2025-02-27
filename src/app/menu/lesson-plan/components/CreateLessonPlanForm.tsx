import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface CreateLessonPlanFormProps {
  onClose: () => void;
}

export function CreateLessonPlanForm({ onClose }: CreateLessonPlanFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted");
    // Close the dialog after submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter lesson title" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
              <SelectItem value="Science">Science</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="History">History</SelectItem>
              <SelectItem value="Geography">Geography</SelectItem>
              <SelectItem value="Computer Science">Computer Science</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="grade">Grade/Class</Label>
          <Select required>
            <SelectTrigger>
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="grade-6">6th Grade</SelectItem>
              <SelectItem value="grade-7">7th Grade</SelectItem>
              <SelectItem value="grade-8">8th Grade</SelectItem>
              <SelectItem value="grade-9">9th Grade</SelectItem>
              <SelectItem value="grade-10">10th Grade</SelectItem>
              <SelectItem value="grade-11">11th Grade</SelectItem>
              <SelectItem value="grade-12">12th Grade</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>
          <div className="flex space-x-2">
            <Input
              id="duration"
              type="number"
              placeholder="45"
              min="1"
              required
            />
            <Select defaultValue="minutes">
              <SelectTrigger className="w-[110px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Input id="date" type="date" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="objectives">Learning Objectives</Label>
        <Textarea
          id="objectives"
          placeholder="Enter learning objectives, one per line"
          className="min-h-[100px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="materials">Materials & Resources</Label>
        <Textarea
          id="materials"
          placeholder="List required materials and resources"
          className="min-h-[100px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="procedures">Lesson Procedures</Label>
        <Textarea
          id="procedures"
          placeholder="Describe the lesson flow and procedures"
          className="min-h-[150px]"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assessment">Assessment Methods</Label>
        <Textarea
          id="assessment"
          placeholder="Describe how student learning will be assessed"
          className="min-h-[100px]"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={() => console.log("Saving as draft")}>
          Save as Draft
        </Button>
        <Button type="submit">Publish</Button>
      </DialogFooter>
    </form>
  );
}

export default CreateLessonPlanForm;
