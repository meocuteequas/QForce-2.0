"use client";

import { useMemo } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TasksTable from "./tasks-table";
import type { Task } from "../kanban";

interface TaskViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const TaskView = ({ tasks, onTaskClick }: TaskViewProps) => {
  // Sort tasks by recent first
  const sortedTasks = useMemo(() => 
    [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [tasks]
  );
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Task</TableHead>
            <TableHead>Assignee</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Package</TableHead>
            <TableHead>Due Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No tasks found. Create your first task to get started.
              </TableCell>
            </TableRow>
          ) : (
            <TasksTable tasks={sortedTasks} onTaskClick={onTaskClick} isActive={true} />
          )}
        </TableBody>
      </Table>
    </div>
  );
};