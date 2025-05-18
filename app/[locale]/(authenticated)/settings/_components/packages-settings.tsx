"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Plus, GripVertical, Edit, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PackageFormDialog } from "@/components/dialogs/package-form-dialog";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";
import { TaskFormDialog } from "@/components/dialogs/task-form-dialog";
import { useTranslations } from "next-intl";

// Define interfaces for our component
interface Task {
  id: string;
  name: string;
  description?: string;
  completed: boolean;
}

interface Package {
  id: string;
  name: string;
  description: string;
  color: string;
  tasks: Task[];
}

export default function PackageSettings() {
  const { toast } = useToast();
  const t = useTranslations("settings.packages");
  // State for packages and the currently selected package
  const [packages, setPackages] = useState<Package[]>([
    {
      id: "pkg-1",
      name: "Product Design",
      description: "Design tasks for the product",
      color: "#3b82f6",
      tasks: [
        {
          id: "task-1",
          name: "Create wireframes",
          description: "Create wireframes for the dashboard",
          completed: false,
        },
        { id: "task-2", name: "User research", description: "Conduct user interviews", completed: true },
        { id: "task-3", name: "Prototype testing", description: "Test prototypes with users", completed: false },
      ],
    },
    {
      id: "pkg-2",
      name: "Development",
      description: "Development tasks for the product",
      color: "#10b981",
      tasks: [
        {
          id: "task-4",
          name: "Setup development environment",
          description: "Initialize repository and set up dev tools",
          completed: true,
        },
        {
          id: "task-5",
          name: "Implement authentication",
          description: "Build authentication system",
          completed: false,
        },
        {
          id: "task-6",
          name: "Create API endpoints",
          description: "Develop necessary API endpoints",
          completed: false,
        },
      ],
    },
    {
      id: "pkg-3",
      name: "Marketing",
      description: "Marketing tasks for product launch",
      color: "#f59e0b",
      tasks: [
        {
          id: "task-7",
          name: "Create marketing plan",
          description: "Develop a comprehensive marketing strategy",
          completed: false,
        },
        {
          id: "task-8",
          name: "Design promotional materials",
          description: "Create banners and social media assets",
          completed: false,
        },
      ],
    },
  ]);

  const [selectedPackageId, setSelectedPackageId] = useState<string>(packages[0]?.id);
  const selectedPackage = packages.find((pkg) => pkg.id === selectedPackageId);

  // Package form dialog state
  const [isPackageFormOpen, setIsPackageFormOpen] = useState(false);
  const [isEditingPackage, setIsEditingPackage] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);

  // Task form dialog state
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  // Initial form values
  const initialPackageValues = {
    name: currentPackage?.name || "",
    description: currentPackage?.description || "",
    color: currentPackage?.color || "#3b82f6",
    teamId: undefined,
  };

  const initialTaskValues = {
    name: currentTask?.name || "",
    description: currentTask?.description || "",
    completed: currentTask?.completed || false,
  };

  // Function to handle task reordering
  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    // Check if we have a valid destination
    if (!destination) return;

    // Check if the position changed
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // Find the package that contains the tasks
    const updatedPackages = [...packages];
    const packageIndex = updatedPackages.findIndex((pkg) => pkg.id === selectedPackageId);

    if (packageIndex === -1) return;

    // Create a copy of the tasks array
    const tasks = [...updatedPackages[packageIndex].tasks];

    // Remove the task from the source position
    const [movedTask] = tasks.splice(source.index, 1);

    // Insert the task at the destination position
    tasks.splice(destination.index, 0, movedTask);

    // Update the package with the new tasks order
    updatedPackages[packageIndex].tasks = tasks;

    // Update the state
    setPackages(updatedPackages);
  };

  const handleEditPackage = (pkg: Package) => {
    setCurrentPackage(pkg);
    setIsEditingPackage(true);
    setIsPackageFormOpen(true);
  };

  const handlePackageFormSubmit = (values: { name: string; description: string; color: string; teamId?: string }) => {
    if (isEditingPackage && currentPackage) {
      // Update existing package
      const updatedPackages = packages.map((pkg) =>
        pkg.id === currentPackage.id
          ? { ...pkg, name: values.name, description: values.description, color: values.color }
          : pkg
      );
      setPackages(updatedPackages);
      toast({
        title: t("packageUpdated", { fallback: "Package updated" }),
        description: t("packageUpdatedDescription", {
          name: values.name,
          fallback: `${values.name} has been updated.`,
        }),
      });
    } else {
      // Add new package
      const newPackage: Package = {
        id: `pkg-${generateId()}`,
        name: values.name,
        description: values.description,
        color: values.color,
        tasks: [],
      };
      setPackages([...packages, newPackage]);
      toast({
        title: t("packageCreated", { fallback: "Package created" }),
        description: t("packageCreatedDescription", {
          name: values.name,
          fallback: `${values.name} has been created.`,
        }),
      });
    }
    setIsPackageFormOpen(false);
  };

  // Task form handlers
  const handleAddTask = () => {
    setCurrentTask(null);
    setIsEditingTask(false);
    setIsTaskFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setIsEditingTask(true);
    setIsTaskFormOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!selectedPackage) return;

    const updatedPackages = packages.map((pkg) =>
      pkg.id === selectedPackage.id ? { ...pkg, tasks: pkg.tasks.filter((task) => task.id !== taskId) } : pkg
    );

    setPackages(updatedPackages);
    toast({
      title: t("taskDeleted", { fallback: "Task deleted" }),
      description: t("taskDeletedDescription", { fallback: "The task has been removed from this package." }),
    });
  };

  const handleTaskFormSubmit = (values: { name: string; description: string; completed: boolean }) => {
    if (!selectedPackage) return;

    if (isEditingTask && currentTask) {
      // Update existing task
      const updatedPackages = packages.map((pkg) =>
        pkg.id === selectedPackage.id
          ? {
              ...pkg,
              tasks: pkg.tasks.map((task) =>
                task.id === currentTask.id
                  ? { ...task, name: values.name, description: values.description, completed: values.completed }
                  : task
              ),
            }
          : pkg
      );
      setPackages(updatedPackages);
      toast({
        title: t("taskUpdated", { fallback: "Task updated" }),
        description: t("taskUpdatedDescription", { name: values.name, fallback: `${values.name} has been updated.` }),
      });
    } else {
      // Add new task
      const newTask: Task = {
        id: `task-${generateId()}`,
        name: values.name,
        description: values.description,
        completed: values.completed,
      };

      const updatedPackages = packages.map((pkg) =>
        pkg.id === selectedPackage.id ? { ...pkg, tasks: [...pkg.tasks, newTask] } : pkg
      );
      setPackages(updatedPackages);
      toast({
        title: t("taskCreated", { fallback: "Task created" }),
        description: t("taskCreatedDescription", {
          name: values.name,
          packageName: selectedPackage.name,
          fallback: `${values.name} has been added to ${selectedPackage.name}.`,
        }),
      });
    }
    setIsTaskFormOpen(false);
  };

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-[280px] flex-shrink-0">
          <CardHeader>
            <CardTitle className="text-base font-medium">{t("packages", { fallback: "Packages" })}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-col gap-3">
              <PackageFormDialog
                open={isPackageFormOpen}
                onOpenChange={setIsPackageFormOpen}
                onSubmit={handlePackageFormSubmit}
                initialValues={initialPackageValues}
                isEditing={isEditingPackage}
                packageName={currentPackage?.name}
              />

              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`p-3 rounded-md cursor-pointer flex justify-between items-center transition-colors ${
                        selectedPackageId === pkg.id ? "bg-accent" : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center gap-2" onClick={() => setSelectedPackageId(pkg.id)}>
                        <div
                          className={`w-3 h-3 rounded-full border ${
                            selectedPackageId === pkg.id ? "border-primary-foreground" : "border-transparent"
                          }`}
                          style={{ backgroundColor: pkg.color }}
                        />
                        <span className="truncate">{pkg.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPackage(pkg);
                          }}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-medium">
              {t("tasksInPackage", {
                package: selectedPackage?.name || "",
                fallback: `Tasks in ${selectedPackage?.name || "Package"}`,
              })}
            </CardTitle>
            <Button size="sm" disabled={!selectedPackage} onClick={handleAddTask}>
              <Plus className="mr-2 h-4 w-4" /> {t("addTask", { fallback: "Add Task" })}
            </Button>
          </CardHeader>
          <CardContent className="p-4">
            {!selectedPackage ? (
              <Alert className="bg-muted">
                <AlertDescription>
                  {t("selectPackagePrompt", { fallback: "Select a package to view and manage its tasks." })}
                </AlertDescription>
              </Alert>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId={selectedPackage.id}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2 min-h-[400px]">
                      {selectedPackage.tasks.length === 0 ? (
                        <Alert className="bg-muted">
                          <AlertDescription>
                            {t("noTasksAvailable", {
                              fallback: "No tasks available in this package. Add a task to get started.",
                            })}
                          </AlertDescription>
                        </Alert>
                      ) : (
                        selectedPackage.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className="p-3 bg-card border rounded-md shadow-sm"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <div {...provided.dragHandleProps} className="cursor-grab">
                                      <GripVertical className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{task.name}</div>
                                      {task.description && (
                                        <div className="text-sm text-muted-foreground line-clamp-1">
                                          {task.description}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button variant="ghost" size="icon" onClick={() => handleEditTask(task)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => handleDeleteTask(task.id)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Task Form Dialog */}
      <TaskFormDialog
        open={isTaskFormOpen}
        onOpenChange={setIsTaskFormOpen}
        onSubmit={handleTaskFormSubmit}
        initialValues={initialTaskValues}
        isEditing={isEditingTask}
        taskName={currentTask?.name}
      />
    </div>
  );
}
