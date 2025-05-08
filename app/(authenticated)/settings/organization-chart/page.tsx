import { Separator } from "@/components/ui/separator";
import { OrganizationChartCanvas } from "../_components/organization-chart-canvas";

export default function OrganizationChartPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Organization Chart</h3>
        <p className="text-sm text-muted-foreground">
          Visualize and manage your company&#39;s organizational structure with an interactive chart.
        </p>
      </div>
      <Separator />
      <OrganizationChartCanvas />
    </div>
  );
}