"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES } from "@/lib/constants/routes";

interface BreadcrumbConfig {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

export function PageBreadcrumb() {
  const pathname = usePathname();
  
  const getBreadcrumbs = (): BreadcrumbConfig[] => {
    // Always show Home as first breadcrumb
    const breadcrumbs: BreadcrumbConfig[] = [
      { label: "Home", href: ROUTES.HOME }
    ];

    // For other pages, just use the path segments
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .filter(segment => !segment.startsWith('(') && !segment.startsWith('['));

    segments.forEach((segment, index) => {
      if(segment === "en" || segment === "vi") return;
      
      const href = `/${segments.slice(0, index + 1).join('/')}`;
      const isLast = index === segments.length - 1;
      
      // Format the segment for display (capitalize first letter, replace hyphens with spaces)
      const label = segment
        .replace(/-/g, ' ')
        .replace(/^\w/, c => c.toUpperCase());
      
      breadcrumbs.push({ 
        label, 
        href: isLast ? undefined : href, 
        isCurrentPage: isLast
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={`${crumb.label}-${index}`}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {crumb.isCurrentPage ? (
                <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={crumb.href || "#"}>{crumb.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}