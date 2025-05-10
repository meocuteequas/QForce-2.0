"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProjectDetailsForm } from "./project-details-form";
import { ProjectClientForm } from "./project-client-form";
import { ProjectTeamMembers } from "./project-team-members";
import { ProjectPackages } from "./project-packages";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProjectSettingsForm() {
  const t = useTranslations("settings.project");

  const navItems = [
    {
      title: t("tabs.details.title"),
      value: "details",
    },
    {
      title: t("tabs.client.title"),
      value: "client",
    },
    {
      title: t("tabs.team.title"),
      value: "team",
    },
    {
      title: t("tabs.packages.title"),
      value: "packages",
    },
  ];
  const [activeTab, setActiveTab] = React.useState("details");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="lg:w-1/5 max-w-[250px]">
        <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
          {navItems.map((item, key) => (
            <Button key={key} variant="ghost" className="justify-start cursor-pointer" onClick={() => handleTabChange(item.value)}>
              {item.title}
            </Button>
          ))}
        </nav>
      </aside>
      <div className="flex-1">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="details" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{t("tabs.details.heading")}</h3>
              <p className="text-sm text-muted-foreground">{t("tabs.details.description")}</p>
            </div>
            <Separator />
            <ProjectDetailsForm />
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{t("tabs.client.heading")}</h3>
              <p className="text-sm text-muted-foreground">{t("tabs.client.description")}</p>
            </div>
            <Separator />
            <ProjectClientForm />
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{t("tabs.team.heading")}</h3>
              <p className="text-sm text-muted-foreground">{t("tabs.team.description")}</p>
            </div>
            <Separator />
            <ProjectTeamMembers />
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">{t("tabs.packages.heading")}</h3>
              <p className="text-sm text-muted-foreground">{t("tabs.packages.description")}</p>
            </div>
            <Separator />
            <ProjectPackages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
