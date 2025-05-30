import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";
import { PageBreadcrumb } from "@/components/page-breadcrumb";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/settings/account",
  },
  {
    title: "Teams",
    href: "/settings/teams",
  },
  {
    title: "Packages",
    href: "/settings/packages",
  },
  {
    title: "Organization Chart",
    href: "/settings/organization-chart",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>

      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/5 max-w-[250px]">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
