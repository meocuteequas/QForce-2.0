import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import ProjectSettingsForm from "./_components/project-settings-form";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Project Settings",
  description: "Manage project settings, team members, and packages.",
};

export default function ProjectSettingsPage() {
  const t = useTranslations("settings.project");

  // This would be a server-side fetch in a real app
  // If project not found, show 404 page
  // if (!project) return notFound();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>
      <div className="container mx-auto p-6 space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <Separator className="my-6" />
        <ProjectSettingsForm />
      </div>
    </>
  );
}
