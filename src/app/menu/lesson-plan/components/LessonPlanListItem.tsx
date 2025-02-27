import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
  MoreVertical,
  Calendar,
  Clock,
  BookOpen,
  GraduationCap,
} from "lucide-react";

interface LessonPlanListItemProps {
  plan: {
    id: string;
    title: string;
    subject: string;
    grade: string;
    date: string;
    duration: string;
    status: string;
    teacher: string;
  };
  isLast: boolean;
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

export function LessonPlanListItem({
  plan,
  isLast,
  onEdit,
  onDelete,
  onDuplicate,
  onStatusChange,
}: LessonPlanListItemProps) {
  const teacherInitials = plan.teacher
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div
      className={`grid grid-cols-12 px-4 py-3 items-center hover:bg-muted/30 ${
        !isLast ? "border-b" : ""
      }`}
    >
      <div className="col-span-5">
        <div className="flex items-center gap-2">
          <div className={`rounded-md p-1 ${getSubjectColor(plan.subject)}`}>
            {subjectIcons[plan.subject] || <BookOpen size={18} />}
          </div>
          <div>
            <div className="font-medium">{plan.title}</div>
            <div className="text-sm text-muted-foreground flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Avatar className="h-4 w-4 mr-1">
                  <AvatarFallback className="text-[8px]">
                    {teacherInitials}
                  </AvatarFallback>
                </Avatar>
                {plan.teacher}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          <BookOpen size={14} className="text-muted-foreground" />
          <span>{plan.subject}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <GraduationCap size={14} />
          {plan.grade}
        </div>
      </div>
      <div className="col-span-2">
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-muted-foreground" />
          {plan.date}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock size={14} />
          {plan.duration}
        </div>
      </div>
      <div className="col-span-1">
        <Badge
          variant={plan.status === "published" ? "default" : "outline"}
          className={
            plan.status === "published"
              ? "bg-green-100 hover:bg-green-200 text-green-800 border-none"
              : ""
          }
        >
          {plan.status === "published" ? "Published" : "Draft"}
        </Badge>
      </div>
      <div className="col-span-2 text-right">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/menu/lesson-plan/${plan.id}`} passHref>
            <Button variant="outline" size="sm" className="hover:bg-primary/10">
              View
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
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
      </div>
    </div>
  );
}

export default LessonPlanListItem;
