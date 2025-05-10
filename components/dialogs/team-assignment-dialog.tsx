"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Team {
  id: string;
  name: string;
  color: string;
  members: number;
}

interface TeamAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  packageName: string;
  teams: Team[];
  onAssignTeam: (teamId: string) => void;
  onCancel: () => void;
}

export function TeamAssignmentDialog({
  isOpen,
  onOpenChange,
  packageName,
  teams,
  onAssignTeam,
  onCancel,
}: TeamAssignmentDialogProps) {
  const t = useTranslations("settings.project.packages");

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("assignTeamTitle")}</DialogTitle>
          <DialogDescription>
            {t("assignTeamDescription", { packageName })}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50 cursor-pointer"
              onClick={() => onAssignTeam(team.id)}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.color }} />
                <span>{team.name}</span>
              </div>
              <Badge variant="outline">{t("memberCount", { count: team.members })}</Badge>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {t("cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}