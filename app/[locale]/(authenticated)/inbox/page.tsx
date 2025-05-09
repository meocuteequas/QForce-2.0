import { PageBreadcrumb } from "@/components/page-breadcrumb";
import React from "react";
import EmailClient from "./_components/email-client";

export default function InboxPage() {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <PageBreadcrumb />
      </header>

      <EmailClient />
    </>
  );
}
