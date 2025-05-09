"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { User } from "@supabase/supabase-js";

import { AppSidebar } from "@/components/app-sidebar";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error || !data?.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [router, supabase.auth]);

  if (loading) {
    return <AuthenticatedLayoutSkeleton />;
  }

  if (!user) return null;

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen overflow-hidden">
        <AppSidebar authUser={user} className="hidden lg:block" />
        <div className="flex-1 overflow-auto">
          <main className="flex-1 overflow-y-auto">
            <Suspense fallback={<div className="p-8">Loading content...</div>}>{children}</Suspense>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function AuthenticatedLayoutSkeleton() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-64 border-r lg:block">
        <Skeleton className="h-full" />
      </div>
      <div className="flex-1">
        <div className="h-14 border-b">
          <Skeleton className="h-full" />
        </div>
        <main className="p-8">
          <Skeleton className="h-[600px]" />
        </main>
      </div>
    </div>
  );
}
