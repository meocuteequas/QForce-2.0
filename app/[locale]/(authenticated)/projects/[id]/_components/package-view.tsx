"use client";

import { useState, useMemo } from "react";
import { Package } from "lucide-react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TasksTable from "./tasks-table";
import type { Task } from "../kanban";

interface PackageViewProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const PackageView = ({ tasks, onTaskClick }: PackageViewProps) => {
  const [expandedPackages, setExpandedPackages] = useState<string[]>([]);
  
  // Group tasks by package name
  const packagedTasks = useMemo(() => {
    // Create a mapping of package name to tasks
    const packages: Record<string, Task[]> = {};
    
    tasks.forEach(task => {
      const packageField = task.customFields.find(field => field.name === "Package");
      const packageName = packageField?.value || "Unassigned";
      
      if (!packages[packageName]) {
        packages[packageName] = [];
      }
      
      packages[packageName].push(task);
    });
    
    // Convert to array for rendering and sort tasks within each package by recency
    return Object.entries(packages).map(([name, packageTasks]) => ({
      name,
      tasks: packageTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }));
  }, [tasks]);

  // Toggle package expansion
  const togglePackage = (packageName: string) => {
    setExpandedPackages(current => 
      current.includes(packageName) 
        ? current.filter(name => name !== packageName)
        : [...current, packageName]
    );
  };

  if (packagedTasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 p-8 text-center text-muted-foreground">
        No packages found. Add a package field to your tasks.
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md border dark:border-gray-700 overflow-hidden divide-y divide-gray-200 dark:divide-gray-700">
      {packagedTasks.map(packageGroup => (
        <div key={packageGroup.name}>
          <div 
            className="flex items-center p-4 cursor-pointer hover:bg-muted/50"
            onClick={() => togglePackage(packageGroup.name)}
          >
            <Package className="h-5 w-5 mr-2 text-blue-500" />
            <div className="flex-1">
              <span className="font-medium">{packageGroup.name}</span>
              <span className="ml-2 text-muted-foreground">({packageGroup.tasks.length} tasks)</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {expandedPackages.includes(packageGroup.name) ? "Hide" : "Show"} tasks
            </span>
          </div>
          
          {expandedPackages.includes(packageGroup.name) && (
            <div className="bg-muted/30">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Task</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TasksTable 
                    tasks={packageGroup.tasks} 
                    onTaskClick={onTaskClick} 
                    isActive={true} 
                  />
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};