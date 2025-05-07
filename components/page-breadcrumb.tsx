"use client";

import React from "react";
import { usePathname, useParams } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ROUTES, ROUTE_PATTERNS } from "@/lib/constants/routes";

interface BreadcrumbConfig {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface EntityInfo {
  id: string;
  name: string;
}

interface PageBreadcrumbProps {
  breadcrumbData?: EntityInfo;
}

export function PageBreadcrumb({ breadcrumbData }: PageBreadcrumbProps) {
  const pathname = usePathname();
  const params = useParams();
  
  const getBreadcrumbs = (): BreadcrumbConfig[] => {
    // Always show Home as first breadcrumb
    const breadcrumbs: BreadcrumbConfig[] = [
      { label: "Home", href: ROUTES.HOME }
    ];

    // Check if we're on dashboard
    if (pathname === "/(authenticated)/dashboard" || pathname === ROUTES.DASHBOARD) {
      breadcrumbs.push({ label: "Dashboard", isCurrentPage: true });
      return breadcrumbs;
    }

    // Check if we're on a project page
    if (pathname.includes(ROUTE_PATTERNS.PROJECT_PAGE) && params.id) {
      breadcrumbs.push({ label: "Projects", href: ROUTES.PROJECTS });
      
      // If breadcrumbData is provided, use its name
      const projectLabel = breadcrumbData?.name || `Project ${params.id}`;
      breadcrumbs.push({ label: projectLabel, isCurrentPage: true });
      
      return breadcrumbs;
    }

    // Check if we're on a team page
    if (pathname.includes(ROUTE_PATTERNS.TEAM_PAGE) && params.id) {
      breadcrumbs.push({ label: "Teams", href: ROUTES.TEAMS });
      
      // If breadcrumbData is provided, use its name
      const teamLabel = breadcrumbData?.name || `Team ${params.id}`;
      breadcrumbs.push({ label: teamLabel, isCurrentPage: true });
      
      return breadcrumbs;
    }

    // For other pages, just use the path segments
    const segments = pathname
      .split('/')
      .filter(Boolean)
      .filter(segment => !segment.startsWith('(') && !segment.startsWith('['));

    segments.forEach((segment, index) => {
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