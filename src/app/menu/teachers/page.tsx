"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AddTeacherSheet from "@/components/add-teacher-sheet";

const teachers = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    subject: "Physics",
    role: "Head of Science Department",
    description:
      "Gold medalist from IIT Delhi with 12 years of teaching experience. Pioneer in practical-based learning methodology.",
    present: true,
  },
  {
    id: 2,
    name: "Mr. Rajesh Verma",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    subject: "Mathematics",
    role: "Class Teacher - XII A",
    description:
      "Mathematics expert with experience in JEE preparation. Known for innovative teaching methods.",
    present: true,
  },
  {
    id: 3,
    name: "Mrs. Anjali Gupta",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    subject: "English Literature",
    role: "Cultural Committee Head",
    description:
      "Cambridge certified language expert. Published author of two novels and poetry anthology.",
    present: false,
  },
  {
    id: 4,
    name: "Mr. Arun Kumar",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    subject: "Computer Science",
    role: "Technical Director",
    description:
      "Former Tech Lead at Microsoft. Brings industry experience to academic curriculum.",
    present: true,
  },
  {
    id: 5,
    name: "Dr. Meena Iyer",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    subject: "Biology",
    role: "Principal",
    description:
      "Ph.D. in Biotechnology, passionate about modernizing education system with 20 years experience.",
    present: true,
  },
  {
    id: 6,
    name: "Mr. Sanjay Patel",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    subject: "Chemistry",
    role: "Lab Coordinator",
    description:
      "Specializes in organic chemistry, former research scientist at IISER.",
    present: false,
  },
  {
    id: 7,
    name: "Mrs. Lakshmi Krishnan",
    image: "https://randomuser.me/api/portraits/women/89.jpg",
    subject: "History",
    role: "House Master - Blue House",
    description:
      "Expert in Indian ancient history, organizes historical tours and excavation visits.",
    present: true,
  },
  {
    id: 8,
    name: "Dr. Kabir Singh",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    subject: "Physical Education",
    role: "Sports Director",
    description:
      "Former national level athlete, promotes holistic fitness and sports excellence.",
    present: true,
  },
  {
    id: 9,
    name: "Ms. Ritu Desai",
    image: "https://randomuser.me/api/portraits/women/76.jpg",
    subject: "Economics",
    role: "Career Counselor",
    description:
      "MBA from IIM-A, guides students in career choices and financial literacy.",
    present: true,
  },
  {
    id: 10,
    name: "Mr. Vijay Mehta",
    image: "https://randomuser.me/api/portraits/men/92.jpg",
    subject: "Sanskrit",
    role: "Cultural Preservation Head",
    description:
      "Sanskrit scholar with expertise in vedic mathematics and ancient texts.",
    present: false,
  },
];

const TeacherCard = ({ teacher }) => {
  const router = useRouter();

  return (
    <Card className="relative">
      <div className="absolute top-4 right-4">
        <Badge variant={teacher.present ? "success" : "destructiveLight"}>
          {teacher.present ? "Present" : "Absent"}
        </Badge>
      </div>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={teacher.image} alt={teacher.name} />
          <AvatarFallback>
            {teacher.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{teacher.name}</CardTitle>
          <CardDescription className="text-md font-medium">
            {teacher.subject}
          </CardDescription>
          {teacher.role && (
            <CardDescription className="text-sm text-blue-600">
              {teacher.role}
            </CardDescription>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {teacher.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant="default"
          onClick={() => router.push(`/menu/teachers/${teacher.id}`)}
        >
          View Full Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function TeachersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isAddTeacherSheetOpen, setIsAddTeacherSheetOpen] =
    React.useState(false);

  const filteredTeachers = teachers.filter((teacher) =>
    [teacher.name, teacher.role, teacher.subject]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Teaching Staff</h1>
          <Button
            onClick={() => setIsAddTeacherSheetOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" /> Add Teacher
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, role or subject..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} teacher={teacher} />
        ))}
      </div>
      {filteredTeachers.length === 0 && (
        <div className="text-center mt-8 text-muted-foreground">
          No teachers found matching your search.
        </div>
      )}

      <AddTeacherSheet
        open={isAddTeacherSheetOpen}
        onOpenChange={setIsAddTeacherSheetOpen}
      />
    </div>
  );
}
