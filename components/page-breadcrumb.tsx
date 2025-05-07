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

interface BreadcrumbConfig {
  label: string;
  href?: string;
  isCurrentPage?: boolean;
}

interface ProjectInfo {
  id: string;
  name: string;
}

interface PageBreadcrumbProps {
  projectInfo?: ProjectInfo;
}

export function PageBreadcrumb({ projectInfo }: PageBreadcrumbProps) {
  const pathname = usePathname();
  const params = useParams();
  
  // Generate breadcrumbs based on current path
  const getBreadcrumbs = (): BreadcrumbConfig[] => {
    // Always show Home as first breadcrumb
    const breadcrumbs: BreadcrumbConfig[] = [
      { label: "Home", href: "/" }
    ];

    // Check if we're on dashboard
    if (pathname === "/(authenticated)/dashboard" || pathname === "/dashboard") {
      breadcrumbs.push({ label: "Dashboard", isCurrentPage: true });
      return breadcrumbs;
    }

    // Check if we're on a project page
    if (pathname.includes("/project/") && params.id) {
      breadcrumbs.push({ label: "Projects", href: "/projects" });
      
      // If projectInfo is provided, use the project name
      const projectLabel = projectInfo?.name || `Project ${params.id}`;
      breadcrumbs.push({ label: projectLabel, isCurrentPage: true });
      
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