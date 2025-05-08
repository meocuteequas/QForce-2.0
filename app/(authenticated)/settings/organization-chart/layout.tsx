import { ReactNode } from "react";

interface OrganizationChartLayoutProps {
  children: ReactNode;
}

export default function OrganizationChartLayout({ children }: OrganizationChartLayoutProps) {
  return (
    // Remove the max width constraint for the organization chart
    <div className="flex-1 w-full">{children}</div>
  );
}