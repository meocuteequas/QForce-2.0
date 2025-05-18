"use client"

import * as React from "react"
import { useTranslations } from "next-intl"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AddTeamDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddTeam: (teamName: string) => void
}

export function AddTeamDialog({ isOpen, onOpenChange, onAddTeam }: AddTeamDialogProps) {
  const [newTeamName, setNewTeamName] = React.useState("")
  const t = useTranslations("settings.teams")
  
  const handleAddTeam = () => {
    if (!newTeamName.trim()) return
    
    onAddTeam(newTeamName)
    setNewTeamName("")
  }

  const handleCancel = () => {
    setNewTeamName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("addNewTeam", { fallback: "Add New Team" })}</DialogTitle>
          <DialogDescription>
            {t("createTeamDescription", { fallback: "Create a new team to collaborate with your colleagues." })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-2">
            <Label htmlFor="team-name">{t("teamName", { fallback: "Team Name" })}</Label>
            <Input
              id="team-name"
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              placeholder={t("enterTeamName", { fallback: "Enter team name" })}
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            {t("cancel", { fallback: "Cancel" })}
          </Button>
          <Button onClick={handleAddTeam}>
            {t("addTeam", { fallback: "Add Team" })}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}