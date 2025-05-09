"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import TasksTable from "./tasks-table";
import AddTaskDialog from "./add-task-dialog";
import type { Task, Column } from "../kanban";
import { generateId } from "@/lib/utils";

interface TableViewProps {
  columns: Column[];
  onAddTask: (columnId: string, task: Task) => void;
  onTaskClick: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
}

export default function TableView({ columns, onAddTask, onTaskClick }: TableViewProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  // Get active and completed tasks from all columns
  const activeTasks = columns
    .filter((column) => column.title !== "Completed")
    .flatMap((column) => column.tasks)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const completedTasks = columns.find((column) => column.title === "Completed")?.tasks || [];

  // Get the "To Do" column id for new tasks
  const todoColumnId = columns.find((column) => column.title === "To Do")?.id || columns[0]?.id;

  const handleAddTask = (taskData: Omit<Task, "id" | "status" | "createdAt">) => {
    if (!todoColumnId) return;

    const newTask: Task = {
      id: `task-${generateId()}`,
      ...taskData,
      status: "To Do",
      createdAt: new Date().toISOString(),
    };

    onAddTask(todoColumnId, newTask);
    setIsAddTaskOpen(false);
  };

  return (
    <div className="w-full p-4">
      <Accordion type="multiple" defaultValue={["active-tasks", "completed-tasks"]} className="w-full">
        <AccordionItem value="active-tasks" className="border-none">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-t-md">
            <AccordionTrigger className="flex-1 hover:no-underline items-center">
              <span className="text-lg font-medium">
                Active Tasks <span className="text-muted-foreground ml-2">({activeTasks.length})</span>
              </span>
            </AccordionTrigger>
            <div className="flex items-center justify-end space-x-6 text-sm font-medium text-muted-foreground flex-1">
              <div className="w-32 md:w-44">Assignee</div>
              <div className="w-24 md:w-40">Status</div>
              <div className="w-24 md:w-40">Priority</div>
              <div className="w-32 md:w-44">Due Date</div>
            </div>
          </div>
          <AccordionContent className="border rounded-b-md dark:border-gray-700">
            <TasksTable tasks={activeTasks} onTaskClick={onTaskClick} isActive={true} />
            <div className="px-4 py-3 border-t dark:border-gray-700">
              <Button
                variant="ghost"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => setIsAddTaskOpen(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="completed-tasks" className="border-none mt-4">
          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-t-md">
            <AccordionTrigger className="flex-1 hover:no-underline items-center">
              <span className="text-lg font-medium">
                Completed Tasks <span className="text-muted-foreground ml-2">({completedTasks.length})</span>
              </span>
            </AccordionTrigger>
            <div className="flex items-center justify-end space-x-6 text-sm font-medium text-muted-foreground flex-1">
              <div className="w-32 md:w-44">Assignee</div>
              <div className="w-24 md:w-40">Status</div>
              <div className="w-24 md:w-40">Priority</div>
              <div className="w-32 md:w-44">Due Date</div>
            </div>
          </div>
          <AccordionContent className="border rounded-b-md dark:border-gray-700">
            <TasksTable tasks={completedTasks} onTaskClick={onTaskClick} isActive={false} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} onAddTask={handleAddTask} />
    </div>
  );
}
