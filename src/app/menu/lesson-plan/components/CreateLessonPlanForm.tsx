import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  CalendarIcon,
  X,
  Plus,
  Link,
  Paperclip,
  BookOpen,
  Trash2,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateLessonPlanFormProps {
  onClose: () => void;
}

const CreateLessonPlanForm: React.FC<CreateLessonPlanFormProps> = ({
  onClose,
}) => {
  // State for basic details
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  // Duration removed as requested
  const [planType, setPlanType] = useState("daily"); // Plan type (daily, weekly, monthly)
  const [assessment, setAssessment] = useState(""); // Added assessment process

  // State for learning objectives
  const [objectives, setObjectives] = useState<string[]>([""]);

  // State for lesson procedures
  const [procedures, setProcedures] = useState<
    { title: string; content: string }[]
  >([{ title: "", content: "" }]);

  // State for resources
  const [attachments, setAttachments] = useState<
    { name: string; size: string }[]
  >([]);
  const [books, setBooks] = useState<string[]>([""]);
  const [links, setLinks] = useState<{ title: string; url: string }[]>([
    { title: "", url: "" },
  ]);

  // Handles for editing arrays of items
  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const removeObjective = (index: number) => {
    if (objectives.length > 1) {
      const newObjectives = [...objectives];
      newObjectives.splice(index, 1);
      setObjectives(newObjectives);
    }
  };

  const addProcedure = () => {
    setProcedures([...procedures, { title: "", content: "" }]);
  };

  const updateProcedure = (
    index: number,
    field: "title" | "content",
    value: string
  ) => {
    const newProcedures = [...procedures];
    newProcedures[index][field] = value;
    setProcedures(newProcedures);
  };

  const removeProcedure = (index: number) => {
    if (procedures.length > 1) {
      const newProcedures = [...procedures];
      newProcedures.splice(index, 1);
      setProcedures(newProcedures);
    }
  };

  const addBook = () => {
    setBooks([...books, ""]);
  };

  const updateBook = (index: number, value: string) => {
    const newBooks = [...books];
    newBooks[index] = value;
    setBooks(newBooks);
  };

  const removeBook = (index: number) => {
    if (books.length > 1) {
      const newBooks = [...books];
      newBooks.splice(index, 1);
      setBooks(newBooks);
    }
  };

  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const updateLink = (index: number, field: "title" | "url", value: string) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const removeLink = (index: number) => {
    if (links.length > 1) {
      const newLinks = [...links];
      newLinks.splice(index, 1);
      setLinks(newLinks);
    } else if (links.length === 1) {
      setLinks([{ title: "", url: "" }]);
    }
  };

  // Mock file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newAttachments = [...attachments];
      Array.from(files).forEach((file) => {
        // Convert file size to KB/MB
        const size =
          file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(1)}MB`
            : `${(file.size / 1024).toFixed(1)}KB`;

        newAttachments.push({ name: file.name, size });
      });
      setAttachments(newAttachments);
    }
  };

  const removeAttachment = (index: number) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty values
    const filteredObjectives = objectives.filter((obj) => obj.trim() !== "");
    const filteredProcedures = procedures.filter(
      (proc) => proc.title.trim() !== "" || proc.content.trim() !== ""
    );
    const filteredBooks = books.filter((book) => book.trim() !== "");
    const filteredLinks = links.filter(
      (link) => link.title.trim() !== "" || link.url.trim() !== ""
    );

    const lessonPlanData = {
      title,
      subject,
      grade,
      date,
      planType, // daily, weekly, monthly
      assessment, // Added assessment process
      objectives: filteredObjectives,
      procedures: filteredProcedures,
      resources: {
        books: filteredBooks,
        links: filteredLinks,
        attachments,
      },
      status: "draft", // Default status for new lesson plan
    };

    console.log("Form submitted:", lessonPlanData);
    // Here you would typically send this data to your API

    // Close the dialog
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="max-w-full overflow-x-auto mb-4">
          <div className="grid grid-cols-5 w-full">
            <TabsTrigger value="basic" className="whitespace-nowrap">
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="objectives" className="whitespace-nowrap">
              Objectives
            </TabsTrigger>
            <TabsTrigger value="procedures" className="whitespace-nowrap">
              Lesson Flow
            </TabsTrigger>
            <TabsTrigger value="assessment" className="whitespace-nowrap">
              Assessment
            </TabsTrigger>
            <TabsTrigger value="resources" className="whitespace-nowrap">
              Resources
            </TabsTrigger>
          </div>
        </TabsList>

        {/* Basic Info Tab */}
        <TabsContent value="basic" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Lesson Title</Label>
            <Input
              id="title"
              placeholder="Enter lesson title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select value={subject} onValueChange={setSubject} required>
                <SelectTrigger id="subject">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="History">History</SelectItem>
                  <SelectItem value="Geography">Geography</SelectItem>
                  <SelectItem value="Art">Art</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Physical Education">
                    Physical Education
                  </SelectItem>
                  <SelectItem value="Computer Science">
                    Computer Science
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Class</Label>
              <Select value={grade} onValueChange={setGrade} required>
                <SelectTrigger id="grade">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kindergarten">Kindergarten</SelectItem>
                  <SelectItem value="1st Grade">1st Grade</SelectItem>
                  <SelectItem value="2nd Grade">2nd Grade</SelectItem>
                  <SelectItem value="3rd Grade">3rd Grade</SelectItem>
                  <SelectItem value="4th Grade">4th Grade</SelectItem>
                  <SelectItem value="5th Grade">5th Grade</SelectItem>
                  <SelectItem value="6th Grade">6th Grade</SelectItem>
                  <SelectItem value="7th Grade">7th Grade</SelectItem>
                  <SelectItem value="8th Grade">8th Grade</SelectItem>
                  <SelectItem value="9th Grade">9th Grade</SelectItem>
                  <SelectItem value="10th Grade">10th Grade</SelectItem>
                  <SelectItem value="11th Grade">11th Grade</SelectItem>
                  <SelectItem value="12th Grade">12th Grade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Plan Type</Label>
              <Select value={planType} onValueChange={setPlanType} required>
                <SelectTrigger id="planType">
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Lesson</SelectItem>
                  <SelectItem value="weekly">Weekly Plan</SelectItem>
                  <SelectItem value="monthly">Monthly Plan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration field removed as requested */}
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </TabsContent>

        {/* Objectives Tab */}
        <TabsContent value="objectives" className="space-y-4">
          <div className="space-y-4">
            <Label>Learning Objectives</Label>
            <p className="text-sm text-muted-foreground">
              Define what students will learn and be able to do by the end of
              the lesson.
            </p>

            {objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="mt-2 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <Input
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder={`Learning objective ${index + 1}...`}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeObjective(index)}
                  disabled={objectives.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addObjective}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Objective
            </Button>
          </div>
        </TabsContent>

        {/* Procedures Tab - Fixed overflow issues */}
        <TabsContent value="procedures" className="space-y-4">
          <div className="space-y-4 max-w-full">
            <Label>Lesson Procedures</Label>
            <p className="text-sm text-muted-foreground">
              Outline the step-by-step flow of your lesson.
            </p>

            <div className="space-y-4">
              {procedures.map((procedure, index) => (
                <div key={index} className="border p-4 rounded-md">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                        {index + 1}
                      </div>
                      <span>Step {index + 1}</span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProcedure(index)}
                      disabled={procedures.length <= 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Input
                      value={procedure.title}
                      onChange={(e) =>
                        updateProcedure(index, "title", e.target.value)
                      }
                      placeholder="Activity title (e.g., Warm-up, Introduction)"
                      className="mb-2"
                    />
                    <Textarea
                      value={procedure.content}
                      onChange={(e) =>
                        updateProcedure(index, "content", e.target.value)
                      }
                      placeholder="Describe what happens during this step of the lesson..."
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addProcedure}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Procedure Step
            </Button>
          </div>
        </TabsContent>

        {/* Assessment Tab */}
        <TabsContent value="assessment" className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <ClipboardCheck className="mr-2 h-5 w-5 text-primary" />
              <Label>Assessment Process</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Describe how you will assess student understanding and learning
              outcomes.
            </p>
            <Textarea
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              placeholder="Describe the assessment methods you will use (e.g., formative checks, exit tickets, quizzes, observations, etc.)"
              className="min-h-[200px]"
            />
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm font-medium mb-2 text-primary">
                Assessment Tips:
              </p>
              <ul className="text-sm space-y-1 text-muted-foreground list-disc pl-5">
                <li>
                  Include both formative (during lesson) and summative (after
                  lesson) assessment strategies
                </li>
                <li>
                  Consider how you'll check for understanding throughout the
                  lesson
                </li>
                <li>
                  Describe any specific criteria you'll use to evaluate student
                  work
                </li>
                <li>
                  Note any modifications or accommodations for different
                  learners
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Book Resources */}
          <div className="space-y-4">
            <div className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              <Label>Book Resources</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              List textbooks or reading materials needed for this lesson.
            </p>

            {books.map((book, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={book}
                  onChange={(e) => updateBook(index, e.target.value)}
                  placeholder="Book title, chapter, or page numbers..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeBook(index)}
                  disabled={books.length <= 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addBook}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Book
            </Button>
          </div>

          <Separator />

          {/* Attachments */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Paperclip className="mr-2 h-5 w-5" />
              <Label>Attachments</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload worksheets, presentations, or other files.
            </p>

            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 border rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-muted rounded flex items-center justify-center">
                        <Paperclip className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{attachment.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-center border-2 border-dashed p-6 rounded-md">
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Paperclip className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm font-medium">
                  Click to upload files
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  PDFs, documents, images, or presentations
                </span>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>

          <Separator />

          {/* Links */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Link className="mr-2 h-5 w-5" />
              <Label>External Links</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Add links to online resources, videos, or websites.
            </p>

            {links.map((link, index) => (
              <div key={index} className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={link.title}
                    onChange={(e) => updateLink(index, "title", e.target.value)}
                    placeholder="Link title or description..."
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="https://..."
                />
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addLink}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Link
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Create Lesson Plan</Button>
      </div>
    </form>
  );
};

export default CreateLessonPlanForm;
