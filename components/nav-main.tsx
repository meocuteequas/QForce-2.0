"use client"

import { ChevronRight, Plus, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { AddTeamDialog } from "@/components/dialogs/add-team-dialog"
import { AddProjectDialog } from "@/components/dialogs/add-project-dialog"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  id?: string
  items?: {
    title: string
    url: string
    id?: string
  }[]
}

interface NavMainProps {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = React.useState(false)
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = React.useState(false)

  const handleAddTeamClick = () => setIsAddTeamModalOpen(true)
  const handleAddProjectClick = () => setIsAddProjectModalOpen(true)

  const handleAddTeam = (teamName: string) => {
    // Handle team creation logic here
    console.log(`Team created: ${teamName}`);
    
    setIsAddTeamModalOpen(false)
  }

  const handleAddProject = (projectName: string) => {
    // Handle project creation logic here
    console.log(`Project created: ${projectName}`);
    setIsAddProjectModalOpen(false)
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          {items.map((item) => {
            const hasChildItems = item.items && item.items.length > 0
            const isItemActive = pathname === item.url
            const isTeamsSection = item.title === "Teams"
            const isProjectsSection = item.title === "All Projects"
            
            return hasChildItems ? (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isSubItemActive = pathname === subItem.url
                        
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              asChild 
                              isActive={isSubItemActive}
                            >
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      })}
                      
                      {/* Add Team option for Teams section only */}
                      {isTeamsSection && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={handleAddTeamClick}
                            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                          >
                            <Plus className="mr-1 size-3.5" />
                            <span>Add Team</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                      
                      {/* Add Project option for All Projects section only */}
                      {isProjectsSection && (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton
                            onClick={handleAddProjectClick}
                            className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                          >
                            <Plus className="mr-1 size-3.5" />
                            <span>Add Project</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              // If it doesn't have child items, use a simple button with a link
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  tooltip={item.title}
                  isActive={isItemActive}
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroup>

      {/* Add Team Dialog Component */}
      <AddTeamDialog 
        isOpen={isAddTeamModalOpen}
        onOpenChange={setIsAddTeamModalOpen}
        onAddTeam={handleAddTeam}
      />
      
      {/* Add Project Dialog Component */}
      <AddProjectDialog 
        isOpen={isAddProjectModalOpen}
        onOpenChange={setIsAddProjectModalOpen}
        onAddProject={handleAddProject}
      />
    </>
  )
}
