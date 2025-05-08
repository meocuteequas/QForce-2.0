"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import type { Task } from "../kanban";

interface TasksTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isActive: boolean;
}

export default function TasksTable({ tasks, onTaskClick, isActive }: TasksTableProps) {
  if (tasks.length === 0) {
    return <div className="py-6 px-4 text-center text-muted-foreground">No tasks found</div>;
  }

  // Get assignee from custom fields
  const getAssignee = (task: Task) => {
    const assigneeField = task.customFields.find((field) => field.name === "Assigned To");
    return assigneeField?.value || "-";
  };

  // Get priority from custom fields
  const getPriority = (task: Task) => {
    const priorityField = task.customFields.find((field) => field.name === "Priority");
    return priorityField?.value || "Normal";
  };

  // Function to determine priority badge color
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "destructive";
      case "high":
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "secondary";
    }
  };

  // Format the due date
  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return "-";

    try {
      return format(new Date(dueDate), "MMM d, yyyy");
    } catch (error) {
      console.error("Invalid date format:", error);
      return "-";
    }
  };

  // Check if a task is overdue
  const isOverdue = (dueDate: string | null) => {
    if (!dueDate) return false;

    try {
      return new Date(dueDate) < new Date() && isActive;
    } catch {
      return false;
    }
  };

  return (
    <div className="divide-y divide-border dark:divide-gray-700">
      {tasks.map((task) => {
        const assignee = getAssignee(task);
        const priority = getPriority(task);
        const dueDate = formatDueDate(task.dueDate);
        const taskIsOverdue = isOverdue(task.dueDate);

        return (
          <div
            key={task.id}
            className="flex items-center px-4 py-3 hover:bg-muted/50 cursor-pointer"
            onClick={() => onTaskClick(task)}
          >
            <div className="flex-1 min-w-0 mr-4">
              <div className="text-sm font-medium">{task.title}</div>
              {task.description && (
                <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{task.description}</div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-6 text-sm w-1/2">
              <div className="w-32 md:w-44">
                {assignee !== "-" ? (
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <div className="bg-primary/10 text-primary h-full w-full flex items-center justify-center text-xs">
                        {assignee.charAt(0).toUpperCase()}
                      </div>
                    </Avatar>
                    <span>{assignee}</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">Unassigned</span>
                )}
              </div>

              <div className="w-24 md:w-40">
                <Badge variant="outline" className="border-[1.5px]">
                  {task.status}
                </Badge>
              </div>

              <div className="w-24 md:w-40">
                <Badge
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-expect-error
                  variant={getPriorityBadgeVariant(priority)}
                  className="font-normal"
                >
                  {priority}
                </Badge>
              </div>

              <div className={`w-32 md:w-44 ${taskIsOverdue ? "text-destructive" : ""}`}>
                {dueDate}
                {taskIsOverdue && <span className="ml-1">(overdue)</span>}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
