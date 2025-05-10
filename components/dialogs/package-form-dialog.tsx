"use client";

import { useState, useEffect } from "react";
import { Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Team {
  id: string;
  name: string;
  color: string;
  members: number;
}

interface PackageFormValues {
  name: string;
  description: string;
  color: string;
  teamId?: string;
}

interface PackageFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEditing: boolean;
  initialValues: PackageFormValues;
  teams: Team[];
  onSubmit: (values: PackageFormValues) => void;
  onCancel: () => void;
}

export function PackageFormDialog({
  isOpen,
  onOpenChange,
  isEditing,
  initialValues,
  teams,
  onSubmit,
  onCancel,
}: PackageFormDialogProps) {
  const { toast } = useToast();
  const t = useTranslations("settings.project.packages");
  const [formValues, setFormValues] = useState<PackageFormValues>(initialValues);

  // Reset form values when initialValues change
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const colorOptions = [
    { value: "#ef4444", name: "Red" },
    { value: "#f59e0b", name: "Amber" },
    { value: "#10b981", name: "Green" },
    { value: "#3b82f6", name: "Blue" },
    { value: "#8b5cf6", name: "Purple" },
    { value: "#ec4899", name: "Pink" },
  ];

  const handleSubmit = () => {
    if (!formValues.name.trim()) {
      toast({
        title: t("packageNameRequired"),
        description: t("packageNameRequiredDescription"),
        variant: "destructive",
      });
      return;
    }

    onSubmit(formValues);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> {t("addPackage")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? t("editPackageTitle") : t("createPackageTitle")}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? t("editPackageDescription")
              : t("createPackageDescription")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">
              {t("packageName")}
            </label>
            <Input
              id="name"
              placeholder={t("packageNamePlaceholder")}
              value={formValues.name}
              onChange={(e) =>
                setFormValues({ ...formValues, name: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              {t("packageDescription")}
            </label>
            <Textarea
              id="description"
              placeholder={t("packageDescriptionPlaceholder")}
              value={formValues.description}
              onChange={(e) =>
                setFormValues({ ...formValues, description: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              {t("teamAssignmentOptional")}
            </label>
            <Select 
              value={formValues.teamId} 
              onValueChange={(value) => setFormValues({ ...formValues, teamId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("assignTeamPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: team.color }} />
                      <span>{team.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="color" className="text-sm font-medium">
              {t("packageColor")}
            </label>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    formValues.color === color.value
                      ? "ring-2 ring-offset-2 ring-black dark:ring-white"
                      : ""
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() =>
                    setFormValues({ ...formValues, color: color.value })
                  }
                  type="button"
                  title={color.name}
                >
                  {formValues.color === color.value && (
                    <Check className="h-4 w-4 text-white m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            {isEditing ? t("updatePackage") : t("createPackage")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}