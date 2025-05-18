import { Separator } from "@/components/ui/separator";
import PackageSettings from "../_components/packages-settings";
import { useTranslations } from "next-intl";

export default function SettingsPackagesPage() {
  const t = useTranslations("settings.packages");
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <Separator />
      <PackageSettings />
    </div>
  )
}