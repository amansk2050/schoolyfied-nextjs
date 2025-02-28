"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import {
  BookOpen,
  FileUp,
  PlusCircle,
  Search,
  BarChart3,
  FileText,
  Clock,
  ArrowUpRight,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { FaBookReader } from "react-icons/fa";

// Reorganized mock data grouped by class
const syllabusData = {
  "Class 10": [
    {
      id: 1,
      subject: "Mathematics",
      completion: 78,
      topics: 24,
      lastUpdated: "2 days ago",
    },
    {
      id: 6,
      subject: "Social Studies",
      completion: 82,
      topics: 22,
      lastUpdated: "Yesterday",
    },
  ],
  "Class 9": [
    {
      id: 2,
      subject: "Science",
      completion: 65,
      topics: 32,
      lastUpdated: "1 week ago",
    },
  ],
  "Class 8": [
    {
      id: 3,
      subject: "English",
      completion: 92,
      topics: 18,
      lastUpdated: "1 day ago",
    },
  ],
  "Class 12": [
    {
      id: 4,
      subject: "Physics",
      completion: 45,
      topics: 28,
      lastUpdated: "3 days ago",
    },
  ],
  "Class 11": [
    {
      id: 5,
      subject: "Chemistry",
      completion: 58,
      topics: 26,
      lastUpdated: "5 days ago",
    },
  ],
};

function SyllabusPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");

  const classes = Object.keys(syllabusData);
  const filteredClasses = classes.filter((className) =>
    className.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTotalCompletion = () => {
    let total = 0;
    let count = 0;
    Object.values(syllabusData).forEach((subjects) => {
      subjects.forEach((subject) => {
        total += subject.completion;
        count++;
      });
    });
    return count ? Math.round(total / count) : 0;
  };

  const navigateToClassroom = (classId: number) => {
    router.push(`/menu/class-room/${classId}?tab=syllabus`);
  };

  // Count total subjects across all classes
  const totalSubjects = Object.values(syllabusData).reduce(
    (acc, subjects) => acc + subjects.length,
    0
  );

  // Count completed subjects (those with completion >= 90%)
  const completedSubjects = Object.values(syllabusData).reduce(
    (acc, subjects) =>
      acc + subjects.filter((subject) => subject.completion >= 90).length,
    0
  );

  // Calculate overall progress
  const overallProgress = getTotalCompletion();

  return (
    <div className="min-h-screen bg-white">
      <div className="px-6 py-6 space-y-8">
        {/* Hero Section with Statistics - inspired by lesson plan page */}
        <div className="rounded-xl bg-gradient-to-r from-primary to-indigo-600 text-white p-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Syllabus Management
            </h1>
            <p className="mt-2 text-primary-foreground/90">
              Track curriculum progress and manage syllabus content across all
              classes
            </p>
          </div>

          {/* Statistics cards inside hero section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-primary-foreground/80">Total Classes</div>
              <div className="text-2xl font-bold mt-1">{classes.length}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-primary-foreground/80">Total Subjects</div>
              <div className="text-2xl font-bold mt-1">{totalSubjects}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-primary-foreground/80">Completed</div>
              <div className="text-2xl font-bold mt-1">{completedSubjects}</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="text-primary-foreground/80">
                Average Completion
              </div>
              <div className="text-2xl font-bold mt-1">{overallProgress}%</div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="container mx-auto max-w-7xl">
          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 p-1 bg-background shadow-sm rounded-lg border mb-6">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <BarChart3 className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger
                value="add"
                className="flex items-center gap-2 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
              >
                <FileUp className="h-4 w-4" /> Add Syllabus
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-10">
              {/* Enhanced Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by class..."
                  className="pl-12 py-6 pr-4 bg-background rounded-xl shadow-sm border text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Enhanced Class Groups - now immediately after search */}
              <div className="space-y-12">
                {filteredClasses.map((className) => (
                  <div key={className} className="space-y-6 relative">
                    <div className="flex items-center gap-3">
                      <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-primary" />
                        {className}
                      </h2>
                      <div className="h-px bg-border flex-grow"></div>
                      <span className="text-muted-foreground text-sm px-3 py-1 bg-muted rounded-full">
                        {syllabusData[className].length} subjects
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {syllabusData[className].map((item) => (
                        <Card
                          key={item.id}
                          className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-background overflow-hidden border"
                        >
                          {/* Progress indicator at top */}
                          <div
                            className="h-1.5 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 w-full"
                            style={{
                              clipPath: `inset(0 ${100 - item.completion}% 0 0)`,
                            }}
                          />

                          <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                              <CardTitle className="text-xl font-semibold">
                                {item.subject}
                              </CardTitle>
                              <div
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  item.completion >= 75
                                    ? "bg-green-100 text-green-800 border border-green-200"
                                    : item.completion >= 50
                                      ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                      : "bg-red-100 text-red-800 border border-red-200"
                                } shadow-sm`}
                              >
                                {item.completion}% Complete
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="pb-2 space-y-3">
                            {/* Progress bar moved closer to title */}
                            <Progress
                              value={item.completion}
                              className="h-2 rounded-md"
                              style={
                                {
                                  "--progress-color":
                                    item.completion >= 75
                                      ? "var(--green-600)"
                                      : item.completion >= 50
                                        ? "var(--yellow-600)"
                                        : "var(--red-600)",
                                } as any
                              }
                            />

                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-1.5">
                                <div className="p-1.5 bg-muted rounded-md">
                                  <FileText className="h-3.5 w-3.5" />
                                </div>
                                <span>{item.topics} Topics</span>
                              </div>
                              <div className="flex items-center gap-1.5">
                                <div className="p-1.5 bg-muted rounded-md">
                                  <Clock className="h-3.5 w-3.5" />
                                </div>
                                <span>{item.lastUpdated}</span>
                              </div>
                            </div>
                          </CardContent>

                          <CardFooter>
                            <Button
                              variant="default"
                              className="w-full mt-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                              onClick={() => navigateToClassroom(item.id)}
                            >
                              <span className="flex items-center justify-between w-full">
                                View Details
                                <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                              </span>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}

                {filteredClasses.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/30 rounded-2xl border border-border">
                    <div className="rounded-full bg-muted/50 p-6 mb-6">
                      <FaBookReader className="h-16 w-16 text-muted-foreground opacity-50" />
                    </div>
                    <h3 className="text-2xl font-medium mb-2">
                      No classes found
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Try searching for a different class or browse all
                      available classes
                    </p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear search
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Add Syllabus Tab */}
            <TabsContent value="add" className="space-y-6">
              <Card className="bg-background shadow-sm overflow-hidden">
                <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-blue-500"></div>

                <CardHeader>
                  <CardTitle className="text-2xl">Add New Syllabus</CardTitle>
                  <CardDescription>
                    Create a syllabus by entering details manually or uploading
                    a PDF file
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="manual" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger
                        value="manual"
                        className="flex items-center gap-2"
                      >
                        <BookOpen className="h-4 w-4" /> Manual Entry
                      </TabsTrigger>
                      <TabsTrigger
                        value="upload"
                        className="flex items-center gap-2"
                      >
                        <FileUp className="h-4 w-4" /> PDF Upload
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="class">Class</Label>
                          <Select>
                            <SelectTrigger id="class">
                              <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-8">Class 8</SelectItem>
                              <SelectItem value="class-9">Class 9</SelectItem>
                              <SelectItem value="class-10">Class 10</SelectItem>
                              <SelectItem value="class-11">Class 11</SelectItem>
                              <SelectItem value="class-12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select>
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">
                                Mathematics
                              </SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="social-studies">
                                Social Studies
                              </SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="chemistry">
                                Chemistry
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Syllabus Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g. Mathematics Syllabus 2023-24"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description about this syllabus..."
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Topics</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-xs"
                          >
                            <PlusCircle className="h-3 w-3" /> Add Topic
                          </Button>
                        </div>

                        <Card>
                          <CardContent className="p-3">
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Topic title"
                                  className="flex-grow"
                                />
                                <Select defaultValue="week-1">
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Timeline" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="week-1">
                                      Week 1
                                    </SelectItem>
                                    <SelectItem value="week-2">
                                      Week 2
                                    </SelectItem>
                                    <SelectItem value="week-3">
                                      Week 3
                                    </SelectItem>
                                    <SelectItem value="week-4">
                                      Week 4
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Topic title"
                                  className="flex-grow"
                                />
                                <Select defaultValue="week-2">
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Timeline" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="week-1">
                                      Week 1
                                    </SelectItem>
                                    <SelectItem value="week-2">
                                      Week 2
                                    </SelectItem>
                                    <SelectItem value="week-3">
                                      Week 3
                                    </SelectItem>
                                    <SelectItem value="week-4">
                                      Week 4
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="upload" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="upload-class">Class</Label>
                          <Select>
                            <SelectTrigger id="upload-class">
                              <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="class-8">Class 8</SelectItem>
                              <SelectItem value="class-9">Class 9</SelectItem>
                              <SelectItem value="class-10">Class 10</SelectItem>
                              <SelectItem value="class-11">Class 11</SelectItem>
                              <SelectItem value="class-12">Class 12</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="upload-subject">Subject</Label>
                          <Select>
                            <SelectTrigger id="upload-subject">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">
                                Mathematics
                              </SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="social-studies">
                                Social Studies
                              </SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                              <SelectItem value="chemistry">
                                Chemistry
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="upload-title">Syllabus Title</Label>
                        <Input
                          id="upload-title"
                          placeholder="e.g. Mathematics Syllabus 2023-24"
                        />
                      </div>

                      <div className="border-2 border-dashed rounded-lg p-8 text-center space-y-3 cursor-pointer hover:bg-secondary/50 transition-colors">
                        <div className="flex justify-center">
                          <FileUp className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            Click to upload or drag & drop
                          </p>
                          <p className="text-xs text-muted-foreground">
                            PDF files only (Max 10MB)
                          </p>
                        </div>
                        <Input type="file" accept=".pdf" className="hidden" />
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("overview")}
                  >
                    Cancel
                  </Button>
                  <Button>Save Syllabus</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default SyllabusPage;
