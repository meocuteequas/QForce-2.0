"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import { 
  Plus, 
  Download, 
  CheckCircle2, 
  Clock, 
  Ban, 
  AlertCircle,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddTaskDialog from "./add-task-dialog";
import { TaskView } from "./task-view";
import { PackageView } from "./package-view";
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
  const [viewMode, setViewMode] = useState<"task" | "package">("task");

  // Get all tasks from all columns
  const allTasks = useMemo(() => columns.flatMap(column => column.tasks), [columns]);

  // Calculate tasks by status for summary cards
  const taskStats = useMemo(() => {
    const totalCount = allTasks.length;
    if (totalCount === 0) return [];

    const unscheduled = allTasks.filter(task => !task.dueDate).length;
    const inProgress = allTasks.filter(task => task.status === "In Progress").length;
    const completed = allTasks.filter(task => task.status === "Completed").length;
    const blocked = allTasks.filter(task => task.status === "Blocked").length;
    const overdue = allTasks.filter(task => 
      task.dueDate && 
      new Date(task.dueDate) < new Date() && 
      task.status !== "Completed"
    ).length;

    return [
      {
        name: "Unscheduled",
        count: unscheduled,
        percent: Math.round((unscheduled / totalCount) * 100),
        icon: <Calendar className="h-5 w-5 text-blue-500" />,
        color: "bg-blue-50 dark:bg-blue-900/30",
      },
      {
        name: "In Progress",
        count: inProgress,
        percent: Math.round((inProgress / totalCount) * 100),
        icon: <Clock className="h-5 w-5 text-yellow-500" />,
        color: "bg-yellow-50 dark:bg-yellow-900/30",
      },
      {
        name: "Completed",
        count: completed,
        percent: Math.round((completed / totalCount) * 100),
        icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
        color: "bg-green-50 dark:bg-green-900/30",
      },
      {
        name: "Blocked",
        count: blocked,
        percent: Math.round((blocked / totalCount) * 100),
        icon: <Ban className="h-5 w-5 text-red-500" />,
        color: "bg-red-50 dark:bg-red-900/30",
      },
      {
        name: "Overdue",
        count: overdue,
        percent: Math.round((overdue / totalCount) * 100),
        icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
        color: "bg-orange-50 dark:bg-orange-900/30",
      },
    ];
  }, [allTasks]);

  // Handle export to Excel
  const handleExportToExcel = () => {
    if (!allTasks.length) return;
    
    // Convert tasks to CSV format
    const headers = ["Title", "Description", "Status", "Due Date", "Assignee", "Priority", "Package"];
    const rows = allTasks.map(task => {
      const assignee = task.customFields.find(field => field.name === "Assigned To")?.value || "";
      const priority = task.customFields.find(field => field.name === "Priority")?.value || "";
      const packageName = task.customFields.find(field => field.name === "Package")?.value || "";
      const dueDate = task.dueDate ? format(new Date(task.dueDate), "yyyy-MM-dd") : "";
      
      return [
        task.title,
        task.description || "",
        task.status,
        dueDate,
        assignee,
        priority,
        packageName
      ];
    });
    
    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${(cell || "").replace(/"/g, '""')}"`).join(","))
    ].join("\n");
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `tasks-export-${format(new Date(), "yyyy-MM-dd")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    <div className="w-full space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {taskStats.map((stat) => (
          <Card key={stat.name} className={`${stat.color} border dark:border-gray-700`}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="text-sm font-medium text-muted-foreground">{stat.name}</div>
                <div className="text-2xl font-bold">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.percent}% of total</div>
              </div>
              <div className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Tabs defaultValue="task" onValueChange={(value) => setViewMode(value as "task" | "package")}>
          <TabsList>
            <TabsTrigger value="task">Task View</TabsTrigger>
            <TabsTrigger value="package">Package View</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExportToExcel}
            variant="outline"
            className="gap-2"
            disabled={!allTasks.length}
          >
            <Download className="h-4 w-4" />
            Export to Excel
          </Button>
          
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Task View / Package View */}
      {viewMode === "task" ? (
        <TaskView tasks={allTasks} onTaskClick={onTaskClick} />
      ) : (
        <PackageView tasks={allTasks} onTaskClick={onTaskClick} />
      )}

      <AddTaskDialog open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} onAddTask={handleAddTask} />
    </div>
  );
}
