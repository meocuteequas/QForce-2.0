"use client"

import * as React from "react"

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

interface AddProjectDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onAddProject: (projectName: string) => void
}

export function AddProjectDialog({ isOpen, onOpenChange, onAddProject }: AddProjectDialogProps) {
  const [newProjectName, setNewProjectName] = React.useState("")
  
  const handleAddProject = () => {
    if (!newProjectName.trim()) return
    
    onAddProject(newProjectName)
    setNewProjectName("")
  }

  const handleCancel = () => {
    setNewProjectName("")
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Create a new project for your work.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Enter project name"
              className="w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button onClick={handleAddProject}>
            Add Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}