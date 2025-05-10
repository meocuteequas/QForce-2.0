"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { generateId } from "@/lib/utils";
import Image from "next/image";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
  initials: string;
}

export function ProjectTeamMembers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [newMemberRole, setNewMemberRole] = useState("member");

  // Mock data - in a real app, this would be fetched from API
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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
  ]);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addMember = () => {
    if (!newMemberEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address for the new team member.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would validate email format and check if user exists

    // Generate initials from email (temporary until user is fully registered)
    const emailParts = newMemberEmail.split("@")[0].split(".");
    const initials = emailParts.map((part) => part[0].toUpperCase()).join("");

    const newMember: TeamMember = {
      id: `user-${generateId()}`,
      name: newMemberEmail.split("@")[0].replace(/\./g, " "),
      email: newMemberEmail,
      role: newMemberRole,
      initials,
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberEmail("");
    setNewMemberRole("member");
    setIsAddDialogOpen(false);

    toast({
      title: "Team member added",
      description: `Invitation sent to ${newMemberEmail}`,
    });
  };

  const removeMember = (id: string) => {
    const memberToRemove = teamMembers.find((member) => member.id === id);
    setTeamMembers(teamMembers.filter((member) => member.id !== id));

    toast({
      title: "Team member removed",
      description: `${memberToRemove?.name} has been removed from the project.`,
    });
  };

  const changeRole = (id: string, newRole: string) => {
    setTeamMembers(teamMembers.map((member) => (member.id === id ? { ...member, role: newRole } : member)));

    const member = teamMembers.find((m) => m.id === id);
    toast({
      title: "Role updated",
      description: `${member?.name}'s role changed to ${newRole}.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search team members..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Enter the email address of the person you want to add to this project.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  placeholder="team.member@email.com"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select value={newMemberRole} onValueChange={setNewMemberRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Quality Assurance">Quality Assurance</SelectItem>
                    <SelectItem value="Business Analyst">Business Analyst</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addMember}>Add Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="flex justify-center items-center border rounded-lg py-12 px-4 text-muted-foreground bg-background">
          No team members found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <Card key={member.id} className="overflow-hidden py-0">
              <CardContent className="p-0">
                <div className="flex items-center gap-4">

                    <Image
                      src={"/placeholder.svg"}
                      width={120}
                      height={120}
                      className="h-[120px] w-auto object-cover"
                      alt={member.name}
                    />

                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{member.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{member.email}</p>
                    <div className="mt-1">
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => changeRole(member.id, "Project Manager")}>
                          Set as Project Manager
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeRole(member.id, "Developer")}>
                          Set as Developer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeRole(member.id, "Designer")}>
                          Set as Designer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => changeRole(member.id, "Quality Assurance")}>
                          Set as QA
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => removeMember(member.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          Remove from Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
