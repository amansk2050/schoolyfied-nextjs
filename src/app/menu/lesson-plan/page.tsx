"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  BookOpen,
  GraduationCap,
  Calendar,
  Users,
  ChevronRight,
  ArrowLeft,
  FileText,
  CheckCircle2,
} from "lucide-react";

import CreateLessonPlanForm from "./components/CreateLessonPlanForm";
import LessonPlanCard from "./components/LessonPlanCard";
import LessonPlanListItem from "./components/LessonPlanListItem";

// Mock data for demonstration
const mockLessonPlans = [
  {
    id: "1",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    grade: "9th Grade",
    date: "2023-10-15",
    duration: "45 minutes",
    status: "published",
    teacher: "Dr. Smith",
    objectives: [
      "Understanding basic algebraic expressions",
      "Solving simple equations",
    ],
    resources: ["Textbook Chapter 3", "Interactive Whiteboard"],
  },
  {
    id: "2",
    title: "World War II Overview",
    subject: "History",
    grade: "10th Grade",
    date: "2023-10-18",
    duration: "60 minutes",
    status: "draft",
    teacher: "Mrs. Johnson",
    objectives: [
      "Understand the major causes of WWII",
      "Identify key turning points in the war",
    ],
    resources: ["Historical Maps", "Documentary Clips"],
  },
  {
    id: "3",
    title: "Cell Structure and Function",
    subject: "Biology",
    grade: "11th Grade",
    date: "2023-10-20",
    duration: "90 minutes",
    status: "published",
    teacher: "Mr. Roberts",
    objectives: ["Identify parts of a cell", "Understand cell functions"],
    resources: ["Microscopes", "Cell Models"],
  },
  {
    id: "4",
    title: "Shakespeare's Macbeth",
    subject: "English Literature",
    grade: "12th Grade",
    date: "2023-10-22",
    duration: "45 minutes",
    status: "published",
    teacher: "Ms. Davis",
    objectives: [
      "Analyze key themes in Macbeth",
      "Discuss character motivations",
    ],
    resources: ["Macbeth Text", "Video Performance Clips"],
  },
];

// Group lesson plans by grade
const gradeGroups = {
  "6th Grade": mockLessonPlans.filter((plan) => plan.grade === "6th Grade"),
  "7th Grade": mockLessonPlans.filter((plan) => plan.grade === "7th Grade"),
  "8th Grade": mockLessonPlans.filter((plan) => plan.grade === "8th Grade"),
  "9th Grade": mockLessonPlans.filter((plan) => plan.grade === "9th Grade"),
  "10th Grade": mockLessonPlans.filter((plan) => plan.grade === "10th Grade"),
  "11th Grade": mockLessonPlans.filter((plan) => plan.grade === "11th Grade"),
  "12th Grade": mockLessonPlans.filter((plan) => plan.grade === "12th Grade"),
};

// Group lesson plans by subject
const subjectGroups = {
  Mathematics: mockLessonPlans.filter((plan) => plan.subject === "Mathematics"),
  "English Literature": mockLessonPlans.filter(
    (plan) => plan.subject === "English Literature"
  ),
  Biology: mockLessonPlans.filter((plan) => plan.subject === "Biology"),
  History: mockLessonPlans.filter((plan) => plan.subject === "History"),
};

// Count number of lesson plans per grade
const gradeCounts = Object.entries(gradeGroups).reduce(
  (acc, [grade, plans]) => {
    acc[grade] = plans.length;
    return acc;
  },
  {} as Record<string, number>
);

// Count number of lesson plans per subject
const subjectCounts = Object.entries(subjectGroups).reduce(
  (acc, [subject, plans]) => {
    acc[subject] = plans.length;
    return acc;
  },
  {} as Record<string, number>
);

function LessonPlanPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewType, setViewType] = useState("modern");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  // New state to track the active view
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard", "subject", "grade"
  const [activeViewTitle, setActiveViewTitle] = useState("");

  // Handle navigation to subject view
  const navigateToSubject = (subject: string) => {
    setSubjectFilter(subject);
    setGradeFilter("all");
    setActiveView("subject");
    setActiveViewTitle(subject);
    setViewType("grid"); // Switch to grid view for better browsing
  };

  // Handle navigation to grade/class view
  const navigateToGrade = (grade: string) => {
    setGradeFilter(grade);
    setSubjectFilter("all");
    setActiveView("grade");
    setActiveViewTitle(grade);
    setViewType("grid"); // Switch to grid view for better browsing
  };

  // Return to main dashboard (enhanced with clearer logic)
  const returnToDashboard = () => {
    setActiveView("dashboard");
    setSubjectFilter("all");
    setGradeFilter("all");
    setStatusFilter("all");
    setSearchTerm("");
    setViewType("modern");
  };

  // Filter lesson plans based on search and filters
  const filteredLessonPlans = mockLessonPlans.filter((plan) => {
    const matchesSearch = searchTerm
      ? plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.subject.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesSubject =
      subjectFilter === "all" || plan.subject === subjectFilter;

    const matchesGrade = gradeFilter === "all" || plan.grade === gradeFilter;

    const matchesStatus =
      statusFilter === "all" || plan.status === statusFilter;

    return matchesSearch && matchesSubject && matchesGrade && matchesStatus;
  });

  // Update the UI when filters change
  React.useEffect(() => {
    // If using filters in dashboard view, switch to grid view for better browsing
    if (
      (searchTerm ||
        subjectFilter !== "all" ||
        gradeFilter !== "all" ||
        statusFilter !== "all") &&
      viewType === "modern" &&
      activeView === "dashboard"
    ) {
      setViewType("grid");
    }

    // If we're in a filtered view but all filters are cleared, go back to dashboard
    if (
      subjectFilter === "all" &&
      gradeFilter === "all" &&
      !searchTerm &&
      activeView !== "dashboard" &&
      statusFilter === "all"
    ) {
      setActiveView("dashboard");
      setActiveViewTitle("");
      setViewType("modern");
    }
  }, [
    searchTerm,
    subjectFilter,
    gradeFilter,
    statusFilter,
    viewType,
    activeView,
  ]);

  const uniqueSubjects = Array.from(
    new Set(mockLessonPlans.map((plan) => plan.subject))
  );

  const uniqueGrades = Array.from(
    new Set(mockLessonPlans.map((plan) => plan.grade))
  );

  const handleEdit = (id: string) => {
    console.log(`Edit lesson plan with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log(`Delete lesson plan with id: ${id}`);
    // Implement delete functionality
  };

  const handleDuplicate = (id: string) => {
    console.log(`Duplicate lesson plan with id: ${id}`);
    // Implement duplicate functionality
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    console.log(`Change lesson plan ${id} status to: ${newStatus}`);
    // Implement status change functionality
  };

  // Get random but consistent gradient colors for cards
  // Use a seed based on the grade/subject name to ensure consistency
  const getGradientColor = (seed: string) => {
    const gradients = [
      "from-blue-500 to-violet-500",
      "from-pink-500 to-rose-500",
      "from-amber-500 to-orange-500",
      "from-emerald-500 to-teal-500",
      "from-fuchsia-500 to-purple-500",
      "from-cyan-500 to-sky-500",
    ];

    // Simple hash function to get consistent index from string
    const hashCode = seed.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    // Use absolute value and modulo to get index in range
    const index = Math.abs(hashCode) % gradients.length;
    return gradients[index];
  };

  // Modified handler for view type change
  const handleViewTypeChange = (type: string) => {
    // If switching to modern view while filters are applied, reset filters and go to dashboard
    if (
      type === "modern" &&
      (searchTerm ||
        subjectFilter !== "all" ||
        gradeFilter !== "all" ||
        statusFilter !== "all")
    ) {
      returnToDashboard();
    } else {
      setViewType(type);
    }
  };

  return (
    <div className="px-6 py-6 space-y-8">
      {/* Hero Section with Statistics */}
      <div className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-8">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Lesson Plans</h1>
            <p className="mt-2 text-violet-100">
              Create, manage, and organize your teaching materials across all
              classes and subjects
            </p>
          </div>
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="lg"
                className="flex items-center gap-2 font-medium"
              >
                <Plus size={18} />
                <span>Create Lesson Plan</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Lesson Plan</DialogTitle>
                <DialogDescription>
                  Fill in the details below to create a new lesson plan.
                </DialogDescription>
              </DialogHeader>

              <CreateLessonPlanForm
                onClose={() => setIsCreateDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Total Lesson Plans</div>
            <div className="text-2xl font-bold mt-1">
              {mockLessonPlans.length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Published</div>
            <div className="text-2xl font-bold mt-1">
              {
                mockLessonPlans.filter((plan) => plan.status === "published")
                  .length
              }
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Drafts</div>
            <div className="text-2xl font-bold mt-1">
              {mockLessonPlans.filter((plan) => plan.status === "draft").length}
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
            <div className="text-violet-200">Classes Covered</div>
            <div className="text-2xl font-bold mt-1">{uniqueGrades.length}</div>
          </div>
        </div>
      </div>

      {/* Filters and View Selection */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Back button when in subject or grade view - modified to just show title without the back button */}
        {(activeView !== "dashboard" ||
          searchTerm ||
          subjectFilter !== "all" ||
          gradeFilter !== "all" ||
          statusFilter !== "all") && (
          <div className="flex items-center mb-4 md:mb-0">
            {/* "Back to All Plans" button removed as requested */}
            <h2 className="text-xl font-medium">
              {activeView === "subject" ? (
                <span className="flex items-center gap-2">
                  <BookOpen className="text-primary" size={20} />
                  {activeViewTitle} Lessons
                </span>
              ) : activeView === "grade" ? (
                <span className="flex items-center gap-2">
                  <GraduationCap className="text-primary" size={20} />
                  {activeViewTitle} Curriculum
                </span>
              ) : searchTerm ? (
                <span className="flex items-center gap-2">
                  <Search className="text-primary" size={20} />
                  Search Results
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Filter className="text-primary" size={20} />
                  Filtered Results
                </span>
              )}
            </h2>
          </div>
        )}

        {/* Search and filters */}
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative flex-1 md:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search lesson plans..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="p-2 space-y-2">
                <div className="space-y-1">
                  <Label>Subject</Label>
                  <Select
                    value={subjectFilter}
                    onValueChange={setSubjectFilter}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {uniqueSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Grade/Class</Label>
                  <Select value={gradeFilter} onValueChange={setGradeFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      {uniqueGrades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Sort by Date (Newest)</DropdownMenuItem>
              <DropdownMenuItem>Sort by Date (Oldest)</DropdownMenuItem>
              <DropdownMenuItem>Sort by Title (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Sort by Title (Z-A)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center space-x-2">
          <Tabs
            defaultValue={viewType}
            value={viewType}
            onValueChange={handleViewTypeChange}
            className="w-[280px]"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="modern"
                title={
                  searchTerm ||
                  subjectFilter !== "all" ||
                  gradeFilter !== "all" ||
                  statusFilter !== "all"
                    ? "Return to dashboard view"
                    : "Modern view"
                }
                className={
                  searchTerm ||
                  subjectFilter !== "all" ||
                  gradeFilter !== "all" ||
                  statusFilter !== "all"
                    ? "font-medium"
                    : ""
                }
              >
                Modern
              </TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Separate Dashboard button removed, but "Back to Dashboard" functionality preserved in view type change */}
        </div>
      </div>

      {/* Content Header - to clearly show what we're looking at */}
      {(searchTerm ||
        subjectFilter !== "all" ||
        gradeFilter !== "all" ||
        statusFilter !== "all") &&
        activeView === "dashboard" &&
        viewType !== "modern" && (
          <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                {subjectFilter !== "all" ? (
                  <BookOpen size={18} className="text-primary" />
                ) : gradeFilter !== "all" ? (
                  <GraduationCap size={18} className="text-primary" />
                ) : (
                  <Filter size={18} className="text-primary" />
                )}
              </div>
              <div>
                <h3 className="font-medium">
                  {subjectFilter !== "all"
                    ? `${subjectFilter} Lessons`
                    : gradeFilter !== "all"
                      ? `${gradeFilter} Curriculum`
                      : searchTerm
                        ? `Search Results for "${searchTerm}"`
                        : "Filtered Results"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredLessonPlans.length} lesson plan
                  {filteredLessonPlans.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={returnToDashboard}>
              <ArrowLeft size={14} className="mr-1" />
              Back to Dashboard
            </Button>
          </div>
        )}

      {/* Main Content */}
      {activeView === "dashboard" && viewType === "modern" ? (
        <div className="space-y-10">
          {/* Class/Grade Based View */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
              <GraduationCap className="mr-2" />
              Browse by Class
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(gradeGroups).map(
                ([grade, plans]) =>
                  plans.length > 0 && (
                    <Card
                      key={grade}
                      className="overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigateToGrade(grade)}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`bg-gradient-to-r ${getGradientColor(grade)} p-6 text-white`}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">{grade}</h3>
                            <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm">
                              {gradeCounts[grade]} plans
                            </span>
                          </div>
                          <p className="text-sm mt-2 text-white/80">
                            Browse all lesson plans for {grade} students
                          </p>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {plans.length} available lessons
                            </p>
                            <p className="text-sm font-medium">
                              {
                                Object.keys(
                                  plans.reduce(
                                    (acc, plan) => ({
                                      ...acc,
                                      [plan.subject]: true,
                                    }),
                                    {}
                                  )
                                ).length
                              }{" "}
                              subjects
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>
          </div>

          {/* Subject Based View */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center">
              <BookOpen className="mr-2" />
              Browse by Subject
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(subjectGroups).map(
                ([subject, plans]) =>
                  plans.length > 0 && (
                    <Card
                      key={subject}
                      className="overflow-hidden group hover:shadow-md transition-all cursor-pointer"
                      onClick={() => navigateToSubject(subject)}
                    >
                      <CardContent className="p-0">
                        <div
                          className={`bg-gradient-to-r ${getGradientColor(subject)} p-6 text-white`}
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold truncate max-w-[70%]">
                              {subject}
                            </h3>
                            <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm whitespace-nowrap">
                              {subjectCounts[subject]}{" "}
                              {subjectCounts[subject] === 1 ? "plan" : "plans"}
                            </span>
                          </div>
                          <p className="text-sm mt-2 text-white/80">
                            Browse all lesson plans for {subject}
                          </p>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {plans.length} available lessons
                            </p>
                            <p className="text-sm font-medium">
                              {
                                Object.keys(
                                  plans.reduce(
                                    (acc, plan) => ({
                                      ...acc,
                                      [plan.grade]: true,
                                    }),
                                    {}
                                  )
                                ).length
                              }{" "}
                              classes
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="group-hover:translate-x-1 transition-transform"
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )
              )}
            </div>
          </div>

          {/* Recent Lesson Plans */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center">
                <Calendar className="mr-2" />
                Recent Lesson Plans
              </h2>
              <Button variant="ghost" className="text-primary">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLessonPlans.slice(0, 3).map((plan) => (
                <LessonPlanCard
                  key={plan.id}
                  plan={plan}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </div>

          {/* Accordion for all classes */}
          <div className="space-y-6 mt-10">
            <h2 className="text-2xl font-bold flex items-center">
              <Users className="mr-2" />
              Lesson Plans by Class
            </h2>

            <Accordion type="single" collapsible className="w-full">
              {Object.entries(gradeGroups).map(
                ([grade, plans]) =>
                  plans.length > 0 && (
                    <AccordionItem key={grade} value={grade}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <GraduationCap className="mr-2 h-5 w-5" />
                          <span>{grade}</span>
                          <span className="ml-2 bg-muted px-2 py-0.5 rounded text-xs">
                            {plans.length} plans
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Group by subjects within this grade */}
                          {Object.entries(
                            plans.reduce(
                              (acc, plan) => {
                                if (!acc[plan.subject]) acc[plan.subject] = [];
                                acc[plan.subject].push(plan);
                                return acc;
                              },
                              {} as Record<string, typeof plans>
                            )
                          ).map(([subject, subjectPlans]) => (
                            <Card key={subject} className="overflow-hidden">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-primary flex items-center mb-3">
                                  <BookOpen className="mr-2 h-4 w-4" />
                                  {subject}
                                </h4>
                                <ul className="space-y-2">
                                  {subjectPlans.map((plan) => (
                                    <li
                                      key={plan.id}
                                      className="border-b pb-2 last:border-0"
                                    >
                                      <div className="flex justify-between items-center">
                                        <div className="flex-1">
                                          <p className="font-medium truncate">
                                            {plan.title}
                                          </p>
                                          <p className="text-xs text-muted-foreground">
                                            {plan.date}
                                          </p>
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          asChild
                                        >
                                          <a
                                            href={`/menu/lesson-plan/${plan.id}`}
                                          >
                                            View
                                          </a>
                                        </Button>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  )
              )}
            </Accordion>
          </div>
        </div>
      ) : viewType === "grid" ? (
        <div>
          {/* Show a message if no results are found */}
          {filteredLessonPlans.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-muted inline-flex rounded-full p-4 mb-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                No lesson plans found
              </h3>
              <p className="text-muted-foreground mb-2">
                Try adjusting your search or filter criteria
              </p>
              <div className="flex items-center justify-center gap-4">
                {searchTerm && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                )}
                {(subjectFilter !== "all" ||
                  gradeFilter !== "all" ||
                  statusFilter !== "all") && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSubjectFilter("all");
                      setGradeFilter("all");
                      setStatusFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Only show statistics in filtered views or when searching */}
              {(activeView !== "dashboard" ||
                searchTerm ||
                subjectFilter !== "all" ||
                gradeFilter !== "all" ||
                statusFilter !== "all") && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Plans
                        </p>
                        <p className="text-2xl font-bold">
                          {filteredLessonPlans.length}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <CheckCircle2 className="h-6 w-6 text-green-700" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Published
                        </p>
                        <p className="text-2xl font-bold">
                          {
                            filteredLessonPlans.filter(
                              (p) => p.status === "published"
                            ).length
                          }
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {activeView === "subject" ? (
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-indigo-100 p-3 rounded-full">
                          <GraduationCap className="h-6 w-6 text-indigo-700" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Classes Covered
                          </p>
                          <p className="text-2xl font-bold">
                            {
                              new Set(
                                filteredLessonPlans.map((plan) => plan.grade)
                              ).size
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-violet-100 p-3 rounded-full">
                          <BookOpen className="h-6 w-6 text-violet-700" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Subjects Covered
                          </p>
                          <p className="text-2xl font-bold">
                            {
                              new Set(
                                filteredLessonPlans.map((plan) => plan.subject)
                              ).size
                            }
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredLessonPlans.map((plan) => (
                  <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onDuplicate={handleDuplicate}
                    onStatusChange={handleStatusChange}
                    highlightAttribute={
                      activeView === "subject"
                        ? "grade"
                        : activeView === "grade"
                          ? "subject"
                          : undefined
                    }
                  />
                ))}
              </div>

              {/* Add pagination if there are many lessons */}
              {filteredLessonPlans.length > 9 && (
                <div className="flex justify-center mt-6">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-primary/10"
                    >
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="bg-background rounded-md border">
          <div className="grid grid-cols-12 px-4 py-3 font-medium text-sm">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Subject/Grade</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <ScrollArea className="max-h-[60vh]">
            {filteredLessonPlans.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                No lesson plans match your search criteria
              </div>
            ) : (
              filteredLessonPlans.map((plan, index) => (
                <LessonPlanListItem
                  key={plan.id}
                  plan={plan}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onDuplicate={handleDuplicate}
                  onStatusChange={handleStatusChange}
                  isLast={index === filteredLessonPlans.length - 1}
                />
              ))
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}

export default LessonPlanPage;
