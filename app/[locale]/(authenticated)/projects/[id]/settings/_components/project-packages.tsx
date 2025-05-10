"use client";

import { useState } from "react";
import { Edit2, Trash2, MoreHorizontal, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";

// Import dialog components
import { AddPackageTemplateDialog } from "@/components/dialogs/add-package-template-dialog";
import { PackageFormDialog } from "@/components/dialogs/package-form-dialog";
import { TeamAssignmentDialog } from "@/components/dialogs/team-assignment-dialog";

interface Package {
  id: string;
  name: string;
  description: string;
  color: string;
  taskCount: number;
  tasks?: PackageTask[];
  teamId?: string;
}

interface PackageTask {
  id: string;
  name: string;
  completed: boolean;
}

interface Team {
  id: string;
  name: string;
  color: string;
  members: number;
}

interface PackageTemplate {
  id: string;
  name: string;
  description: string;
  packages: Omit<Package, 'id' | 'teamId'>[];
}

interface PackageFormValues {
  name: string;
  description: string;
  color: string;
  teamId?: string;
}

export function ProjectPackages() {
  const { toast } = useToast();
  const t = useTranslations("settings.project.packages");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeamDialogOpen, setIsTeamDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPackage, setCurrentPackage] = useState<Package | null>(null);
  const [currentTeamAssignment, setCurrentTeamAssignment] = useState<{packageId: string, packageName: string} | null>(null);
  const [formValues, setFormValues] = useState<PackageFormValues>({
    name: "",
    description: "",
    color: "#3b82f6", // Default blue color
  });

  // Mock data - in a real app, this would be fetched from API
  const [packages, setPackages] = useState<Package[]>([
    {
      id: `pkg-${generateId()}`,
      name: "Market Research",
      description: "Tasks related to researching competitor products and market trends.",
      color: "#3b82f6", // blue
      taskCount: 3,
      tasks: [
        { id: `task-${generateId()}`, name: "Competitive analysis report", completed: true },
        { id: `task-${generateId()}`, name: "Market segmentation analysis", completed: false },
        { id: `task-${generateId()}`, name: "User interviews", completed: false },
      ]
    },
    {
      id: `pkg-${generateId()}`,
      name: "Product Design",
      description: "Design work for the product including wireframes, mockups, and UI assets.",
      color: "#8b5cf6", // purple
      taskCount: 2,
      tasks: [
        { id: `task-${generateId()}`, name: "Create wireframes", completed: true },
        { id: `task-${generateId()}`, name: "Design high-fidelity mockups", completed: false },
      ],
      teamId: "team-1" // Assigned to Design team
    },
    {
      id: `pkg-${generateId()}`,
      name: "Documentation",
      description: "Documentation tasks including user guides and API documentation.",
      color: "#10b981", // green
      taskCount: 4,
      tasks: [
        { id: `task-${generateId()}`, name: "API documentation", completed: false },
        { id: `task-${generateId()}`, name: "User guide", completed: false },
        { id: `task-${generateId()}`, name: "Developer guide", completed: false },
        { id: `task-${generateId()}`, name: "Product documentation", completed: false },
      ]
    },
    {
      id: `pkg-${generateId()}`,
      name: "Third-party Integrations",
      description: "Integration work with external services and APIs.",
      color: "#f59e0b", // amber
      taskCount: 2,
      tasks: [
        { id: `task-${generateId()}`, name: "Payment gateway integration", completed: false },
        { id: `task-${generateId()}`, name: "Authentication service integration", completed: false },
      ]
    },
  ]);

  // Mock teams data
  const [teams] = useState<Team[]>([
    { id: "team-1", name: "Design Team", color: "#8b5cf6", members: 4 },
    { id: "team-2", name: "Development Team", color: "#3b82f6", members: 6 },
    { id: "team-3", name: "QA Team", color: "#10b981", members: 3 },
    { id: "team-4", name: "Product Team", color: "#f59e0b", members: 2 },
  ]);

  // Mock package templates
  const packageTemplates: PackageTemplate[] = [
    {
      id: "template-1",
      name: "Software Development",
      description: "Standard software development package structure",
      packages: [
        {
          name: "Requirements Gathering",
          description: "Tasks related to gathering and documenting requirements.",
          color: "#3b82f6",
          taskCount: 3,
          tasks: [
            { id: `task-${generateId()}`, name: "Stakeholder interviews", completed: false },
            { id: `task-${generateId()}`, name: "Requirements documentation", completed: false },
            { id: `task-${generateId()}`, name: "User story creation", completed: false },
          ]
        },
        {
          name: "Design",
          description: "Design tasks for the software project.",
          color: "#8b5cf6",
          taskCount: 2,
          tasks: [
            { id: `task-${generateId()}`, name: "Architecture design", completed: false },
            { id: `task-${generateId()}`, name: "UI/UX design", completed: false },
          ]
        },
        {
          name: "Development",
          description: "Core development tasks.",
          color: "#10b981",
          taskCount: 3,
          tasks: [
            { id: `task-${generateId()}`, name: "Frontend development", completed: false },
            { id: `task-${generateId()}`, name: "Backend development", completed: false },
            { id: `task-${generateId()}`, name: "Database setup", completed: false },
          ]
        },
        {
          name: "Testing",
          description: "QA and testing tasks.",
          color: "#f59e0b",
          taskCount: 2,
          tasks: [
            { id: `task-${generateId()}`, name: "Unit testing", completed: false },
            { id: `task-${generateId()}`, name: "Integration testing", completed: false },
          ]
        }
      ]
    },
    {
      id: "template-2",
      name: "Marketing Campaign",
      description: "Standard marketing campaign package structure",
      packages: [
        {
          name: "Campaign Planning",
          description: "Planning tasks for marketing campaign.",
          color: "#ef4444",
          taskCount: 2,
          tasks: [
            { id: `task-${generateId()}`, name: "Target audience definition", completed: false },
            { id: `task-${generateId()}`, name: "Campaign goals setting", completed: false },
          ]
        },
        {
          name: "Content Creation",
          description: "Creating content for the campaign.",
          color: "#8b5cf6",
          taskCount: 3,
          tasks: [
            { id: `task-${generateId()}`, name: "Social media content", completed: false },
            { id: `task-${generateId()}`, name: "Blog posts", completed: false },
            { id: `task-${generateId()}`, name: "Email newsletters", completed: false },
          ]
        },
        {
          name: "Campaign Execution",
          description: "Executing the marketing campaign.",
          color: "#10b981",
          taskCount: 2,
          tasks: [
            { id: `task-${generateId()}`, name: "Social media posting", completed: false },
            { id: `task-${generateId()}`, name: "Email campaign launch", completed: false },
          ]
        }
      ]
    }
  ];

  const resetForm = () => {
    setFormValues({
      name: "",
      description: "",
      color: "#3b82f6",
    });
    setCurrentPackage(null);
    setIsEditing(false);
  };

  const openEditDialog = (pkg: Package) => {
    setCurrentPackage(pkg);
    setFormValues({
      name: pkg.name,
      description: pkg.description,
      color: pkg.color,
      teamId: pkg.teamId
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (values: PackageFormValues) => {
    if (isEditing && currentPackage) {
      // Update existing package
      setPackages(
        packages.map((pkg) =>
          pkg.id === currentPackage.id
            ? { ...pkg, ...values }
            : pkg
        )
      );
      toast({
        title: t("packageUpdated"),
        description: t("packageUpdatedDescription", {name: values.name}),
      });
    } else {
      // Add new package
      const newPackage: Package = {
        id: `pkg-${generateId()}`,
        ...values,
        taskCount: 0,
        tasks: []
      };
      setPackages([...packages, newPackage]);
      toast({
        title: t("packageCreated"),
        description: t("packageCreatedDescription", {name: values.name}),
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const deletePackage = (id: string) => {
    const packageToDelete = packages.find((pkg) => pkg.id === id);
    
    if (packageToDelete?.taskCount && packageToDelete.taskCount > 0) {
      toast({
        title: t("cannotDelete"),
        description: t("cannotDeleteDescription", {count: packageToDelete.taskCount}),
        variant: "destructive",
      });
      return;
    }
    
    setPackages(packages.filter((pkg) => pkg.id !== id));
    toast({
      title: t("packageDeleted"),
      description: t("packageDeletedDescription", {name: packageToDelete!.name}),
    });
  };

  const openTeamAssignDialog = (packageId: string, packageName: string) => {
    setCurrentTeamAssignment({ packageId, packageName });
    setIsTeamDialogOpen(true);
  };

  const assignTeam = (teamId: string) => {
    if (!currentTeamAssignment) return;
    
    setPackages(
      packages.map((pkg) =>
        pkg.id === currentTeamAssignment.packageId
          ? { ...pkg, teamId }
          : pkg
      )
    );
    
    const team = teams.find(t => t.id === teamId);
    toast({
      title: t("teamAssigned"),
      description: t("teamAssignedDescription", {
        packageName: currentTeamAssignment.packageName,
        teamName: team!.name
      }),
    });
    
    setIsTeamDialogOpen(false);
    setCurrentTeamAssignment(null);
  };

  const removeTeamAssignment = (packageId: string) => {
    setPackages(
      packages.map((pkg) =>
        pkg.id === packageId
          ? { ...pkg, teamId: undefined }
          : pkg
      )
    );
    
    toast({
      title: t("teamRemoved"),
      description: t("teamRemovedDescription"),
    });
  };

  const addPackagesFromTemplate = (templateId: string) => {
    const template = packageTemplates.find(t => t.id === templateId);
    
    if (!template) return;
    
    const newPackages = template.packages.map(pkg => ({
      ...pkg,
      id: `pkg-${generateId()}`,
    }));
    
    setPackages([...packages, ...newPackages]);
    
    toast({
      title: t("templateApplied"),
      description: t("templateAppliedDescription", {
        count: newPackages.length,
        name: template.name
      }),
    });
  };

  const getTeamById = (teamId?: string) => {
    return teamId ? teams.find(team => team.id === teamId) : undefined;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-md font-medium">
          {t("title")} ({packages.length})
        </h4>
        <div className="flex space-x-2">
          <AddPackageTemplateDialog 
            packageTemplates={packageTemplates}
            onAddTemplatePackages={addPackagesFromTemplate}
          />
          
          <PackageFormDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            isEditing={isEditing}
            initialValues={formValues}
            teams={teams}
            onSubmit={handleSubmit}
            onCancel={() => {
              setIsDialogOpen(false);
              resetForm();
            }}
          />
        </div>
      </div>

      <TeamAssignmentDialog
        isOpen={isTeamDialogOpen}
        onOpenChange={setIsTeamDialogOpen}
        packageName={currentTeamAssignment ? currentTeamAssignment.packageName : ""}
        teams={teams}
        onAssignTeam={assignTeam}
        onCancel={() => {
          setIsTeamDialogOpen(false);
          setCurrentTeamAssignment(null);
        }}
      />

      {packages.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {t("noPackages")}
        </div>
      ) : (
        <ul className="space-y-3">
          {packages.map((pkg) => (
            <li key={pkg.id}>
              <Card className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: pkg.color }}
                          />
                          <CardTitle className="text-lg">{pkg.name}</CardTitle>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => openEditDialog(pkg)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              {t("editPackage")}
                            </DropdownMenuItem>
                            {pkg.teamId ? (
                              <DropdownMenuItem onClick={() => removeTeamAssignment(pkg.id)}>
                                <Users className="mr-2 h-4 w-4" />
                                {t("removeTeam")}
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => openTeamAssignDialog(pkg.id, pkg.name)}>
                                <Users className="mr-2 h-4 w-4" />
                                {t("assignTeam")}
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem 
                              onClick={() => deletePackage(pkg.id)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              {t("deletePackage")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CardDescription className="mt-1">{pkg.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="secondary">{t("taskCount", { count: pkg.taskCount })}</Badge>
                        {pkg.teamId && (
                          <Badge 
                            variant="outline" 
                            className="flex items-center gap-1"
                            style={{ 
                              borderColor: getTeamById(pkg.teamId)?.color,
                              color: getTeamById(pkg.teamId)?.color 
                            }}
                          >
                            <Users className="h-3 w-3" />
                            {getTeamById(pkg.teamId)?.name}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </div>
                  
                  {pkg.tasks && pkg.tasks.length > 0 && (
                    <div className="md:w-1/3 md:border-l border-t md:border-t-0">
                      <Accordion type="single" collapsible className="w-full md:hidden">
                        <AccordionItem value="tasks" className="border-0">
                          <AccordionTrigger className="py-2 px-4 hover:no-underline text-xs text-muted-foreground">
                            {t("viewTasks")}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="px-4 pb-4">
                              <ul className="space-y-1.5 text-sm">
                                {pkg.tasks.map(task => (
                                  <li key={task.id} className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70" />
                                    <span>{task.name}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      <div className="hidden md:block p-4">
                        <h4 className="text-xs font-medium uppercase text-muted-foreground mb-2">{t("tasks")}</h4>
                        <ul className="space-y-1.5 text-sm">
                          {pkg.tasks.map(task => (
                            <li key={task.id} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/70" />
                              <span>{task.name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}