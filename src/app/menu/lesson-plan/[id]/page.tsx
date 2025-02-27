"use client";

import React, { use } from "react"; // Import use from React
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  BookOpen,
  Users,
  CheckSquare,
  BookmarkPlus,
  Edit,
  Share2,
  Download,
  Printer,
  ChevronRight,
  Star,
  StarHalf,
  AlertCircle,
  CheckCircle2,
  PenSquare,
} from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const mockLessonPlan = {
  id: "1",
  title: "Introduction to Algebra",
  subject: "Mathematics",
  grade: "9th Grade",
  date: "October 15, 2023",
  duration: "45 minutes",
  status: "published",
  teacher: {
    name: "Dr. Alexander Smith",
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  objectives: [
    "Understand basic algebraic expressions and their components",
    "Learn how to simplify expressions by combining like terms",
    "Apply distributive property to expand algebraic expressions",
    "Solve simple one-step equations with variables",
  ],
  resources: [
    "Textbook: 'Algebra Fundamentals', Chapter 3",
    "Interactive Whiteboard",
    "Algebra Tiles Manipulative Set",
    "Student Worksheets (PDF)",
    "Online Practice Problems (link in resources)",
  ],
  procedures: [
    {
      title: "Warm-up (5 minutes)",
      content:
        "Quick review of number properties with a 'Think-Pair-Share' activity where students evaluate numerical expressions.",
    },
    {
      title: "Introduction to Algebraic Expressions (10 minutes)",
      content:
        "Define terms, variables, constants, and coefficients. Show examples of each and have students identify components.",
    },
    {
      title: "Combining Like Terms (15 minutes)",
      content:
        "Demonstrate how to identify and combine like terms using algebra tiles. Students practice with guided examples.",
    },
    {
      title: "Independent Practice (10 minutes)",
      content:
        "Students complete worksheet problems independently while teacher circulates to provide assistance.",
    },
    {
      title: "Closure (5 minutes)",
      content:
        "Exit ticket: Students write one algebraic expression and identify all of its components.",
    },
  ],
  assessment:
    "Formative assessment through in-class observation, worksheet completion, and exit ticket. Summative assessment will be part of the unit test next week.",
  differentiation:
    "Advanced students will work on more complex expressions with multiple variables. Students requiring support will use additional manipulatives and work with simplified expressions.",
  homework:
    "Complete textbook exercises on page 45, problems #1-15 (odd numbers only)",
  notes:
    "Remember to prepare algebra tile sets before class. Check projector connection - was glitchy last time.",
  attachments: [
    { name: "Algebra_Worksheet.pdf", size: "245KB" },
    { name: "Lesson_Slides.pptx", size: "1.2MB" },
    { name: "Practice_Problems.docx", size: "320KB" },
  ],
};

export default function LessonPlanDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  // Properly unwrap params using React.use()
  const unwrappedParams = use(params);
  const lessonPlanId = unwrappedParams.id;

  // In a real application, you would fetch the lesson plan data based on the ID
  console.log(`Fetching lesson plan with ID: ${lessonPlanId}`);
  const lessonPlan = mockLessonPlan;

  return (
    <div className="px-6 py-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="bg-white/20 hover:bg-white/30 text-white"
          >
            <ArrowLeft size={20} />
          </Button>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">
                    {lessonPlan.title}
                  </h1>
                  <Badge
                    variant={
                      lessonPlan.status === "published"
                        ? "secondary"
                        : "outline"
                    }
                    className={`${lessonPlan.status === "published" ? "bg-white/20 hover:bg-white/30 text-white" : "border-white/50 text-white"}`}
                  >
                    {lessonPlan.status === "published" ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="flex items-center flex-wrap gap-4 mt-2 text-white/80">
                  <div className="flex items-center gap-1">
                    <FileText size={16} />
                    <span>{lessonPlan.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={16} />
                    <span>{lessonPlan.grade}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{lessonPlan.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{lessonPlan.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white"
                >
                  <Edit size={14} />
                  <span>Edit</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white"
                >
                  <Share2 size={14} />
                  <span>Share</span>
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white"
                >
                  <BookmarkPlus size={14} />
                  <span>Save</span>
                </Button>
              </div>
            </div>

            {/* Teacher Info - moved inside the hero section */}
            <div className="flex items-center gap-3 mt-6 bg-white/10 backdrop-blur-sm p-3 rounded-lg inline-flex">
              <Avatar>
                <AvatarImage
                  src={lessonPlan.teacher.avatar}
                  alt={lessonPlan.teacher.name}
                />
                <AvatarFallback>
                  {lessonPlan.teacher.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">
                  Created by {lessonPlan.teacher.name}
                </p>
                <p className="text-sm text-white/70">Last updated 3 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Action Bar */}
      <div className="flex justify-between items-center bg-muted/30 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <StarHalf size={16} className="fill-amber-400 text-amber-400" />
            <span className="ml-2 text-sm font-medium">4.5 rating</span>
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div className="text-sm text-muted-foreground">
            8 teachers using this plan
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download size={14} />
            <span>Export</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Printer size={14} />
            <span>Print</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start mb-6 overflow-auto bg-muted/30 rounded-lg p-1">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-background"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="lesson-flow"
            className="data-[state=active]:bg-background"
          >
            Lesson Flow
          </TabsTrigger>
          <TabsTrigger
            value="resources"
            className="data-[state=active]:bg-background"
          >
            Resources
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="data-[state=active]:bg-background"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-background"
          >
            Edit History
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Status Bar */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-green-100 text-green-800 p-1.5 rounded-full">
                  <CheckCircle2 size={16} />
                </div>
                <span className="font-medium">Ready to teach</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Preparation Level</div>
                  <Progress value={75} className="h-2 w-24" />
                  <span className="text-sm">75%</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <AlertCircle size={14} />
                  <span>Report Issue</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Objectives */}
            <Card className="col-span-1 md:col-span-2 border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50">
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-300">
                  <CheckSquare size={18} />
                  Learning Objectives
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {lessonPlan.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3 group">
                      <div className="mt-1 min-w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p>{objective}</p>
                        <div className="mt-1 hidden group-hover:flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                          >
                            <PenSquare size={12} className="mr-1" /> Edit
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Essential Information */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
                <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <BookOpen size={18} />
                  Essential Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <p className="text-sm font-medium">Subject Area</p>
                  <p className="text-muted-foreground">{lessonPlan.subject}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Grade Level</p>
                  <p className="text-muted-foreground">{lessonPlan.grade}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Duration</p>
                  <p className="text-muted-foreground">{lessonPlan.duration}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-muted-foreground">{lessonPlan.date}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Resources */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50">
              <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                <FileText size={18} />
                Materials and Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {lessonPlan.resources.map((resource, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md bg-muted/30 group hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-8 w-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-medium">
                      {index + 1}
                    </div>
                    <span className="flex-1">{resource}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Assessment & Differentiation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Assessment */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/50 dark:to-purple-950/50">
                <CardTitle className="text-violet-800 dark:text-violet-300">
                  Assessment
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>{lessonPlan.assessment}</p>
              </CardContent>
            </Card>

            {/* Differentiation */}
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50">
                <CardTitle className="text-pink-800 dark:text-pink-300">
                  Differentiation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p>{lessonPlan.differentiation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Homework */}
          <Card className="border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-950/50 dark:to-slate-950/50">
              <CardTitle>Homework</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>{lessonPlan.homework}</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* The rest of the tabs can remain the same with styling improvements */}
        {/* Lesson Flow Tab */}
        <TabsContent value="lesson-flow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock size={18} />
                Lesson Procedure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {lessonPlan.procedures.map((procedure, index) => (
                  <div key={index} className="relative pl-8">
                    {index !== lessonPlan.procedures.length - 1 && (
                      <div className="absolute top-6 bottom-0 left-3 w-0.5 bg-muted"></div>
                    )}
                    <div className="absolute top-1 left-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{procedure.title}</h3>
                      <p className="mt-2 text-muted-foreground">
                        {procedure.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">
                  Time distribution chart will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lessonPlan.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{attachment.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 3h6v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Online Practice Problems</p>
                      <p className="text-sm text-muted-foreground">
                        Interactive algebra exercises
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Open Link
                  </Button>
                </div>
                <div className="p-3 border rounded-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 3h6v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 14L21 3"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Algebra Video Tutorial</p>
                      <p className="text-sm text-muted-foreground">
                        Visual explanation of key concepts
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Open Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{lessonPlan.notes}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reflection Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-dashed rounded-md bg-muted/30 flex flex-col items-center justify-center text-center space-y-2">
                <p>Add your post-lesson reflections here</p>
                <Button variant="outline">Add Reflection</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Edit History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={lessonPlan.teacher.avatar}
                      alt={lessonPlan.teacher.name}
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{lessonPlan.teacher.name}</p>
                      <Badge variant="outline" className="text-xs">
                        Current Version
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Updated on October 12, 2023 at 3:45 PM
                    </p>
                    <p className="mt-1">
                      Added assessment section and homework details
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={lessonPlan.teacher.avatar}
                      alt={lessonPlan.teacher.name}
                    />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{lessonPlan.teacher.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Created on October 10, 2023 at 10:15 AM
                    </p>
                    <p className="mt-1">Initial draft created</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
