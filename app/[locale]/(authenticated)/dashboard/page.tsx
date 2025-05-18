import { SectionCards } from "./_components/section-cards";
import { PageBreadcrumb } from "@/components/page-breadcrumb";
import { Suspense } from "react";

// Import the data from this folder

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

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
          </div>
        </div>
      </div>
    </>
  );
}
