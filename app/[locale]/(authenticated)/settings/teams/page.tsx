"use client";

import { useState } from "react";
import { Trash2, MoreHorizontal, Users, Plus, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";

// Import dialog components
import { AddTeamDialog } from "@/components/dialogs/add-team-dialog";
import { TeamMemberAssignmentDialog } from "@/components/dialogs/team-member-assignment-dialog";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatarUrl?: string;
  initials: string;
}

interface Team {
  id: string;
  name: string;
  description?: string;
  members: TeamMember[];
  createdAt: string;
}

export default function TeamsPage() {
  const { toast } = useToast();
  const t = useTranslations("settings.teams");
  
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock all organization members data (for member assignment)
  const [allMembers] = useState<TeamMember[]>([
    {
      id: `user-${generateId()}`,
      name: "Sarah Chen",
      email: "sarah.chen@qforce.co",
      role: "Project Manager",
      initials: "SC",
    },
    {
      id: `user-${generateId()}`,
      name: "Michael Reynolds",
      email: "michael.r@qforce.co",
      role: "Developer",
      initials: "MR",
    },
    {
      id: `user-${generateId()}`,
      name: "Tanya Singh",
      email: "tanya.s@qforce.co",
      role: "Designer",
      initials: "TS",
    },
    {
      id: `user-${generateId()}`,
      name: "James Wilson",
      email: "james.w@qforce.co",
      role: "Quality Assurance",
      initials: "JW",
    },
    {
      id: `user-${generateId()}`,
      name: "Emily Johnson",
      email: "emily.j@qforce.co",
      role: "Business Analyst",
      initials: "EJ",
    },
    {
      id: `user-${generateId()}`,
      name: "David Kim",
      email: "david.k@qforce.co",
      role: "DevOps Engineer",
      initials: "DK",
    }
  ]);
  
  // Mock teams data
  const [teams, setTeams] = useState<Team[]>([
    {
      id: `team-${generateId()}`,
      name: "Design Team",
      description: "Responsible for UI/UX design and visual assets",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
      members: [
        {
          id: `user-${generateId()}`,
          name: "Tanya Singh",
          email: "tanya.s@qforce.co",
          role: "Lead Designer",
          initials: "TS",
        },
        {
          id: `user-${generateId()}`,
          name: "Alex Johnson",
          email: "alex.j@qforce.co",
          role: "UI Developer",
          initials: "AJ",
        }
      ]
    },
    {
      id: `team-${generateId()}`,
      name: "Development Team",
      description: "Backend and frontend implementation",
      createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
      members: [
        {
          id: `user-${generateId()}`,
          name: "Michael Reynolds",
          email: "michael.r@qforce.co",
          role: "Team Lead",
          initials: "MR",
        },
        {
          id: `user-${generateId()}`,
          name: "Lisa Chen",
          email: "lisa.c@qforce.co",
          role: "Backend Developer",
          initials: "LC",
        },
        {
          id: `user-${generateId()}`,
          name: "James Wilson",
          email: "james.w@qforce.co",
          role: "Frontend Developer",
          initials: "JW",
        }
      ]
    }
  ]);

  const filteredTeams = teams.filter((team) =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (team.description && team.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddTeam = (teamName: string) => {
    if (!teamName.trim()) return;
    
    const newTeam: Team = {
      id: `team-${generateId()}`,
      name: teamName,
      description: "",
      createdAt: new Date().toISOString(),
      members: []
    };
    
    setTeams([...teams, newTeam]);
    setIsAddTeamDialogOpen(false);
    
    toast({
      title: t("teamCreated", { fallback: "Team created" }),
      description: t("teamCreatedDescription", { 
        teamName, 
        fallback: `"${teamName}" has been created successfully.` 
      }),
    });
  };

  const openMemberDialog = (team: Team) => {
    setCurrentTeam(team);
    setIsMemberDialogOpen(true);
  };

  const handleAssignMember = (memberId: string) => {
    if (!currentTeam) return;
    
    // Check if member is already in the team
    const isAlreadyMember = currentTeam.members.some(member => member.id === memberId);
    if (isAlreadyMember) {
      toast({
        title: t("memberAlreadyExists", { fallback: "Member already exists" }),
        description: t("memberAlreadyExistsDescription", { 
          fallback: "This person is already a member of this team." 
        }),
        variant: "destructive",
      });
      return;
    }
    
    // Find the member data from all members
    const member = allMembers.find(m => m.id === memberId);
    if (!member) return;
    
    // Add member to the team
    const updatedTeams = teams.map(team => 
      team.id === currentTeam.id 
        ? { ...team, members: [...team.members, { ...member }] } 
        : team
    );
    
    setTeams(updatedTeams);
    setIsMemberDialogOpen(false);
    
    toast({
      title: t("memberAdded", { fallback: "Member added" }),
      description: t("memberAddedDescription", { 
        memberName: member.name, 
        teamName: currentTeam.name,
        fallback: `${member.name} has been added to "${currentTeam.name}".` 
      }),
    });
  };

  const removeMember = (teamId: string, memberId: string) => {
    const team = teams.find(t => t.id === teamId);
    const member = team?.members.find(m => m.id === memberId);
    
    if (!team || !member) return;
    
    const updatedTeams = teams.map(team => 
      team.id === teamId 
        ? { ...team, members: team.members.filter(m => m.id !== memberId) } 
        : team
    );
    
    setTeams(updatedTeams);
    
    toast({
      title: t("memberRemoved", { fallback: "Member removed" }),
      description: t("memberRemovedDescription", { 
        memberName: member.name, 
        teamName: team.name,
        fallback: `${member.name} has been removed from "${team.name}".` 
      }),
    });
  };

  const deleteTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    
    if (!team) return;
    
    if (team.members.length > 0) {
      toast({
        title: t("cannotDelete", { fallback: "Cannot delete team" }),
        description: t("cannotDeleteDescription", { 
          count: team.members.length,
          fallback: `Cannot delete team with ${team.members.length} members. Remove all members first.` 
        }),
        variant: "destructive",
      });
      return;
    }
    
    setTeams(teams.filter(t => t.id !== teamId));
    
    toast({
      title: t("teamDeleted", { fallback: "Team deleted" }),
      description: t("teamDeletedDescription", { 
        teamName: team.name,
        fallback: `"${team.name}" has been deleted.` 
      }),
    });
  };

  const getAvailableMembersForTeam = (team: Team) => {
    // Filter out members already in the team
    const teamMemberIds = team.members.map(m => m.id);
    return allMembers.filter(member => !teamMemberIds.includes(member.id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("title", { fallback: "Teams" })}</h3>
        <p className="text-sm text-muted-foreground">
          {t("description", { fallback: "Manage teams and team members in your organization." })}
        </p>
      </div>
      <Separator />
      
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t("searchTeams", { fallback: "Search teams..." })}
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button onClick={() => setIsAddTeamDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> 
          {t("addTeam", { fallback: "Add Team" })}
        </Button>
      </div>

      <AddTeamDialog
        isOpen={isAddTeamDialogOpen}
        onOpenChange={setIsAddTeamDialogOpen}
        onAddTeam={handleAddTeam}
      />

      {currentTeam && (
        <TeamMemberAssignmentDialog
          isOpen={isMemberDialogOpen}
          onOpenChange={setIsMemberDialogOpen}
          teamName={currentTeam.name}
          members={getAvailableMembersForTeam(currentTeam)}
          onAssignMember={handleAssignMember}
          onCancel={() => setIsMemberDialogOpen(false)}
        />
      )}

      {filteredTeams.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          {searchQuery ? t("noTeamsFound", { fallback: "No teams found matching your search" }) : t("noTeams", { fallback: "No teams created yet" })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTeams.map((team) => (
            <Card key={team.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{team.name}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t("actions", { fallback: "Actions" })}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => openMemberDialog(team)}>
                        <Users className="mr-2 h-4 w-4" />
                        {t("addMember", { fallback: "Add Member" })}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteTeam(team.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {t("deleteTeam", { fallback: "Delete Team" })}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {team.description && <CardDescription className="mt-1">{team.description}</CardDescription>}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">
                      {t("members", { fallback: "Members" })} ({team.members.length})
                    </h4>
                  </div>
                  
                  {team.members.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground text-sm border rounded-md">
                      {t("noMembers", { fallback: "No members added yet" })}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {team.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between bg-muted/30 p-2 rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              {member.initials}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{member.name}</p>
                              <p className="text-xs text-muted-foreground">{member.role || member.email}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMember(team.id, member.id)}
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span className="sr-only">{t("removeMember", { fallback: "Remove member" })}</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
