"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";
import {
  Star,
  Users,
  BookOpen,
  Clock,
  Calendar,
  User,
  UserCheck,
  ChevronLeft,
  PlusCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

// Mock data - replace with actual API calls
const classInfo = {
  className: "Class 10 A",
  classTeacher: "Ms. Sarah Johnson",
  totalStudents: 42,
  boys: 24,
  girls: 18,
  classMonitor: "Alex Smith",
};

const subjectTeachers = [
  { subject: "Mathematics", teacher: "Mr. Robert Wilson", type: "Core" },
  { subject: "Science", teacher: "Dr. Emily Parker", type: "Core" },
  { subject: "English", teacher: "Ms. Olivia Green", type: "Core" },
  { subject: "History", teacher: "Mr. James Brown", type: "Core" },
  {
    subject: "Computer Science",
    teacher: "Ms. Jessica Williams",
    type: "Elective",
  },
  {
    subject: "Physical Education",
    teacher: "Mr. Daniel Turner",
    type: "Elective",
  },
];

const students = [
  {
    id: 1,
    name: "Aiden Thompson",
    rollNo: "10A01",
    gender: "Male",
    attendance: "92%",
    performance: "Excellent",
  },
  {
    id: 2,
    name: "Sophia Martinez",
    rollNo: "10A02",
    gender: "Female",
    attendance: "95%",
    performance: "Excellent",
  },
  {
    id: 3,
    name: "Ethan Williams",
    rollNo: "10A03",
    gender: "Male",
    attendance: "88%",
    performance: "Good",
  },
  {
    id: 4,
    name: "Isabella Johnson",
    rollNo: "10A04",
    gender: "Female",
    attendance: "93%",
    performance: "Excellent",
  },
  {
    id: 5,
    name: "Noah Brown",
    rollNo: "10A05",
    gender: "Male",
    attendance: "85%",
    performance: "Average",
  },
  {
    id: 6,
    name: "Emma Davis",
    rollNo: "10A06",
    gender: "Female",
    attendance: "91%",
    performance: "Good",
  },
  {
    id: 7,
    name: "Mason Wilson",
    rollNo: "10A07",
    gender: "Male",
    attendance: "94%",
    performance: "Excellent",
  },
  {
    id: 8,
    name: "Olivia Smith",
    rollNo: "10A08",
    gender: "Female",
    attendance: "89%",
    performance: "Good",
  },
];

const syllabusData = [
  { subject: "Mathematics", completed: 65, total: 24, remaining: 9 },
  { subject: "Science", completed: 70, total: 30, remaining: 9 },
  { subject: "English", completed: 80, total: 20, remaining: 4 },
  { subject: "History", completed: 60, total: 18, remaining: 7 },
  { subject: "Computer Science", completed: 75, total: 16, remaining: 4 },
];

const radarData = [
  {
    subject: "Math",
    subjectFull: "Mathematics",
    completion: 65,
    color: "#8884d8",
  },
  { subject: "Sci", subjectFull: "Science", completion: 70, color: "#82ca9d" },
  { subject: "Eng", subjectFull: "English", completion: 80, color: "#ffc658" },
  { subject: "His", subjectFull: "History", completion: 60, color: "#ff8042" },
  {
    subject: "CS",
    subjectFull: "Computer Science",
    completion: 75,
    color: "#0088fe",
  },
];

const detailedSyllabusData = {
  mathematics: [
    {
      id: 1,
      topic: "Algebra: Linear Equations",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 2,
      topic: "Geometry: Triangles and Theorems",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 3,
      topic: "Statistics: Mean, Median, Mode",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 4,
      topic: "Trigonometry: Introduction",
      status: "in-progress",
      progress: 45,
      dueDate: "Nov 15, 2023",
    },
    {
      id: 5,
      topic: "Calculus: Differentiation",
      status: "not-started",
      progress: 0,
      dueDate: "Dec 1, 2023",
    },
    {
      id: 6,
      topic: "Calculus: Integration",
      status: "not-started",
      progress: 0,
      dueDate: "Dec 15, 2023",
    },
  ],
  science: [
    {
      id: 1,
      topic: "Physics: Motion and Force",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 2,
      topic: "Chemistry: Periodic Table",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 3,
      topic: "Biology: Cell Structure",
      status: "in-progress",
      progress: 65,
      dueDate: "Nov 10, 2023",
    },
    {
      id: 4,
      topic: "Physics: Electricity and Magnetism",
      status: "not-started",
      progress: 0,
      dueDate: "Dec 5, 2023",
    },
  ],
  english: [
    {
      id: 1,
      topic: "Grammar: Parts of Speech",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 2,
      topic: "Literature: Shakespeare's Plays",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 3,
      topic: "Writing: Essay Composition",
      status: "not-started",
      progress: 0,
      dueDate: "Nov 20, 2023",
    },
  ],
  history: [
    {
      id: 1,
      topic: "Ancient Civilizations",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 2,
      topic: "Medieval Period",
      status: "in-progress",
      progress: 50,
      dueDate: "Nov 25, 2023",
    },
    {
      id: 3,
      topic: "Modern History",
      status: "not-started",
      progress: 0,
      dueDate: "Dec 10, 2023",
    },
  ],
  cs: [
    {
      id: 1,
      topic: "Introduction to Programming",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 2,
      topic: "Data Types and Variables",
      status: "completed",
      progress: 100,
      dueDate: "Completed",
    },
    {
      id: 3,
      topic: "Control Structures",
      status: "in-progress",
      progress: 70,
      dueDate: "Nov 5, 2023",
    },
    {
      id: 4,
      topic: "Arrays and Functions",
      status: "not-started",
      progress: 0,
      dueDate: "Nov 30, 2023",
    },
  ],
};

const classRoutine = [
  {
    day: "Monday",
    periods: [
      "Mathematics",
      "English",
      "Science",
      "History",
      "Lunch",
      "Computer Science",
      "Physical Education",
      "Library",
    ],
  },
  {
    day: "Tuesday",
    periods: [
      "Science",
      "Mathematics",
      "English",
      "Computer Science",
      "Lunch",
      "History",
      "Art",
      "Sports",
    ],
  },
  {
    day: "Wednesday",
    periods: [
      "English",
      "Mathematics",
      "Science",
      "History",
      "Lunch",
      "Computer Science",
      "Music",
      "Club Activities",
    ],
  },
  {
    day: "Thursday",
    periods: [
      "Mathematics",
      "Science",
      "English",
      "Computer Science",
      "Lunch",
      "History",
      "Physical Education",
      "Debate",
    ],
  },
  {
    day: "Friday",
    periods: [
      "Science",
      "Mathematics",
      "English",
      "History",
      "Lunch",
      "Computer Science",
      "Moral Science",
      "Quiz",
    ],
  },
];

// Enhanced reviews data with more detailed feedback
const classReviews = [
  {
    id: 1,
    reviewer: "School Principal",
    reviewerRole: "Administration",
    avatar: "Sarah Johnson",
    rating: 4.5,
    comment:
      "One of our best performing classes with excellent discipline. The students show great potential and dedication to their studies. Keep up the good work!",
    date: "2023-05-15",
    sentiment: "positive",
    categories: ["academics", "discipline"],
  },
  {
    id: 2,
    reviewer: "Vice Principal",
    reviewerRole: "Administration",
    avatar: "Michael Davis",
    rating: 4.2,
    comment:
      "Students show great enthusiasm in extra-curricular activities. However, they need to maintain the same level of energy in academic subjects as well.",
    date: "2023-06-20",
    sentiment: "neutral",
    categories: ["extra-curricular", "participation"],
  },
  {
    id: 3,
    reviewer: "Academic Counselor",
    reviewerRole: "Support Staff",
    avatar: "Jennifer Wilson",
    rating: 4.0,
    comment:
      "Good academic progress, but can improve in group activities. Some students need to participate more actively in class discussions.",
    date: "2023-07-10",
    sentiment: "neutral",
    categories: ["academics", "participation"],
  },
  {
    id: 4,
    reviewer: "Mathematics Teacher",
    reviewerRole: "Faculty",
    avatar: "Robert Wilson",
    rating: 3.8,
    comment:
      "While many students are performing well, I've noticed a decline in homework completion. More attention needs to be paid to completing assignments on time.",
    date: "2023-07-22",
    sentiment: "negative",
    categories: ["academics", "homework"],
  },
  {
    id: 5,
    reviewer: "Science Teacher",
    reviewerRole: "Faculty",
    avatar: "Emily Parker",
    rating: 4.6,
    comment:
      "Excellent participation in laboratory activities. The students show great curiosity and follow safety protocols diligently. Very impressed with their scientific thinking!",
    date: "2023-08-01",
    sentiment: "positive",
    categories: ["academics", "participation"],
  },
  {
    id: 6,
    reviewer: "Parent-Teacher Meeting",
    reviewerRole: "Collective Feedback",
    avatar: "PTA",
    rating: 4.8,
    comment:
      "Parents are highly satisfied with the class environment and teaching methods. They appreciate the regular updates and communication from teachers.",
    date: "2023-08-05",
    sentiment: "positive",
    categories: ["communication", "teaching"],
  },
  {
    id: 7,
    reviewer: "Physical Education Teacher",
    reviewerRole: "Faculty",
    avatar: "Daniel Turner",
    rating: 4.4,
    comment:
      "Great team spirit and sportsmanship shown by the class. They excel in team sports and support each other well.",
    date: "2023-08-15",
    sentiment: "positive",
    categories: ["extra-curricular", "teamwork"],
  },
  {
    id: 8,
    reviewer: "School Counselor",
    reviewerRole: "Support Staff",
    avatar: "Amanda Roberts",
    rating: 3.9,
    comment:
      "Some students appear stressed about upcoming examinations. Would recommend additional support sessions and time management workshops.",
    date: "2023-08-22",
    sentiment: "negative",
    categories: ["well-being", "academics"],
  },
];

// Custom tooltip component for PieChart
const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-md rounded-md border">
        <p className="font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
        <p className="text-sm text-gray-500">{`${((payload[0].value / classInfo.totalStudents) * 100).toFixed(1)}%`}</p>
      </div>
    );
  }
  return null;
};

// Custom tooltip for syllabus radar chart
const SyllabusTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 shadow-lg rounded-md border">
        <h4 className="font-medium text-gray-900">{data.subjectFull}</h4>
        <p className="text-sm text-gray-600 mt-1">
          Completion: {data.completion}%
        </p>
        <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-full rounded-full"
            style={{
              width: `${data.completion}%`,
              backgroundColor: data.color,
            }}
          ></div>
        </div>
      </div>
    );
  }
  return null;
};

// Helper component for star ratings
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars
              ? "fill-yellow-400 text-yellow-400"
              : i === fullStars && hasHalfStar
                ? "text-yellow-400"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

// Extended routine data with more details
const enhancedClassRoutine = [
  {
    day: "Monday",
    date: new Date(),
    periods: [
      {
        subject: "Mathematics",
        teacher: "Mr. Robert Wilson",
        type: "Core",
        room: "Room 101",
      },
      {
        subject: "English",
        teacher: "Ms. Olivia Green",
        type: "Core",
        room: "Room 102",
      },
      {
        subject: "Science",
        teacher: "Dr. Emily Parker",
        type: "Core",
        room: "Lab 1",
      },
      {
        subject: "History",
        teacher: "Mr. James Brown",
        type: "Core",
        room: "Room 103",
      },
      { subject: "Lunch", teacher: "", type: "Break", room: "Cafeteria" },
      {
        subject: "Computer Science",
        teacher: "Ms. Jessica Williams",
        type: "Elective",
        room: "Computer Lab",
      },
      {
        subject: "Physical Education",
        teacher: "Mr. Daniel Turner",
        type: "Elective",
        room: "Gymnasium",
      },
      {
        subject: "Library",
        teacher: "Ms. Sarah Thompson",
        type: "Activity",
        room: "Library",
      },
    ],
  },
  {
    day: "Tuesday",
    date: new Date(Date.now() + 86400000),
    periods: [
      {
        subject: "Science",
        teacher: "Dr. Emily Parker",
        type: "Core",
        room: "Lab 1",
      },
      {
        subject: "Mathematics",
        teacher: "Mr. Robert Wilson",
        type: "Core",
        room: "Room 101",
      },
      {
        subject: "English",
        teacher: "Ms. Olivia Green",
        type: "Core",
        room: "Room 102",
      },
      {
        subject: "Computer Science",
        teacher: "Ms. Jessica Williams",
        type: "Elective",
        room: "Computer Lab",
      },
      { subject: "Lunch", teacher: "", type: "Break", room: "Cafeteria" },
      {
        subject: "History",
        teacher: "Mr. James Brown",
        type: "Core",
        room: "Room 103",
      },
      {
        subject: "Art",
        teacher: "Ms. Rebecca Adams",
        type: "Activity",
        room: "Art Studio",
      },
      {
        subject: "Sports",
        teacher: "Mr. Daniel Turner",
        type: "Activity",
        room: "Sports Field",
      },
    ],
  },
  // ...existing routine days with enhanced data...
];

const ClassRoomSectionPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("home");
  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [newSubject, setNewSubject] = useState({
    subject: "",
    teacher: "",
    type: "Core",
  });
  const [selectedSyllabusTab, setSelectedSyllabusTab] = useState("mathematics");
  const [activeDay, setActiveDay] = useState("Monday");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const [reviewFilter, setReviewFilter] = useState("all");

  // Calculate overall syllabus completion
  const totalTopics = syllabusData.reduce(
    (acc, subject) => acc + subject.total,
    0
  );
  const completedTopics = syllabusData.reduce(
    (acc, subject) => acc + (subject.total - subject.remaining),
    0
  );
  const overallCompletion = Math.round((completedTopics / totalTopics) * 100);

  // Calculate average rating
  const averageRating =
    classReviews.reduce((acc, review) => acc + review.rating, 0) /
    classReviews.length;

  const handleAddSubject = () => {
    // In a real application, you would send this data to your backend
    console.log("Adding new subject:", newSubject);
    // For demo purposes, we'll just close the dialog
    setOpenSubjectDialog(false);
    setNewSubject({ subject: "", teacher: "", type: "Core" });
  };

  const sectionOptions = ["Section A", "Section B", "Section C"];

  // Find today's timetable
  const todayRoutine =
    enhancedClassRoutine.find((day) => day.day === today) ||
    enhancedClassRoutine[0];

  // Calculate rating statistics
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = classReviews.filter(
      (review) => Math.floor(review.rating) === rating
    ).length;
    const percentage = (count / classReviews.length) * 100;
    return { rating, count, percentage };
  });

  // Group reviews by sentiment
  const positiveReviews = classReviews.filter(
    (review) => review.sentiment === "positive"
  ).length;
  const neutralReviews = classReviews.filter(
    (review) => review.sentiment === "neutral"
  ).length;
  const negativeReviews = classReviews.filter(
    (review) => review.sentiment === "negative"
  ).length;

  // Filter reviews based on current filter
  const filteredReviews =
    reviewFilter === "all"
      ? classReviews
      : classReviews.filter((review) => review.sentiment === reviewFilter);

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {classInfo.className}
            </h1>
            <p className="text-gray-500">Academic Year 2023-2024</p>
          </div>
        </div>
        <div className="flex gap-2">
          {sectionOptions.map((section) => (
            <Button
              key={section}
              variant={section === "Section A" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                // In a real app, you would navigate to the specific section
                console.log(`Navigate to ${section}`);
              }}
            >
              {section}
            </Button>
          ))}
        </div>
      </div>

      <Tabs
        defaultValue="home"
        className="space-y-4"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="home">Home</TabsTrigger>
          <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
          <TabsTrigger value="routine">Routine</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* Home Tab Content */}
        <TabsContent value="home" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Class Overview Card - Modernized */}
            <Card className="overflow-hidden border-none shadow-lg">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  Class Overview
                </h3>
                <p className="text-indigo-100 text-sm">
                  General information about Class 10 A
                </p>
              </div>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <User className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-gray-500">Class Teacher</span>
                    </div>
                    <span className="font-medium">
                      {classInfo.classTeacher}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-gray-500">Total Students</span>
                    </div>
                    <span className="font-medium">
                      {classInfo.totalStudents}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <Users className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-gray-500">Boys/Girls</span>
                    </div>
                    <span className="font-medium">
                      {classInfo.boys}/{classInfo.girls}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 bg-indigo-100 rounded-full">
                        <UserCheck className="h-5 w-5 text-indigo-600" />
                      </div>
                      <span className="text-gray-500">Class Monitor</span>
                    </div>
                    <span className="font-medium">
                      {classInfo.classMonitor}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Student Distribution - Renamed from Gender Distribution */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Student Distribution</CardTitle>
                <CardDescription>
                  Boys vs Girls ratio in the class
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Boys", value: classInfo.boys },
                        { name: "Girls", value: classInfo.girls },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#818cf8" />
                      <Cell fill="#f472b6" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="pt-0 pb-4 px-6 flex justify-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#818cf8]"></div>
                    <span className="text-sm">Boys</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full bg-[#f472b6]"></div>
                    <span className="text-sm">Girls</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Quick Stats - With colorful progress bars */}
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Average Attendance
                    </span>
                    <span className="text-sm font-medium">91%</span>
                  </div>
                  <Progress
                    value={91}
                    className="h-2 bg-gray-200"
                    style={
                      {
                        "--progress-color": "rgb(52, 211, 153)",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Syllabus Completion
                    </span>
                    <span className="text-sm font-medium">
                      {overallCompletion}%
                    </span>
                  </div>
                  <Progress
                    value={overallCompletion}
                    className="h-2 bg-gray-200"
                    style={
                      {
                        "--progress-color": "rgb(96, 165, 250)",
                      } as React.CSSProperties
                    }
                  />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      Overall Performance
                    </span>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <Progress
                    value={85}
                    className="h-2 bg-gray-200"
                    style={
                      {
                        "--progress-color": "rgb(167, 139, 250)",
                      } as React.CSSProperties
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject Teachers - With dialog to add more subjects */}
          <Card className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Subject Teachers</CardTitle>
                <CardDescription>
                  Teachers assigned to this class
                </CardDescription>
              </div>
              <Dialog
                open={openSubjectDialog}
                onOpenChange={setOpenSubjectDialog}
              >
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Assign Subject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Assign New Subject</DialogTitle>
                    <DialogDescription>
                      Add a new subject and assign a teacher to this class.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject Name</Label>
                      <Input
                        id="subject"
                        placeholder="e.g. Physics"
                        value={newSubject.subject}
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            subject: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="teacher">Teacher Name</Label>
                      <Input
                        id="teacher"
                        placeholder="e.g. Mr. John Smith"
                        value={newSubject.teacher}
                        onChange={(e) =>
                          setNewSubject({
                            ...newSubject,
                            teacher: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Subject Type</Label>
                      <Select
                        value={newSubject.type}
                        onValueChange={(value) =>
                          setNewSubject({ ...newSubject, type: value })
                        }
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Core">Core</SelectItem>
                          <SelectItem value="Elective">Elective</SelectItem>
                          <SelectItem value="Optional">Optional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setOpenSubjectDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddSubject}>Assign Subject</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjectTeachers.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {item.subject}
                      </TableCell>
                      <TableCell>{item.teacher}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.type === "Core"
                              ? "default"
                              : item.type === "Elective"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {item.type}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Student List - Modified columns */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Student List</CardTitle>
              <CardDescription>All students in Class 10 A</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Roll No</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Attendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`}
                          />
                          <AvatarFallback>
                            {student.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {student.name}
                      </TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={parseInt(student.attendance)}
                            className="h-2 w-20 bg-gray-200"
                            style={
                              {
                                "--progress-color":
                                  parseInt(student.attendance) > 90
                                    ? "rgb(52, 211, 153)"
                                    : parseInt(student.attendance) > 85
                                      ? "rgb(96, 165, 250)"
                                      : "rgb(251, 191, 36)",
                              } as React.CSSProperties
                            }
                          />
                          <span>{student.attendance}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Syllabus Tab Content - Redesigned */}
        <TabsContent value="syllabus" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Syllabus Completion Chart - Modernized */}
            <Card className="col-span-1 border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  Subject Completion
                </h3>
                <p className="text-blue-100 text-sm">
                  Visual representation of syllabus progress
                </p>
              </div>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  {/* Bar Chart replacing Radar Chart for better readability */}
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart
                      data={radarData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis type="category" dataKey="subject" />
                      <Tooltip content={<SyllabusTooltip />} />
                      <Bar dataKey="completion" radius={[0, 4, 4, 0]}>
                        {radarData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>

                  <div className="flex flex-wrap justify-center gap-3 mt-4">
                    {radarData.map((subject, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: subject.color }}
                        ></div>
                        <span className="text-sm">{subject.subjectFull}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Overall Syllabus Status - Redesigned */}
            <Card className="col-span-1 lg:col-span-2 border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Overall Completion Status
                </CardTitle>
                <CardDescription>
                  Current academic term progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-lg font-medium">Course Completion</h3>
                    <div className="ml-auto text-2xl font-bold text-indigo-600">
                      {overallCompletion}%
                    </div>
                  </div>

                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                      style={{ width: `${overallCompletion}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm mt-2">
                    <span>0%</span>
                    <span className="text-indigo-600 font-medium">
                      {totalTopics - completedTopics} topics remaining
                    </span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium">Timeline</h3>
                    <Badge variant="outline" className="font-normal">
                      Term 1
                    </Badge>
                  </div>

                  {/* Mini Timeline Chart */}
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart
                      data={[
                        { name: "Aug", completion: 25 },
                        { name: "Sep", completion: 48 },
                        { name: "Oct", completion: overallCompletion },
                        { name: "Nov", completion: null },
                        { name: "Dec", completion: null },
                      ]}
                    >
                      <CartesianGrid
                        vertical={false}
                        strokeDasharray="3 3"
                        opacity={0.2}
                      />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} hide />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="completion"
                        stroke="#6366f1"
                        strokeWidth={3}
                        dot={{ fill: "#6366f1", strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Subject Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                    {syllabusData.map((subject, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg transition-all hover:shadow-md border border-gray-100"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{subject.subject}</span>
                          <span
                            className={`text-sm font-semibold ${
                              subject.completed >= 70
                                ? "text-emerald-500"
                                : subject.completed >= 50
                                  ? "text-blue-500"
                                  : "text-amber-500"
                            }`}
                          >
                            {subject.completed}%
                          </span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              subject.completed >= 70
                                ? "bg-emerald-500"
                                : subject.completed >= 50
                                  ? "bg-blue-500"
                                  : "bg-amber-500"
                            }`}
                            style={{ width: `${subject.completed}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>
                            Covered: {subject.total - subject.remaining}/
                            {subject.total}
                          </span>
                          <span>Remaining: {subject.remaining}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Syllabus - Completely Redesigned */}
            <Card className="col-span-1 lg:col-span-3 border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Detailed Syllabus
                </CardTitle>
                <CardDescription>
                  Topic-by-topic breakdown with completion status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="mathematics"
                  onValueChange={setSelectedSyllabusTab}
                  value={selectedSyllabusTab}
                >
                  <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
                    <TabsTrigger value="science">Science</TabsTrigger>
                    <TabsTrigger value="english">English</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="cs">Computer Science</TabsTrigger>
                  </TabsList>

                  {Object.keys(detailedSyllabusData).map((subject) => (
                    <TabsContent
                      key={subject}
                      value={subject}
                      className="mt-4 border rounded-lg p-0 overflow-hidden"
                    >
                      <div className="divide-y">
                        {detailedSyllabusData[
                          subject as keyof typeof detailedSyllabusData
                        ].map((topic) => (
                          <div
                            key={topic.id}
                            className={`p-4 flex flex-col sm:flex-row sm:items-center gap-3 ${
                              topic.status === "completed"
                                ? "bg-emerald-50/30"
                                : topic.status === "in-progress"
                                  ? "bg-blue-50/30"
                                  : ""
                            }`}
                          >
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    topic.status === "completed"
                                      ? "bg-emerald-500"
                                      : topic.status === "in-progress"
                                        ? "bg-blue-500"
                                        : "bg-gray-300"
                                  }`}
                                ></div>
                                <span className="font-medium">
                                  {topic.topic}
                                </span>
                                {topic.status === "completed" && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100/80"
                                  >
                                    Completed
                                  </Badge>
                                )}
                                {topic.status === "in-progress" && (
                                  <Badge
                                    variant="outline"
                                    className="ml-2 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100/80"
                                  >
                                    In Progress
                                  </Badge>
                                )}
                              </div>

                              {topic.status !== "completed" && (
                                <div className="mt-2 flex items-center">
                                  <div className="w-24 h-1.5 bg-gray-200 rounded-full mr-2 overflow-hidden">
                                    <div
                                      className={`h-full rounded-full ${
                                        topic.status === "in-progress"
                                          ? "bg-blue-500"
                                          : "bg-gray-300"
                                      }`}
                                      style={{ width: `${topic.progress}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {topic.progress}% Complete
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center self-end sm:self-center sm:ml-auto">
                              {topic.status !== "completed" && (
                                <div className="flex items-center space-x-2 text-sm">
                                  <Calendar className="h-4 w-4 text-gray-500" />
                                  <span>
                                    {topic.status === "not-started"
                                      ? "Due: "
                                      : "Target: "}{" "}
                                    {topic.dueDate}
                                  </span>
                                </div>
                              )}
                              {topic.status === "completed" && (
                                <div className="flex items-center space-x-2">
                                  <div className="p-1 rounded-full bg-emerald-100">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-4 w-4 text-emerald-600"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Quick Stats for Selected Subject */}
                <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap justify-between items-center">
                    <h4 className="text-lg font-medium">
                      {selectedSyllabusTab === "mathematics"
                        ? "Mathematics"
                        : selectedSyllabusTab === "science"
                          ? "Science"
                          : selectedSyllabusTab === "english"
                            ? "English"
                            : selectedSyllabusTab === "history"
                              ? "History"
                              : "Computer Science"}{" "}
                      Stats
                    </h4>

                    <div className="mt-2 md:mt-0 flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                        <span className="text-sm">Not Started</span>
                      </div>
                    </div>
                  </div>

                  {/* Pie chart showing topic completion status */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="col-span-1">
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie
                            data={(() => {
                              const topics =
                                detailedSyllabusData[
                                  selectedSyllabusTab as keyof typeof detailedSyllabusData
                                ];
                              const completed = topics.filter(
                                (t) => t.status === "completed"
                              ).length;
                              const inProgress = topics.filter(
                                (t) => t.status === "in-progress"
                              ).length;
                              const notStarted = topics.filter(
                                (t) => t.status === "not-started"
                              ).length;
                              return [
                                {
                                  name: "Completed",
                                  value: completed,
                                  color: "#10b981",
                                },
                                {
                                  name: "In Progress",
                                  value: inProgress,
                                  color: "#3b82f6",
                                },
                                {
                                  name: "Not Started",
                                  value: notStarted,
                                  color: "#d1d5db",
                                },
                              ];
                            })()}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={60}
                            paddingAngle={4}
                            dataKey="value"
                          >
                            {(() => {
                              const topics =
                                detailedSyllabusData[
                                  selectedSyllabusTab as keyof typeof detailedSyllabusData
                                ];
                              const completed = topics.filter(
                                (t) => t.status === "completed"
                              ).length;
                              const inProgress = topics.filter(
                                (t) => t.status === "in-progress"
                              ).length;
                              const notStarted = topics.filter(
                                (t) => t.status === "not-started"
                              ).length;
                              return [
                                {
                                  name: "Completed",
                                  value: completed,
                                  color: "#10b981",
                                },
                                {
                                  name: "In Progress",
                                  value: inProgress,
                                  color: "#3b82f6",
                                },
                                {
                                  name: "Not Started",
                                  value: notStarted,
                                  color: "#d1d5db",
                                },
                              ].map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ));
                            })()}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                          <div className="text-sm text-gray-500">Topics</div>
                          <div className="text-2xl font-bold">
                            {
                              detailedSyllabusData[
                                selectedSyllabusTab as keyof typeof detailedSyllabusData
                              ].length
                            }
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                          <div className="text-sm text-gray-500">
                            Completion
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">
                            {(() => {
                              const topics =
                                detailedSyllabusData[
                                  selectedSyllabusTab as keyof typeof detailedSyllabusData
                                ];
                              const completed = topics.filter(
                                (t) => t.status === "completed"
                              ).length;
                              return Math.round(
                                (completed / topics.length) * 100
                              );
                            })()}
                            %
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Routine Tab Content - Completely Redesigned */}
        <TabsContent value="routine" className="space-y-6">
          {/* Day Selection */}
          <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
              {enhancedClassRoutine.map((day) => (
                <button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center min-w-[100px] transition-colors ${
                    activeDay === day.day
                      ? "bg-indigo-100 text-indigo-700 border-indigo-300 shadow-sm"
                      : day.day === today
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xs font-medium mb-1">
                    {format(day.date, "MMM d")}
                  </span>
                  <span
                    className={`font-semibold ${day.day === today ? "text-amber-700" : ""}`}
                  >
                    {day.day}
                  </span>
                  {day.day === today && (
                    <span className="text-xs mt-1 bg-amber-100 px-2 py-0.5 rounded-full">
                      Today
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Timetable Card */}
            <Card className="lg:col-span-3 border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  Class Timetable
                </h3>
                <p className="text-indigo-100 text-sm">
                  Daily schedule for Class 10 A
                </p>
              </div>
              <CardContent className="pt-6">
                <div className="overflow-hidden rounded-lg border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 w-[100px]">
                            Time
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Period
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden md:table-cell">
                            Subject
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
                            Teacher
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 hidden lg:table-cell">
                            Room
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {/* Morning Assembly */}
                        {(activeDay === "Monday" || activeDay === "Friday") && (
                          <tr className="bg-amber-50">
                            <td className="px-4 py-4 text-sm text-gray-900">
                              7:45 - 8:00
                            </td>
                            <td
                              className="px-4 py-4 text-sm font-medium"
                              colSpan={4}
                            >
                              <div className="flex items-center">
                                <span className="h-2 w-2 rounded-full bg-amber-400 mr-2"></span>
                                <span>Morning Assembly</span>
                                <Badge
                                  variant="outline"
                                  className="ml-2 border-amber-200 text-amber-700 bg-amber-50"
                                >
                                  School Activity
                                </Badge>
                              </div>
                            </td>
                          </tr>
                        )}

                        {/* Regular Periods */}
                        {enhancedClassRoutine
                          .find((day) => day.day === activeDay)
                          ?.periods.map((period, index) => {
                            // Calculate period times
                            const startTimes = [
                              "8:00",
                              "8:55",
                              "9:50",
                              "10:45",
                              "11:35",
                              "12:15",
                              "1:10",
                              "2:05",
                            ];
                            const endTimes = [
                              "8:50",
                              "9:45",
                              "10:40",
                              "11:35",
                              "12:15",
                              "1:05",
                              "2:00",
                              "2:55",
                            ];

                            const timeDisplay = `${startTimes[index]} - ${endTimes[index]}`;
                            const isPeriod = period.type !== "Break";

                            return (
                              <tr
                                key={index}
                                className={`${
                                  period.type === "Break"
                                    ? "bg-gray-50"
                                    : period.type === "Activity"
                                      ? "bg-blue-50"
                                      : ""
                                } hover:bg-gray-50/80`}
                              >
                                <td className="px-4 py-4 text-sm text-gray-900 font-medium">
                                  {timeDisplay}
                                </td>
                                <td className="px-4 py-4 text-sm">
                                  <div className="flex items-center">
                                    <span
                                      className={`h-2 w-2 rounded-full mr-2 ${
                                        period.type === "Core"
                                          ? "bg-indigo-500"
                                          : period.type === "Elective"
                                            ? "bg-purple-500"
                                            : period.type === "Activity"
                                              ? "bg-blue-500"
                                              : "bg-gray-400"
                                      }`}
                                    ></span>
                                    <span
                                      className={`font-medium ${period.type === "Break" ? "text-gray-500" : ""}`}
                                    >
                                      {index + 1}
                                      {isPeriod
                                        ? getOrdinal(index + 1)
                                        : ""}{" "}
                                      {isPeriod ? "Period" : ""}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm hidden md:table-cell">
                                  <div className="flex items-center">
                                    <span className="font-medium">
                                      {period.subject}
                                    </span>
                                    {period.type !== "Break" && (
                                      <Badge
                                        variant="outline"
                                        className={`ml-2 ${
                                          period.type === "Core"
                                            ? "border-indigo-200 text-indigo-700 bg-indigo-50"
                                            : period.type === "Elective"
                                              ? "border-purple-200 text-purple-700 bg-purple-50"
                                              : "border-blue-200 text-blue-700 bg-blue-50"
                                        }`}
                                      >
                                        {period.type}
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700 hidden lg:table-cell">
                                  {period.teacher || "-"}
                                </td>
                                <td className="px-4 py-4 text-sm text-gray-700 hidden lg:table-cell">
                                  {period.room || "-"}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sidebar with additional info - Removed Actions section */}
            <Card className="lg:col-span-1 border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-indigo-500" />
                  Today's Schedule
                </CardTitle>
                <CardDescription>
                  {format(todayRoutine.date, "EEEE, MMMM d, yyyy")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current/Next Class */}
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-4 text-white">
                  <h4 className="text-indigo-100 text-sm font-medium mb-1">
                    Current Period
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold">
                        {getCurrentPeriod(enhancedClassRoutine).subject}
                      </p>
                      <p className="text-sm text-indigo-200">
                        {getCurrentPeriod(enhancedClassRoutine).teacher ||
                          "Break Time"}
                      </p>
                    </div>
                    <div className="bg-white/20 rounded-full p-2">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div>
                  <h4 className="font-medium mb-3">Subject Types</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-sm">Core Subjects</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                      <span className="text-sm">Elective Subjects</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">Activities & Clubs</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-3 w-3 rounded-full bg-gray-400 mr-2"></div>
                      <span className="text-sm">Breaks</span>
                    </div>
                  </div>
                </div>

                {/* Teacher on duty */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Teacher on Duty</h4>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=Sarah Johnson`}
                      />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Ms. Sarah Johnson</p>
                      <p className="text-xs text-gray-500">Class Teacher</p>
                    </div>
                  </div>
                </div>

                {/* Actions section removed */}
              </CardContent>
            </Card>
          </div>

          {/* Notes and special instructions */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-500" />
                Special Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-800">Assembly</h4>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Assembly is held every Monday and Friday at 7:45 AM.
                    Students are expected to be in proper uniform.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h4 className="font-medium text-blue-800">
                      Period Duration
                    </h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    Each period is 50 minutes long with a 5-minute transition
                    time between classes.
                  </p>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Attendance</h4>
                  </div>
                  <p className="text-sm text-green-700">
                    Attendance is taken during the first period each day. Please
                    arrive on time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab Content - Redesigned */}
        <TabsContent value="reviews" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Rating Summary Card */}
            <Card className="lg:col-span-1 border-none shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h3 className="text-white text-xl font-semibold mb-1">
                  Class Rating
                </h3>
                <p className="text-indigo-100 text-sm">
                  Overall performance evaluation
                </p>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-2">
                    <div className="text-5xl font-bold text-indigo-600">
                      {averageRating.toFixed(1)}
                    </div>
                    <div className="absolute top-0 right-0 translate-x-full -translate-y-1/3 bg-indigo-100 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">
                      out of 5
                    </div>
                  </div>
                  <div className="mb-2">
                    <StarRating rating={averageRating} />
                  </div>
                  <p className="text-sm text-gray-500">
                    Based on {classReviews.length} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3 mb-6">
                  {ratingDistribution.map((item) => (
                    <div key={item.rating} className="flex items-center gap-2">
                      <div className="flex items-center w-12">
                        <span className="text-sm font-medium">
                          {item.rating}
                        </span>
                        <Star className="h-4 w-4 text-gray-400 ml-1" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-500"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <div className="w-8 text-right">
                        <span className="text-xs text-gray-500">
                          {item.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Sentiment Analysis */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Feedback Sentiment
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div
                      className="flex flex-col items-center p-2 rounded-lg cursor-pointer bg-green-50 border border-green-100"
                      onClick={() =>
                        setReviewFilter(
                          reviewFilter === "positive" ? "all" : "positive"
                        )
                      }
                    >
                      <span className="text-2xl">😊</span>
                      <span className="font-medium text-green-700">
                        {positiveReviews}
                      </span>
                      <span className="text-xs text-green-600">Positive</span>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-lg cursor-pointer bg-blue-50 border border-blue-100"
                      onClick={() =>
                        setReviewFilter(
                          reviewFilter === "neutral" ? "all" : "neutral"
                        )
                      }
                    >
                      <span className="text-2xl">😐</span>
                      <span className="font-medium text-blue-700">
                        {neutralReviews}
                      </span>
                      <span className="text-xs text-blue-600">Neutral</span>
                    </div>
                    <div
                      className="flex flex-col items-center p-2 rounded-lg cursor-pointer bg-amber-50 border border-amber-100"
                      onClick={() =>
                        setReviewFilter(
                          reviewFilter === "negative" ? "all" : "negative"
                        )
                      }
                    >
                      <span className="text-2xl">😟</span>
                      <span className="font-medium text-amber-700">
                        {negativeReviews}
                      </span>
                      <span className="text-xs text-amber-600">
                        Needs Attention
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-3">
                <div className="w-full flex items-center justify-between text-sm text-gray-500">
                  <span>Current filter:</span>
                  <Badge
                    variant={reviewFilter === "all" ? "outline" : "default"}
                    className="capitalize"
                  >
                    {reviewFilter === "all"
                      ? "All Reviews"
                      : `${reviewFilter} Reviews`}
                  </Badge>
                  {reviewFilter !== "all" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setReviewFilter("all")}
                    >
                      Clear
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            {/* Reviews Timeline */}
            <Card className="lg:col-span-2 border-none shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Teacher Feedback</CardTitle>
                  <CardDescription>Recent reviews and comments</CardDescription>
                </div>
                <Select defaultValue="latest">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="highest">Highest Rating</SelectItem>
                    <SelectItem value="lowest">Lowest Rating</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredReviews.length === 0 ? (
                    <div className="text-center py-10">
                      <div className="text-2xl mb-2">🔍</div>
                      <h3 className="text-lg font-medium">No reviews found</h3>
                      <p className="text-sm text-gray-500">
                        Try changing your filter settings
                      </p>
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <div
                        key={review.id}
                        className="relative pl-6 border-l-2 border-gray-200 pb-6"
                      >
                        {/* Timeline dot */}
                        <div
                          className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-2 border-white ${
                            review.sentiment === "positive"
                              ? "bg-green-500"
                              : review.sentiment === "negative"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                          }`}
                        ></div>

                        <div className="flex items-start gap-3">
                          <Avatar className="h-10 w-10 border">
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${review.avatar}`}
                            />
                            <AvatarFallback>
                              {review.avatar.charAt(0)}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-start justify-between gap-2">
                              <div>
                                <h4 className="text-sm font-medium">
                                  {review.reviewer}
                                </h4>
                                <div className="flex items-center text-xs text-gray-500">
                                  <span className="mr-2">
                                    {review.reviewerRole}
                                  </span>
                                  <span>•</span>
                                  <time className="ml-2">{review.date}</time>
                                </div>
                              </div>
                              <StarRating rating={review.rating} />
                            </div>

                            <p className="text-sm text-gray-700">
                              {review.comment}
                            </p>

                            <div className="flex flex-wrap gap-1 pt-1">
                              {review.categories.map((category) => (
                                <Badge
                                  key={category}
                                  variant="secondary"
                                  className="text-xs font-normal capitalize"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t bg-gray-50 p-4">
                <Button variant="outline" size="sm">
                  View All Reports
                </Button>
              </CardFooter>
            </Card>

            {/* Performance Insights */}
            <Card className="lg:col-span-3 border-none shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-500" />
                  Performance Highlights
                </CardTitle>
                <CardDescription>
                  Key observations from recent reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Strength */}
                  <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-100 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-green-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h4 className="font-medium text-green-800">Strengths</h4>
                    </div>
                    <p className="text-sm text-green-700">
                      Excellent discipline and participation in class
                      activities. Students show great teamwork and enthusiasm in
                      laboratory exercises.
                    </p>
                  </div>

                  {/* Improvement Areas */}
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-amber-100 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-amber-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      <h4 className="font-medium text-amber-800">
                        Areas for Improvement
                      </h4>
                    </div>
                    <p className="text-sm text-amber-700">
                      Needs more attention to homework completion and time
                      management. Some students appear stressed about
                      examinations.
                    </p>
                  </div>

                  {/* Action Points */}
                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-blue-100 p-1.5 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <h4 className="font-medium text-blue-800">
                        Recommended Actions
                      </h4>
                    </div>
                    <p className="text-sm text-blue-700">
                      Schedule time management workshops and consider additional
                      support sessions for examination preparation. Implement a
                      homework tracking system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper functions for the Routine tab
function getOrdinal(n: number) {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
}

function getCurrentPeriod(routine: typeof enhancedClassRoutine) {
  // This would normally use the actual current time to determine the current period
  // For demo purposes, we're just returning the first period
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const todayRoutine = routine.find((day) => day.day === today) || routine[0];
  const currentHour = new Date().getHours();

  if (currentHour < 8) {
    return { subject: "School Not Started", teacher: "Arriving Soon" };
  } else if (currentHour >= 15) {
    return { subject: "School Ended", teacher: "See you tomorrow!" };
  } else {
    // Simple mapping of hours to periods (in a real app, would be more precise)
    const periodIndex = Math.min(
      Math.max(0, currentHour - 8),
      todayRoutine.periods.length - 1
    );
    return todayRoutine.periods[periodIndex];
  }
}

export default ClassRoomSectionPage;
