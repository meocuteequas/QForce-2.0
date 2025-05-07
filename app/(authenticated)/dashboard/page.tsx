import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Suspense } from "react";

// Import the data from this folder
import data from "./data.json";

export default function DashboardPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <Suspense fallback={<div className="p-4">Loading cards...</div>}>
              <SectionCards />
            </Suspense>

            <div className="px-4 lg:px-6">
              <Suspense fallback={<div className="h-[300px] w-full bg-muted/20 animate-pulse rounded-lg"></div>}>
                <ChartAreaInteractive />
              </Suspense>
            </div>

            <Suspense fallback={<div className="p-4">Loading data table...</div>}>
              <DataTable data={data} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
