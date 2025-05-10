"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
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
import { LayoutTemplate } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PackageTask {
  id: string;
  name: string;
  completed: boolean;
}

interface PackageTemplate {
  id: string;
  name: string;
  description: string;
  packages: {
    name: string;
    description: string;
    color: string;
    taskCount: number;
    tasks?: PackageTask[];
  }[];
}

interface AddPackageTemplateDialogProps {
  packageTemplates: PackageTemplate[];
  onAddTemplatePackages: (templateId: string) => void;
}

export function AddPackageTemplateDialog({
  packageTemplates,
  onAddTemplatePackages,
}: AddPackageTemplateDialogProps) {
  const { toast } = useToast();
  const t = useTranslations("settings.project.packages");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>(packageTemplates[0]?.id || "");
  
  const currentTemplate = packageTemplates.find(t => t.id === selectedTemplate);

  const handleAddPackages = () => {
    if (!selectedTemplate) {
      toast({
        title: t("noTemplateSelected"),
        description: t("noTemplateSelectedDescription"),
        variant: "destructive",
      });
      return;
    }
    
    onAddTemplatePackages(selectedTemplate);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <LayoutTemplate className="mr-2 h-4 w-4" /> {t("fromTemplate")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("addPackagesFromTemplate")}</DialogTitle>
          <DialogDescription>
            {t("addPackagesFromTemplateDescription")}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label htmlFor="template" className="text-sm font-medium">
              {t("selectTemplate")}
            </label>
            <Select 
              value={selectedTemplate} 
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("selectTemplatePlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {packageTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {currentTemplate && (
            <>
              <div className="text-sm text-muted-foreground mb-2">
                {currentTemplate.description}
              </div>
              
              <div className="border rounded-md">
                <div className="px-4 py-3 bg-muted/50 font-medium border-b">
                  {t("includedPackages")}
                </div>
                <div className="p-4">
                  <ul className="space-y-2">
                    {currentTemplate.packages.map((pkg) => (
                      <li key={pkg.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: pkg.color }} />
                        <span>{pkg.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {t("taskCount", { count: pkg.taskCount })}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            {t("cancel")}
          </Button>
          <Button onClick={handleAddPackages}>
            {t("addPackagesCount", { 
              count: currentTemplate?.packages.length || 0 
            })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}