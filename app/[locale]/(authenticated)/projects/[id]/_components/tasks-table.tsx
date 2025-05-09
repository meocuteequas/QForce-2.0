"use client";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { TableRow, TableCell } from "@/components/ui/table";
import type { Task } from "../kanban";

interface TasksTableProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  isActive: boolean;
}

export default function TasksTable({ tasks, onTaskClick, isActive }: TasksTableProps) {
  if (tasks.length === 0) {
    return null;
  }

  // Get assignee from custom fields
  const getAssignee = (task: Task) => {
    const assigneeField = task.customFields.find((field) => field.name === "Assigned To");
    return assigneeField?.value || "";
  };

  // Get priority from custom fields
  const getPriority = (task: Task) => {
    const priorityField = task.customFields.find((field) => field.name === "Priority");
    return priorityField?.value || "Medium";
  };

  // Get package from custom fields
  const getPackage = (task: Task) => {
    const packageField = task.customFields.find((field) => field.name === "Package");
    return packageField?.value || "Unassigned";
  };

  // Function to determine priority badge variant
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
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
    <>
      {tasks.map((task) => {
        const assignee = getAssignee(task);
        const priority = getPriority(task);
        const packageName = getPackage(task);
        const dueDate = formatDueDate(task.dueDate);
        const taskIsOverdue = isOverdue(task.dueDate);

        return (
          <TableRow 
            key={task.id}
            className="hover:bg-muted/50 cursor-pointer"
            onClick={() => onTaskClick(task)}
          >
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{task.title}</span>
                {task.description && (
                  <span className="text-xs text-muted-foreground line-clamp-1">{task.description}</span>
                )}
                <div className="flex flex-wrap gap-1 mt-1">
                  {task.subtasks.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {task.subtasks.filter(st => st.completed).length}/{task.subtasks.length} subtasks
                    </Badge>
                  )}
                </div>
              </div>
            </TableCell>
            
            <TableCell>
              {assignee ? (
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
            </TableCell>
            
            <TableCell>
              <Badge variant="outline" className="border-[1.5px]">
                {task.status}
              </Badge>
            </TableCell>
            
            <TableCell>
              <Badge
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                variant={getPriorityBadgeVariant(priority) as any}
                className="font-normal"
              >
                {priority}
              </Badge>
            </TableCell>
            
            {/* Only show package column in Task view (not in Package view) */}
            {packageName !== undefined && (
              <TableCell>
                <Badge variant="outline" className="bg-blue-50/50 dark:bg-blue-900/20">
                  {packageName}
                </Badge>
              </TableCell>
            )}
            
            <TableCell className={taskIsOverdue ? "text-destructive" : ""}>
              {dueDate}
              {taskIsOverdue && <span className="ml-1">(overdue)</span>}
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
