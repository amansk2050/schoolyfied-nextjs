"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Award,
  Briefcase,
  MapPin,
  Mail,
  PhoneCall,
  Clock,
  Users,
  Star,
  BookOpen,
  GraduationCap,
  School,
  BookMarked,
  ClipboardCheck,
} from "lucide-react";
import { fetchTeacherProfile } from "@/lib/api"; // Placeholder for actual API

interface Subject {
  id: string;
  name: string;
  level: string;
  proficiency: number; // Out of 100
}

interface ClassAssignment {
  id: string;
  className: string;
  grade: string;
  subject: string;
  schedule: string;
  roomNumber: string;
}

interface ExtraAssignment {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface ScheduleItem {
  day: string;
  periods: {
    time: string;
    subject: string;
    class: string;
    room: string;
  }[];
}

export default function TeacherProfilePage({
  params,
}: {
  params: Promise<{ "teachers-id": string }>;
}) {
  // Use React.use() to unwrap the params promise
  const unwrappedParams = React.use(params);
  const teacherId = unwrappedParams["teachers-id"];

  const [teacher, setTeacher] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, replace with actual API call
    const getTeacherData = async () => {
      try {
        setLoading(true);
        // Simulating API call with mock data for demonstration
        const mockTeacher = {
          id: teacherId,
          name: "Dr. Sarah Johnson",
          avatar: "/images/placeholders/teacher.jpg", // Local placeholder image
          title: "Senior Science Teacher",
          department: "Science Department",
          bio: "Dr. Johnson has over 15 years of experience in science education, specializing in physics and chemistry. She holds a Ph.D. in Physics Education and is dedicated to making complex scientific concepts accessible to all students through innovative teaching methods.",
          email: "sarah.johnson@schoolyfied.edu",
          phone: "+1 (555) 123-4567",
          location: "Building A, Room 302",
          officeHours: "Mon, Wed: 10:00 AM - 12:00 PM",
          joinDate: "August 2015",
          education: [
            {
              degree: "Ph.D. in Physics Education",
              institution: "Stanford University",
              year: "2008",
            },
            {
              degree: "M.S. in Physics",
              institution: "MIT",
              year: "2005",
            },
            {
              degree: "B.Sc in Education & Physics",
              institution: "Caltech",
              year: "2003",
            },
          ],
          experience: [
            {
              position: "Science Department Head",
              company: "Westlake High School",
              period: "2012-2015",
            },
            {
              position: "Physics Teacher",
              company: "Riverside Academy",
              period: "2008-2012",
            },
            {
              position: "Senior Science Teacher",
              company: "Current School",
              period: "2015-Present",
            },
          ],
          // New field for teacher's expertise/mastered subjects
          expertise: [
            "Physics",
            "Chemistry",
            "Advanced Mathematics",
            "Robotics",
            "STEM Project Coordination",
          ],
          // Performance ratings by admin/department heads
          performanceRatings: {
            overall: 4.8,
            subjectKnowledge: 4.9,
            teachingMethods: 4.7,
            studentEngagement: 4.6,
            collaboration: 4.8,
            punctuality: 5.0,
          },
          // Subjects the teacher is qualified to teach
          masteredSubjects: [
            {
              id: "phys101",
              name: "Physics",
              level: "Advanced",
              proficiency: 95,
            },
            {
              id: "chem101",
              name: "Chemistry",
              level: "Advanced",
              proficiency: 90,
            },
            {
              id: "math101",
              name: "Mathematics",
              level: "Advanced",
              proficiency: 85,
            },
            {
              id: "robo101",
              name: "Robotics",
              level: "Intermediate",
              proficiency: 80,
            },
          ],
          // Weekly class count
          classesPerWeek: 18,
          // Current class assignments
          assignedClasses: [
            {
              id: "class1",
              className: "10-A",
              grade: "10th Grade",
              subject: "Physics",
              schedule: "Mon, Wed, Fri: 9:00 AM - 10:30 AM",
              roomNumber: "Lab 101",
            },
            {
              id: "class2",
              className: "11-B",
              grade: "11th Grade",
              subject: "Advanced Physics",
              schedule: "Tue, Thu: 11:00 AM - 12:30 PM",
              roomNumber: "Lab 201",
            },
            {
              id: "class3",
              className: "9-C",
              grade: "9th Grade",
              subject: "General Science",
              schedule: "Mon, Wed: 2:00 PM - 3:30 PM",
              roomNumber: "Room 105",
            },
            {
              id: "class4",
              className: "12-A",
              grade: "12th Grade",
              subject: "AP Physics",
              schedule: "Tue, Thu: 1:00 PM - 2:30 PM",
              roomNumber: "Lab 201",
            },
          ],
          // Extra assignments beyond regular classes
          extraAssignments: [
            {
              id: "extra1",
              title: "Science Fair Coordinator",
              description:
                "Organizing the annual school science fair including judging and mentoring students on projects.",
              date: "Upcoming: May 15, 2024",
            },
            {
              id: "extra2",
              title: "STEM Club Advisor",
              description:
                "Weekly after-school club focusing on hands-on science and engineering projects.",
              date: "Every Thursday, 3:30 PM - 5:00 PM",
            },
          ],
          // Weekly schedule
          weeklySchedule: [
            {
              day: "Monday",
              periods: [
                {
                  time: "09:00 - 10:30",
                  subject: "Physics",
                  class: "10-A",
                  room: "Lab 101",
                },
                {
                  time: "11:00 - 12:30",
                  subject: "Free Period",
                  class: "-",
                  room: "-",
                },
                {
                  time: "13:30 - 15:00",
                  subject: "General Science",
                  class: "9-C",
                  room: "Room 105",
                },
              ],
            },
            {
              day: "Tuesday",
              periods: [
                {
                  time: "09:00 - 10:30",
                  subject: "Department Meeting",
                  class: "-",
                  room: "Staff Room",
                },
                {
                  time: "11:00 - 12:30",
                  subject: "Advanced Physics",
                  class: "11-B",
                  room: "Lab 201",
                },
                {
                  time: "13:00 - 14:30",
                  subject: "AP Physics",
                  class: "12-A",
                  room: "Lab 201",
                },
              ],
            },
            {
              day: "Wednesday",
              periods: [
                {
                  time: "09:00 - 10:30",
                  subject: "Physics",
                  class: "10-A",
                  room: "Lab 101",
                },
                {
                  time: "11:00 - 12:30",
                  subject: "Free Period",
                  class: "-",
                  room: "-",
                },
                {
                  time: "13:30 - 15:00",
                  subject: "General Science",
                  class: "9-C",
                  room: "Room 105",
                },
              ],
            },
            {
              day: "Thursday",
              periods: [
                {
                  time: "09:00 - 10:30",
                  subject: "Staff Development",
                  class: "-",
                  room: "Conference Room",
                },
                {
                  time: "11:00 - 12:30",
                  subject: "Advanced Physics",
                  class: "11-B",
                  room: "Lab 201",
                },
                {
                  time: "13:00 - 14:30",
                  subject: "AP Physics",
                  class: "12-A",
                  room: "Lab 201",
                },
                {
                  time: "15:30 - 17:00",
                  subject: "STEM Club (Extra)",
                  class: "Mixed",
                  room: "Lab 101",
                },
              ],
            },
            {
              day: "Friday",
              periods: [
                {
                  time: "09:00 - 10:30",
                  subject: "Physics",
                  class: "10-A",
                  room: "Lab 101",
                },
                {
                  time: "11:00 - 12:30",
                  subject: "Lab Preparation",
                  class: "-",
                  room: "Lab 101",
                },
                {
                  time: "13:30 - 15:00",
                  subject: "Office Hours",
                  class: "-",
                  room: "Room 302",
                },
              ],
            },
          ],
        };

        setTeacher(mockTeacher);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch teacher data:", error);
        setLoading(false);
      }
    };

    getTeacherData();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Teacher not found</h1>
        <p>
          We couldn't find information for this teacher. Please check the ID and
          try again.
        </p>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.floor(rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
        />
      ));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Information */}
        <div className="lg:col-span-1">
          <Card className="overflow-hidden shadow-md">
            {/* Changed color gradient as requested */}
            <div className="bg-gradient-to-r from-sky-400 to-violet-300 h-32" />
            <div className="flex justify-center -mt-16 px-4">
              <Avatar className="h-32 w-32 border-4 border-white bg-white">
                {teacher.avatar ? (
                  <Image
                    src={teacher.avatar}
                    alt={teacher.name}
                    width={128}
                    height={128}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 text-2xl font-medium text-gray-600">
                    {teacher.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </div>
                )}
              </Avatar>
            </div>
            <CardContent className="text-center pt-6">
              <h2 className="text-2xl font-bold">{teacher.name}</h2>
              <p className="text-violet-600 font-medium">{teacher.title}</p>
              <p className="text-gray-500 mb-2">{teacher.department}</p>
              <p className="text-sm text-gray-500 mb-4">
                Joined {teacher.joinDate}
              </p>

              <div className="flex justify-center space-x-2 mb-6">
                {teacher.expertise
                  .slice(0, 3)
                  .map((skill: string, idx: number) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-violet-100 text-violet-700 hover:bg-violet-200"
                    >
                      {skill}
                    </Badge>
                  ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{teacher.email}</span>
                </div>
                <div className="flex items-center">
                  <PhoneCall className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{teacher.phone}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{teacher.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">{teacher.officeHours}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-sm">
                    {teacher.classesPerWeek} classes per week
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Contact button instead of scheduling */}
              <Button variant="outline" className="w-full">
                Contact Teacher
              </Button>
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card className="mt-6 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="mr-2 text-violet-600" />
                <h3 className="font-bold text-lg">Education</h3>
              </div>
              <div className="space-y-4">
                {teacher.education.map((edu: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-l-2 border-violet-200 pl-4 py-1"
                  >
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-xs text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Work Experience Section */}
          <Card className="mt-6 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center mb-4">
                <Briefcase className="mr-2 text-violet-600" />
                <h3 className="font-bold text-lg">Work Experience</h3>
              </div>
              <div className="space-y-4">
                {teacher.experience.map((exp: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-l-2 border-violet-200 pl-4 py-1"
                  >
                    <p className="font-medium">{exp.position}</p>
                    <p className="text-sm text-gray-600">{exp.company}</p>
                    <p className="text-xs text-gray-500">{exp.period}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            {/* Schedule Tab - New section for teacher's routine */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-violet-600" />
                    Weekly Schedule
                  </h3>

                  <div className="space-y-6">
                    {teacher.weeklySchedule.map((day: ScheduleItem) => (
                      <div key={day.day} className="space-y-2">
                        <h4 className="font-semibold text-violet-700 border-b pb-2">
                          {day.day}
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full">
                            <thead>
                              <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Subject</th>
                                <th className="px-4 py-2">Class</th>
                                <th className="px-4 py-2">Room</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {day.periods.map((period, idx) => (
                                <tr
                                  key={idx}
                                  className={
                                    period.subject.includes("Free") ||
                                    period.class === "-"
                                      ? "bg-gray-50"
                                      : ""
                                  }
                                >
                                  <td className="px-4 py-3 text-sm">
                                    {period.time}
                                  </td>
                                  <td className="px-4 py-3 text-sm font-medium">
                                    {period.subject}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {period.class}
                                  </td>
                                  <td className="px-4 py-3 text-sm">
                                    {period.room}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Classes Tab - Regular and Extra Classes */}
            <TabsContent value="classes" className="space-y-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <School className="mr-2 h-5 w-5 text-violet-600" />
                    Assigned Classes
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead>
                        <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="px-4 py-2">Class</th>
                          <th className="px-4 py-2">Grade</th>
                          <th className="px-4 py-2">Subject</th>
                          <th className="px-4 py-2">Schedule</th>
                          <th className="px-4 py-2">Room</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {teacher.assignedClasses.map((cls: ClassAssignment) => (
                          <tr key={cls.id}>
                            <td className="px-4 py-3 text-sm font-medium">
                              {cls.className}
                            </td>
                            <td className="px-4 py-3 text-sm">{cls.grade}</td>
                            <td className="px-4 py-3 text-sm">{cls.subject}</td>
                            <td className="px-4 py-3 text-sm">
                              {cls.schedule}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {cls.roomNumber}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <ClipboardCheck className="mr-2 h-5 w-5 text-violet-600" />
                    Extra Assignments
                  </h3>
                  <div className="space-y-4">
                    {teacher.extraAssignments.map(
                      (assignment: ExtraAssignment) => (
                        <div
                          key={assignment.id}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <h4 className="font-semibold text-violet-700">
                            {assignment.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {assignment.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-2 font-medium">
                            {assignment.date}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Subjects Tab - Subject Mastery */}
            <TabsContent value="subjects" className="space-y-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <BookMarked className="mr-2 h-5 w-5 text-violet-600" />
                    Subject Expertise
                  </h3>
                  <div className="space-y-4">
                    {teacher.masteredSubjects.map((subject: Subject) => (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{subject.name}</span>
                            <Badge className="ml-2 bg-violet-100 text-violet-700 hover:bg-violet-200">
                              {subject.level}
                            </Badge>
                          </div>
                          <span className="text-sm font-medium">
                            {subject.proficiency}%
                          </span>
                        </div>
                        <Progress value={subject.proficiency} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold flex items-center">
                      <Award className="mr-2 h-5 w-5 text-violet-600" />
                      Performance Assessment
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-3xl font-bold">
                        {teacher.performanceRatings.overall}
                      </span>
                      <div className="flex">
                        {renderStars(teacher.performanceRatings.overall)}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-6">
                    Performance assessment based on evaluations by department
                    heads, administrative staff, and peer reviews.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Subject Knowledge
                        </span>
                        <span className="text-sm font-medium">
                          {teacher.performanceRatings.subjectKnowledge}
                        </span>
                      </div>
                      <Progress
                        value={teacher.performanceRatings.subjectKnowledge * 20}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Teaching Methods
                        </span>
                        <span className="text-sm font-medium">
                          {teacher.performanceRatings.teachingMethods}
                        </span>
                      </div>
                      <Progress
                        value={teacher.performanceRatings.teachingMethods * 20}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Student Engagement
                        </span>
                        <span className="text-sm font-medium">
                          {teacher.performanceRatings.studentEngagement}
                        </span>
                      </div>
                      <Progress
                        value={
                          teacher.performanceRatings.studentEngagement * 20
                        }
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Team Collaboration
                        </span>
                        <span className="text-sm font-medium">
                          {teacher.performanceRatings.collaboration}
                        </span>
                      </div>
                      <Progress
                        value={teacher.performanceRatings.collaboration * 20}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          Punctuality & Reliability
                        </span>
                        <span className="text-sm font-medium">
                          {teacher.performanceRatings.punctuality}
                        </span>
                      </div>
                      <Progress
                        value={teacher.performanceRatings.punctuality * 20}
                        className="h-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-6">
              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Biography</h3>
                  <p className="text-gray-700">{teacher.bio}</p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {teacher.expertise.map((skill: string, idx: number) => (
                      <Badge
                        key={idx}
                        className="px-3 py-1 bg-violet-100 text-violet-700 hover:bg-violet-200"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
