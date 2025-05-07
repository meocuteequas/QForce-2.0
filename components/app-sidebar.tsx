"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  LayoutDashboard,
  Briefcase,
  Inbox,
  FileText,
  FolderKanban,
  Boxes,
} from "lucide-react"
import { User } from "@supabase/supabase-js"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { CompanySwitcher } from "@/components/company-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  companies: [
    {
      name: "QForce Inc.",
      logo: GalleryVerticalEnd,
      plan: "Startup",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Work",
      url: "/my-work",
      icon: Briefcase,
    },
    {
      title: "My Inbox",
      url: "/inbox",
      icon: Inbox,
    },
    {
      title: "My Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Teams",
      url: "/teams",
      icon: Boxes,
      isActive: true,
      items: [
        {
          title: "Product Development",
          url: "/teams/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
          id: "1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p",
        },
        {
          title: "Marketing Team",
          url: "/teams/2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
          id: "2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q",
        },
      ],
    },
    {
      title: "All Projects",
      url: "/projects",
      icon: FolderKanban,
      isActive: true,
      items: [
        {
          title: "Design Engineering",
          url: "/projects/3a7acb42-e91b-4f66-b89e-38c1d86bbf32",
          id: "3a7acb42-e91b-4f66-b89e-38c1d86bbf32",
        },
        {
          title: "Sales & Marketing",
          url: "/projects/5f9c1b2d-cc7e-48a4-b9f5-12345a6789bc",
          id: "5f9c1b2d-cc7e-48a4-b9f5-12345a6789bc",
        },
        {
          title: "Travel",
          url: "/projects/8e7d6c5b-4a3f-2e1d-0c9b-876543210fed",
          id: "8e7d6c5b-4a3f-2e1d-0c9b-876543210fed",
        },
      ],
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  authUser: User
}

export function AppSidebar({ authUser, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <CompanySwitcher companies={data.companies} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={authUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
