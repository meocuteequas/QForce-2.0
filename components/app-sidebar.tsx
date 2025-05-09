"use client";

import * as React from "react";
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
} from "lucide-react";
import { User } from "@supabase/supabase-js";
import { useTranslations } from "next-intl";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { CompanySwitcher } from "@/components/company-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  authUser: User;
}

export function AppSidebar({ authUser, ...props }: AppSidebarProps) {
  const t = useTranslations("navigation");
  
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
        title: t("dashboard"),
        url: "/dashboard",
        icon: LayoutDashboard,
        key: "dashboard",
      },
      {
        title: t("myWork"),
        url: "/my-work",
        icon: Briefcase,
        key: "myWork",
      },
      {
        title: t("myInbox"),
        url: "/inbox",
        icon: Inbox,
        key: "myInbox",
      },
      {
        title: t("myDocuments"),
        url: "/documents",
        icon: FileText,
        isActive: true,
        key: "myDocuments",
        items: [
          {
            title: "Work Documents",
            url: "/documents/9d8c7b6a-5f4e-3d2c-1b0a-987654321cba",
            id: "9d8c7b6a-5f4e-3d2c-1b0a-987654321cba",
          },
          {
            title: "Personal Files",
            url: "/documents/4e5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
            id: "4e5f6g7h-8i9j-0k1l-2m3n-4o5p6q7r8s9t",
          },
          {
            title: "Project Resources",
            url: "/documents/1a2s3d4f-5g6h-7j8k-9l0p-1q2w3e4r5t6y",
            id: "1a2s3d4f-5g6h-7j8k-9l0p-1q2w3e4r5t6y",
          },
        ],
      },
      {
        title: t("teams"),
        url: "/teams",
        icon: Boxes,
        isActive: true,
        key: "teams",
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
        title: t("allProjects"),
        url: "/projects",
        icon: FolderKanban,
        isActive: true,
        key: "allProjects",
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
  };

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
  );
}
