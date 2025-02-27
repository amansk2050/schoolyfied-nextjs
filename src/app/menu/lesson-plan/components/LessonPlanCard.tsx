import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Calendar,
  FileText,
  MoreVertical,
  BookOpen,
  GraduationCap,
  Clock,
  CheckSquare as CheckSquareIcon,
} from "lucide-react";

interface LessonPlanCardProps {
  plan: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    date: string;
    duration: string;
    status: string;
    teacher: string;
    objectives: string[];
    resources: string[];
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}

const subjectIcons: Record<string, JSX.Element> = {
  Mathematics: <span className="text-blue-500">∑</span>,
  "English Literature": <span className="text-pink-500">A</span>,
  Biology: <span className="text-green-500">🧬</span>,
  History: <span className="text-amber-500">🏛️</span>,
  Science: <span className="text-cyan-500">⚗️</span>,
  "Computer Science": <span className="text-violet-500">💻</span>,
  Geography: <span className="text-emerald-500">🌍</span>,
  Physics: <span className="text-indigo-500">⚛️</span>,
  Chemistry: <span className="text-red-500">⚗️</span>,
  Art: <span className="text-rose-500">🎨</span>,
  Music: <span className="text-purple-500">🎵</span>,
};

export function LessonPlanCard({
  plan,
  onEdit,
  onDelete,
  onDuplicate,
  onStatusChange,
  highlightAttribute,
}: LessonPlanCardProps & {
  highlightAttribute?: "subject" | "grade" | undefined;
}) {
  const teacherInitials = plan.teacher
    .split(" ")
    .map((n) => n[0])
    .join("");

  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      Mathematics: "bg-blue-100 text-blue-800",
      "English Literature": "bg-pink-100 text-pink-800",
      Biology: "bg-green-100 text-green-800",
      History: "bg-amber-100 text-amber-800",
      Science: "bg-cyan-100 text-cyan-800",
      "Computer Science": "bg-violet-100 text-violet-800",
      Geography: "bg-emerald-100 text-emerald-800",
      Physics: "bg-indigo-100 text-indigo-800",
      Chemistry: "bg-red-100 text-red-800",
      Art: "bg-rose-100 text-rose-800",
      Music: "bg-purple-100 text-purple-800",
    };

    return colors[subject] || "bg-gray-100 text-gray-800";
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <div className="flex gap-1.5 items-center">
            <div className={`rounded-md p-1 ${getSubjectColor(plan.subject)}`}>
              {subjectIcons[plan.subject] || <BookOpen size={18} />}
            </div>
            <Badge
              variant={plan.status === "published" ? "default" : "outline"}
              className="ml-auto"
            >
              {plan.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(plan.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate?.(plan.id)}>
                Duplicate
              </DropdownMenuItem>
              {plan.status === "draft" ? (
                <DropdownMenuItem
                  onClick={() => onStatusChange?.(plan.id, "published")}
                >
                  Publish
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => onStatusChange?.(plan.id, "draft")}
                >
                  Unpublish
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-500"
                onClick={() => onDelete?.(plan.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <CardTitle className="text-xl mt-2">{plan.title}</CardTitle>

        <CardDescription className="flex items-center gap-3 mt-2">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{plan.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{plan.duration}</span>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GraduationCap
                size={16}
                className={
                  highlightAttribute === "grade"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              />
              <p
                className={`text-sm font-medium ${highlightAttribute === "grade" ? "text-primary" : ""}`}
              >
                {plan.grade}
              </p>
            </div>
            <div className="text-sm text-muted-foreground text-right flex items-center gap-1">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarFallback className="text-[10px]">
                  {teacherInitials}
                </AvatarFallback>
              </Avatar>
              {plan.teacher}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium flex items-center gap-1">
              <CheckSquareIcon size={14} className="text-primary" />
              <span>Objectives:</span>
            </p>
            <ul className="text-sm list-disc list-inside pl-1">
              {plan.objectives.slice(0, 2).map((obj, i) => (
                <li key={i} className="text-muted-foreground truncate">
                  {obj}
                </li>
              ))}
              {plan.objectives.length > 2 && (
                <li className="text-muted-foreground">
                  + {plan.objectives.length - 2} more
                </li>
              )}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 flex justify-between">
        <Link href={`/menu/lesson-plan/${plan.id}`} passHref>
          <Button variant="outline" size="sm" className="hover:bg-primary/10">
            <FileText size={14} className="mr-1" /> View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default LessonPlanCard;
