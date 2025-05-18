"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Member {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  initials: string;
}

interface TeamMemberAssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  teamName: string;
  members: Member[];
  onAssignMember: (memberId: string) => void;
  onCancel: () => void;
}

export function TeamMemberAssignmentDialog({
  isOpen,
  onOpenChange,
  teamName,
  members,
  onAssignMember,
  onCancel,
}: TeamMemberAssignmentDialogProps) {
  const t = useTranslations("settings.teams");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.role && member.role.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("assignMemberTitle", { fallback: "Add Member to Team" })}</DialogTitle>
          <DialogDescription>
            {teamName && t("assignMemberDescription", { teamName, fallback: `Select a member to add to "${teamName}".` })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchMembers", { fallback: "Search members..." })}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid gap-2 max-h-72 overflow-y-auto py-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => onAssignMember(member.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {member.initials}
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.email}</p>
                  </div>
                </div>
                {member.role && (
                  <Badge variant="outline">{member.role}</Badge>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {t("noMembersFound", { fallback: "No members found" })}
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            {t("cancel", { fallback: "Cancel" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
