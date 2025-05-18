"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface TaskFormValues {
  name: string;
  description: string;
  completed: boolean;
}

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  initialValues: TaskFormValues;
  onSubmit: (values: TaskFormValues) => void;
  taskName?: string;
}

export function TaskFormDialog({
  open,
  onOpenChange,
  isEditing = false,
  initialValues,
  onSubmit,
  taskName,
}: TaskFormDialogProps) {
  const { toast } = useToast();
  const t = useTranslations("settings.packages");
  const [formValues, setFormValues] = useState<TaskFormValues>(initialValues);

  // Reset form values when initialValues change
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleSubmit = () => {
    if (!formValues.name.trim()) {
      toast({
        title: t("taskNameRequired"),
        description: t("taskNameRequiredDescription"),
        variant: "destructive",
      });
      return;
    }

    onSubmit(formValues);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t("editTaskTitle", { fallback: "Edit Task" }) : t("createTaskTitle", { fallback: "Create Task" })}
          </DialogTitle>
          <DialogDescription>
            {isEditing && taskName
              ? t("editTaskDescription", { task: taskName, fallback: `Edit task "${taskName}"` })
              : t("createTaskDescription", { fallback: "Add a new task to this package." })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("taskName", { fallback: "Task Name" })}
            </label>
            <Input
              id="name"
              placeholder={t("taskNamePlaceholder", { fallback: "Enter task name" })}
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              {t("taskDescription", { fallback: "Description" })}
            </label>
            <Textarea
              id="description"
              placeholder={t("taskDescriptionPlaceholder", { fallback: "Enter task description" })}
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="completed"
              checked={formValues.completed}
              onCheckedChange={(checked) => 
                setFormValues({ ...formValues, completed: checked as boolean })
              }
            />
            <label
              htmlFor="completed"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("taskCompleted", { fallback: "Completed" })}
            </label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("cancel", { fallback: "Cancel" })}
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? t("updateTask", { fallback: "Update Task" }) : t("createTask", { fallback: "Create Task" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
