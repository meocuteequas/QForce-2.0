import { Separator } from "@/components/ui/separator";
import { AccountForm } from "../_components/account-form";
import { useTranslations } from "next-intl";

export default function SettingsAccountPage() {
  const t = useTranslations("settings.account");
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{t("title")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}